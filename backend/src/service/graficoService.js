import * as db from '../repository/graficoRepository.js'

export async function gerarGraficosService(idUsuario, filtro) {
    const inicio = new Date(filtro.dataInicio)
    const fim = new Date(filtro.dataFim)
    const diferenca = fim - inicio
    const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24))

    let agrupamento = ''

    if (dias <= 31) 
        agrupamento = 'dia';
    else if (dias <= 180) 
        agrupamento = 'semana';
    else 
        agrupamento = 'mes';

    const resumo = await db.buscarResumo(idUsuario, filtro)
    const categorias = await db.buscarCategorias(idUsuario, filtro)
    const evolucao = await db.buscarEvolucao(idUsuario, filtro, agrupamento)

    let receitas = 0
    let despesas = 0

    for (const item of resumo) {
        if (item.ds_tipo === 'Receita') {
            receitas = item.total
        }
        if (item.ds_tipo === 'Despesa') {
            despesas = item.total
        }
    }

    return {
        resumo: {
            receitas,
            despesas
        },
        categorias,
        evolucao
    }
}