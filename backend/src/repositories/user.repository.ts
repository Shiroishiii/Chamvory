import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { pool } from '../config/database';
import type { PublicUser, UserRow } from '../types';

export async function findByEmail(email: string): Promise<UserRow | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT id, nome, email, senha_hash, perfil FROM usuarios WHERE email = ? LIMIT 1',
    [email],
  );
  return (rows[0] as UserRow | undefined) ?? null;
}

export async function findPublicById(id: number): Promise<PublicUser | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT id, nome, email, perfil FROM usuarios WHERE id = ? LIMIT 1',
    [id],
  );
  return (rows[0] as PublicUser | undefined) ?? null;
}

export async function createRequester(nome: string, email: string, senhaHash: string): Promise<number> {
  const [result] = await pool.execute<ResultSetHeader>(
    "INSERT INTO usuarios (nome, email, senha_hash, perfil) VALUES (?, ?, ?, 'SOLICITANTE')",
    [nome, email, senhaHash],
  );
  return result.insertId;
}
