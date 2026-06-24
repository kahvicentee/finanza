import './index.scss'

export default function Movimentacao({
    id,
    titulo,
    descricao,
    categoria,
    tipo,
    valor,
    data,
    criacao,
    onAlterar,
    onExcluir
}) {

    return (
        <div className={`comp-mov ${tipo === "Receita" ? "entrada" : "saida"}`}>
            <div className='conteudo'>
                <div className='titulo'>
                    <h1>{titulo}</h1>
                    <p>{descricao}</p>
                    <p className='cat'>{categoria}</p>
                </div>

                <div className={`valor ${tipo === "Despesa" ? 'despesa' : "receita"}`}>
                    {
                      tipo === "Despesa"
                        ? <i className='fa-solid fa-arrow-down seta'></i> 
                        : <i className='fa-solid fa-arrow-up seta'></i>
                    }
                    <h1>R$ {valor}</h1>
                </div>
            </div>

            <div className='acoes'>
                <div className='datas'>
                    <div className='data'>
                        <p>Data:</p>
                        <p>{data}</p>
                    </div>

                    <div className='data'>
                        <p>Adicionado em:</p>
                        <p>{criacao}</p>
                    </div>
                </div>
                
                <div className='botoes'>
                    <button 
                        className='botao alterar'
                        onClick={() => onAlterar(id)}
                    >
                        <i className='fa-solid fa-pen'></i>
                        <p>Alterar</p>
                    </button>

                    <button 
                        className='botao excluir'
                        onClick={() => onExcluir(id)}
                    >
                        <i className='fa-regular fa-trash-can'></i>
                        <p>Excluir</p>
                    </button>
                </div>
            </div>
        </div>
    )
}