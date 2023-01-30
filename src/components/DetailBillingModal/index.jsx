import './style.css';
import close from '../../assets/icon-close.svg';
import billingIcon from '../../assets/billing.svg';
import { format } from 'date-fns';
import { formatCurrency } from '../../utils/format';


function DetailBillingModal({ setOpenDetailBillingModal, currentBilling }) {

    return (
        <div className='detail-bill-modal-body'>
            <div className='detail-bill-modal-container'>
                <img onClick={() => setOpenDetailBillingModal(false)} className='close-icon' src={close} alt='close' />
                <div className='detail-title'>
                    <img src={billingIcon} alt='Billing Icon' />
                    <h2>Detalhe da Cobrança</h2>
                </div>
                <div className='detail-data detail-name'>
                    <strong>Nome</strong>
                    <span>{currentBilling.client_name}</span>
                </div>
                <div className='detail-data detail-description'>
                    <strong>Descrição</strong>
                    <span>{currentBilling.description}</span>
                </div>
                <div className='detail-inline'>
                    <div className='detail-data detail-limit'>
                        <strong>Vencimento</strong>
                        <span>{format(new Date(currentBilling.due_date), 'dd/MM/yyyy')}</span>
                    </div>
                    <div className='detail-data detail-value'>
                        <strong>Valor</strong>
                        <span>R$ {formatCurrency(currentBilling.value)}</span>
                    </div>
                </div>
                <div className='detail-inline'>
                    <div className='detail-data detail-id'>
                        <strong>ID cobranças</strong>
                        <span>{currentBilling.id}</span>
                    </div>
                    <div className='detail-data detail-status'>
                        <strong>Status</strong>
                        <span className={(currentBilling.status).toLowerCase() === 'pendente' ? 'status pendente' : (currentBilling.status).toLowerCase() === 'vencida' ? 'status vencida' : 'status paga'
                        }>{currentBilling.status}</span>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default DetailBillingModal