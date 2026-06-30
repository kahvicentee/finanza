import * as service from '../service/dashboardService.js'
import { autenticacao } from '../utils/jwt.js'
import { Router } from 'express'
const endpoints = Router()

endpoints.get('/dashboard', autenticacao, async (req, resp) => {
    try {
        const usu = req.user.id_usuario

        const resposta = await service.buscarDashboardService(usu)
        resp.send(resposta)
    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})

export default endpoints