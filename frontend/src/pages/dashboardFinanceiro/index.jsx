import './index.scss'
import CabecalhoUsuario from '../../components/cabecalhoUsuario'
import CardResumo from '../../components/cardResumo'
import { Chart } from 'react-google-charts'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function DashboardFinanceiro() {
    const navigate = useNavigate()

    const [saldo, setSaldo] = useState(0)
    const [receitas, setReceitas] = useState(0)
    const [despesas, setDespesas] = useState(0)
    const [dadosPizza, setDadosPizza] = useState([
        ['Categoria', 'Valor']
    ])
    const [dadosResumo, setDadosResumo] = useState([
        ['Tipo', 'Valor']
    ])
    const semMovimentacoes = dadosResumo.length <= 1 && dadosPizza.length <= 1

    function mesAtual() {
        const hoje = new Date()
        const m = hoje.getMonth()

        if (m === 0) {
            return 'Janeiro'
        } else if (m === 1) {
            return 'Fevereiro'
        } else if (m === 2) {
            return 'Março'
        } else if (m === 3) {
            return 'Abril'
        } else if (m === 4) {
            return 'Maio'
        } else if (m === 5) {
            return 'Junho'
        } else if (m === 6) {
            return 'Julho'
        } else if (m === 7) {
            return 'Agosto'
        } else if (m === 8) {
            return 'Setembro'
        } else if (m === 9) {
            return 'Outubro'
        } else if (m === 10) {
            return 'Novembro'
        } else if (m === 11) {
            return 'Dezembro'
        }
    }

    async function carregarDashboard() {
        try {
            const token = localStorage.getItem('USUARIO')

            const resp = await axios.get(
                'http://localhost:5030/dashboard/resumo',
                {
                    headers: {
                        'x-access-token': token
                    }
                }
            )

            setSaldo(resp.data.saldo)
            setReceitas(resp.data.receitas)
            setDespesas(resp.data.despesas)
        } catch (error) {
            console.log(error.message)
        }
    }

    async function carregarResumo() {
        try {
            const token = localStorage.getItem('USUARIO')

            const resp = await axios.get(
                'http://localhost:5030/grafico/resumo',
                {
                    headers: {
                        'x-access-token': token
                    }
                }
            )

            const dados = [
                ['Tipo', 'Valor', {role: 'style'}],
                ...resp.data.map(item => [
                    item.tipo,
                    Number(item.total),
                    item.tipo === 'Receita'
                        ? '#22c55e'
                        : '#ef4444'
                ])
            ]

            setDadosResumo(dados)
        } catch (error) {
            console.log(error.message)
        }
    }

    async function carregarGrafico() {
        try {
            const token = localStorage.getItem('USUARIO')

            const resp = await axios.get(
                'http://localhost:5030/grafico/categoria',
                {
                    headers: {
                        'x-access-token': token
                    }
                }
            )

            const dados = [
                ['Categoria', 'Valor'],
                ...resp.data.map(item => [
                    item.categoria,
                    Number(item.total)
                ])
            ]

            setDadosPizza(dados)
        } catch (error) {
            console.log(error.message)
        }
    }

    const options = {
        title: "Despesas por Categoria",
        pieHole: 0,
        is3D: false,
        backgroundColor: 'transparent',
        colors: [
            '#ef4444', 
            '#f59e0b', 
            '#eab308', 
            '#22c55e',
            '#06b6d4',
            '#3b82f6',
            '#8b5cf6',
            '#ec4899'
        ],
        titleTextStyle: {
            color: '#ffffff',
            fontSize: 28,
            bold: true
        },
        legend: {
            textStyle: {
                color: '#ffffff',
                fontSize: 18
            }
        },
        // chartArea: {
        //     width: '100%'
        // }
    }

    const optionsResumo = {
        title: `Resumo Mensal - ${mesAtual()}`,
        backgroundColor: 'transparent',
        titleTextStyle: {
            color: '#ffffff',
            fontSize: 28
        },
        legend: {
            position: 'none'
        },
        hAxis: {
            textStyle: {
                color: '#ffffff'
            }
        },
        vAxis: {
            textStyle: {
                color: '#ffffff'
            }
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('USUARIO')

        if (!token) {
            navigate('/')
            return
        }

        carregarDashboard()
        carregarResumo()
        carregarGrafico()
    }, [navigate])

    return (
        <div className='pagina-dashboard'>
            <CabecalhoUsuario />

            <div className='tit'>
                <h1>Dashboard Financeiro</h1>
            </div>

            <div className='cards-dashboard'>
                <CardResumo
                    titulo='Saldo Total'
                    icone='fa-solid fa-piggy-bank'
                    total={saldo.toFixed(2)}
                    mensagem='Saldo disponível'
                />

                <CardResumo 
                    titulo='Receitas'
                    icone='fa-solid fa-arrow-up'
                    total={receitas.toFixed(2)}
                    mensagem=''
                />

                <CardResumo 
                    titulo='Despesas'
                    icone='fa-solid fa-arrow-down'
                    total={despesas.toFixed(2)}
                    mensagem=''
                />
            </div>

            {
                semMovimentacoes 
                ? (
                    <div className='sem-dados'>
                        <h1>Nenhuma movimentação encontrada!</h1>
                        <p>
                            Você ainda não registrou receitas ou depesas.
                            Adicione sua primeira movimentação para visualizar gráficos e relatórios.
                        </p>
                    </div>
                ) : (
                    <div className='graficos'>
                        <div className='grafico'>
                            <Chart 
                                chartType='ColumnChart'
                                width='100%'
                                height='400px'
                                data={dadosResumo}
                                options={optionsResumo}
                            />
                        </div>

                        <div className='grafico'>
                            <Chart 
                                chartType='PieChart'
                                data={dadosPizza}
                                options={options}
                                width='100%'
                                height='400px'
                            />
                        </div>
                    </div>
                )
            }
        </div>
    )
}