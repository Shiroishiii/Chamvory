import { app } from './app';
import { pool } from './config/database';
import { env } from './config/env';

async function iniciar(): Promise<void> {
  try {
    const conexao = await pool.getConnection();
    conexao.release();
  } catch (erro) {
    console.error('Não foi possível conectar ao MySQL. Verifique as variáveis DB_* no arquivo .env.', erro);
    process.exit(1);
  }

  app.listen(env.PORT, () => {
    console.log(`Chamvory API em execução: http://localhost:${env.PORT}/api`);
  });
}

void iniciar();
