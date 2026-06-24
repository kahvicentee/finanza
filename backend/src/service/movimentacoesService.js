import * as db from '../repository/movimentacoesRepository.js'

export async function adicionarMovimentacaoService(mov, idUsuario) {
    let id = await db.adicionarMovimentacao(mov, idUsuario)

    return id
}

export async function consultarMovimentacoesService(idUsuario, titulo, categoria, tipo, periodo) {
    let registros = await db.consultarMovimentacoes(idUsuario, titulo, categoria, tipo, periodo)

    return registros
}

export async function consultarMovimentacaoPorIdService(idUsuario, id) {
    let registros = await db.consultarMovimentacaoPorId(idUsuario, id)

    return registros
}

export async function alterarMovimentacaoService(mov, idUsuario, id) {
    let linhasAfetadas = await db.alterarMovimentacao(mov, idUsuario, id)

    return linhasAfetadas
}

export async function deletarMovimentacaoService(idUsuario, id) {
    let resultado = await db.deletarMovimentacao(idUsuario, id)

    return resultado
}