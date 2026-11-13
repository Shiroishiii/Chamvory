# Requisitos funcionais — Chamvory

## RF001 — Autenticar usuário
**Perfil:** Todos

Permitir autenticação por e-mail e senha.

**Situação na versão analisada:** Implementado no backend e integrado no frontend.

## RF002 — Validar credenciais
**Perfil:** Todos

Validar campos e rejeitar credenciais inválidas sem liberar a sessão.

**Situação na versão analisada:** Implementado; resposta de erro permanece na tela de login.

## RF003 — Manter sessão
**Perfil:** Todos

Consultar usuário autenticado ao iniciar e permitir logout com revogação do token.

**Situação na versão analisada:** Implementado com JWT; revogação em memória no backend.

## RF004 — Controlar acesso
**Perfil:** Todos

Proteger rotas internas e restringir recursos de técnico por perfil.

**Situação na versão analisada:** Frontend PrivateRoute e middlewares backend.

## RF005 — Exibir usuário
**Perfil:** Todos

Exibir nome, e-mail e perfil do usuário autenticado.

**Situação na versão analisada:** Implementado na estrutura de perfil/header.

## RF006 — Exibir indicadores
**Perfil:** Todos

Contabilizar chamados por status; solicitante vê seus registros e técnico vê todos.

**Situação na versão analisada:** Implementado em dashboard.service.

## RF007 — Listar chamados
**Perfil:** Todos

Listar chamados do banco, com escopo conforme o perfil.

**Situação na versão analisada:** Backend filtra solicitante; técnico recebe todos.

## RF008 — Pesquisar chamados
**Perfil:** Todos

Pesquisar por número ou assunto.

**Situação na versão analisada:** API aceita query busca; frontend filtra a lista carregada.

## RF009 — Consultar detalhes
**Perfil:** Todos

Exibir dados e histórico de um chamado respeitando permissões.

**Situação na versão analisada:** Implementado no backend e nas telas de detalhes/atendimento.

## RF010 — Abrir chamado
**Perfil:** Solicitante

Criar chamado com assunto, descrição, categoria e prioridade.

**Situação na versão analisada:** Implementado e integrado.

## RF011 — Gerar identificação
**Perfil:** Sistema

Gerar número único, data de abertura, solicitante autenticado e status Aberto.

**Situação na versão analisada:** Implementado no backend.

## RF012 — Editar chamado
**Perfil:** Solicitante

Permitir edição do chamado próprio enquanto Aberto.

**Situação na versão analisada:** API implementada; interface de edição não identificada no frontend entregue.

## RF013 — Excluir chamado
**Perfil:** Solicitante

Excluir chamado próprio Aberto e sem histórico, após confirmação.

**Situação na versão analisada:** Backend implementado; tela mostra ação de exclusão, mas confirmar UX deve ser validado.

## RF014 — Listar fila
**Perfil:** Técnico

Listar chamados em ordem cronológica crescente de abertura.

**Situação na versão analisada:** Backend usa Merge Sort estável; fila frontend consome a API.

## RF015 — Assumir chamado
**Perfil:** Técnico

Assumir chamado Aberto sem técnico e alterar para Em atendimento.

**Situação na versão analisada:** Implementado com transação e atualização condicional.

## RF016 — Registrar observação
**Perfil:** Técnico responsável

Registrar observação por técnico responsável.

**Situação na versão analisada:** Implementado; data/hora pode ser enviada pela API.

## RF017 — Informar data/hora
**Perfil:** Técnico responsável

Usar data/hora atual por padrão e permitir ajuste dentro do intervalo válido.

**Situação na versão analisada:** Backend valida data opcional; campo de edição não foi identificado na interface entregue.

## RF018 — Finalizar chamado
**Perfil:** Técnico responsável

Finalizar atendimento exigindo descrição da solução.

**Situação na versão analisada:** Implementado no backend e formulário frontend.

## RF019 — Preservar histórico
**Perfil:** Sistema

Criar novo histórico em atribuição, observação e finalização.

**Situação na versão analisada:** Implementado com inserções transacionais.

## RF020 — Bloquear alterações inválidas
**Perfil:** Sistema

Impedir alterações após finalização, por técnico não responsável ou atribuição duplicada.

**Situação na versão analisada:** Implementado no backend.

## RF021 — Listar categorias
**Perfil:** Autenticado

Disponibilizar categorias cadastradas para abertura de chamado.

**Situação na versão analisada:** Implementado via GET /categories.

## RF022 — Exibir fila e atendimentos
**Perfil:** Técnico

Disponibilizar fila e listagem dos atendimentos atribuídos ao técnico.

**Situação na versão analisada:** Fila existe; tela/rota específica “Meus atendimentos” não identificada.
