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

CREATE TABLE tb_movimentacoes (
    id_movimentacao     INT PRIMARY KEY AUTO_INCREMENT,

    id_usuario          INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES tb_usuarios(id_usuario)
)