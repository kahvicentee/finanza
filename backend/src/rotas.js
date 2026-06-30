import usuariosController from './controller/usuariosController.js'
import movimentacoesController from './controller/movimentacoesController.js'
import dashboardController from './controller/dashboardController.js'
import graficoController from './controller/graficoController.js'

export default function adicionarRotas(servidor) {
    servidor.use(usuariosController);
    servidor.use(movimentacoesController);
    servidor.use(dashboardController);
    servidor.use(graficoController);
}