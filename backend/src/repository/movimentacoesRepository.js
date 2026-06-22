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

export async function alterarMovimentacao(mov, idUsuario, id) {
    const comando = `
        UPDATE tb_movimentacoes
            SET ds_titulo = ?,
                ds_descricao = ?,
                ds_categoria = ?,
                ds_tipo = ?,
                vl_total = ?
                dt_movimentacao = ?, 
            WHERE id_usuario = ? AND id_movimentacao = ?
    `

    let registros = await con.query(comando, [mov.titulo, mov.descricao, mov.categoria, mov.tipo, mov.valor, mov.data, idUsuario, id])
    let info = registros[0]

    return info.affectedRows
}

export async function deletarMovimentacao(idUsuario, id) {
    const comando = `
        DELETE FROM tb_movimentacoes
            WHERE id_usuario = ? AND id_movimentacao = ?
    `
}

export async function consultarMovimentacoes(idUsuario) {
    const comando = `
        SELECT * FROM tb_movimentacoes
            WHERE id_usuario = ?
    `

    let registros = await con.query(comando, [idUsuario])
    return registros[0]
}

export async function consultarMovimentacoesPorData(idUsuario, data) {
    const comando = `
        SELECT * FROM tb_movimentacoes
            WHERE id_usuario = ? AND dt_movimentacao = ?
    `

    let registros = await con.query(comando, [idUsuario, data])
    return registros[0]
}

export async function consultarMovimentacoesPorTitulo(idUsuario, tit) {
    const comando = `
        SELECT * FROM tb_movimentacoes 
            WHERE id_usuario = ? AND ds_titulo = ?
    `

    let registros = await con.query(comando, [idUsuario, tit])
    return registros[0]
}

export async function consultarMovimentacoesPorCategoria(idUsuario, cat) {
    const comando = `
        SELECT * FROM tb_movimentacoes
            WHERE id_usuario = ? AND ds_categoria = ?
    `

    let registros = await con.query(comando, [idUsuario, cat])
    return registros[0]
}

export async function consultarMovimentacoesPorTipo(idUsuario, tipo) {
    const comando = `
        SELECT * FROM tb_movimentacoes
            WHERE id_usuario = ? AND ds_tipo = ?
    `

    let registros = await con.query(comando, [idUsuario, tipo])
    return registros[0]
}

export async function buscarSaldoTotal(idUsuario) {
    const comando = `
    
    `

    let registros = await con.query(comando, [idUsuario])
}