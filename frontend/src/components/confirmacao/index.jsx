import './index.scss'

export default function Confirmacao({
    titulo,
    mensagem,
    onConfirmar,
    onCancelar
}) {
    return (
        <div className='comp-conf'>
            <div className='info'>
                <h2>{titulo}</h2>
                <p>{mensagem}</p>

                <div className='acoes'>
                    <button 
                        className='confirmar' 
                        onClick={onConfirmar}
                    >
                        Sim
                    </button>

                    <button 
                        className='cancelar'
                        onClick={onCancelar}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}