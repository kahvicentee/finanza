import con from "./connection.js";

export async function adicionarMovimentacao(mov, idUsuario) {
    const comando = `
        INSERT INTO tb_movimentacoes (ds_titulo, ds_descricao, ds_categoria, ds_tipo, vl_total, dt_movimentacao, id_usuario)
            VALUES (?, ?, ?, ?, ?, ?, ?)
    `

    let registros = await con.query(comando, [mov.titulo, mov.descricao, mov.categoria, mov.tipo, mov.valor, mov.data, idUsuario])
    let info = registros[0]

    return info.insertId
}

export async function alterarMovimentacao(mov, id) {
    const comando = `
        UPDATE tb_movimentacoes
            SET ds_titulo = ?,
                ds_descricao = ?,
                ds_categoria = ?,
                ds_tipo = ?,
                vl_total = ?
                dt_movimentacao = ?, 
                id_usuario = ?
            WHERE id_movimentacao = ?
    `

    let registros = await con.query(comando, [mov.titulo, mov.descricao, mov.categoria, mov.tipo, mov.valor, mov.data, mov.idUsuario, id])
    let info = registros[0]

    return info.affectedRows
}

export async function consultarMovimentacoes(idUsuario) {
    const comando = `
        SELECT * FROM tb_movimentacoes
            WHERE id_usuario = ?
    `

    let registros = await con.query(comando, [idUsuario])
}

export async function consultarMovimentacoesPorTitulo(idUsuario, tit) {
    const comando = `
        SELECT * FROM tb_movimentacoes 
            WHERE id_usuario = ? AND ds_titulo = ?
    `

    let registros = await con.query(comando, [idUsuario, tit])

}