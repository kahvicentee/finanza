import * as db from "../repository/usuariosRepository.js";

export async function inserirUsuarioService(usu) {
    let linhasAfetadas = await db.inserirUsuario(usu)

    return linhasAfetadas
}

export async function validarUsuarioService(usu) {
    let registros = await db.validarUsuario(usu)

    return registros
}

export async function consultarUsuarioService(id) {
    let registro = await db.consultarUsuario(id)

    return registro
}

export async function alterarUsuarioService(usu, id) {
    let linhasAfetadas = await db.alterarUsuario(usu, id)

    return linhasAfetadas
}

export async function deletarUsuarioService(idUsuario) {
    // REMOVE TODAS AS MOVIMENTAÇÕES
    await db.deletarMovimentacoesUsuario(idUsuario)

    // REMOVE O USUÁRIO
    const linhasAfetadas = await db.deletarUsuario(idUsuario)

    if (linhasAfetadas === 0) {
        throw new Error("Usuário não encontrado.")
    }

    return linhasAfetadas
}
