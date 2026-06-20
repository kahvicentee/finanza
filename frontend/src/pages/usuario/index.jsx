import './index.scss'
import CabecalhoUsuario from '../../components/cabecalhoUsuario'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Usuario() {
    const navigate = useNavigate()
    const [alterar, setAlterar] = useState(false)
    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [nascimento, setNascimento] = useState('')
    const [email, setEmail] = useState('')
    const [novaSenha, setNovaSenha] = useState('')

    async function buscarInfo() {

    }

    async function alterarUsu() {
        setAlterar(true)

        const paramCorpo = {
            "nome": nome,
            "sobrenome": sobrenome,
            "nascimento": nascimento,
            "email": email,
            "senha": novaSenha
        }

        let url = `http://localhost:5030/usuario`
    }

    useEffect(() => {
        const token = localStorage.getItem('USUARIO')

        if(!token) {
            navigate('/')
        }
    }, [navigate])

    return (
        <div className='pagina-usuario'>
            <CabecalhoUsuario />

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
                        disabled='true'
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

                <button onClick={alterarUsu} className='botao'>{alterar ? 'Salvar Alterações' : 'Alterar'}</button>
            </div>
        </div>
    )
}