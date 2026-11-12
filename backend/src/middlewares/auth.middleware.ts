import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { PERFIS, type Perfil } from '../types';
import { AppError } from '../utils/app-error';
import { isTokenRevoked } from '../utils/revoked-tokens';

function lerToken(token: string): jwt.JwtPayload | null {
  try {
    return jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;
  } catch {
    return null;
  }
}

/** Exige um token Bearer válido, não revogado. Preenche req.user. */
export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  const [esquema, token] = (req.headers.authorization ?? '').split(' ');

  if (esquema !== 'Bearer' || !token) {
    return next(new AppError(401, 'TOKEN_MISSING', 'Autenticação necessária.'));
  }

  const payload = lerToken(token);
  const perfil = payload?.perfil as Perfil | undefined;

  if (
    !payload?.jti ||
    !payload.sub ||
    payload.exp === undefined ||
    !perfil ||
    !PERFIS.includes(perfil) ||
    isTokenRevoked(payload.jti)
  ) {
    return next(new AppError(401, 'TOKEN_INVALID', 'Sessão inválida ou expirada.'));
  }

  req.user = {
    id: Number(payload.sub),
    perfil,
    jti: payload.jti,
    exp: payload.exp,
  };
  next();
}
