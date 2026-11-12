/**
 * Lista de revogação de tokens JWT (usada no logout).
 * Fica em memória: vale para uma única instância do servidor e é zerada ao reiniciar.
 * Em produção, use Redis ou uma tabela de sessões persistida.
 */
const revogados = new Map<string, number>(); // jti -> expiração (ms)

export function revokeToken(jti: string, expiraEmMs: number): void {
  revogados.set(jti, expiraEmMs);
}

export function isTokenRevoked(jti: string): boolean {
  const expiraEm = revogados.get(jti);
  if (expiraEm === undefined) return false;

  if (Date.now() >= expiraEm) {
    revogados.delete(jti);
    return false;
  }
  return true;
}
