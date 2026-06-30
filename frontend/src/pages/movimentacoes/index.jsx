import './index.scss'
import CabecalhoUsuario from '../../components/cabecalhoUsuario'
import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function Movimentacoes() {
    const { id } = useParams()

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
    const [adicionado, setAdicionado] = useState(false)

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

            const token = localStorage.getItem('USUARIO')
            
            await axios.post(
                'http://localhost:5030/movimentacao',
                paramCorpo,
                {
                    headers: {
                        'x-access-token': token
                    }
                }
            )
        
            setAdicionado(true)
            setTitulo('')
            setDescricao('')
            setValor('')
            setData('')
            setCategoria('Salário')
            setTipo('Receita')
        } catch (error) {
            console.log(error)
        } finally {
            setCarregando(false)
        }
    }

    async function alterarMovimentacao() {
        if(!verificacao()) return

        setCarregando(true)

        try {
            const paramCorpo = {
                titulo,
                descricao,
                categoria,
                tipo,
                valor,
                data
            }

            const token = localStorage.getItem('USUARIO')

            await axios.put(
                `http://localhost:5030/movimentacao/${id}`,
                paramCorpo,
                {
                    headers: {
                        'x-access-token': token
                    }
                }
            )

            navigate('/historico')
        } catch (error) {
            console.log(error.message)
        } finally {
            setCarregando(false)
        }
    }

    async function salvarMovimentacao() {
        if (id) {
            await alterarMovimentacao()
        } else {
            await adicionarMovimentacao()
        }
    }

    const carregarMovimentacao = useCallback(async () => {
        try {
            const token = localStorage.getItem('USUARIO')

            const resp = await axios.get(
                `http://localhost:5030/movimentacao/${id}`,
                {
                    headers: {
                        'x-access-token': token
                    }
                }
            )

            const mov = resp.data

            setTitulo(mov.ds_titulo)
            setDescricao(mov.ds_descricao)
            setCategoria(mov.ds_categoria)
            setTipo(mov.ds_tipo)
            setValor(mov.vl_total)
            setData(mov.dt_movimentacao?.substring(0, 10))
        } catch (error) {
            console.log(error.message)
        }
    }, [id])

    useEffect(() => {
        const token = localStorage.getItem('USUARIO')

        if (!token) {
            navigate('/')
        }
    }, [navigate])

    useEffect(() => {
        if (id) {
            carregarMovimentacao()
        }
    }, [id, carregarMovimentacao])

    return (
        <div className='pagina-mov'>
            <CabecalhoUsuario />

            {
                adicionado &&
                    <div className='msg-adicionado'>
                        <p>Nova Movimentação adicionada com sucesso!</p>
                    </div>
            }

            <div className='formulario'>
                <div className='titulo'>
                    <h1>{id ? 'Editar Movimentação' : 'Nova Movimentação'}</h1>
                </div>

                <div className='linha'></div>

                <div className='campos'>
                    <div className='campos-1'>
                        <div className={`campo ${tituloVazio ? 'erro' : ''}`}>
                            <p>Título: <span>*</span></p>
                            <input 
                                type="text" 
                                value={titulo} 
                                onChange={(e) => {
                                    setTitulo(e.target.value)
                                    setTituloVazio(false)
                                }} 
                            />
                            { tituloVazio && <p className='msg-erro'>Esse campo é obrigatório!</p> }
                        </div>

                        <div className='campo'>
                            <p>Descrição:</p>
                            <textarea 
                                value={descricao} 
                                onChange={e => setDescricao(e.target.value)}
                            ></textarea>
                        </div>

                        <div className={`campo ${tituloVazio ? 'erro' : ''}`}>
                            <p>Valor: <span>*</span></p>
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
                            { valorVazio && <p className='msg-erro'>Esse campo é obrigatório!</p> }
                        </div>
                    </div>

                    <div className='campos-2'>
                        <div className={`campo ${dataVazia ? 'erro' : ''}`}>
                            <p>Data: <span>*</span></p>
                            <input type="date" className='data' value={data} onChange={e => setData(e.target.value)}/>
                            { dataVazia && <p className='msg-erro'>Esse campo é obrigatório!</p> }
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
                                <option value="Compras">Compras</option>
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

                <button disabled={carregando} onClick={salvarMovimentacao}>
                    {
                        carregando
                            ? (id ? 'Alterando...' : 'Adicionando...')
                            : (id ? 'Alterar' : 'Adicionar')
                    }
                </button>
            </div>
        </div>
    )
}