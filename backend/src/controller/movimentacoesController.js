import * as service from '../service/movimentacoesService.js'
import { autenticacao } from '../utils/jwt.js'
import { Router } from 'express'
const endpoints = Router()

endpoints.post('/movimentacao', autenticacao, async (req, resp) => {
    try {
        let mov = req.body
        let usu = req.user.id_usuario
        let linhasAfetadas = await service.adicionarMovimentacaoService(mov, usu)

        if (linhasAfetadas >= 1) {
            resp.send({
                mensagem: "Movimentação adicionada com sucesso!"
            })
        } else {
            resp.send({
                erro: "Nenhum registro pôde ser adicionado!"
            })
        }
    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})

endpoints.get('/movimentacao', autenticacao, async (req, resp) => {
    try {
        let usu = req.user.id_usuario

        let titulo = req.query.titulo
        let categoria = req.query.categoria
        let tipo = req.query.tipo
        let periodo = req.query.periodo

        let registros = await service.consultarMovimentacoesService(usu)

        const resposta = await service.consultarMovimentacoesService(
            usu,
            titulo,
            categoria,
            tipo,
            periodo
        )

        resp.send(resposta)
    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})

endpoints.get('/movimentacao/:id', autenticacao, async (req, resp) => {
    try {
        let usu = req.user.id_usuario
        let id = req.params.id

        let movimentacao = await service.consultarMovimentacaoPorIdService(usu, id)

        resp.send(movimentacao)
    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})

endpoints.put('/movimentacao/:id', autenticacao, async (req, resp) => {
    try {
        let usu = req.user.id_usuario
        let mov = req.body
        let id = req.params.id

        let linhasAfetadas = await service.alterarMovimentacaoService(mov, usu, id)

        resp.send({
            linhasAfetadas
        })
        
    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})

endpoints.delete('/movimentacao/:id', autenticacao, async (req, resp) => {
    try {
        const usu = req.user.id_usuario
        const mov = req.params.id

        let resultado = await service.deletarMovimentacaoService(usu, mov)
        resp.status(204).send()
    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})

export default endpoints