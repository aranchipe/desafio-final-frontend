import { useState, useEffect } from 'react';
import './styles.css';
import IconPassword from '../../assets/icon-password.svg';
import IconPasswordOpen from '../../assets/icon-password-open.svg'
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../services/axios';
import { setItem, getItem } from '../../utils/storage';
import { notifyError } from '../../utils/toast';

function SignIn() {
    const navigate = useNavigate();
    const [typePassword, setTypePassword] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    useEffect(() => {
        const token = getItem('token')
        if (token) {
            navigate('/main')
        }
    }, [])

    function handleChangeForm({ target }) {
        setForm({ ...form, [target.name]: target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (!form.email || !form.password) {
            return notifyError('Informe o email e a senha.')
        }

        try {
            const response = await axios.post('/signin', {
                "email": form.email,
                "password": form.password
            });

            if (response.status > 204) {
                return notifyError(response.data.mensagem);
            }

            const { usuario, token } = response.data;
            setItem('token', token);
            setItem('name', usuario.nome);
            setItem('email', usuario.email);
            navigate('/main')
        } catch (error) {
            return notifyError(error.response.data.mensagem);
        }
    }

    return (
        <div className="signin">
            <div className="left-signin">
                <h2 className="title-left-signin">Gerencie todos os pagamentos<br /> de sua empresa em um só<br /> lugar.</h2>
            </div>
            <div className="right-signin">
                <h2 className="title-signin">Faça seu login!</h2>
                <form className="form-input" onSubmit={(e) => handleSubmit(e)}>
                    <label>
                        E-mail
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChangeForm}
                            placeholder="Digite seu e-mail"
                        />
                    </label>

                    <label className="password-signin">
                        Senha
                        <input
                            type={typePassword ? 'text' : 'password'}
                            name="password"
                            value={form.password}
                            onChange={handleChangeForm}
                            placeholder="Digite sua senha"
                        />
                        <Link to="/sign-in" className="forgot-password">Esqueceu a senha?</Link>
                        <img
                            src={typePassword ? IconPasswordOpen : IconPassword}
                            onClick={() => setTypePassword(!typePassword)}
                            alt='icon-password' />
                        <div className="area-button-signin">
                            <button
                                className="btn-pink-small" onClick={() => handleSubmit()}
                            >Entrar</button>
                        </div>
                    </label>
                </form>
                <p>Ainda não possui uma conta? <span className="links"><Link to="/sign-up">Cadastre-se</Link></span></p>
            </div>
        </div>
    )
}

export default SignIn;