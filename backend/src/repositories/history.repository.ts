import type { PoolConnection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { pool } from '../config/database';
import type { HistoryRow, Status } from '../types';

export interface NovoHistorico {
  chamado_id: number;
  tecnico_id: number;
  data_atendimento: Date;
  observacao: string;
  solucao: string | null;
  status_resultante: Status;
}

export async function findByTicketId(chamadoId: number): Promise<HistoryRow[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT h.id, h.chamado_id, h.tecnico_id, h.data_atendimento, h.observacao,
            h.solucao, h.status_resultante, u.nome AS tecnico_nome
       FROM historico_atendimentos h
       JOIN usuarios u ON u.id = h.tecnico_id
      WHERE h.chamado_id = ?
      ORDER BY h.data_atendimento ASC, h.id ASC`,
    [chamadoId],
  );
  return rows as HistoryRow[];
}

export async function countByTicketId(conn: PoolConnection, chamadoId: number): Promise<number> {
  const [rows] = await conn.query<RowDataPacket[]>(
    'SELECT COUNT(*) AS total FROM historico_atendimentos WHERE chamado_id = ?',
    [chamadoId],
  );
  return Number(rows[0].total);
}

export async function insert(conn: PoolConnection, dados: NovoHistorico): Promise<number> {
  const [resultado] = await conn.execute<ResultSetHeader>(
    `INSERT INTO historico_atendimentos
       (chamado_id, tecnico_id, data_atendimento, observacao, solucao, status_resultante)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      dados.chamado_id,
      dados.tecnico_id,
      dados.data_atendimento,
      dados.observacao,
      dados.solucao,
      dados.status_resultante,
    ],
  );
  return resultado.insertId;
}
