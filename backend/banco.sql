CREATE DATABASE db_finanza;
USE db_finanza;

CREATE TABLE tb_usuarios (
	id_usuario			INT PRIMARY KEY AUTO_INCREMENT,
    ds_nome				VARCHAR(50) NOT NULL,
    ds_sobrenome		VARCHAR(50) NOT NULL,
    dt_nascimento		DATE NOT NULL,
    ds_email			VARCHAR(255) NOT NULL,
    ds_senha			VARCHAR(255) NOT NULL
);

CREATE TABLE tb_movimentacao (
	id_movimentacao			INT PRIMARY KEY AUTO_INCREMENT,
    ds_titulo				VARCHAR(255) NOT NULL,
    ds_descricao			TEXT,
    ds_categoria			VARCHAR(100) NOT NULL,
    ds_tipo					ENUM('Receita', 'Despesa') NOT NULL,
    vl_total				DECIMAL(10,2) NOT NULL,
    dt_movimentacao			DATE NOT NULL,
	dt_criacao				DATETIME DEFAULT CURRENT_TIMESTAMP,
    dt_atualizacao			DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    id_usuario				INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES tb_usuarios(id_usuario)
);