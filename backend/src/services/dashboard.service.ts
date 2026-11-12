import * as ticketRepository from '../repositories/ticket.repository';
import type { AuthUser, Status } from '../types';

export type ResumoChamados = Record<Status, number>;

/** Contagem por status. Solicitante vê só os próprios chamados; técnico vê todos. */
export async function summary(user: AuthUser): Promise<ResumoChamados> {
  const contagens = await ticketRepository.countByStatus(
    user.perfil === 'SOLICITANTE' ? user.id : undefined,
  );

  const resumo: ResumoChamados = { ABERTO: 0, EM_ATENDIMENTO: 0, FINALIZADO: 0 };
  for (const { status, total } of contagens) {
    resumo[status] = total;
  }
  return resumo;
}
