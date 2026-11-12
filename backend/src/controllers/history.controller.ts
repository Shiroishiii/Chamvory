import type { Request, Response } from 'express';
import * as historyService from '../services/history.service';
import { getAuthUser } from '../utils/request';
import { idSchema } from '../validators/common';

export async function listByTicket(req: Request, res: Response): Promise<void> {
  const { id } = idSchema.parse(req.params);
  const historico = await historyService.listByTicket(getAuthUser(req), id);
  res.json({ historico });
}
