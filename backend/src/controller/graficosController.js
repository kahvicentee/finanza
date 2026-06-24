import * as service from '../service/graficosService.js'
import { autenticacao } from '../utils/jwt.js'
import { Router } from 'express'
const endpoints = Router()

endpoints.get('/grafico/categoria', autenticacao, async (req, resp) => {
    try {
        const usu = req.user.id_usuario

        const registros = await service.buscarDespesasPorCategoriaService(usu)
        resp.send(registros)
    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})

endpoints.get('/grafico/resumo', autenticacao, async (req, resp) => {
    try {
        const usu = req.user.id_usuario

        const registros = await service.buscarResumoMensalService(usu)
        resp.send(registros)
    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})

endpoints.get('/dashboard/resumo', autenticacao, async (req, resp) => {
    try {
        const usu = req.user.id_usuario

        const resumo = await service.buscarResumoDashboardService(usu)
        resp.send(resumo)
    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})

export default endpoints