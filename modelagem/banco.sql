-- garante que o banco exista
CREATE DATABASE IF NOT EXISTS advogados_db
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE advogados_db;

-- apaga tabelas antigas se tiver algo errado (CUIDADO: perde dados)
DROP TABLE IF EXISTS processos;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS advogados;

-- TABELA USUÁRIOS
CREATE TABLE usuarios (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

-- TABELA ADVOGADOS
CREATE TABLE advogados (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  oab VARCHAR(20) NOT NULL UNIQUE,
  especialidade VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

-- TABELA PROCESSOS
CREATE TABLE processos (
  id INT NOT NULL AUTO_INCREMENT,
  numero_processo VARCHAR(50) NOT NULL UNIQUE,
  descricao TEXT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'aberto',
  id_advogado INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_processos_advogado
    FOREIGN KEY (id_advogado)
    REFERENCES advogados(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB;
