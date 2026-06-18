import * as service from '../service/usuariosService.js'
import { gerarToken } from '../utils/jwt.js'
import { Router } from 'express'
const endpoints = Router()

endpoints.post('/usuario', async (req, resp) => {
    try {
        let usu = req.body
        let linhasAfetadas = await service.inserirUsuarioService(usu)

        if (linhasAfetadas >= 1) {
            resp.send({
                novoUsu: "Usuário adicionado com sucesso!"
            })
        } else {
            resp.send({
                erro: "Nenhum registro encontrado!"
            })
        }
    } catch (error) {
        console.log(error)
    }
})

endpoints.post('/usuario/entrar', async (req, resp) => {
    try {
        let usu = req.body
        let usuario = await service.validarUsuarioService(usu)

        if (usuario == null) {
            resp.send({erro: "Usuário ou senha incorreto(s)!"})
        } else {
            let token = gerarToken(usuario)

            resp.send({
                token: token
            })
        }
        
    } catch (error) {
        console.log(error)
    }
})

endpoints.put('/usuario/:id', async (req, resp) => {
  
})

endpoints.delete('/usuario/:id', async (req, resp) => {

})

export default endpoints