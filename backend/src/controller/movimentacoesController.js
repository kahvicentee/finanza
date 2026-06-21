import * as service from '../service/movimentacoesService.js'
import { autenticacao } from '../utils/jwt.js'
import { Router } from 'express'
const endpoints = Router()

endpoints.post('/movimentacao', autenticacao, async (req, resp) => {
    try {
        let mov = req.body
        let usu = req.user.id_usuario
        let id = await service.adicionarMovimentacaoService(mov, usu)

        resp.send({
            mensagem: "Movimentação adicionada com sucesso!",
            novoId: id
        })
    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})

endpoints.get('/movimentacao', autenticacao, async (req, resp) => {
    try {
        let usu = req.user.id_usuario

        let registros = await service.consultarMovimentacoesService(usu)

    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})

endpoints.get('/movimentacao/:tit', autenticacao, async (req, resp) => {
    try {
        let usu = req.user.id_usuario
        let tit = req.params.tit

        let registros = await service.consultarMovimentacoesPorTituloService(usu, tit)


    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})

endpoints.put('/movimentacao', autenticacao, async (req, resp) => {
    try {
        let usu = req.user.id_usuario
        let mov = req.body

        let linhasAfetadas = await service.alterarMovimentacaoService(mov, usu)

        
        
    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})

endpoints.delete('/movimentacao', autenticacao, async (req, resp) => {
    try {
        let usu = req.user.id_usuario


    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})

export default endpoints