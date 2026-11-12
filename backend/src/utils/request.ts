import type { Request } from 'express';
import type { AuthUser } from '../types';
import { AppError } from './app-error';

/** Obtém o usuário autenticado; responde 401 caso a rota não tenha passado pelo middleware. */
export function getAuthUser(req: Request): AuthUser {
  if (!req.user) {
    throw new AppError(401, 'TOKEN_MISSING', 'Autenticação necessária.');
  }
  return req.user;
}
