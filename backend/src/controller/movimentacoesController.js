import * as service from '../service/movimentacoesService.js'
import { Router } from 'express'
const endpoints = Router()

endpoints.post('/movimentacao', async (req, resp) => {
    try {
        let mov = req.body
        let id = await service.adicionarMovimentacaoService(mov)

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