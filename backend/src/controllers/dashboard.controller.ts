import type { Request, Response } from 'express';
import * as dashboardService from '../services/dashboard.service';
import { getAuthUser } from '../utils/request';

export async function summary(req: Request, res: Response): Promise<void> {
  const resumo = await dashboardService.summary(getAuthUser(req));
  res.json({ resumo });
}
