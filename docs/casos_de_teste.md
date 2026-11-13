# Casos de teste — Chamvory

## Ambiente e ferramentas
- Sistema operacional: não fixado pelo projeto; ambiente de desenvolvimento Windows/Linux compatível.
- Backend: Node.js 18+ (recomendado 20+), Express 5, TypeScript e MySQL 8+.
- Frontend: navegador moderno, React 19 e Vite.
- Ferramentas sugeridas para testes manuais de API: Postman ou Insomnia; banco: MySQL client.
- Teste automatizado existente: Node test runner + tsx para Merge Sort.

## Critério de status
Todos os casos abaixo estão planejados e não foram executados nesta geração, exceto que CT025 possui teste automatizado no repositório, cuja execução não foi realizada nesta sessão. Não considerar resultados esperados como resultados obtidos.

## CT001 — Login com credenciais válidas
**Requisito relacionado:** RF001/RF002  
**Pré-condições:** Usuário de demonstração existente.  
**Passos:** Enviar e-mail e senha corretos no formulário de login.  
**Resultado esperado:** Sessão criada e redirecionamento conforme perfil.  
**Resultado obtido:** Não executado  
**Observação:** Requer API e MySQL ativos.

## CT002 — Login com credenciais inválidas
**Requisito relacionado:** RF001/RF002  
**Pré-condições:** Tela de login acessível.  
**Passos:** Enviar senha incorreta para e-mail cadastrado.  
**Resultado esperado:** API rejeita; usuário permanece sem sessão e recebe mensagem de erro.  
**Resultado obtido:** Não executado  
**Observação:** Requer API e MySQL ativos.

## CT003 — Acesso sem autenticação
**Requisito relacionado:** RF004  
**Pré-condições:** Token ausente e sessão limpa.  
**Passos:** Abrir diretamente /dashboard e /tecnico/fila.  
**Resultado esperado:** Redirecionamento para /login.  
**Resultado obtido:** Não executado  
**Observação:** Requer teste no navegador.

## CT004 — Logout e bloqueio posterior
**Requisito relacionado:** RF003/RF004  
**Pré-condições:** Usuário autenticado.  
**Passos:** Executar Sair e tentar abrir rota privada.  
**Resultado esperado:** Token revogado/removido e acesso bloqueado.  
**Resultado obtido:** Não executado  
**Observação:** Requer API e navegador.

## CT005 — Abrir chamado válido
**Requisito relacionado:** RF010/RF011  
**Pré-condições:** Solicitante autenticado e categoria cadastrada.  
**Passos:** Preencher assunto, descrição, categoria e prioridade; enviar.  
**Resultado esperado:** Registro criado com CH-..., solicitante atual, data atual e ABERTO.  
**Resultado obtido:** Não executado  
**Observação:** Requer API e MySQL.

## CT006 — Abertura com campos ausentes
**Requisito relacionado:** RF010  
**Pré-condições:** Solicitante autenticado.  
**Passos:** Enviar formulário sem assunto ou descrição/categoria/prioridade.  
**Resultado esperado:** Validação impede envio e informa campos inválidos.  
**Resultado obtido:** Não executado  
**Observação:** Requer navegador.

## CT007 — Buscar por número
**Requisito relacionado:** RF008  
**Pré-condições:** Existirem chamados cadastrados.  
**Passos:** Consultar por CH-000001.  
**Resultado esperado:** Retornar somente registros correspondentes.  
**Resultado obtido:** Não executado  
**Observação:** Requer API e dados seed.

## CT008 — Buscar por assunto
**Requisito relacionado:** RF008  
**Pré-condições:** Existirem chamados cadastrados.  
**Passos:** Consultar parte do assunto de um chamado.  
**Resultado esperado:** Retornar registros correspondentes ao texto.  
**Resultado obtido:** Não executado  
**Observação:** Requer API e dados seed.

## CT009 — Editar chamado próprio aberto
**Requisito relacionado:** RF012  
**Pré-condições:** Solicitante dono; chamado ABERTO.  
**Passos:** Enviar PUT /tickets/:id com um campo válido.  
**Resultado esperado:** Dados atualizados.  
**Resultado obtido:** Não executado  
**Observação:** Endpoint existe; UI de edição ausente.

## CT010 — Editar chamado em atendimento
**Requisito relacionado:** RF012/RN002  
**Pré-condições:** Solicitante dono; status EM_ATENDIMENTO.  
**Passos:** Enviar PUT /tickets/:id.  
**Resultado esperado:** API rejeita com conflito (409).  
**Resultado obtido:** Não executado  
**Observação:** Requer API e dados preparados.

## CT011 — Excluir chamado sem histórico
**Requisito relacionado:** RF013  
**Pré-condições:** Solicitante dono; ABERTO; sem histórico.  
**Passos:** Confirmar exclusão pela interface/API.  
**Resultado esperado:** Registro excluído.  
**Resultado obtido:** Não executado  
**Observação:** Requer API e dados preparados.

## CT012 — Excluir chamado com histórico
**Requisito relacionado:** RF013/RN003  
**Pré-condições:** Solicitante dono; ABERTO; possui histórico.  
**Passos:** Enviar DELETE /tickets/:id.  
**Resultado esperado:** API rejeita exclusão (409).  
**Resultado obtido:** Não executado  
**Observação:** Requer API e dados preparados.

