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
                vl_total = ?,
                dt_movimentacao = ?
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

    let resultado = await con.query(comando, [idUsuario, id])
    return resultado
}

export async function consultarMovimentacoes(idUsuario, titulo, categoria, tipo, periodo) {
    let comando = `
        SELECT * FROM tb_movimentacoes
            WHERE id_usuario = ?
    `

    let parametros = [idUsuario]

    if (titulo) {
        comando += ' AND ds_titulo LIKE ?'
        parametros.push(`%${titulo}%`)
    }
    if (categoria) {
        comando += ' AND ds_categoria = ?'
        parametros.push(categoria)
    }
    if (tipo) {
        comando += ' AND ds_tipo = ?'
        parametros.push(tipo)
    }
    if (periodo === 'Hoje') {
        comando += `
            AND DATE(dt_movimentacao) = CURDATE()
        `
    }
    if (periodo === 'Essa semana') {
        comando += `
            AND dt_movimentacao >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        `
    }
    if (periodo === 'Esse mês') {
        comando += `
            AND MONTH(dt_movimentacao) = MONTH(CURDATE())
            AND YEAR(dt_movimentacao) = YEAR(CURDATE())
        `
    }
    if (periodo === 'Mês passado') {
        comando += `
            AND MONTH(dt_movimentacao) = MONTH(CURDATE() - INTERVAL 1 MONTH)
            AND YEAR(dt_movimentacao) = YEAR(CURDATE() - INTERVAL 1 MONTH)
        `
    }

    comando += `
        ORDER BY dt_movimentacao DESC
    `

    const registros = await con.query(comando, parametros)
    return registros[0]
}

export async function consultarMovimentacaoPorId(idUsuario, id) {
    const comando = `
        SELECT * FROM tb_movimentacoes
            WHERE id_usuario = ? AND id_movimentacao = ?
    `

    const [registros] = await con.query(comando, [idUsuario, id])
    return registros[0]
}