import type { RowDataPacket } from 'mysql2/promise';
import { pool } from '../config/database';

export interface CategoryRow {
  id: number;
  nome: string;
  descricao: string | null;
}

export async function findAll(): Promise<CategoryRow[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT id, nome, descricao FROM categorias ORDER BY nome',
  );
  return rows as CategoryRow[];
}

export async function exists(id: number): Promise<boolean> {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT 1 FROM categorias WHERE id = ? LIMIT 1',
    [id],
  );
  return rows.length > 0;
}
