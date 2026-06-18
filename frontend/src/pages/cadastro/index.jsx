import './index.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

export default function Cadastro() {
    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [nascimento, setNascimento] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confSenha, setConfSenha] = useState('')

    const [nomeVazio, setNomeVazio] = useState(false)
    const [sobrenomeVazio, setSobrenomeVazio] = useState(false)
    const [nascimentoVazio, setNascimentoVazio] = useState(false)
    const [emailVazio, setEmailVazio] = useState(false)
    const [senhaVazia, setSenhaVazia] = useState(false)
    const [confSenhaVazia, setConfSenhaVazia] = useState(false)
    const [senDif, setSenDif] = useState(false)

    const [emailInvalido, setEmailInvalido] = useState(false)
    const [dataInvalida, setDataInvalida] = useState(false)

    const navigate = useNavigate()

    function verificacao() {
        let valido = true

        if (nome.trim() === '') {
            setNomeVazio(true)
            valido = false
        }
        if (sobrenome === '') {
            setSobrenomeVazio(true)
            valido = false
        }
        if (nascimento === '') {
            setNascimentoVazio(true)
            valido = false
        }
        if (email.trim() === '') {
            setEmailVazio(true)
            valido = false
        }
        if (senha.trim() === '') {
            setSenhaVazia(true)
            valido = false
        }
        if (confSenha.trim() === '') {
            setConfSenhaVazia(true)
            valido = false
        }

        if (senha.trim() !== confSenha.trim()) {
            setSenDif(true)
            valido = false
        }

        /* Verificando Email */
        const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

        if (email === '') {
            setEmailInvalido(false) 
        } else if (!emailVal) {
            setEmailInvalido(true)
            valido = false
        }

        /* Verificando Data de Nascimento */
        const hoje = new Date()
        const dataNascimento = new Date(nascimento)

        if (dataNascimento > hoje) {
            setDataInvalida(true)
            valido = false
        }

        return valido
    }
    
    async function cadastrar() {
        if (!verificacao()) return

        const paramCorpo = {
            "nome": nome,
            "sobrenome": sobrenome,
            "nascimento": nascimento,
            "email": email,
            "senha": senha
        }

        const url = 'http://localhost:5030/usuario'

        try {
            let resp = await axios.post(url, paramCorpo)

            if (resp.data.erro !== undefined) {
                alert(resp.data.erro)
            } else {
                localStorage.setItem('USUARIO', resp.data.token)
                navigate('/login')
            }
        } catch (error) {
            alert('Erro ao cadastrar novo usuário!')
            console.log(error)
        }
    }

    function enter(a) {
        if (a.key === 'Enter') {
            cadastrar()
        }
    }

    return (
        <div className='pagina-cadastro'>
            <div className='formulario'>
                <button className='botao-voltar'>          
                    <Link to="/" className='voltar'>
                        <i className="fa-solid fa-arrow-left"></i>
                        Voltar
                    </Link>
                </button>

                <div className='titulo'>
                    <h2>Criar sua conta</h2>
                    <p>Comece a controlar suas finanças hoje</p>
                </div>
            
                <div className='campos'>
                    <div className={`campo ${nomeVazio ? 'erro' : ''}`}>
                        <p>Nome:</p>
                        <input 
                            type="text" value={nome} 
                            onChange={e => {
                                setNome(e.target.value)
                                setNomeVazio(false)
                            }} 
                        />
                        {
                            nomeVazio && <p className='msg-erro'>Esse campo é obrigatório!</p>
                        }
                    </div>

                    <div className={`campo ${sobrenomeVazio ? 'erro' : ''}`}>
                        <p>Sobrenome:</p>
                        <input 
                            type="text" 
                            value={sobrenome} 
                            onChange={e => {
                                setSobrenome(e.target.value)
                                setSobrenomeVazio(false)
                            }} 
                        />
                        {
                            sobrenomeVazio && <p className='msg-erro'>Esse campo é obrigatório!</p>
                        }
                    </div>

                    <div className={`campo ${nascimentoVazio ? 'erro' : ''}`}>
                        <p>Data de Nascimento:</p>
                        <input 
                            type="date" 
                            className="input-data" 
                            value={nascimento} 
                            onChange={e => {
                                setNascimento(e.target.value)
                                setNascimentoVazio(false)
                            }} 
                        />
                        {
                            nascimentoVazio && <p className='msg-erro'>Esse campo é obrigatório!</p>
                        }
                        {
                            dataInvalida && <p className='msg-erro'>Informe uma data válida!</p>
                        }
                    </div>

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
                        {
                            emailInvalido && <p className='msg-erro'>Email inválido!</p>
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
                        />
                        {
                            senhaVazia && <p className='msg-erro'>Esse campo é obrigatório!</p>
                        }
                        {
                            senDif && <p className='msg-erro'>Você digitou duas senhas diferentes!</p>
                        }
                    </div>

                    <div className={`campo ${confSenhaVazia ? 'erro' : ''}`}>
                        <p>Confirme a senha:</p>
                        <input 
                            type="password" 
                            value={confSenha} 
                            onChange={e => {
                                setConfSenha(e.target.value)
                                setConfSenhaVazia(false)
                            }} 
                            onKeyUp={enter}
                        />
                        {
                            confSenhaVazia && <p className='msg-erro'>Esse campo é obrigatório!</p>
                        }
                        {
                            senDif && <p className='msg-erro'>Confirme a senha novamente.</p>
                        }
                    </div>
                </div>
            
                <div className='botao'>
                    <button onClick={cadastrar}>Cadastrar</button>
                    <p>Já possui uma conta? <label><Link to='/login' className='ent'>Entrar</Link></label> </p>
                </div>
            </div>
        </div>
    )
}