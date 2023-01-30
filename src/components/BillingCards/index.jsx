import './styles.css';
import { setItem, removeItem } from '../../utils/storage'
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/format';


function BillingCards({ billing }) {
  const navigate = useNavigate()

  const billingsVencidas = billing.filter((item) => {
    return item.status === 'Vencida'
  })

  const billingsPendentes = billing.filter((item) => {
    return item.status === 'Pendente'
  })

  const billingsPagas = billing.filter((item) => {
    return item.status === 'Paga'
  })


  function vencida() {
    setItem('categoria', 'Vencida')
    navigate('/billing')
  }

  function pendentes() {
    removeItem('categoria')
    setItem('categoria', 'Pendente')
    navigate('/billing')
  }

  function pagas() {
    removeItem('categoria')
    setItem('categoria', 'Paga')
    navigate('/billing')
  }

  return (
    <div className='container-card-billing'>
      <div>
        <div className='card-billing-top'>
          <h3>Cobranças Vencidas</h3>
          <div className='card-billing-top-number'>
            <strong>{billingsVencidas.length}</strong>
          </div>
        </div>
        <div className='card-billing-table'>
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>ID da cob.</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {billingsVencidas.slice(0, 4).map((item) => (
                <tr>
                  <td>{item.client_name}</td>
                  <td>{item.id}</td>
                  <td>{`R$ ${formatCurrency(item.value)}`}</td>
                </tr>

              ))}
            </tbody>
          </table>
        </div>
        <div className='card-billing-bottom'>
          <span onClick={vencida}>Ver todos</span>
        </div>
      </div>

      <div>
        <div className='card-billing-top'>
          <h3>Cobranças Pendentes</h3>
          <div className='card-billing-top-number card-yellow'>
            <strong>{billingsPendentes.length}</strong>
          </div>
        </div>

        <div className='card-billing-table'>
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>ID da cob.</th>
                <th>Valor</th>
              </tr>
            </thead>

            <tbody>
              {billingsPendentes.slice(0, 4).map((item) => (
                <tr>
                  <td>{item.client_name}</td>
                  <td>{item.id}</td>
                  <td>{`R$ ${formatCurrency(item.value)}`}</td>
                </tr>

              ))}
            </tbody>
          </table>

        </div>

        <div className='card-billing-bottom'>
          <span onClick={pendentes}>Ver todos</span>
        </div>
      </div>

      <div>
        <div className='card-billing-top'>
          <h3>Cobranças Pagas</h3>
          <div className='card-billing-top-number card-green'>
            <strong>{billingsPagas.length}</strong>
          </div>
        </div>

        <div className='card-billing-table'>
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>ID da cob.</th>
                <th>Valor</th>
              </tr>
            </thead>

            <tbody>
              {billingsPagas.slice(0, 4).map((item) => (
                <tr>
                  <td>{item.client_name}</td>
                  <td>{item.id}</td>
                  <td>{`R$ ${formatCurrency(item.value)}`}</td>
                </tr>

              ))}
            </tbody>
          </table>

        </div>

        <div className='card-billing-bottom'>
          <span onClick={pagas}>Ver todos</span>
        </div>
      </div>
    </div>
  );
}

export default BillingCards;
