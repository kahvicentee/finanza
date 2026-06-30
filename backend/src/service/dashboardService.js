import * as db from '../repository/dashboardRepository.js'

export async function buscarDashboardService(idUsuario) {
    const resumo = await db.buscarResumoDashboard(idUsuario)
    const graficoResumo = await db.buscarResumoMensal(idUsuario)
    const graficoCategoria = await db.buscarDespesasPorCategoria(idUsuario)

    return {
        saldo: Number(resumo.receitas || 0) - Number(resumo.despesas || 0),
        receitas: Number(resumo.receitas || 0),
        despesas: Number(resumo.despesas || 0),
        graficoResumo,
        graficoCategoria
    }
}