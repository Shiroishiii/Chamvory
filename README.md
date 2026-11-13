# Chamvory

Sistema de helpdesk para abertura e atendimento de chamados. O projeto tem uma API REST em Node.js, TypeScript, Express e MySQL, e uma interface React com Vite e TypeScript.

## Requisitos

- Node.js 18 ou superior (recomendado Node.js 20+)
- npm
- MySQL 8+

## Configuração

### Banco de dados

Na pasta `backend`, importe a estrutura e os dados de demonstração:

```bash
mysql -u root -p < database/helpdesk_db.sql
```

> `helpdesk_db.sql` recria o banco `helpdesk_db` (executa `DROP DATABASE IF EXISTS`). Faça backup de qualquer banco existente antes de importar.

### Backend

```bash
cd backend
npm install
cp .env.example .env
```

Configure no `backend/.env` as credenciais do MySQL e um `JWT_SECRET` aleatório com pelo menos 32 caracteres. O backend aceita `PORT` (padrão `3333`) e `FRONTEND_URL` (padrão `http://localhost:5173`).

Inicie a API:

```bash
npm run dev
```

A API estará em `http://localhost:3333/api`.

### Frontend

Em outro terminal:

```bash
cd Frontend/chamvory-frontend
npm install
```

Opcionalmente, crie `Frontend/chamvory-frontend/.env` para apontar o frontend a outra URL:

```env
VITE_API_URL=http://localhost:3333/api
```

Inicie a interface:

```bash
npm run dev
```

Abra `http://localhost:5173`. O endereço do frontend deve corresponder ao `FRONTEND_URL` configurado na API para que o CORS permita as requisições.

## Funcionalidades integradas

- Cadastro público de solicitante, login, recuperação da sessão e logout via JWT.
- Consulta de categorias, abertura de chamados, listagem e indicadores por status.
- Fila do técnico, atribuição concorrente de chamados, registro de observações e finalização com solução.
- O backend controla permissões por perfil e valida a propriedade dos chamados.

O cadastro público cria somente usuários com perfil `SOLICITANTE`. Técnicos são provisionados pelo banco/seed. A API não oferece edição de perfil nem alteração de senha.

## Usuários de demonstração

Após importar o seed:

| Perfil | E-mail | Senha |
|---|---|---|
| Solicitante | `ana.solicitante@chamvory.local` | `Solicitante@123` |
| Solicitante | `bruno.solicitante@chamvory.local` | `Solicitante@123` |
| Técnico | `carla.tecnico@chamvory.local` | `Tecnico@123` |
| Técnico | `diego.tecnico@chamvory.local` | `Tecnico@123` |

Também é possível cadastrar solicitante pela tela **Criar conta**.

## Endpoints principais

Com exceção de login e cadastro, os endpoints exigem `Authorization: Bearer <token>`.

| Método | Endpoint | Acesso | Descrição |
|---|---|---|---|
| POST | `/api/auth/register` | Público | Cria solicitante e inicia sessão |
| POST | `/api/auth/login` | Público | Autentica usuário |
| GET | `/api/auth/me` | Autenticado | Retorna usuário atual |
| POST | `/api/auth/logout` | Autenticado | Revoga token atual |
| GET | `/api/categories` | Autenticado | Lista categorias |
| GET | `/api/dashboard` | Autenticado | Contagem por status |
| GET | `/api/tickets?busca=` | Autenticado | Lista chamados visíveis ao perfil |
| POST | `/api/tickets` | Solicitante | Abre chamado |
| GET | `/api/tickets/:id` | Autenticado | Consulta detalhes |
| PATCH | `/api/tickets/:id/assign` | Técnico | Assume chamado aberto |
| POST | `/api/tickets/:id/history` | Técnico responsável | Registra observação |
| GET | `/api/tickets/:id/history` | Autenticado | Consulta histórico |
| PATCH | `/api/tickets/:id/finish` | Técnico responsável | Finaliza chamado |

Veja `backend/README.md` para detalhes de validação, erros e comportamento da API.

## Scripts

Na pasta `backend`:

```bash
npm run dev
npm run build
npm start
npm test
```

Na pasta `Frontend/chamvory-frontend`:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Estrutura

```text
backend/                          API, banco, migrations de demonstração e testes
Frontend/chamvory-frontend/       Aplicação React + Vite
```


## Documentação da atividade SENAI

Os materiais acadêmicos e técnicos estão em `docs/`: requisitos funcionais e não funcionais, regras de negócio, casos de teste, documentação técnica, matriz de rastreabilidade, fluxos e DER. O PDF consolidado está em `documentacao_helpdesk.pdf`; o DER também está disponível na raiz como `DER.png`; o script solicitado está na raiz como `helpdesk_db.sql`.

**Estado da entrega:** o pacote contém o código-fonte e os artefatos de documentação. A documentação registra pendências identificadas na versão analisada: falta de interface de edição de chamado, falta de página específica “Meus atendimentos”, falta de controle visual para editar data/hora do atendimento e validação de execução/build/testes nesta geração. Consulte `docs/documentacao_tecnica.md` e `docs/casos_de_teste.md`.


## Documentação da atividade SENAI

Os materiais acadêmicos e técnicos estão em `docs/`: requisitos funcionais e não funcionais, regras de negócio, casos de teste, documentação técnica, matriz de rastreabilidade, fluxos e DER. O PDF consolidado está em `documentacao_helpdesk.pdf`; o DER também está disponível na raiz como `DER.png`; o script solicitado está na raiz como `helpdesk_db.sql`.

**Estado da entrega:** o pacote contém o código-fonte e os artefatos de documentação. A documentação registra pendências identificadas na versão analisada: falta de interface de edição de chamado, falta de página específica “Meus atendimentos”, falta de controle visual para editar data/hora do atendimento e validação de execução/build/testes nesta geração. Consulte `docs/documentacao_tecnica.md` e `docs/casos_de_teste.md`.
