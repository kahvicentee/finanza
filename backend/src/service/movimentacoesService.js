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
    let registros = await db.consultarMovimentacoesPorTitulo(idUsuario, tit)

    return registros
}

export async function alterarMovimentacaoService(mov, idUsuario, id) {
    let linhasAfetadas = await db.alterarMovimentacao(mov, idUsuario, id)

    return linhasAfetadas
}

export async function deletarMovimentacaoService(idUsuario, id) {

}