import * as service from '../service/usuariosService.js'
import { gerarToken, autenticacao } from '../utils/jwt.js'
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
        resp.status(400).send({
            erro: error.message
        })
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
        resp.status(400).send({
            erro: error.message
        })
    }
})

endpoints.get('/usuario', autenticacao, async (req, resp) => {
    try {
        let id = req.user.id_usuario
        let registro = await service.consultarUsuarioService(id)

        resp.send(registro)
    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})

endpoints.put('/usuario', autenticacao, async (req, resp) => {
    try {
        let id = req.user.id_usuario
        let usu = req.body

        let linhasAfetadas = await service.alterarUsuarioService(usu, id)

        resp.send({
            linhasAfetadas
        })
        
    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})

endpoints.delete('/usuario', autenticacao, async (req, resp) => {
    try {
        let id = req.user.id_usuario

        let linhasAfetadas = await service.deletarUsuarioService(id)
        resp.send({
            linhasAfetadas
        })
        
    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})

export default endpoints