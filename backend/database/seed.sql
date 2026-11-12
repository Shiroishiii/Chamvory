-- =====================================================================
-- Chamvory | Helpdesk: dados de demonstração (fictícios)
-- Senhas de teste (documentadas no README):
--   solicitantes: Solicitante@123 | técnicos: Tecnico@123
-- =====================================================================
USE helpdesk_db;

INSERT INTO categorias (id, nome, descricao) VALUES
  (1, 'Hardware', 'Problemas com equipamentos físicos: computadores, impressoras e periféricos.'),
  (2, 'Software', 'Problemas com programas, sistemas operacionais e licenças.'),
  (3, 'Rede', 'Problemas de conectividade, acesso à internet e à rede interna.');

INSERT INTO usuarios (id, nome, email, senha_hash, perfil) VALUES
  (1, 'Ana Souza',    'ana.solicitante@chamvory.local',   '$2b$12$B5yauQV9CA0.mkqQYuhGe.ixkBNbA0L3AbNXIBzxiBHL5C5tS98zC', 'SOLICITANTE'),
  (2, 'Bruno Lima',   'bruno.solicitante@chamvory.local', '$2b$12$ZeBA8MewXcObmWb8dz/U6e6Mj7f5dU.5pXRho9l8Ar6dg6r.epiNq', 'SOLICITANTE'),
  (3, 'Carla Mendes', 'carla.tecnico@chamvory.local',     '$2b$12$TNqo.fOKlpN7LL4FjfnvNehZtXwvYuqKfWZS88EuRMN8/ZwB/oEhm', 'TECNICO'),
  (4, 'Diego Rocha',  'diego.tecnico@chamvory.local',     '$2b$12$PNpcP4RtQifoTMZatV3elOoyC97KbyaGsGiH5c2obQZo5M7pcXHIK', 'TECNICO');

INSERT INTO chamados (id, numero, assunto, descricao, prioridade, status, solicitante_id, categoria_id, tecnico_id, data_abertura) VALUES
  (1, 'CH-000001', 'Computador não liga', 'O computador do setor financeiro não liga desde a manhã. Nenhuma luz acende ao pressionar o botão.', 'ALTA', 'ABERTO', 1, 1, NULL, '2026-11-03 09:15:00.000'),
  (2, 'CH-000002', 'Sem acesso à internet na sala 3', 'Os computadores da sala 3 estão sem acesso à internet desde ontem.', 'MEDIA', 'EM_ATENDIMENTO', 2, 3, 3, '2026-11-04 10:30:00.000'),
  (3, 'CH-000003', 'Office não ativa', 'O Microsoft Office exibe a mensagem de licença não validada ao abrir.', 'BAIXA', 'FINALIZADO', 1, 2, 4, '2026-11-05 08:00:00.000'),
  (4, 'CH-000004', 'Impressora do RH sem resposta', 'A impressora do RH não responde aos comandos de impressão.', 'MEDIA', 'ABERTO', 2, 1, NULL, '2026-11-09 14:20:00.000');

INSERT INTO historico_atendimentos (id, chamado_id, tecnico_id, data_atendimento, observacao, solucao, status_resultante) VALUES
  (1, 2, 3, '2026-11-04 10:45:00.000', 'Chamado assumido para análise da falha de conectividade.', NULL, 'EM_ATENDIMENTO'),
  (2, 2, 3, '2026-11-04 11:30:00.000', 'Cabo do ponto de rede da sala 3 identificado como defeituoso. Troca agendada.', NULL, 'EM_ATENDIMENTO'),
  (3, 3, 4, '2026-11-05 08:05:00.000', 'Chamado assumido pelo técnico.', NULL, 'EM_ATENDIMENTO'),
  (4, 3, 4, '2026-11-05 08:20:00.000', 'Licença verificada no portal e ativação reexecutada.', 'Ativação do Office refeita com a licença corporativa do setor.', 'FINALIZADO');
