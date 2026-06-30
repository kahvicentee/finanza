import con from "./connection.js"

export async function buscarResumo(idUsuario, filtro) {
    const comando = `
        SELECT 
            ds_tipo,
            SUM(vl_total) AS total
        FROM tb_movimentacoes
            WHERE 
                id_usuario = ?
                AND dt_movimentacao BETWEEN ? AND ?
        GROUP BY ds_tipo
    `

    const registros = await con.query(comando, [idUsuario, filtro.dataInicio, filtro.dataFim])
    return registros[0]
}

export async function buscarCategorias(idUsuario, filtro) {
    const comando = `
        SELECT 
            ds_categoria,
            SUM(vl_total) AS total
        FROM tb_movimentacoes
        WHERE 
            id_usuario = ?
            AND dt_movimentacao BETWEEN ? AND ?
            AND ds_tipo = 'Despesa'
        GROUP BY ds_categoria
        ORDER BY total DESC
    `

    const registros = await con.query(comando, [idUsuario, filtro.dataInicio, filtro.dataFim])
    return registros[0]
}

export async function buscarEvolucao(idUsuario, filtro, agrupamento) {
    const agrupamentos = {
        dia: `
            GROUP BY dt_movimentacao
            ORDER BY dt_movimentacao
        `,
        semana: `
            GROUP BY
                YEAR(dt_movimentacao),
                WEEK(dt_movimentacao)
            ORDER BY
                YEAR(dt_movimentacao),
                WEEK(dt_movimentacao)
        `,
        mes: `
            GROUP BY
                YEAR(dt_movimentacao),
                MONTH(dt_movimentacao)
            ORDER BY
                YEAR(dt_movimentacao),
                MONTH(dt_movimentacao)
        `
    }

    let comando = `
        SELECT 
            dt_movimentacao,
            SUM(
                CASE 
                    WHEN ds_tipo = 'Receita'
                    THEN vl_total
                    ELSE 0
                END
            ) AS receitas,
            SUM(
                CASE
                    WHEN ds_tipo = 'Despesa'
                    THEN vl_total
                    ELSE 0
                END
            ) AS despesas
        FROM tb_movimentacoes
            WHERE id_usuario = ?
            AND dt_movimentacao BETWEEN ? AND ?
        ${agrupamentos[agrupamento]}
    `

    let parametros = [
        idUsuario,
        filtro.dataInicio,
        filtro.dataFim
    ]

    const registros = await con.query(comando, [idUsuario])
    return registros[0]
}