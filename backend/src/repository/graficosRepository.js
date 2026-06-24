import con from "./connection.js";

export async function buscarDespesasPorCategoria(idUsuario) {
    const comando = `
        SELECT
            ds_categoria AS categoria,
            SUM(vl_total) AS total
        FROM tb_movimentacoes
        WHERE id_usuario = ?
            AND ds_tipo = 'Despesa'
            AND MONTH(dt_movimentacao) = MONTH(CURDATE())
            AND YEAR(dt_movimentacao) = YEAR(CURDATE())
        GROUP BY ds_categoria
    `

    const registros = await con.query(comando, [idUsuario])
    return registros[0]
}

export async function buscarResumoMensal(idUsuario) {
    const comando = `
        SELECT
            ds_tipo AS tipo,
            SUM(vl_total) AS total
        FROM tb_movimentacoes
        WHERE id_usuario = ?
            AND MONTH(dt_movimentacao) = MONTH(CURDATE())
            AND YEAR(dt_movimentacao) = YEAR(CURDATE())
        GROUP BY ds_tipo
    `

    const registros = await con.query(comando, [idUsuario])
    return registros[0]
}

export async function buscarResumoDashboard(idUsuario) {
    const comando = `
        SELECT 
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
    `

    const [registros] = await con.query(comando, [idUsuario])
    return registros[0]
}

export async function buscarGraficoPersonalizado(idUsuario) {
    const comando = `
    
    `
}