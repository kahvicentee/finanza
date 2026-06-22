import './index.scss'
import CabecalhoUsuario from '../../components/cabecalhoUsuario'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Usuario() {
    const navigate = useNavigate()
    const [alterar, setAlterar] = useState(false)
    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [nascimento, setNascimento] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [novaSenha, setNovaSenha] = useState('')

    async function buscarInfo(token) {
        const resp = await axios.get(
            'http://localhost:5030/usuario',
            { 
                headers: {
                    'x-access-token': token
                }
            }
        )

        setNome(resp.data.ds_nome)
        setSobrenome(resp.data.ds_sobrenome)
        setNascimento(resp.data.dt_nascimento.split('T')[0])
        setEmail(resp.data.ds_email)
        setSenha(resp.data.ds_senha)
    }

    async function alterarUsu() {
        if (!alterar) { 
            setAlterar(true)
            return
        }

        try {
            const paramCorpo = {
                "nome": nome,
                "sobrenome": sobrenome,
                "nascimento": nascimento,
                "email": email,
            }

            if (novaSenha.trim() !== '') {
                paramCorpo.senha = novaSenha
            }

            const token = localStorage.getItem('USUARIO')
            const resp = await axios.put(
                'http://localhost:5030/usuario',
                paramCorpo,
                {
                    headers: {
                        'x-access-token': token
                    }
                }
            )
            
            setAlterar(false)
        } catch (error) {

        }
    }

    useEffect(() => {
        const token = localStorage.getItem('USUARIO')

        if(!token) {
            navigate('/')
        } else {
            buscarInfo(token)
        }
    }, [navigate])

    return (
        <div className='pagina-usuario'>
            <CabecalhoUsuario />

            <div className='ola'>
                <h1>Informações do Usuário</h1>
                <div className='linha'></div>
            </div>

            <div className='dados'>
                <div className='dado'>
                    <p>Nome:</p>
                    <input 
                        type="text" 
                        disabled={!alterar}
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                </div>

                <div className='dado'>
                    <p>Sobrenome:</p>
                    <input 
                        type="text" 
                        disabled={!alterar}
                        value={sobrenome}
                        onChange={e => setSobrenome(e.target.value)}
                    />
                </div>

                <div className='dado'>
                    <p>Data de Nascimento:</p>
                    <input 
                        type="date" 
                        className='input-data'
                        disabled={!alterar}
                        value={nascimento}
                        onChange={e => setNascimento(e.target.value)}
                    />
                </div>

                <div className='dado'>
                    <p>Email:</p>
                    <input 
                        type="text" 
                        disabled={!alterar}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className='dado'>
                    <p>Senha:</p>
                    <input 
                        type="text" 
                        disabled
                        value={"*".repeat(senha.length)}
                    />
                </div>

                <div className='dado'>
                    <p>Nova Senha:</p>
                    <input 
                        type="text" 
                        disabled={!alterar}
                        value={novaSenha}
                        onChange={e => setNovaSenha(e.target.value)}
                    />
                </div>

                <div className='botoes'>
                    <button onClick={alterarUsu} className='botao'>
                        {alterar ? 'Salvar Alterações' : 'Alterar'}
                    </button>

                    <button className='botao-apagar'>
                        <i className='fa-regular fa-trash-can'></i>
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    )
}