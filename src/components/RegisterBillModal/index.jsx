import './style.css'
import billing from '../../assets/billing.svg'
import close from '../../assets/icon-close.svg'
import { useState } from 'react'
import { notifyError, notifySucess } from '../../utils/toast';
import axios from '../../services/axios'
import { clear, getItem } from '../../utils/storage';
import { MaskedCurrency } from '../../utils/MaskedInput';


function RegisterBillModal({ setOpenRegisterBillModal, currentCustomer, listBillings }) {
    const [status, setStatus] = useState(true)
    const token = getItem('token')

    const [form, setForm] = useState({
        client_id: currentCustomer.id,
        description: '',
        due_date: '',
        value: '',
        status: 'Paga'
    })

    function maskCurrency(e) {
        let value = e.target.value;
        value = value.replace(/\D/g, "");
        value = value.replace(/(\d)(\d{2})$/, "$1,$2");
        value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
        return value;
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (!form.description || !form.due_date || !form.value || !form.status) {
            return notifyError('Informe todos os campos obrigatórios.');
        }

        let saveCurrency = form.value.replace(/\D/g, "").trim();
        let dateFormated = `${form.due_date}T15:10:00+03:00`;
        console.log(dateFormated);
        try {
            const response = await axios.post('/billing',
                {
                    ...form,
                    value: saveCurrency,
                    due_date: dateFormated
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            if (response.status === 401) {
                clear();
                return notifyError(response.data.mensagem);
            }
            setOpenRegisterBillModal(false);
            return notifySucess(response.data.mensagem);
        } catch (error) {
            return notifyError(error.response.data.mensagem);
        }
    }

    async function handleChangeInput(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function handleChangeCurrency(e) {
        setForm({ ...form, value: maskCurrency(e) })
    }

    function handleClickPaga() {
        setStatus(true)
        setForm({ ...form, status: 'Paga' })
    }

    function handleClickPendente(date) {
        setStatus(false)
        setForm({ ...form, status: 'Pendente' })
    }


    return (
        <div className='container-register-bill-modal'>
            <form onSubmit={(e) => handleSubmit(e)} className='form-register-bill'>
                <div className='register-bill-header'>
                    <img src={billing} alt='billsIcon' />
                    <h1>Cadastro de Cobrança</h1>
                </div>
                <label>Nome*</label>
                <input
                    id='name'
                    name='name'
                    placeholder='Digite o nome'
                    className='input'
                    defaultValue={currentCustomer.name}
                />
                <label>Descrição*</label>
                <input
                    id='descricao'
                    name='description'
                    placeholder='Digite a descrição'
                    className='input'
                    onChange={handleChangeInput}
                />
                <div className='vencimento-valor'>
                    <div className='vencimento'>
                        <label>Vencimento*</label>
                        <input
                            id='vencimento'
                            name='due_date'
                            placeholder='Data de vencimento'
                            className='input'
                            type='date'
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className='valor'>
                        <label>Valor*</label>
                        <MaskedCurrency
                            id='valor'
                            name='value'
                            value={form.value}
                            className='input'
                            onChange={(e) => handleChangeCurrency(e)}
                            placeholder='Digite o valor'
                        />
                        <span>R$</span>
                    </div>
                </div>
                <label className='status'>Status*</label>
                <div className='div-paga'>
                    <input
                        className={status ? 'checked' : 'unchecked'}
                        onClick={() => handleClickPaga()}
                        name='status'
                        type='radio'
                    />

                    <span>Cobrança Paga</span>
                </div>
                <div className='div-pendente'>
                    <input
                        className={status ? 'unchecked' : 'checked'}
                        onClick={() => handleClickPendente(form.due_date)}
                        name='status'
                        type='radio'
                    />
                    <span>Cobrança Pendente</span>
                </div>

                <div className='botoes-register-bill-modal'>
                    <button onClick={() => setOpenRegisterBillModal(false)} type='button' className='btn-cancelar'>Cancelar</button>
                    <button className='btn-aplicar'>Aplicar</button>
                </div>

                <img className='close-icon' src={close} alt='icon-close' onClick={() => setOpenRegisterBillModal(false)} />

            </form>
        </div>
    )
}

export default RegisterBillModal
