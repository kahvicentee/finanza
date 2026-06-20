import * as db from '../repository/movimentacoesRepository.js'

export async function adicionarMovimentacaoService(mov) {
    let id = await db.adicionarMovimentacao(mov)

    return id
}