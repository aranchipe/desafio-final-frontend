import './styles.css';
import IconClose from '../../assets/icon-close.svg';
import { useState } from 'react';
import { clear, getItem, setItem } from '../../utils/storage';
import axios from '../../services/axios';
import { notifyError, notifySucess } from '../../utils/toast';
import IconPassword from '../../assets/icon-password.svg';
import IconPasswordOpen from '../../assets/icon-password-open.svg';
import MaskedInput from '../../utils/MaskedInput';


function EditProfileModal({ closeProfileModal }) {
    const [typePassword, setTypePassword] = useState(false);
    const [typeConfPassword, setTypeConfPassword] = useState(false);
    const token = getItem('token')

    const [form, setForm] = useState({
        name: getItem('name'),
        email: getItem('email'),
        cpf: getItem('cpf'),
        phone: getItem('telephone'),
        password: '',
        confPassword: ''
    })

    function handleChangeForm({ target }) {
        setForm({ ...form, [target.name]: target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!form.name || !form.email || !form.password || !form.confPassword) {
            return notifyError('Informe os campos obrigatórios.')
        }

        if (form.password !== form.confPassword) {
            return notifyError('Senhas não conferem.')
        }

        if (form.password.length < 6) {
            return notifyError('A senha deve ter ao menos 6 caracteres')
        }

        if (form.cpf.length && form.cpf.length !== 11) {
            return notifyError('Informe um CPF de tamanho válido.');
        }

        if (form.phone.length && form.phone.length !== 11) {
            return notifyError('Informe seu número com DDD Ex: "99999999999".');
        }

        try {
            if (form.cpf === 'null') {
                form.cpf = '';
            }

            if (form.phone === 'null') {
                form.phone = '';
            }

            const response = await axios.put('/user',
                {
                    name: form.name,
                    email: form.email,
                    cpf: form.cpf,
                    telephone: form.phone,
                    password: form.password
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            if (response.status === 401) {
                clear();
                return notifyError(response.data.mensagem);
            }

            if (response.status > 204) {
                return notifyError(response.data.mensagem);
            }

            setItem('name', form.name);
            setItem('email', form.email);
            setItem('cpf', form.cpf);
            setItem('telephone', form.phone);

            closeProfileModal();
            return notifySucess('Usuario alterado com sucesso!');
        } catch (error) {
            return notifyError(error.response.data.mensagem);
        }
    }

    return (
        <div className="container-edit-profile">
            <div className="content-edit-modal">
                <img
                    src={IconClose}
                    alt="close"
                    onClick={closeProfileModal}
                />
                <div className="header-edit-modal">
                    <h2>Edite seu cadastro</h2>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
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
                            type='text'
                            name='email'
                            value={form.email}
                            onChange={handleChangeForm}
                            placeholder='Digite seu e-mail'
                        />
                    </label>

                    <div className="content-cpf-phone">
                        <label className='cpf'>
                            CPF
                            <MaskedInput
                                name='cpf'
                                mask='999.999.999-99'
                                value={form.cpf !== 'null' ? form.cpf : ''}
                                onChange={handleChangeForm}
                                placeholder='Digite seu CPF'
                            />
                        </label>
                        <label>
                            Telefone
                            <MaskedInput
                                name='phone'
                                mask='(99)9.9999-9999'
                                value={form.phone !== 'null' ? form.phone : ''}
                                onChange={handleChangeForm}
                                placeholder='Digite seu telefone'
                            />
                        </label>
                    </div>

                    <label className='password-modal'>
                        Nova senha*
                        <input
                            type={typePassword ? 'text' : 'password'}
                            name="password"
                            value={form.password.trim()}
                            onChange={handleChangeForm}
                        />
                        <img
                            src={typePassword ? IconPasswordOpen : IconPassword}
                            onClick={() => setTypePassword(!typePassword)}
                            alt="eye-password"
                        />
                    </label>

                    <label className='password-modal'>
                        Confirmar senha*
                        <input
                            type={typeConfPassword ? 'text' : 'password'}
                            name="confPassword"
                            value={form.confPassword.trim()}
                            onChange={handleChangeForm}
                        />
                        <img
                            src={typeConfPassword ? IconPasswordOpen : IconPassword}
                            onClick={() => setTypeConfPassword(!typeConfPassword)}
                            alt="eye-password"
                        />
                    </label>

                    <div className="area-button">
                        <button
                            className='button-pink'
                        >Aplicar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfileModal;