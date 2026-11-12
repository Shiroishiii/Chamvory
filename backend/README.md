# Chamvory — Backend

API REST do sistema de helpdesk (chamados). Construída com Node.js, TypeScript, Express, MySQL (mysql2), JWT, bcrypt e Zod, seguindo a documentação técnica do projeto.

## Pré-requisitos

- Node.js 18+ (recomendado 20+)
- MySQL 8+

## Instalação

```bash
cd backend
npm install
cp .env.example .env     # ajuste DB_PASSWORD e JWT_SECRET
```

## Banco de dados

O banco se chama `helpdesk_db`. O arquivo `database/helpdesk_db.sql` contém a criação das tabelas (`schema.sql`) e os dados de demonstração (`seed.sql`) em um único script:

```bash
mysql -u root -p < database/helpdesk_db.sql
```

Para regenerar o script único após editar `schema.sql` ou `seed.sql`:

```bash
cat database/schema.sql database/seed.sql > database/helpdesk_db.sql
```

## Executar

```bash
npm run dev        # desenvolvimento, com recarga automática
npm run build      # compila para dist/
npm start          # executa a versão compilada
```

A API fica disponível em `http://localhost:3333/api`.

## Testes

```bash
npm test
```

Os testes unitários cobrem o algoritmo de ordenação (Merge Sort) com listas embaralhadas. Os cenários de autorização e de fluxo do chamado podem ser executados manualmente com os usuários abaixo (ou com um cliente como Insomnia/Postman).

## Usuários de teste

| Perfil | E-mail | Senha |
|---|---|---|
| Solicitante | ana.solicitante@chamvory.local | Solicitante@123 |
| Solicitante | bruno.solicitante@chamvory.local | Solicitante@123 |
| Técnico | carla.tecnico@chamvory.local | Tecnico@123 |
| Técnico | diego.tecnico@chamvory.local | Tecnico@123 |

Os dados são fictícios e as senhas estão armazenadas apenas como hash bcrypt.

## Endpoints

Todas as rotas, exceto o login, exigem o cabeçalho `Authorization: Bearer <token>`.

| Método | Endpoint | Acesso | Finalidade |
|---|---|---|---|
| POST | `/api/auth/login` | Público | Autenticar por e-mail e senha |
| GET | `/api/auth/me` | Autenticado | Dados do usuário logado |
| POST | `/api/auth/logout` | Autenticado | Encerrar a sessão (revoga o token) |
| GET | `/api/categories` | Autenticado | Listar categorias |
| GET | `/api/dashboard` | Autenticado | Contagem de chamados por status (conforme o perfil) |
| GET | `/api/tickets` | Autenticado | Listar chamados (`?busca=` por número ou assunto) |
| POST | `/api/tickets` | Solicitante | Abrir chamado |
| GET | `/api/tickets/:id` | Autenticado | Detalhes do chamado (respeita a propriedade) |
| PUT | `/api/tickets/:id` | Solicitante | Editar chamado próprio enquanto estiver Aberto |
| DELETE | `/api/tickets/:id` | Solicitante | Excluir chamado próprio Aberto e sem histórico |
| PATCH | `/api/tickets/:id/assign` | Técnico | Assumir chamado Aberto e sem responsável |
| POST | `/api/tickets/:id/history` | Técnico responsável | Registrar observação do atendimento |
| PATCH | `/api/tickets/:id/finish` | Técnico responsável | Finalizar chamado (solução obrigatória) |
| GET | `/api/tickets/:id/history` | Autenticado | Histórico do chamado, em ordem cronológica |

### Exemplo de login

```bash
curl -X POST http://localhost:3333/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"carla.tecnico@chamvory.local","senha":"Tecnico@123"}'
```

### Formato de erro

```json
{
  "error": {
    "code": "TICKET_ALREADY_ASSIGNED",
    "message": "Este chamado já possui um técnico responsável."
  }
}
```

Erros de validação (400) trazem a lista de campos inválidos em `details`.

## Decisões de implementação

- **Permissões no servidor:** o perfil é validado em cada rota pelo middleware `requireRole`. Os identificadores de solicitante e técnico vêm do token, nunca do corpo da requisição.
- **Visibilidade:** um solicitante que consulta um chamado de outra pessoa recebe 404, sem revelar que ele existe. Tentativas de editar ou excluir chamado alheio retornam 403.
- **Número do chamado:** gerado no servidor no formato `CH-000001`, derivado do id.
- **Concorrência:** operações de atendimento usam `SELECT ... FOR UPDATE` dentro de transação. A atribuição usa um `UPDATE` condicional (`status = 'ABERTO' AND tecnico_id IS NULL`), de modo que apenas um técnico consegue assumir o chamado.
- **Histórico:** cada atribuição, atualização e finalização gera um registro novo. Nenhum registro anterior é apagado.
- **Datas:** geradas pelo Node e gravadas em UTC (`DATETIME(3)`). A data informada em um atendimento precisa estar entre a abertura do chamado e o momento atual.
- **Ordenação da fila:** a listagem é ordenada pelo Merge Sort implementado na aplicação (`src/utils/merge-sort.ts`), do chamado mais antigo para o mais recente, com `id` como desempate.
- **Logout:** a invalidação do token usa uma lista de revogação em memória. Ela vale para uma única instância e é zerada ao reiniciar o servidor. Em produção, use Redis ou uma tabela de sessões.
- **Senhas:** armazenadas somente com hash bcrypt. O campo `senha_hash` nunca aparece nas respostas.
