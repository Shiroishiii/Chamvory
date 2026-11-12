import { z } from 'zod';

export const idSchema = z.object({
  id: z.coerce
    .number({ invalid_type_error: 'Identificador inválido' })
    .int('Identificador inválido')
    .positive('Identificador inválido'),
});

/** Converte uma data/hora ISO (com ou sem fuso) em Date, rejeitando valores inválidos. */
export const dataHoraSchema = z
  .string({ invalid_type_error: 'Data e hora inválidas' })
  .transform((valor, ctx) => {
    const data = new Date(valor);
    if (Number.isNaN(data.getTime())) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Data e hora inválidas' });
      return z.NEVER;
    }
    return data;
  });
