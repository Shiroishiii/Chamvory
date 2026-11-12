import type { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { getAuthUser } from '../utils/request';
import { loginSchema } from '../validators/auth.validator';

export async function login(req: Request, res: Response): Promise<void> {
  const { email, senha } = loginSchema.parse(req.body);
  const resultado = await authService.login(email, senha);
  res.json(resultado);
}

export async function me(req: Request, res: Response): Promise<void> {
  const usuario = await authService.me(getAuthUser(req).id);
  res.json({ usuario });
}

export function logout(req: Request, res: Response): void {
  authService.logout(getAuthUser(req));
  res.json({ mensagem: 'Sessão encerrada com sucesso.' });
}
