import type { PoolConnection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { pool } from '../config/database';
import type { Prioridade, Status, TicketRow } from '../types';

const CONSULTA_CHAMADOS = `
  SELECT c.id, c.numero, c.assunto, c.descricao, c.prioridade, c.status,
         c.solicitante_id, c.categoria_id, c.tecnico_id, c.data_abertura,
         cat.nome AS categoria_nome,
         sol.nome AS solicitante_nome,
         tec.nome AS tecnico_nome
    FROM chamados c
    JOIN categorias cat ON cat.id = c.categoria_id
    JOIN usuarios sol ON sol.id = c.solicitante_id
    LEFT JOIN usuarios tec ON tec.id = c.tecnico_id`;

const CAMPOS_EDITAVEIS = ['assunto', 'descricao', 'categoria_id', 'prioridade'] as const;

export interface FiltrosListagem {
  solicitanteId?: number;
  busca?: string;
}

export interface NovoChamado {
  numero: string;
  assunto: string;
  descricao: string;
  prioridade: Prioridade;
  solicitante_id: number;
  categoria_id: number;
  data_abertura: Date;
}

export interface CamposEditaveis {
  assunto?: string;
  descricao?: string;
  categoria_id?: number;
  prioridade?: Prioridade;
}

/** Escapa os curingas do LIKE para que a busca seja tratada como texto literal. */
function escaparLike(valor: string): string {
  return valor.replace(/[\\%_]/g, (caractere) => `\\${caractere}`);
}

export async function findAll(filtros: FiltrosListagem): Promise<TicketRow[]> {
  const condicoes: string[] = [];
  const params: (string | number)[] = [];

  if (filtros.solicitanteId !== undefined) {
    condicoes.push('c.solicitante_id = ?');
    params.push(filtros.solicitanteId);
  }

  if (filtros.busca) {
    const termo = `%${escaparLike(filtros.busca)}%`;
    condicoes.push('(c.numero LIKE ? OR c.assunto LIKE ?)');
    params.push(termo, termo);
  }

  const where = condicoes.length > 0 ? `WHERE ${condicoes.join(' AND ')}` : '';
  const [rows] = await pool.query<RowDataPacket[]>(
    `${CONSULTA_CHAMADOS} ${where} ORDER BY c.id`,
    params,
  );
  return rows as TicketRow[];
}

export async function findById(id: number): Promise<TicketRow | null> {
  const [rows] = await pool.query<RowDataPacket[]>(`${CONSULTA_CHAMADOS} WHERE c.id = ?`, [id]);
  return (rows[0] as TicketRow | undefined) ?? null;
}

/** Lê o chamado travando a linha (SELECT ... FOR UPDATE) dentro de uma transação. */
export async function findByIdForUpdate(conn: PoolConnection, id: number): Promise<TicketRow | null> {
  const [rows] = await conn.query<RowDataPacket[]>('SELECT * FROM chamados WHERE id = ? FOR UPDATE', [id]);
  return (rows[0] as TicketRow | undefined) ?? null;
}

export async function insert(conn: PoolConnection, dados: NovoChamado): Promise<number> {
  const [resultado] = await conn.execute<ResultSetHeader>(
    `INSERT INTO chamados
       (numero, assunto, descricao, prioridade, status, solicitante_id, categoria_id, tecnico_id, data_abertura)
     VALUES (?, ?, ?, ?, 'ABERTO', ?, ?, NULL, ?)`,
    [
      dados.numero,
      dados.assunto,
      dados.descricao,
      dados.prioridade,
      dados.solicitante_id,
      dados.categoria_id,
      dados.data_abertura,
    ],
  );
  return resultado.insertId;
}

export async function updateNumero(conn: PoolConnection, id: number, numero: string): Promise<void> {
  await conn.execute('UPDATE chamados SET numero = ? WHERE id = ?', [numero, id]);
}

export async function updateFields(conn: PoolConnection, id: number, campos: CamposEditaveis): Promise<void> {
  // Apenas colunas da lista permitida entram no SQL (nunca vindas direto do cliente)
  const colunas = CAMPOS_EDITAVEIS.filter((coluna) => campos[coluna] !== undefined);
  if (colunas.length === 0) return;

  const set = colunas.map((coluna) => `${coluna} = ?`).join(', ');
  const valores = colunas.map((coluna) => campos[coluna]).filter((valor): valor is string | number => valor !== undefined);
  await conn.execute(`UPDATE chamados SET ${set} WHERE id = ?`, [...valores, id]);
}

/**
 * Atribui o chamado ao técnico somente se ele ainda estiver ABERTO e sem responsável.
 * Retorna false quando a condição não foi atendida (outra requisição venceu a corrida).
 */
export async function assign(conn: PoolConnection, id: number, tecnicoId: number): Promise<boolean> {
  const [resultado] = await conn.execute<ResultSetHeader>(
    `UPDATE chamados
        SET tecnico_id = ?, status = 'EM_ATENDIMENTO'
      WHERE id = ? AND status = 'ABERTO' AND tecnico_id IS NULL`,
    [tecnicoId, id],
  );
  return resultado.affectedRows === 1;
}

export async function updateStatus(conn: PoolConnection, id: number, status: Status): Promise<void> {
  await conn.execute('UPDATE chamados SET status = ? WHERE id = ?', [status, id]);
}

export async function remove(conn: PoolConnection, id: number): Promise<void> {
  await conn.execute('DELETE FROM chamados WHERE id = ?', [id]);
}

export async function countByStatus(solicitanteId?: number): Promise<{ status: Status; total: number }[]> {
  const where = solicitanteId !== undefined ? 'WHERE solicitante_id = ?' : '';
  const params = solicitanteId !== undefined ? [solicitanteId] : [];
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT status, COUNT(*) AS total FROM chamados ${where} GROUP BY status`,
    params,
  );
  return rows as { status: Status; total: number }[];
}
