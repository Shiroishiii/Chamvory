import type { PoolConnection } from 'mysql2/promise';
import { withTransaction } from '../config/database';
import * as categoryRepository from '../repositories/category.repository';
import * as historyRepository from '../repositories/history.repository';
import * as ticketRepository from '../repositories/ticket.repository';
import type { AuthUser, TicketRow } from '../types';
import { AppError } from '../utils/app-error';
import { formatTicketNumber, temporaryTicketNumber } from '../utils/identifiers';
import { mergeSort } from '../utils/merge-sort';
import type {
  CreateTicketInput,
  FinalizacaoInput,
  HistoricoInput,
  UpdateTicketInput,
} from '../validators/ticket.validator';

const naoEncontrado = () => new AppError(404, 'TICKET_NOT_FOUND', 'Chamado não encontrado.');
const naoEhDono = () => new AppError(403, 'FORBIDDEN', 'Você só pode alterar chamados próprios.');

/** Solicitante vê somente os próprios chamados; técnico vê todos. */
function podeVisualizar(user: AuthUser, chamado: TicketRow): boolean {
  return user.perfil === 'TECNICO' || chamado.solicitante_id === user.id;
}

/** Retorna o chamado somente se o usuário tiver permissão para vê-lo (senão, 404 — não revela existência). */
async function buscarVisivel(user: AuthUser, id: number): Promise<TicketRow> {
  const chamado = await ticketRepository.findById(id);
  if (!chamado || !podeVisualizar(user, chamado)) throw naoEncontrado();
  return chamado;
}

async function garantirCategoria(categoriaId: number): Promise<void> {
  const existe = await categoryRepository.exists(categoriaId);
  if (!existe) {
    throw new AppError(400, 'INVALID_CATEGORY', 'Categoria informada não existe.');
  }
}

/** Ordena por data de abertura crescente (mais antigo primeiro); id desempata de forma estável. */
function ordenarFila(chamados: TicketRow[]): TicketRow[] {
  return mergeSort(
    chamados,
    (a, b) => a.data_abertura.getTime() - b.data_abertura.getTime() || a.id - b.id,
  );
}

/**
 * Trava o chamado (FOR UPDATE) e verifica se o técnico pode atendê-lo.
 * Usado em todas as operações de atendimento para evitar condições de corrida.
 */
async function bloquearParaAtendimento(conn: PoolConnection, id: number, user: AuthUser): Promise<TicketRow> {
  const chamado = await ticketRepository.findByIdForUpdate(conn, id);
  if (!chamado) throw naoEncontrado();

  if (chamado.status === 'FINALIZADO') {
    throw new AppError(409, 'TICKET_FINALIZED', 'Chamados finalizados não podem ser alterados.');
  }
  if (chamado.tecnico_id === null) {
    throw new AppError(409, 'TICKET_NOT_ASSIGNED', 'Assuma o chamado antes de registrar atendimentos.');
  }
  if (chamado.tecnico_id !== user.id) {
    throw new AppError(
      403,
      'NOT_RESPONSIBLE_TECHNICIAN',
      'Somente o técnico responsável pode atualizar este chamado.',
    );
  }
  return chamado;
}

/** A data do atendimento deve estar entre a abertura do chamado e o momento atual. */
function validarDataAtendimento(informada: Date | undefined, chamado: TicketRow): Date {
  const agora = Date.now();
  const data = informada ?? new Date(agora);

  if (data.getTime() < chamado.data_abertura.getTime()) {
    throw new AppError(
      400,
      'INVALID_ATTENDANCE_DATE',
      'A data do atendimento não pode ser anterior à abertura do chamado.',
    );
  }
  if (data.getTime() > agora) {
    throw new AppError(
      400,
      'INVALID_ATTENDANCE_DATE',
      'A data do atendimento não pode ser posterior ao momento atual.',
    );
  }
  return data;
}

export async function list(user: AuthUser, busca?: string): Promise<TicketRow[]> {
  const chamados = await ticketRepository.findAll({
    solicitanteId: user.perfil === 'SOLICITANTE' ? user.id : undefined,
    busca,
  });
  return ordenarFila(chamados);
}

export async function getById(user: AuthUser, id: number): Promise<TicketRow> {
  return buscarVisivel(user, id);
}

