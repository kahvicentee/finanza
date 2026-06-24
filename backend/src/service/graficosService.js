import * as db from '../repository/graficosRepository.js'

export async function buscarDespesasPorCategoriaService(idUsuario) {
    let registros = await db.buscarDespesasPorCategoria(idUsuario)

    return registros
}

export async function buscarResumoMensalService(idUsuario) {
    let registros = await db.buscarResumoMensal(idUsuario)

    return registros
}

export async function buscarResumoDashboardService(idUsuario) {
    const resumo = await db.buscarResumoDashboard(idUsuario)

    const receitas = Number(resumo.receitas || 0)
    const despesas = Number(resumo.despesas || 0)

    return {
        receitas,
        despesas,
        saldo: receitas - despesas
    }
}

export async function buscarGraficoPersonalizadoService(idUsuario) {
    
}