import usuariosController from './controller/usuariosController.js'

export default function adicionarRotas(servidor) {
    servidor.use(usuariosController);
}