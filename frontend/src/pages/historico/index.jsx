import './index.scss'
import CabecalhoUsuario from '../../components/cabecalhoUsuario'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Historico() {
    const navigate = useNavigate()

    const [filtro, setFiltro] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('USUARIO')

        if (!token) {
            navigate('/')
        }
    }, [navigate])

    return (
        <div className='pagina-historico'>
            <CabecalhoUsuario />

            <div className='barra'>
                <h1>Histórico Movimentações</h1>

                <div className='barra-pesquisa'>
                    <i class="fa-solid fa-magnifying-glass lupa"></i>
                    <input type="text" placeholder='Busca por título...' />
                </div>
            </div>

            <div className='movimentacoes'>

            </div>
        </div>
    )
}