# Documentação técnica — Chamvory

## 1. Visão geral
O Chamvory é um sistema web de Helpdesk para registrar solicitações de suporte e acompanhar o atendimento por perfis de Solicitante e Técnico.

## 2. Arquitetura observada
A solução está dividida em frontend SPA e API REST. O frontend está em `Frontend/chamvory-frontend`; o backend em `backend`. A persistência usa MySQL.

### Frontend
- React 19, TypeScript, Vite 8, Tailwind CSS 4, React Router DOM 7, Axios e Lucide React.
- Contexto de autenticação (`src/contexts`), rotas protegidas (`src/routes`), layouts, páginas por perfil e cliente Axios.
- Token JWT e dados do usuário são mantidos em localStorage. O interceptor adiciona Bearer token e trata HTTP 401.

### Backend
- Node.js, TypeScript, Express 5, mysql2, bcrypt, jsonwebtoken, dotenv e Zod.
- Camadas observadas: routes, controllers, services, repositories, middlewares, validators, config, types e utils.
- Operações críticas de atendimento usam transações e bloqueio de linha (`SELECT ... FOR UPDATE`).

## 3. Módulos e endpoints observados
| Método | Rota | Acesso | Finalidade |
|---|---|---|---|
| POST | `/api/auth/register` | Público | Cadastro de solicitante e início de sessão |
| POST | `/api/auth/login` | Público | Autenticação |
| GET | `/api/auth/me` | Autenticado | Recuperar usuário atual |
| POST | `/api/auth/logout` | Autenticado | Revogar token atual |
| GET | `/api/categories` | Autenticado | Listar categorias |
| GET | `/api/dashboard` | Autenticado | Indicadores por status |
| GET | `/api/tickets?busca=` | Autenticado | Listar/pesquisar chamados |
| POST | `/api/tickets` | Solicitante | Criar chamado |
| GET | `/api/tickets/:id` | Autenticado | Consultar detalhes |
| PUT | `/api/tickets/:id` | Solicitante | Editar chamado próprio aberto |
| DELETE | `/api/tickets/:id` | Solicitante | Excluir chamado próprio aberto sem histórico |
| PATCH | `/api/tickets/:id/assign` | Técnico | Assumir chamado |
| POST | `/api/tickets/:id/history` | Técnico responsável | Registrar observação |
| PATCH | `/api/tickets/:id/finish` | Técnico responsável | Finalizar com solução |
| GET | `/api/tickets/:id/history` | Autenticado | Consultar histórico |

## 4. Modelo de dados
O banco contém quatro tabelas: `usuarios`, `categorias`, `chamados` e `historico_atendimentos`. Os campos, chaves e cardinalidades estão representados em `DER.png`.

## 5. Segurança e autorização
- Senhas armazenadas como hash bcrypt.
- JWT nas rotas privadas.
- Middleware de autenticação e de perfil.
- O serviço limita solicitantes aos próprios chamados.
- O backend verifica o técnico responsável antes de atualizar.
- O logout usa uma lista de revogação em memória; ela não persiste após reiniciar o processo, portanto é uma limitação para produção.

## 6. Ordenação
`backend/src/utils/merge-sort.ts` implementa Merge Sort genérico e estável. `ticket.service.ts` ordena por `data_abertura` crescente e usa `id` como desempate. Existe teste automatizado em `backend/tests/merge-sort.test.ts`.

## 7. Instalação e execução
### Banco
Na raiz do repositório: `mysql -u root -p < backend/database/helpdesk_db.sql`. **Atenção:** o script contém `DROP DATABASE IF EXISTS helpdesk_db`; faça backup antes de executar.

### Backend
```bash
cd backend
npm install
# copiar .env.example para .env e preencher credenciais MySQL e JWT_SECRET
npm run dev
```
API padrão: `http://localhost:3333/api`.

### Frontend
```bash
cd Frontend/chamvory-frontend
npm install
# opcional: criar .env com VITE_API_URL=http://localhost:3333/api
npm run dev
```
Frontend padrão: `http://localhost:5173`. O `FRONTEND_URL` do backend deve corresponder à origem do frontend.

### Testes e builds
Backend: `npm test`, `npm run build`. Frontend: `npm run lint`, `npm run build`. Esses comandos não foram executados durante a geração deste pacote.

## 8. Contas de demonstração
| Perfil | E-mail | Senha |
|---|---|---|
| Solicitante | ana.solicitante@chamvory.local | Solicitante@123 |
| Solicitante | bruno.solicitante@chamvory.local | Solicitante@123 |
| Técnico | carla.tecnico@chamvory.local | Tecnico@123 |
| Técnico | diego.tecnico@chamvory.local | Tecnico@123 |

Dados fictícios para avaliação local.

## 9. Limitações e pendências encontradas
1. O backend possui `PUT /tickets/:id`, mas o frontend entregue não contém página/ação de edição de chamado.
2. Não foi encontrada página/rota dedicada de “Meus atendimentos” para o técnico; a dashboard mostra chamados em atendimento e há tela de atendimento individual.
3. A API aceita `data_atendimento` opcional e valida intervalo, porém os formulários de atendimento observados não expõem campo para o técnico alterar data/hora.
4. A revogação de JWT está em memória e é perdida ao reiniciar o backend.
5. A tela de perfil informa que edição de dados ainda não está disponível na API.
6. O teste automatizado existente cobre Merge Sort; os demais cenários estão descritos para execução manual, mas não há evidência de execução nesta sessão.
7. Não foi realizado teste de integração com MySQL nem build/lint nesta geração.

## 10. Fluxos
### Solicitante
Login → Dashboard → Novo chamado → validação → gravação → lista → detalhes/histórico. A edição está disponível no backend, mas falta interface no frontend entregue.

### Técnico
Login → Dashboard → fila cronológica → abrir detalhes → assumir → observações → solução → finalizar.
