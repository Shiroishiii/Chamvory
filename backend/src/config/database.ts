import { createPool, type PoolConnection } from 'mysql2/promise';
import { env } from './env';

export const pool = createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  // Datas trafegam em UTC. Todas as datas são geradas no Node (nunca NOW() do MySQL).
  timezone: 'Z',
});

/**
 * Executa `operacao` dentro de uma transação SQL.
 * Faz commit se tudo der certo e rollback em caso de erro.
 */
export async function withTransaction<T>(operacao: (conn: PoolConnection) => Promise<T>): Promise<T> {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const resultado = await operacao(conn);
    await conn.commit();
    return resultado;
  } catch (erro) {
    await conn.rollback();
    throw erro;
  } finally {
    conn.release();
  }
}
