import './index.scss'
import CabecalhoUsuario from '../../components/cabecalhoUsuario'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Movimentacoes() {
    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')
    const [categoria, setCategoria] = useState('Salário')
    const [tipo, setTipo] = useState('Receita')
    const [data, setData] = useState('')
    const [carregando, setCarregando] = useState(false)

    const [tituloVazio, setTituloVazio] = useState(false)
    const [valorVazio, setValorVazio] = useState(false)
    const [dataVazia, setDataVazia] = useState(false)

    const navigate = useNavigate()

    function verificacao() {
        let valido = true

        if (titulo === '') {
            setTituloVazio(true)
            valido = false
        }

        if (data === '') {
            setDataVazia(true)
            valido = false
        }

        if (valor === '') {
            setValorVazio(true)
            valido = false
        }

        return valido
    }

    async function adicionarMovimentacao() {
        if (!verificacao()) return
        setCarregando(true)

        try {
            const paramCorpo = {
                "titulo": titulo,
                "descricao": descricao,
                "categoria": categoria,
                "tipo": tipo,
                "valor": valor,
                "data": data
            }
            
        } catch (error) {
            console.log(error)
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('USUARIO')

        if (!token) {
            navigate('/')
        }
    }, [navigate])

    return (
        <div className='pagina-mov'>
            <CabecalhoUsuario />

            <div className='formulario'>
                <div className='titulo'>
                    <h1>Nova Movimentação</h1>
                </div>

                <div className='linha'></div>

                <div className='campos'>
                    <div className='campos-1'>
                        <div className={`campo ${tituloVazio ? 'erro' : ''}`}>
                            <p>Título:</p>
                            <input 
                                type="text" 
                                value={titulo} 
                                onChange={(e) => {
                                    setTitulo(e.target.value)
                                    setTituloVazio(false)
                                }} 
                            />
                            { tituloVazio && <p className='msg-erro'>Preencha esse campo!</p> }
                        </div>

                        <div className='campo'>
                            <p>Descrição:</p>
                            <textarea 
                                value={descricao} 
                                onChange={e => setDescricao(e.target.value)}
                            ></textarea>
                        </div>

                        <div className={`campo ${tituloVazio ? 'erro' : ''}`}>
                            <p>Valor:</p>
                            <input 
                                type="number"
                                step="0.01"
                                min='0'
                                placeholder='0,00' 
                                value={valor}
                                onChange={(e) => {
                                    setValor(e.target.value)
                                    setValorVazio(false)
                                }} 
                            />
                            { valorVazio && <p className='msg-erro'>Preencha esse campo!</p> }
                        </div>
                    </div>

                    <div className='campos-2'>
                        <div className={`campo ${dataVazia ? 'erro' : ''}`}>
                            <p>Data:</p>
                            <input type="date" className='data' value={data} onChange={e => setData(e.target.value)}/>
                            { dataVazia && <p className='msg-erro'>Preencha esse campo!</p> }
                        </div>

                        <div className='campo'>
                            <p>Categoria:</p>
                            <select value={categoria} onChange={e => setCategoria(e.target.value)}>
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
                        </div>

                        <div className='campo'>
                            <p>Tipo:</p>
                            <select value={tipo} onChange={e => setTipo(e.target.value)}>
                                <option value="Receita">Receita</option>
                                <option value="Despesa">Despesa</option>
                            </select>
                        </div>
                    </div>
                </div>

                <button disabled={carregando} onClick={adicionarMovimentacao}>
                    {carregando ? 'Adicionando...' : 'Adicionar'}
                </button>
            </div>
        </div>
    )
}