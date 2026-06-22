import './index.scss'
import CabecalhoUsuario from '../../components/cabecalhoUsuario'
import Movimentacao from '../../components/movimentacao'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Historico() {
    const navigate = useNavigate()

    const [titulo, setTitulo] = useState('')
    const [filtro, setFiltro] = useState('Hoje')
    const [categoria, setCategoria] = useState('')
    const [tipo, setTipo] = useState('')
    const [movimentacoes, setMovimentacoes] = useState([])

    async function buscarMovimentacoes(token) {
        
    }   

    useEffect(() => {
        const token = localStorage.getItem('USUARIO')

        if (!token) {
            navigate('/')
        } else {
            buscarMovimentacoes(token)
        }
    }, [navigate])

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
                    <option value="">Hoje</option>
                    <option value="">Últimos 7 dias</option>
                    <option value="">Desse mês</option>
                    <option value="">Mês passado</option>
                    <option value="">Todas</option>
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

            <div className='movimentacoes'>
                <Movimentacao
                    titulo="Salário Junho"
                    descricao=""
                    categoria="Salário"
                    tipo="Receita"
                    valor="2500"
                    data="20/06/2026"
                />
            </div>
        </div>
    )
}