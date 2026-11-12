import type { NextFunction, Request, Response } from 'express';
import type { Perfil } from '../types';
import { AppError } from '../utils/app-error';

/** Permite a rota somente para os perfis informados. Validado no servidor a cada requisição. */
export function requireRole(...perfisPermitidos: Perfil[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError(401, 'TOKEN_MISSING', 'Autenticação necessária.'));
    }
    if (!perfisPermitidos.includes(req.user.perfil)) {
      return next(new AppError(403, 'FORBIDDEN', 'Você não tem permissão para esta operação.'));
    }
    next();
  };
}
