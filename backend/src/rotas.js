import usuariosController from './controller/usuariosController.js'
import movimentacoesController from './controller/movimentacoesController.js'

export default function adicionarRotas(servidor) {
    servidor.use(usuariosController);
    servidor.use(movimentacoesController);
}