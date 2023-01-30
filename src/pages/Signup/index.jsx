import CustomSteps from '../../components/CustomSteps';
import './styles.css';
import { useState } from 'react';
import IconSucess from '../../assets/icon-sucess.svg';
import IconPassword from '../../assets/icon-password.svg';
import IconPasswordOpen from '../../assets/icon-password-open.svg';
import { Link } from 'react-router-dom';
import axios from '../../services/axios';
import { notifyError } from '../../utils/toast';


function Signup() {
  const [activeStep, setActiveStep] = useState(0);
  const [typePassword, setTypePassword] = useState(false);
  const [typeConfPassword, setTypeConfPassword] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confPassword: ''
  })

  function handleChangeForm({ target }) {
    setForm({ ...form, [target.name]: target.value });
  }

  const handleNext = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      return notifyError('Informe o nome e o email.')
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.password || !form.confPassword) {
      return notifyError('Informe as senhas.')
    }

    if (form.password !== form.confPassword) {
      return notifyError('As senhas não correspondem.')
    }

    if (form.password.length < 6) {
      return notifyError('A senha deve ter ao menos 6 caracteres')
    }

    try {
      const response = await axios.post('/signup', {
        "name": form.name,
        "email": form.email,
        "password": form.password
      })

      if (response.status > 204) {
        return notifyError(response.data.mensagem);
      }
      setActiveStep(3);
    } catch (error) {
      return notifyError(error.response.data.mensagem);
    }
  }

  return (
    <div className="signup">
      <div className="left">
        <div className="content-steps">
          <CustomSteps
            activeStep={activeStep}
          />
        </div>
      </div>
      {activeStep === 0 &&
        <div className="right">
          <h2 className="title-register">Adicione seus dados</h2>

          <form onSubmit={(e) => handleNext(e)}>
            <label>
              Nome*
              <input
                type='text'
                name="name"
                value={form.name}
                onChange={handleChangeForm}
                placeholder='Digite seu nome'
              />
            </label>

            <label>
              E-mail*
              <input
                type='email'
                name='email'
                value={form.email}
                onChange={handleChangeForm}
                placeholder='Digite seu e-mail'
              />
            </label>

            <div className="area-button">
              <button
                className="btn-pink-small"
              >Continuar</button>
            </div>
          </form>
          <p>Já possui uma conta? Faça seu <span className="links"><Link to="/sign-in">Login</Link></span></p>

          <div className="tabs">
            <div className="tab current-tab"></div>
            <div className="tab"></div>
            <div className="tab"></div>
          </div>
        </div>}


      {activeStep === 1 &&
        <div className="right">
          <h2 className="title-register">Escolha uma senha</h2>

          <form onSubmit={(e) => handleSubmit(e)}>
            <label className='password'>
              Senha*
              <input
                type={typePassword ? 'text' : 'password'}
                name="password"
                value={form.password.trim()}
                onChange={handleChangeForm}
                defaultValue='12345'
              />
              <img
                src={typePassword ? IconPasswordOpen : IconPassword}
                onClick={() => setTypePassword(!typePassword)}
                alt='icon-password' />
            </label>

            <label className='password'>
              Repita a senha*
              <input
                type={typeConfPassword ? 'text' : 'password'}
                name="confPassword"
                value={form.confPassword.trim()}
                onChange={handleChangeForm}
                defaultValue='12345'
              />
              <img
                src={typeConfPassword ? IconPasswordOpen : IconPassword}
                onClick={() => setTypeConfPassword(!typeConfPassword)}
                alt='icon-password' />
            </label>

            <div className="area-button">
              <button
                className='button-pink'
              >Entrar</button>
            </div>
          </form>
          <p>Já possui uma conta? Faça seu <Link to="/sign-in">Login</Link></p>

          <div className="tabs">
            <div className="tab"></div>
            <div className="tab current-tab"></div>
            <div className="tab"></div>
          </div>
        </div>
      }

      {activeStep > 1 &&
        <div className="right">
          <div className="card-register-sucess">
            <img src={IconSucess} alt="sucess" />
            <h2>Cadastro realizado com sucesso!</h2>
          </div>
          <Link to="/sign-in" className='button-pink'>
            <button
              className='button-pink'
            >Ir para login</button>
          </Link>

          <div className="tabs">
            <div className="tab"></div>
            <div className="tab"></div>
            <div className="tab current-tab"></div>
          </div>
        </div>
      }
    </div>
  );
}

export default Signup;
