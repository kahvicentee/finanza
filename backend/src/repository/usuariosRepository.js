import con from "./connection.js";

export async function inserirUsuario(usu) {
    const comando = `
        INSERT INTO tb_usuarios (ds_nome, ds_sobrenome, dt_nascimento, ds_email, ds_senha)
            VALUES(?, ?, ?, ?, ?) 
    `

    let registros = await con.query(comando, [usu.nome, usu.sobrenome, usu.nascimento, usu.email, usu.senha])
    let info = registros[0]

    return info.affectedRows
}

export async function validarUsuario(usu) {
    const comando = `
        SELECT id_usuario, ds_nome
            FROM tb_usuarios
            WHERE ds_email = ? AND ds_senha = ?
    `

    let registros = await con.query(comando, [usu.email, usu.senha])
    let info = registros[0]

    return info[0]
}

export async function consultarUsuario(id) {
    const comando = `
        SELECT * FROM tb_usuarios
            WHERE id_usuario = ?
    `

    let registro = await con.query(comando, [id])
    let info = registro[0]

    return info
}

export async function alterarUsuario(usu, id) {
    const comando = `
        UPDATE tb_usuarios
            SET ds_nome = ?,
                ds_sobrenome = ?,
                dt_nascimento = ?,
                ds_email = ?,
                ds_senha = ?
            WHERE id_usuario = ?
    `

    let registros = await con.query(comando, [usu.nome, usu.sobrenome, usu.nascimento, usu.email, usu.senha, id])
    let info = registros[0]

    return info.affectedRows
}

export async function deletarUsuario(id) {
    const comando = `
        DELETE FROM tb_usuarios
            WHERE id_usuario = ?
    `

    let registros = await con.query(comando, [id])
    let info = registros[0]

    return info.affectedRows
}