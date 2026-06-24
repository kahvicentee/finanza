import './index.scss'
import CabecalhoUsuario from '../../components/cabecalhoUsuario'
import Movimentacao from '../../components/movimentacao'
import Confirmacao from '../../components/confirmacao'
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Historico() {
    const navigate = useNavigate()

    const [titulo, setTitulo] = useState('')
    const [filtro, setFiltro] = useState('Hoje')
    const [categoria, setCategoria] = useState('')
    const [tipo, setTipo] = useState('')
    const [movimentacoes, setMovimentacoes] = useState([])

    const [mostrarConf, setMostrarConf] = useState(false)
    const [movimentacaoSelecionada, setMovimentacaoSelecionada] = useState(null)

    const buscarMovimentacoes = useCallback(async (token) => {
        try {
            const resp = await axios.get(
                'http://localhost:5030/movimentacao',
                {
                    headers: {
                        'x-access-token': token
                    },
                    params: {
                        titulo,
                        categoria,
                        tipo,
                        periodo: filtro
                    }
                }
            )

            setMovimentacoes(resp.data)
        } catch (error) {
            alert(error)
        }
    }, [titulo, categoria, tipo, filtro])

    function formatarData(data) {
        const d = new Date(data)

        const dia = String(d.getDate()).padStart(2, '0')
        const mes = String(d.getMonth() + 1).padStart(2, '0')
        const ano = d.getFullYear()

        return `${dia}/${mes}/${ano}`
    }

    function abrirConfirmacao(id) {
        setMovimentacaoSelecionada(id)
        setMostrarConf(true)
    }

    async function excluirMovimentacao(id) {
        try {
            const token = localStorage.getItem('USUARIO')

            await axios.delete(
                `http://localhost:5030/movimentacao/${id}`,
                {
                    headers: {
                        'x-access-token': token
                    }
                }
            )

            setMostrarConf(false)
            setMovimentacaoSelecionada(null)

            buscarMovimentacoes(token)
        } catch (error) {
            alert(error.message)
        }
    }

    function alterarMovimentacao(id) {
        navigate(`/movimentacoes/${id}`)
    }

    useEffect(() => {
        const token = localStorage.getItem('USUARIO')

        if (!token) {
            navigate('/')
        } 
    }, [navigate])

    useEffect(() => {
        const token = localStorage.getItem('USUARIO')

        if (token) {
            buscarMovimentacoes(token)
        }
    }, [titulo, categoria, tipo, filtro, buscarMovimentacoes])

    return (
        <div className='pagina-historico'>
            <CabecalhoUsuario />

            <div className='barra'>
                <h1>Histórico Movimentações</h1>

                <div className='barra-pesquisa'>
                    <i class="fa-solid fa-magnifying-glass lupa"></i>
                    <input 
                        type="text" 
                        placeholder='Busca por título...' 
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                    />
                </div>
            </div>

            <div className='filtros'>
                <select 
                    value={filtro}
                    onChange={e => setFiltro(e.target.value)}
                >
                    <option value="">Selecione uma opção</option>
                    <option value="Hoje">Hoje</option>
                    <option value="Essa semana">Últimos 7 dias</option>
                    <option value="Esse mês">Desse mês</option>
                    <option value="Mês passado">Mês passado</option>
                    <option value="Todas">Todas</option>
                </select>

                <select 
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}
                >
                    <option value="">Selecione uma categoria</option>
                    <option value="Salário">Salário</option>
                    <option value="Alimentação">Alimentação</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Moradia">Moradia</option>
                    <option value="Educação">Educação</option>
                    <option value="Saúde">Saúde</option>
                    <option value="Investimentos">Investimentos</option>
                    <option value="Lazer">Lazer</option>
                    <option value="Outros">Outros</option>
                </select>

                <select
                    value={tipo}
                    onChange={e => setTipo(e.target.value)}
                >
                    <option value="">Selecione um tipo</option>
                    <option value="Receita">Receita</option>
                    <option value="Despesa">Despesa</option>
                </select>
            </div>

            {
                movimentacoes.length > 0 ? (
                    <div className='movimentacoes'>
                        {
                            movimentacoes.map((item, pos) => (
                                <Movimentacao 
                                    key={pos}
                                    id={item.id_movimentacao}
                                    titulo={item.ds_titulo}
                                    descricao={item.ds_descricao}
                                    categoria={item.ds_categoria}
                                    tipo={item.ds_tipo}
                                    valor={item.vl_total}
                                    data={formatarData(item.dt_movimentacao)}
                                    criacao={formatarData(item.dt_criacao)}
                                    onAlterar={alterarMovimentacao}
                                    onExcluir={abrirConfirmacao}
                                />
                            ))
                        }
                    </div>
                ) : (
                    <div className='mensagem'>
                        <h2>Nenhuma Movimentação encontrada!</h2>
                    </div>
                )
            }

            {
                mostrarConf &&
                    <Confirmacao 
                        titulo="Excluir Movimentação"
                        mensagem="Deseja excluir essa movimentação?"
                        onCancelar={() => {
                            setMostrarConf(false)
                            setMovimentacaoSelecionada(null)
                        }}
                        onConfirmar={() => excluirMovimentacao(movimentacaoSelecionada)}
                    />
            }
        </div>
    )
}