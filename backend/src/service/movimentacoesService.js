import * as db from '../repository/movimentacoesRepository.js'

export async function adicionarMovimentacaoService(mov, idUsuario) {
    let id = await db.adicionarMovimentacao(mov, idUsuario)

    return id
}

export async function consultarMovimentacoesService(idUsuario) {
    let registros = await db.consultarMovimentacoes(idUsuario)

    return registros
}

export async function consultarMovimentacoesPorTituloService(idUsuario, tit) {
    let registros = await db.consultarMovimentacoesPorTituloService(idUsuario, tit)

    return registros
}

export async function alterarMovimentacaoService(mov, id) {
    
}

export async function deletarMovimentacaoService(id) {

}