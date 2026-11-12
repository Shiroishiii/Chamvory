import type { Request, Response } from 'express';
import * as ticketService from '../services/ticket.service';
import { getAuthUser } from '../utils/request';
import { idSchema } from '../validators/common';
import {
  createTicketSchema,
  finalizacaoSchema,
  historicoSchema,
  listagemSchema,
  updateTicketSchema,
} from '../validators/ticket.validator';

export async function list(req: Request, res: Response): Promise<void> {
  const { busca } = listagemSchema.parse(req.query);
  const chamados = await ticketService.list(getAuthUser(req), busca);
  res.json({ chamados });
}

export async function getOne(req: Request, res: Response): Promise<void> {
  const { id } = idSchema.parse(req.params);
  const chamado = await ticketService.getById(getAuthUser(req), id);
  res.json({ chamado });
}

export async function create(req: Request, res: Response): Promise<void> {
  const dados = createTicketSchema.parse(req.body);
  const chamado = await ticketService.create(getAuthUser(req), dados);
  res.status(201).json({ chamado });
}

export async function update(req: Request, res: Response): Promise<void> {
  const { id } = idSchema.parse(req.params);
  const dados = updateTicketSchema.parse(req.body);
  const chamado = await ticketService.update(getAuthUser(req), id, dados);
  res.json({ chamado });
}

export async function remove(req: Request, res: Response): Promise<void> {
  const { id } = idSchema.parse(req.params);
  await ticketService.remove(getAuthUser(req), id);
  res.json({ mensagem: 'Chamado excluído com sucesso.' });
}

export async function assign(req: Request, res: Response): Promise<void> {
  const { id } = idSchema.parse(req.params);
  const chamado = await ticketService.assign(getAuthUser(req), id);
  res.json({ chamado });
}

export async function addHistory(req: Request, res: Response): Promise<void> {
  const { id } = idSchema.parse(req.params);
  const dados = historicoSchema.parse(req.body);
  const chamado = await ticketService.addHistory(getAuthUser(req), id, dados);
  res.status(201).json({ chamado });
}

export async function finish(req: Request, res: Response): Promise<void> {
  const { id } = idSchema.parse(req.params);
  const dados = finalizacaoSchema.parse(req.body);
  const chamado = await ticketService.finish(getAuthUser(req), id, dados);
  res.json({ chamado });
}
