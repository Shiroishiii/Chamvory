import { randomBytes } from 'node:crypto';

/** Número provisório, único, gravado antes de conhecer o id do banco. Cabe em VARCHAR(30). */
export function temporaryTicketNumber(): string {
  return `TMP-${randomBytes(10).toString('hex')}`;
}

/** Número exibido ao usuário, derivado do id do chamado. Ex.: 42 -> CH-000042 */
export function formatTicketNumber(id: number): string {
  return `CH-${String(id).padStart(6, '0')}`;
}