export async function create(user: AuthUser, dados: CreateTicketInput): Promise<TicketRow> {
  await garantirCategoria(dados.categoria_id);

  const novoId = await withTransaction(async (conn) => {
    const id = await ticketRepository.insert(conn, {
      numero: temporaryTicketNumber(),
      assunto: dados.assunto,
      descricao: dados.descricao,
      prioridade: dados.prioridade,
      solicitante_id: user.id,
      categoria_id: dados.categoria_id,
      data_abertura: new Date(),
    });
    // O número exibido é derivado do id gerado pelo banco
    await ticketRepository.updateNumero(conn, id, formatTicketNumber(id));
    return id;
  });

  return buscarVisivel(user, novoId);
}

export async function update(user: AuthUser, id: number, dados: UpdateTicketInput): Promise<TicketRow> {
  if (dados.categoria_id !== undefined) {
    await garantirCategoria(dados.categoria_id);
  }

  await withTransaction(async (conn) => {
    const chamado = await ticketRepository.findByIdForUpdate(conn, id);
    if (!chamado) throw naoEncontrado();
    if (chamado.solicitante_id !== user.id) throw naoEhDono();
    if (chamado.status !== 'ABERTO') {
      throw new AppError(409, 'TICKET_NOT_EDITABLE', 'Somente chamados com status Aberto podem ser editados.');
    }

    await ticketRepository.updateFields(conn, id, dados);
  });

  return buscarVisivel(user, id);
}

export async function remove(user: AuthUser, id: number): Promise<void> {
  await withTransaction(async (conn) => {
    const chamado = await ticketRepository.findByIdForUpdate(conn, id);
    if (!chamado) throw naoEncontrado();
    if (chamado.solicitante_id !== user.id) throw naoEhDono();
    if (chamado.status !== 'ABERTO') {
      throw new AppError(409, 'TICKET_NOT_DELETABLE', 'Somente chamados com status Aberto podem ser excluídos.');
    }

    const registros = await historyRepository.countByTicketId(conn, id);
    if (registros > 0) {
      throw new AppError(
        409,
        'TICKET_HAS_HISTORY',
        'Chamados com registros de atendimento não podem ser excluídos.',
      );
    }

    await ticketRepository.remove(conn, id);
  });
}

export async function assign(user: AuthUser, id: number): Promise<TicketRow> {
  await withTransaction(async (conn) => {
    const chamado = await ticketRepository.findByIdForUpdate(conn, id);
    if (!chamado) throw naoEncontrado();

    if (chamado.tecnico_id !== null) {
      throw new AppError(409, 'TICKET_ALREADY_ASSIGNED', 'Este chamado já possui um técnico responsável.');
    }
    if (chamado.status !== 'ABERTO') {
      throw new AppError(409, 'TICKET_NOT_OPEN', 'Somente chamados com status Aberto podem ser assumidos.');
    }

    // Salvaguarda: o UPDATE condicional garante que apenas uma atribuição seja efetivada
    const atribuido = await ticketRepository.assign(conn, id, user.id);
    if (!atribuido) {
      throw new AppError(409, 'TICKET_ALREADY_ASSIGNED', 'Este chamado já possui um técnico responsável.');
    }

    await historyRepository.insert(conn, {
      chamado_id: id,
      tecnico_id: user.id,
      data_atendimento: new Date(),
      observacao: 'Chamado assumido pelo técnico.',
      solucao: null,
      status_resultante: 'EM_ATENDIMENTO',
    });
  });

  return buscarVisivel(user, id);
}

export async function addHistory(user: AuthUser, id: number, dados: HistoricoInput): Promise<TicketRow> {
  await withTransaction(async (conn) => {
    const chamado = await bloquearParaAtendimento(conn, id, user);
    const dataAtendimento = validarDataAtendimento(dados.data_atendimento, chamado);

    await historyRepository.insert(conn, {
      chamado_id: id,
      tecnico_id: user.id,
      data_atendimento: dataAtendimento,
      observacao: dados.observacao,
      solucao: null,
      status_resultante: 'EM_ATENDIMENTO',
    });
  });

  return buscarVisivel(user, id);
}

export async function finish(user: AuthUser, id: number, dados: FinalizacaoInput): Promise<TicketRow> {
  await withTransaction(async (conn) => {
    const chamado = await bloquearParaAtendimento(conn, id, user);
    const dataAtendimento = validarDataAtendimento(dados.data_atendimento, chamado);

    await ticketRepository.updateStatus(conn, id, 'FINALIZADO');
    await historyRepository.insert(conn, {
      chamado_id: id,
      tecnico_id: user.id,
      data_atendimento: dataAtendimento,
      observacao: dados.observacao || 'Chamado finalizado.',
      solucao: dados.solucao,
      status_resultante: 'FINALIZADO',
    });
  });

  return buscarVisivel(user, id);
}
