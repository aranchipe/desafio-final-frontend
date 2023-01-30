import './style.css'
import close from '../../assets/icon-close.svg'
import warning from '../../assets/warning.svg'
import axios from '../../services/axios'
import { clear, getItem } from '../../utils/storage'
import { notifyError, notifySucess } from '../../utils/toast';


function DeleteBillingModal({ setOpenDeleteBillingModal, currentBilling, listBilling }) {
    const token = getItem('token')


    async function handleDelete() {
        try {
            const deleted = await axios.delete(`/billings/${currentBilling.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (deleted.status === 401) {
                clear();
                return notifyError(deleted.data.mensagem);
            }
            listBilling()
            setOpenDeleteBillingModal(false)
            if (deleted.status > 204) {
                return notifyError('Esta cobrança não pode ser excluída!');

            }
            return notifySucess('Cobrança excluída com sucesso!');

        } catch (error) {
            return notifyError(error.response.data.mensagem);
        }
    }
    return (
        <div className='delete-bill-modal-body'>
            <div className='delete-bill-modal-container'>
                <img onClick={() => setOpenDeleteBillingModal(false)} className='close-icon' src={close} alt='close' />
                <img className='warning-img' src={warning} alt='warning' />
                <h2>Tem certeza que deseja excluir esta cobrança?</h2>
                <div className='delete-btn'>
                    <button onClick={() => setOpenDeleteBillingModal(false)} className='no-btn'>Não</button>
                    <button onClick={handleDelete} className='yes-btn'>Sim</button>

                </div>
            </div>
        </div>
    )
}

export default DeleteBillingModal