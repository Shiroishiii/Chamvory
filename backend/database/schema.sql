-- =====================================================================
-- Chamvory | Helpdesk: criação do banco helpdesk_db
-- ATENÇÃO: o DROP abaixo apaga o banco existente (útil para recriar do zero).
-- =====================================================================
DROP DATABASE IF EXISTS helpdesk_db;
CREATE DATABASE helpdesk_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE helpdesk_db;

CREATE TABLE usuarios (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nome        VARCHAR(120) NOT NULL,
  email       VARCHAR(160) NOT NULL UNIQUE,
  senha_hash  VARCHAR(255) NOT NULL,
  perfil      ENUM('SOLICITANTE', 'TECNICO') NOT NULL,
  criado_em   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE categorias (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  nome       VARCHAR(80) NOT NULL UNIQUE,
  descricao  VARCHAR(255) NULL
) ENGINE=InnoDB;

-- DATETIME(3) preserva milissegundos para comparar datas de forma precisa.
CREATE TABLE chamados (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  numero          VARCHAR(30) NOT NULL UNIQUE,
  assunto         VARCHAR(150) NOT NULL,
  descricao       TEXT NOT NULL,
  prioridade      ENUM('BAIXA', 'MEDIA', 'ALTA') NOT NULL,
  status          ENUM('ABERTO', 'EM_ATENDIMENTO', 'FINALIZADO') NOT NULL DEFAULT 'ABERTO',
  solicitante_id  INT NOT NULL,
  categoria_id    INT NOT NULL,
  tecnico_id      INT NULL,
  data_abertura   DATETIME(3) NOT NULL,
  CONSTRAINT fk_chamados_solicitante FOREIGN KEY (solicitante_id) REFERENCES usuarios (id),
  CONSTRAINT fk_chamados_categoria   FOREIGN KEY (categoria_id)   REFERENCES categorias (id),
  CONSTRAINT fk_chamados_tecnico     FOREIGN KEY (tecnico_id)     REFERENCES usuarios (id),
  INDEX idx_chamados_solicitante (solicitante_id),
  INDEX idx_chamados_tecnico (tecnico_id),
  INDEX idx_chamados_status (status)
) ENGINE=InnoDB;

CREATE TABLE historico_atendimentos (
  id                 INT AUTO_INCREMENT PRIMARY KEY,
  chamado_id         INT NOT NULL,
  tecnico_id         INT NOT NULL,
  data_atendimento   DATETIME(3) NOT NULL,
  observacao         TEXT NOT NULL,
  solucao            TEXT NULL,
  status_resultante  ENUM('ABERTO', 'EM_ATENDIMENTO', 'FINALIZADO') NOT NULL,
  CONSTRAINT fk_historico_chamado FOREIGN KEY (chamado_id) REFERENCES chamados (id),
  CONSTRAINT fk_historico_tecnico FOREIGN KEY (tecnico_id) REFERENCES usuarios (id),
  INDEX idx_historico_chamado (chamado_id)
) ENGINE=InnoDB;