## CT013 — Solicitante consultar chamado alheio
**Requisito relacionado:** RF007/RN001  
**Pré-condições:** Dois solicitantes cadastrados.  
**Passos:** Autenticar como A e consultar id de B.  
**Resultado esperado:** Chamado não é revelado; serviço responde 404 na consulta.  
**Resultado obtido:** Não executado  
**Observação:** Requer API e usuários seed.

## CT014 — Solicitante acessar gestão técnica
**Requisito relacionado:** RF004/RN012  
**Pré-condições:** Autenticar como solicitante.  
**Passos:** Acessar /tecnico/fila e endpoint protegido.  
**Resultado esperado:** Frontend redireciona e backend rejeita perfil.  
**Resultado obtido:** Não executado  
**Observação:** Requer navegador e API.

## CT015 — Técnico assumir chamado disponível
**Requisito relacionado:** RF015  
**Pré-condições:** Técnico autenticado; chamado ABERTO sem técnico.  
**Passos:** Enviar PATCH /tickets/:id/assign.  
**Resultado esperado:** Técnico vinculado, status EM_ATENDIMENTO e histórico criado.  
**Resultado obtido:** Não executado  
**Observação:** Requer API e MySQL.

## CT016 — Assumir chamado já atribuído
**Requisito relacionado:** RF015/RN004  
**Pré-condições:** Chamado com técnico_id preenchido.  
**Passos:** Outro técnico tenta assumir.  
**Resultado esperado:** API rejeita com conflito; responsável original permanece.  
**Resultado obtido:** Não executado  
**Observação:** Requer API e dois técnicos.

## CT017 — Registrar observação
**Requisito relacionado:** RF016/RN006  
**Pré-condições:** Técnico responsável; chamado em atendimento.  
**Passos:** Enviar observação pelo formulário.  
**Resultado esperado:** Novo histórico criado e histórico anterior preservado.  
**Resultado obtido:** Não executado  
**Observação:** Requer API e MySQL.

## CT018 — Consultar histórico
**Requisito relacionado:** RF009/RF019  
**Pré-condições:** Chamado com registros de histórico.  
**Passos:** Abrir detalhes/histórico.  
**Resultado esperado:** Registros exibidos em ordem cronológica e conforme permissão.  
**Resultado obtido:** Não executado  
**Observação:** Requer API e navegador.

## CT019 — Data anterior à abertura
**Requisito relacionado:** RF017/RN010  
**Pré-condições:** Chamado atribuído; data de abertura conhecida.  
**Passos:** Enviar data_atendimento anterior à abertura.  
**Resultado esperado:** API rejeita com erro de data inválida.  
**Resultado obtido:** Não executado  
**Observação:** Requer API.

## CT020 — Data futura
**Requisito relacionado:** RF017/RN010  
**Pré-condições:** Chamado atribuído.  
**Passos:** Enviar data_atendimento posterior ao momento atual.  
**Resultado esperado:** API rejeita com erro de data inválida.  
**Resultado obtido:** Não executado  
**Observação:** Requer API.

## CT021 — Finalizar com solução
**Requisito relacionado:** RF018/RN007  
**Pré-condições:** Técnico responsável; chamado em atendimento.  
**Passos:** Enviar PATCH /finish com solução preenchida.  
**Resultado esperado:** Status FINALIZADO e histórico de solução criado.  
**Resultado obtido:** Não executado  
**Observação:** Requer API e MySQL.

## CT022 — Finalizar sem solução
**Requisito relacionado:** RF018/RN007  
**Pré-condições:** Técnico responsável; chamado em atendimento.  
**Passos:** Enviar PATCH /finish sem solução.  
**Resultado esperado:** Validação rejeita a operação.  
**Resultado obtido:** Não executado  
**Observação:** Requer API.

## CT023 — Alterar chamado finalizado
**Requisito relacionado:** RF020/RN008  
**Pré-condições:** Chamado FINALIZADO.  
**Passos:** Tentar adicionar histórico ou finalizar novamente.  
**Resultado esperado:** API rejeita alteração.  
**Resultado obtido:** Não executado  
**Observação:** Requer API e dados preparados.

## CT024 — Atualizar como técnico não responsável
**Requisito relacionado:** RF020/RN006  
**Pré-condições:** Chamado atribuído ao técnico A; autenticar técnico B.  
**Passos:** Enviar observação ou finalizar.  
**Resultado esperado:** API rejeita por técnico não responsável.  
**Resultado obtido:** Não executado  
**Observação:** Requer API e dois técnicos.

## CT025 — Ordenação cronológica da fila
**Requisito relacionado:** RF014/RN014  
**Pré-condições:** Lista com datas fora de ordem e empates.  
**Passos:** Executar mergeSort e comparar resultado crescente.  
**Resultado esperado:** Mais antigo primeiro; id desempata; algoritmo mantém estabilidade.  
**Resultado obtido:** Não executado nesta sessão  
**Observação:** Existe teste automatizado em backend/tests/merge-sort.test.ts; não foi executado aqui.
