import './index.scss'
import { Link } from 'react-router-dom'
import Cabecalho from '../../components/cabecalho'

export default function Inicio() {
    return (
        <div className='pagina-inicio'>
            <Cabecalho />

            <div className='titulo'>
                <h1>FINANZA</h1>
                <h2>Clareza para as suas finanças</h2>
                <p>Organize receitas, despesas e metas financeiras em um só lugar. Tenha uma visão completa da sua vida financeira e tome decisões com mais segurança.</p>
                <p>Pare de perder o controle dos seus gastos. Com a ajuda da Finanza, você acompanha suas finanças de forma simples, visual e eficente!</p>
                <Link to='/cadastro' className='botao'><button>Começar Agora</button></Link>
            </div>

            <div className='sobre'>
                <h2>Números que ajudam você a crescer</h2>
                <p>Acompanhe seus gastos, visualize relatórios intuitivos e mantenha o controle do seu dinheiro sem planilhas complicadas.</p>

                <div className='lista'>
                    <div className='frase'>

                    </div>

                    <div className='frase'>

                    </div>
                </div>
            </div>
        </div>
    )
}