import * as historyRepository from '../repositories/history.repository';
import type { AuthUser, HistoryRow } from '../types';
import * as ticketService from './ticket.service';

/** O histórico só é retornado se o usuário puder visualizar o chamado. */
export async function listByTicket(user: AuthUser, chamadoId: number): Promise<HistoryRow[]> {
  await ticketService.getById(user, chamadoId);
  return historyRepository.findByTicketId(chamadoId);
}
