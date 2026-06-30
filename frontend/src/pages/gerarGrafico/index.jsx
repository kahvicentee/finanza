import './index.scss'
import CabecalhoUsuario from '../../components/cabecalhoUsuario'
import { useState, useEffect } from 'react'
import { data, useNavigate } from 'react-router-dom'

export default function GerarGrafico() {
    const navigate = useNavigate()

    const [tipoPeriodo, setTipoPeriodo] = useState('mes')

    const [mes, setMes] = useState('')
    const [ano, setAno] = useState('')

    const [dataInicio, setDataInicio] = useState('')
    const [dataFim, setDataFim] = useState('')

    const [tipoMovimentacao, setTipoMovimentacao] = useState('')
    const [categoria, setCategoria] = useState('')

    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState('')
    const [graficoResumo, setGraficoResumo] = useState(null)
    const [graficoCategorias, setGraficoCategorias] = useState([])
    const [graficoEvolucao, setGraficoEvolucao] = useState([])

    async function gerarGraficos() {
        try {
            setCarregando(true)

            if (tipoPeriodo === 'mes') {
                if (!mes || !ano) {
                    setErro('É obrigatório preencher o mês e ano!')
                    return
                }
            }      
            
            if (tipoPeriodo === 'intervalo') {
                if (!dataInicio || !dataFim) {
                    setErro('Informe a data inicial e a data final!')
                    return
                }
            }

            let inicio = ''
            let fim = ''
        } catch (error) {
            console.log(error.message)
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('USUARIO')

        if (!token) {
            navigate('/')
        }
    })
    
    return (
        <div className='pagina-gerar-grafico'>
            <CabecalhoUsuario />


            <div className='conteudo'>
                <div className='card-filtros'>
                    <div className='grupo-filtro'>
                        <label className='titulo'>Período</label>

                        <div className='opcoes-periodo'>
                            <label>
                                <input 
                                    type="radio" 
                                    checked={tipoPeriodo === 'mes'}
                                    onChange={() => setTipoPeriodo('mes')}
                                />
                                Mês
                            </label>

                            <label>
                                <input 
                                    type="radio"
                                    checked={tipoPeriodo === 'intervalo'}
                                    onChange={() => setTipoPeriodo('intervalo')}
                                />
                                Intervalo Personalizado
                            </label>
                        </div>
                    </div>

                        {
                            tipoPeriodo === 'mes' &&
                            <div className='linha'>
                                <select value={mes} onChange={(e => setMes(e.target.value))}>
                                    <option value="">Mês</option>
                                    <option value="01">Janeiro</option>
                                    <option value="02">Fevereiro</option>
                                    <option value="03">Março</option>
                                    <option value="04">Abril</option>
                                    <option value="05">Maio</option>
                                    <option value="06">Junho</option>
                                    <option value="07">Julho</option>
                                    <option value="08">Agosto</option>
                                    <option value="09">Setembro</option>
                                    <option value="10">Outubro</option>
                                    <option value="11">Novembro</option>
                                    <option value="12">Dezembro</option>
                                </select>

                                <input 
                                    type="number" 
                                    placeholder='Ano'
                                    value={ano}
                                    onChange={e => setAno(e.target.value)}
                                />
                            </div>
                        }

                        {
                            tipoPeriodo === 'intervalo' &&
                            <div className='linha'>
                                <input 
                                    type="date" 
                                    value={dataInicio}
                                    onChange={e => setDataInicio(e.target.value)}
                                />

                                <input 
                                    type="date"
                                    value={dataFim}
                                    onChange={e => setDataFim(e.target.value)}
                                />
                            </div>
                        }

                    <div className='grupo-filtro'>
                        <div className='filtro-tipo'>
                            <label>Tipo</label>

                            <select value={tipoMovimentacao} onChange={e => setTipoMovimentacao(e.target.value)}>
                                <option value="">Todos</option>
                                <option value="Receita">Receitas</option>
                                <option value="Despesa">Despesas</option>
                            </select>
                        </div>

                        <div className='filtro-categoria'>
                            <label>Categoria</label>

                            <select value={categoria} onChange={e => setCategoria(e.target.value)}>
                                <option value="">Todas</option>
                                <option value="Salário">Salário</option>
                                <option value="Alimentação">Alimentação</option>
                                <option value="Transporte">Transporte</option>
                                <option value="Moradia">Moradia</option>
                                <option value="Educação">Educação</option>
                                <option value="Saúde">Saúde</option>
                                <option value="Investimentos">Investimentos</option>
                                <option value="Lazer">Lazer</option>
                                <option value="Compras">Compras</option>
                                <option value="Outros">Outros</option>
                            </select>
                        </div>
                    </div>

                    <button 
                        className='gerar'
                        onClick={gerarGraficos}
                        disabled={carregando}
                    >
                        { carregando ? 'Gerando...' : 'Gerar Gráficos' }
                    </button>
                </div>
            </div>
        </div>
    )
}