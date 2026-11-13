# Requisitos não funcionais — Chamvory

## RNF001 — Segurança de credenciais
**Requisito:** Senhas devem ser armazenadas com hash bcrypt.

**Situação:** Implementado no backend.

## RNF002 — Autenticação stateless
**Requisito:** A API deve autenticar requisições por JWT.

**Situação:** Implementado; segredo configurado por variável de ambiente.

## RNF003 — Autorização
**Requisito:** A API deve aplicar controle de acesso por perfil e propriedade.

**Situação:** Implementado em middlewares e serviços.

## RNF004 — Integridade
**Requisito:** Relacionamentos devem ser protegidos por PK/FK e transações nas operações críticas.

**Situação:** Implementado no schema e serviços transacionais.

## RNF005 — Usabilidade
**Requisito:** A interface deve apresentar formulários claros, feedback e navegação consistente.

**Situação:** Parcial; validar em execução e completar telas pendentes.

## RNF006 — Responsividade
**Requisito:** As interfaces devem adaptar-se a desktop e dispositivos menores.

**Situação:** Há classes responsivas no frontend; não foi realizado teste visual automatizado.

## RNF007 — Manutenibilidade
**Requisito:** Separar responsabilidades em rotas, controllers, services e repositories.

**Situação:** Implementado no backend.

## RNF008 — Compatibilidade
**Requisito:** Executar com Node.js 18+ e MySQL 8+, conforme README.

**Situação:** Declarado no projeto; ambiente não foi provisionado nesta análise.

## RNF009 — Disponibilidade de sessão
**Requisito:** Logout deve invalidar o token atual.

**Situação:** Implementado com lista de revogação em memória; reinício do processo limpa a lista.

## RNF010 — Desempenho da fila
**Requisito:** Ordenar registros com algoritmo de complexidade O(n log n).

**Situação:** Merge Sort implementado; benchmark não realizado.
