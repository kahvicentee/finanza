import './index.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [carregando, setCarregando] = useState(false)

    const [emailVazio, setEmailVazio] = useState(false)
    const [senhaVazia, setSenhaVazia] = useState(false)
    const [naoEncontrado, setNaoEncontrado] = useState(false)

    const navigate = useNavigate()

    async function entrar() {
        let valido = true

        if (email.trim() === '') {
            setEmailVazio(true)
            valido = false
        }
        if (senha.trim() === '') {
            setSenhaVazia(true)
            valido = false
        }

        if (valido === false) return
        setCarregando(true)

        try {
            if (email !== '' && senha !== '') {
                const paramCorpo = {
                    "email": email,
                    "senha": senha
                }

                const url = 'http://localhost:5030/usuario/entrar'
                let resp = await axios.post(url, paramCorpo)

                if (resp.data.erro !== undefined) {
                    setNaoEncontrado(true)
                } else {
                    localStorage.setItem('USUARIO', resp.data.token)
                    navigate('/movimentacoes')
                }
            }
        } catch (error) {
            console.log(error)
            setNaoEncontrado(true)
        } finally {
            setCarregando(false)
        }
    }

    function enter(a) {
        if (a.key === "Enter") {
            entrar()
        }
    }

    return (
        <div className='pagina-login'>
            <div className='formulario'>
                <button className='botao-voltar'>          
                    <Link to="/" className='voltar'>
                        <i class="fa-solid fa-angle-left"></i>
                        Voltar
                    </Link>
                </button>
                <div className='titulo'>
                    <h2>Bem-vindo de volta</h2>
                    <p>Entre na sua conta para continuar</p>
                </div>

                <div className='campos'>
                    <div className={`campo ${emailVazio ? 'erro' : ''}`}>
                        <p>Email: </p>
                        <input 
                            type="text" 
                            value={email} 
                            onChange={e => {
                                setEmail(e.target.value)
                                setEmailVazio(false)
                            }} 
                        />
                        { 
                            emailVazio && <p className='msg-erro'>Esse campo é obrigatório!</p>
                        }
                    </div>
                    <div className={`campo ${senhaVazia ? 'erro' : ''}`}>
                        <p>Senha: </p>
                        <input 
                            type="password" 
                            value={senha} 
                            onChange={e => {
                                setSenha(e.target.value)
                                setSenhaVazia(false)
                            }} 
                            onKeyUp={enter}
                        />
                        {
                            senhaVazia && <p className='msg-erro'>Esse campo é obrigatório!</p>
                        }
                        {
                            naoEncontrado && <p className='msg-erro'>Usuário ou senha incorreto(s).</p>
                        }
                    </div>
                </div>

                <div className='botao'>
                    <button disabled={carregando} onClick={entrar}>
                        {carregando ? 'Entrando...' : 'Entrar'}
                    </button>
                    <p>Ainda não tem uma conta? <label><Link to='/cadastro' className='cad'>Cadastre-se</Link></label> </p>
                </div>
            </div>
        </div>
    )
}