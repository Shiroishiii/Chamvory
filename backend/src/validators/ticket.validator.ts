import { z } from 'zod';
import { PRIORIDADES } from '../types';
import { dataHoraSchema } from './common';

const campoTexto = (nome: string, maximo: number) =>
  z
    .string({ required_error: `${nome} é obrigatório`, invalid_type_error: `${nome} inválido` })
    .trim()
    .min(1, `${nome} é obrigatório`)
    .max(maximo, `${nome} deve ter no máximo ${maximo} caracteres`);

const camposChamado = {
  assunto: campoTexto('Assunto', 150),
  descricao: campoTexto('Descrição', 5000),
  categoria_id: z.coerce
    .number({ invalid_type_error: 'Categoria inválida' })
    .int('Categoria inválida')
    .positive('Categoria é obrigatória'),
  prioridade: z.enum(PRIORIDADES, {
    errorMap: () => ({ message: 'Prioridade deve ser BAIXA, MEDIA ou ALTA' }),
  }),
};

export const createTicketSchema = z.object(camposChamado);

export const updateTicketSchema = z
  .object(camposChamado)
  .partial()
  .refine((dados) => Object.values(dados).some((valor) => valor !== undefined), {
    message: 'Informe ao menos um campo para atualizar',
  });

export const historicoSchema = z.object({
  observacao: campoTexto('Observação', 2000),
  data_atendimento: dataHoraSchema.optional(),
});

export const finalizacaoSchema = z.object({
  solucao: campoTexto('Descrição da solução', 5000),
  observacao: z.string().trim().max(2000, 'Observação deve ter no máximo 2000 caracteres').optional(),
  data_atendimento: dataHoraSchema.optional(),
});

export const listagemSchema = z.object({
  busca: z.string().trim().max(150, 'Busca deve ter no máximo 150 caracteres').optional(),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
export type UpdateTicketInput = z.infer<typeof updateTicketSchema>;
export type HistoricoInput = z.infer<typeof historicoSchema>;
export type FinalizacaoInput = z.infer<typeof finalizacaoSchema>;
