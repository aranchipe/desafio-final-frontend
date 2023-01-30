import './styles.css';
import overdueBill from '../../assets/overdue-bill.svg';
import paidBill from '../../assets/paid-bill.svg';
import futureBill from '../../assets/future-bill.svg';
import { formatCurrency } from '../../utils/format';

function BillingTags({ somaPendentes, somaPagas, somaVencidas }) {
  return (
    <div className='container-tags'>
      <div className='tag-bill'>
        <img src={paidBill} alt="Paid bill icon"></img>
        <div>
          <h3>Contas Pagas</h3>
          <strong>R$ {formatCurrency(somaPagas.toString())}</strong>
        </div>
      </div>
      <div className='tag-bill tag-red'>
        <img src={overdueBill} alt="Paid bill icon"></img>
        <div>
          <h3>Contas Vencidas</h3>
          <strong>R$ {formatCurrency(somaVencidas.toString())}</strong>
        </div>
      </div>
      <div className='tag-bill tag-yellow'>
        <img src={futureBill} alt="Paid bill icon"></img>
        <div>
          <h3>Contas Previstas</h3>
          <strong>R$ {formatCurrency(somaPendentes.toString())}</strong>
        </div>
      </div>
    </div>
  );
}

export default BillingTags;
