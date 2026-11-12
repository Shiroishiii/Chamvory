import type { Request, Response } from 'express';
import * as categoryRepository from '../repositories/category.repository';

export async function list(_req: Request, res: Response): Promise<void> {
  const categorias = await categoryRepository.findAll();
  res.json({ categorias });
}
