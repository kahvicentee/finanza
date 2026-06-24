import './index.scss'
import Cabecalho from '../../components/cabecalho'
import Card from '../../components/card'
import { useNavigate } from 'react-router-dom'

export default function Inicio() {
    const navigate = useNavigate()

    function cadastro() {
        navigate('/cadastro')
    }

    return (
        <div className='pagina-inicio'>
            <Cabecalho />

            <div className='bloco'>
                <div className='textos'>
                    <button className='frase'>CONTROLE FINANCEIRO INTELIGENTE</button>
                    <h1>Clareza para as <span>suas finanças</span></h1>
                    <p>Organize receitas e despesas em um só lugar. Tenha uma visão completa de sua vida financeira e tome decisões com mais segurança.</p>
                    <button onClick={() => cadastro()} className='botao-comecar'>Começar Agora</button>
                </div>
            </div>

            <div className='bloco'>
                <div className='textos'>
                    <button className='frase'>TUDO O QUE VOCÊ PRECISA</button>
                    <h2>Números que ajudam você a crescer</h2>
                    <p>Acompanhe seus gastos, visualize relatórios intuitivos e mantenha o controle do seu dinheiro sem planilhas complicadas.</p>
                </div>

                <div className='recursos'>
                    <Card 
                        icone='fa-solid fa-diagram-project'
                        titulo='Controle Total'
                        descricao='Registre receitas e despesas de forma rápida e prática.'
                    />

                    <Card 
                        icone='fa-solid fa-chart-pie'
                        titulo='Relatórios Visuais'
                        descricao='Gráficos intuitivos que mostram para onde seu dinheiro está indo.'
                    />

                    <Card
                        icone='fa-solid fa-filter'
                        titulo='Filtros Inteligentes'
                        descricao='Filtre por categoria, período e tipo de movimentação.'
                    />

                    <Card 
                        icone='fa-solid fa-download'
                        titulo='Exportação'
                        descricao='Gere planilhas e relatórios em Excel para análises detalhadas.'
                    />

                    <Card 
                        icone='fa-solid fa-shield'
                        titulo='Segurança'
                        descricao='Seus dados protegidos com criptografia e as melhores práticas.'
                    />
                </div>
            </div>

            <div className='bloco'>
                <div className='textos'>
                    <button className='frase'>POR QUE USAR O FINANZA?</button>
                    <h2>Mais controle, mais liberdade</h2>
                </div>

                <div className='detalhes'>
                    <Card 
                        icone=''
                        titulo='Controle'
                        descricao='Tenhas todas as suas finanças organizadas em um único lugar.'
                    />

                    <Card 
                        icone='fa-solid fa-eye'
                        titulo='Clareza'
                        descricao='Entenda para onde seu dinheiro está indo com relatórios visuais.'
                    />

                    <Card 
                        icone=''
                        titulo='Planejamento'
                        descricao='Planeje seu futuro com metas e acompanhe seu progresso.'
                    />

                    <Card 
                        icone=''
                        titulo='Evolução'
                        descricao='Acompanhe sua evolução financeira e conquiste seus objetivos.'
                    />
                </div>
            </div>

            <div className='criar-conta'>
                <h1>Pronto para assumir o controle das <span>suas finanças</span>?</h1>
                <p>Comece agora mesmo e descubra como é simples acompanhar receitas, despesas e resultados em uma única plataforma.</p>
                <button onClick={() => cadastro()}>CRIAR CONTA GRATUITAMENTE</button>
            </div>
        </div>
    )
}