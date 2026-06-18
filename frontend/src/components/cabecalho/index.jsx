import './index.scss'
import { Link } from 'react-router-dom'

export default function Cabecalho() {
    return (
        <div className='comp-cabecalho'>
            <div className='info'>
                <h1>FINANZA</h1>
                <Link to='/login' className='icone'><i class="fa-solid fa-user"></i></Link>
            </div>
            <div className='linha'></div>
        </div>
    )
}