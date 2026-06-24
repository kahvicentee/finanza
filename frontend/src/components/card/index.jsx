import './index.scss'

export default function Card({
    icone,
    titulo,
    descricao
}) {
    return (
        <div className='comp-card'>
            <button className='icone'>
                <i className={icone}></i>
            </button>
            <h1>{titulo}</h1>
            <p>{descricao}</p>
        </div>
    )
}