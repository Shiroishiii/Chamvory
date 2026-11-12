import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const esquemaEnv = z.object({
  PORT: z.coerce.number().int().positive().default(3333),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.coerce.number().int().positive().default(3306),
  DB_USER: z.string().min(1, 'DB_USER é obrigatório'),
  DB_PASSWORD: z.string().default(''),
  DB_NAME: z.string().default('helpdesk_db'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET deve ter pelo menos 32 caracteres'),
  JWT_EXPIRES_IN: z.string().default('8h'),
  FRONTEND_URL: z.string().url().default('http://localhost:5173'),
});

const resultado = esquemaEnv.safeParse(process.env);

if (!resultado.success) {
  console.error('Configuração de ambiente inválida:', resultado.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = resultado.data;
