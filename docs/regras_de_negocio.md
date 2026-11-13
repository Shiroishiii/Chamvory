# Regras de negócio — Chamvory

## RN001 — Escopo do solicitante
O solicitante só consulta e administra chamados próprios.

## RN002 — Edição
Somente chamados próprios com status ABERTO podem ser editados.

## RN003 — Exclusão
Somente chamados próprios ABERTO e sem histórico podem ser excluídos.

## RN004 — Atribuição única
Um chamado só pode ser assumido se estiver ABERTO e sem técnico responsável.

## RN005 — Mudança ao assumir
Ao assumir, o técnico autenticado é vinculado e o status passa a EM_ATENDIMENTO.

## RN006 — Responsabilidade
Somente o técnico atribuído pode registrar atualizações ou finalizar.

## RN007 — Solução obrigatória
A finalização exige descrição da solução.

## RN008 — Imutabilidade
Chamados FINALIZADO não aceitam novas alterações.

## RN009 — Histórico append-only
Cada atribuição, observação ou finalização gera novo registro sem apagar os anteriores.

## RN010 — Data de atendimento
A data deve ser igual ou posterior à abertura e não pode ultrapassar o momento atual.

## RN011 — Autenticação
As rotas privadas exigem token válido.

## RN012 — Autorização no servidor
O backend valida perfil, propriedade e técnico responsável independentemente da interface.

## RN013 — Proteção de senha
Senhas são armazenadas com bcrypt, nunca em texto puro.

## RN014 — Ordenação
A listagem da fila é crescente por data de abertura, com id como desempate, usando Merge Sort.

## RN015 — Número único
O número do chamado é gerado no servidor no formato CH-000001, derivado do identificador.
