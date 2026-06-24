import './index.scss'
import CabecalhoUsuario from '../../components/cabecalhoUsuario'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Planilhas() {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('USUARIO')

        if (!token) {
            navigate('/')
        }
    }, [navigate])

    return (
        <div className='pagina-planilhas'>
            <CabecalhoUsuario />
            
        </div>
    )
}