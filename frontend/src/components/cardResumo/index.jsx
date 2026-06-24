import './index.scss'

export default function CardResumo({
    titulo,
    icone,
    total,
    mensagem
}) {
    return (
        <div className={`comp-card-resumo 
            ${titulo === 'Saldo Total' ? 'saldo' : (titulo === 'Receitas' ? 'receita' : 'despesa')}
        `}>
            <div className='titulo'>
                <h2>{titulo}</h2>
                <i className={`icone ${icone}`}></i>
            </div>
            
            <h1>R$ {total}</h1>
            <p>{mensagem}</p>
        </div>
    )
}