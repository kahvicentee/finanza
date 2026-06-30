import * as service from '../service/graficoService.js'
import { Router } from "express"
const endpoints = Router()

endpoints.get('/gerar/grafico', async (req, resp) => {
    try {
        const usu = req.user.id_usuario
        const filtro = {
            dataInicio: req.query.dataInicio,
            dataFim: req.query.dataFim,
            tipo: req.query.tipo,
            categoria: req.query.categoria
        }

        const resposta = await service.gerarGraficosService(usu, filtro)
        resp.send(resposta)
    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})

export default endpoints