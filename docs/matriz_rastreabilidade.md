# Matriz de rastreabilidade — Chamvory

| Requisito | Evidência no projeto | Caso de teste | Situação |
|---|---|---|---|
| RF001 — Autenticar usuário | Implementado no backend e integrado no frontend. | CT001 | Implementado no código; não validado em execução |
| RF002 — Validar credenciais | Implementado; resposta de erro permanece na tela de login. | CT002 | Implementado no código; não validado em execução |
| RF003 — Manter sessão | Implementado com JWT; revogação em memória no backend. | CT003 | Implementado no código; não validado em execução |
| RF004 — Controlar acesso | Frontend PrivateRoute e middlewares backend. | CT004 | Implementado no código; não validado em execução |
| RF005 — Exibir usuário | Implementado na estrutura de perfil/header. | CT005 | Implementado no código; não validado em execução |
| RF006 — Exibir indicadores | Implementado em dashboard.service. | CT006 | Implementado no código; não validado em execução |
| RF007 — Listar chamados | Backend filtra solicitante; técnico recebe todos. | CT007 | Implementado no código; não validado em execução |
| RF008 — Pesquisar chamados | API aceita query busca; frontend filtra a lista carregada. | CT008 | Implementado no código; não validado em execução |
| RF009 — Consultar detalhes | Implementado no backend e nas telas de detalhes/atendimento. | CT009 | Implementado no código; não validado em execução |
| RF010 — Abrir chamado | Implementado e integrado. | CT010 | Implementado no código; não validado em execução |
| RF011 — Gerar identificação | Implementado no backend. | CT011 | Implementado no código; não validado em execução |
| RF012 — Editar chamado | API implementada; interface de edição não identificada no frontend entregue. | CT012 | Parcial/pendente |
| RF013 — Excluir chamado | Backend implementado; tela mostra ação de exclusão, mas confirmar UX deve ser validado. | CT013 | Implementado no código; não validado em execução |
| RF014 — Listar fila | Backend usa Merge Sort estável; fila frontend consome a API. | CT014 | Implementado no código; não validado em execução |
| RF015 — Assumir chamado | Implementado com transação e atualização condicional. | CT015 | Implementado no código; não validado em execução |
| RF016 — Registrar observação | Implementado; data/hora pode ser enviada pela API. | CT016 | Implementado no código; não validado em execução |
| RF017 — Informar data/hora | Backend valida data opcional; campo de edição não foi identificado na interface entregue. | CT017 | Parcial/pendente |
| RF018 — Finalizar chamado | Implementado no backend e formulário frontend. | CT018 | Implementado no código; não validado em execução |
| RF019 — Preservar histórico | Implementado com inserções transacionais. | CT019 | Implementado no código; não validado em execução |
| RF020 — Bloquear alterações inválidas | Implementado no backend. | CT020 | Implementado no código; não validado em execução |
| RF021 — Listar categorias | Implementado via GET /categories. | CT021 | Implementado no código; não validado em execução |
| RF022 — Exibir fila e atendimentos | Fila existe; tela/rota específica “Meus atendimentos” não identificada. | CT022 | Parcial/pendente |