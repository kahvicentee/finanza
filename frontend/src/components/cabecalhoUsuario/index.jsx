import './index.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CabecalhoUsuario() {
    const [aberto, setAberto] = useState(false)
    const navigate = useNavigate()

    function alterarMenu() {
        setAberto(!aberto)
    }

    function sair() {
        localStorage.removeItem('USUARIO')
        navigate('/')
    }

    return (
        <div className='comp-cab-usu'>
            <div className='titulo'>
                <h1>FINANZA</h1>
                <i className="fa-solid fa-bars menu-bar" onClick={alterarMenu}></i>
            </div>

            <div className='linha'></div>

            {
                aberto &&
                    <div className='menu'>
                        <i class="fa-solid fa-x menu-fechar" onClick={alterarMenu}></i>

                        <div className='botoes'>
                            <Link to='/movimentacoes' className='botao'>
                                <i class="fa-regular fa-square-plus icone"></i>
                                <p>Adicionar Movimentação</p>
                            </Link>

                            <Link to='/historico' className='botao'>
                                <i class="fa-regular fa-clock icone"></i>
                                <p>Histórico</p>
                            </Link>

                            <Link to='/graficos' className='botao'>
                                <i class="fa-solid fa-chart-column icone"></i>
                                <p>Gráficos</p>
                            </Link>
                        </div>

                        <div className='botoes usuario'>
                            <Link to='/usuario' className='botao'>
                                <i className='fa-regular fa-user icone'></i>
                                <p>Minha Conta</p>
                            </Link>

                            <button onClick={sair} className='botao sair'>
                                <i class="fa-solid fa-arrow-right-to-bracket icone"></i>
                                <p>Sair</p>
                            </button>
                        </div>
                    </div>
            }
        </div>
    )
}