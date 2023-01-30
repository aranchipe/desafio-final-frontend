import './style.css'
import clientsIcon from '../../assets/clients.svg'
import { useState } from 'react'
import axios from '../../services/axios'
import close from '../../assets/icon-close.svg'
import { notifyError, notifySucess } from '../../utils/toast';
import { clear, getItem } from '../../utils/storage'
import MaskedInput from '../../utils/MaskedInput'

function RegisterClientModal({ setOpenRegisterModal, listCustomers }) {
    const token = getItem('token')

    const [form, setForm] = useState({
        name: '',
        email: '',
        cpf: '',
        telephone: '',
        street: '',
        complement: '',
        cep: '',
        district: '',
        city: '',
        state: ''
    })

    async function handleSubmit(e) {
        e.preventDefault()
        if (!form.name || !form.email || !form.cpf || !form.telephone) {
            return notifyError('Informe todos os campos obrigatórios.');
        }

        if (form.cpf.length !== 11) {
            return notifyError('Informe um CPF de tamanho válido. Ex: "11122233345"');
        }

        if (form.cep && form.cep.length !== 8) {
            return notifyError('Digite um CEP válido! Ex: "55544489"');
        }

        if (form.telephone.length !== 11) {
            return notifyError('Informe seu número com DDD Ex: "99999999999".');
        }

        try {
            const response = await axios.post('/clients',
                {
                    name: form.name,
                    email: form.email,
                    cpf: form.cpf,
                    telephone: form.telephone,
                    street: form.street,
                    complement: form.complement,
                    cep: form.cep,
                    district: form.district,
                    city: form.city,
                    state: form.state
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (response.status === 401) {
                clear();
                return notifyError(response.data.mensagem);
            }
            setOpenRegisterModal(false);
            listCustomers()
            return notifySucess('Cliente registrado com sucesso!');
        } catch (error) {
            return notifyError(error.response.data.mensagem);
        }

    }

    async function handleChangeInput(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleCep(e) {
        setForm({ ...form, [e.target.name]: e.target.value })

        try {
            if (form.cep.length === 8) {
                const response = await axios.get(`/viaCEP/${form.cep}`)
                if (response.data.erro) {
                    return notifyError('Informe um CEP válido.');
                }
                setForm({
                    ...form,
                    district: response.data.bairro,
                    city: response.data.localidade,
                    state: response.data.uf,
                    street: response.data.logradouro
                })
            }

        } catch (error) {
            return notifyError('Digite um CEP válido.');
        }
    }

    function handleChangeCep(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <div className='container-register-client-modal'>
            <form onSubmit={(e) => handleSubmit(e)} className='form-register-client'>
                <div className='register-client-header'>
                    <img src={clientsIcon} alt='clientsIcon' />
                    <h1>Cadastro do Cliente</h1>
                </div>

                <img className='close-icon' src={close} alt='icon-close' onClick={() => setOpenRegisterModal(false)} />

                <label>Nome*</label>
                <input
                    id='name'
                    name='name'
                    placeholder='Digite o nome'
                    onChange={handleChangeInput}
                    value={form.name}
                />
                <label>E-mail*</label>
                <input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Digite o e-mail'
                    onChange={handleChangeInput}
                    value={form.email}
                />
                <div className='cpf-telephone'>
                    <div className='cpf'>
                        <label>CPF*</label>
                        <MaskedInput
                            name='cpf'
                            mask='999.999.999-99'
                            value={form.cpf}
                            onChange={handleChangeInput}
                            placeholder='Digite seu CPF'
                        />
                    </div>
                    <div className='telephone'>
                        <label id='telephone'>Telefone*</label>
                        <MaskedInput
                            name='telephone'
                            mask='(99)9.9999-9999'
                            value={form.telephone}
                            onChange={handleChangeInput}
                            placeholder='Digite seu telefone'
                        />
                    </div>
                </div>
                <label>Endereço</label>
                <input
                    id='street'
                    name='street'
                    placeholder='Digite o endereço'
                    onChange={handleChangeInput}
                    value={form.street}
                />
                <label>Complemento</label>
                <input
                    id='complement'
                    name='complement'
                    placeholder='Digite o complemento'
                    onChange={handleChangeInput}
                    value={form.complement}
                />
                <div className='cep-bairro'>
                    <div className='cep'>
                        <label>CEP</label>
                        <input
                            id='cep'
                            name='cep'
                            type='number'
                            placeholder='Digite o CEP'
                            onChange={handleChangeCep}
                            value={form.cep}
                            onKeyUp={handleCep}
                        />
                    </div>
                    <div className='bairro'>
                        <label>Bairro</label>
                        <input
                            id='district'
                            name='district'
                            placeholder='Digite o bairro'
                            onChange={handleChangeInput}
                            value={form.district}
                        />
                    </div>
                </div>
                <div className='city-state'>
                    <div className='city'>
                        <label>Cidade</label>
                        <input
                            id='city'
                            name='city'
                            placeholder='Digite a cidade'
                            onChange={handleChangeInput}
                            value={form.city}
                        />
                    </div>
                    <div className='state'>
                        <label id='state'>UF</label>
                        <input
                            id='state'
                            name='state'
                            placeholder='Digite a UF'
                            onChange={handleChangeInput}
                            value={form.state}
                        />
                    </div>
                </div>
                <div className='botoes'>
                    <button onClick={() => setOpenRegisterModal(false)} type='button' className='btn-cancelar'>Cancelar</button>
                    <button className='btn-aplicar'>Aplicar</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterClientModal