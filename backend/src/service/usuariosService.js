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

}

export async function deletarUsuarioService(id) {

}
