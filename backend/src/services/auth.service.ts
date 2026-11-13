import bcrypt from 'bcrypt';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';
import { env } from '../config/env';
import * as userRepository from '../repositories/user.repository';
import type { AuthUser, PublicUser } from '../types';
import { AppError } from '../utils/app-error';
import { revokeToken } from '../utils/revoked-tokens';
import type { RegisterInput } from '../validators/auth.validator';

const MENSAGEM_CREDENCIAIS = 'E-mail ou senha inválidos';

// Hash fictício usado quando o e-mail não existe, para o tempo de resposta não revelar contas.
const HASH_FICTICIO = '$2b$12$B5yauQV9CA0.mkqQYuhGe.ixkBNbA0L3AbNXIBzxiBHL5C5tS98zC';

export async function login(email: string, senha: string): Promise<{ token: string; usuario: PublicUser }> {
  const usuario = await userRepository.findByEmail(email);
  const senhaConfere = await bcrypt.compare(senha, usuario?.senha_hash ?? HASH_FICTICIO);

  if (!usuario || !senhaConfere) {
    throw new AppError(401, 'INVALID_CREDENTIALS', MENSAGEM_CREDENCIAIS);
  }

  const token = jwt.sign({ perfil: usuario.perfil }, env.JWT_SECRET, {
    subject: String(usuario.id),
    jwtid: randomUUID(),
    expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
  });

  const publico: PublicUser = {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    perfil: usuario.perfil,
  };

  return { token, usuario: publico };
}

export async function me(userId: number): Promise<PublicUser> {
  const usuario = await userRepository.findPublicById(userId);
  if (!usuario) {
    throw new AppError(404, 'USER_NOT_FOUND', 'Usuário não encontrado.');
  }
  return usuario;
}

export async function register(data: RegisterInput): Promise<{ token: string; usuario: PublicUser }> {
  const senha_hash = await bcrypt.hash(data.senha, 12);
  let id: number;
  try { id = await userRepository.createRequester(data.nome, data.email, senha_hash); }
  catch (error) {
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'ER_DUP_ENTRY') {
      throw new AppError(409, 'EMAIL_ALREADY_EXISTS', 'Este e-mail já está cadastrado.');
    }
    throw error;
  }
  const usuario: PublicUser = { id, nome: data.nome, email: data.email, perfil: 'SOLICITANTE' };
  const token = jwt.sign({ perfil: usuario.perfil }, env.JWT_SECRET, {
    subject: String(id), jwtid: randomUUID(), expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
  });
  return { token, usuario };
}

/** Logout: invalida o token atual até a sua expiração natural. */
export function logout(user: AuthUser): void {
  revokeToken(user.jti, user.exp * 1000);
}
