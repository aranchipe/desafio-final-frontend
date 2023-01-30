import './styles.css';
import noClient from '../../assets/client-no.svg';
import okClient from '../../assets/client-ok.svg';
import { useState, useEffect } from 'react';
import { notifyError } from '../../utils/toast';
import { getItem, setItem, removeItem, clear } from '../../utils/storage';
import axios from '../../services/axios'
import { useNavigate } from 'react-router-dom';
import { formatCpf } from '../../utils/format';


function ClientCards() {
  const [customers, setCustomers] = useState([])
  const token = getItem('token')
  const navigate = useNavigate()

  function inadimplente() {
    removeItem('overcount')
    setItem('overcount', 'inadimplente')
    navigate('/customers')
  }

  function emDia() {
    removeItem('overcount')
    setItem('overcount', '0')
    navigate('/customers')
  }

  async function listCustomers() {
    try {
      const response = await axios.get('/clients', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 401) {
        clear();
        return notifyError(response.data.mensagem);
      }
      setCustomers(response.data)
    } catch (error) {
      return notifyError(error.response.data.mensagem);
    }
  }

  useEffect(() => {
    listCustomers()

  }, [])

  const customersInadimplentes = customers.filter((item) => {
    return item.overcount !== '0'
  })

  const customersEmDia = customers.filter((item) => {
    return item.overcount === '0'
  })



  return (
    <div className='container-card-client'>
      <div>
        <div className='card-client-top'>
          <div className='card-client-top-icon'>
            <img src={noClient} alt='clientes' />
            <h3>Clientes Inadimplentes</h3>
          </div>
          <div className='card-client-top-number'>
            <strong>{customersInadimplentes.length}</strong>
          </div>
        </div>

        <div className='card-client-table'>
          <table>
            <thead>
              <tr>
                <th>Clientes</th>
                <th>ID do Clie.</th>
                <th>CPF</th>
              </tr>
            </thead>

            <tbody>

              {customersInadimplentes.slice(0, 4).map((item => (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.id}</td>
                  <td>{formatCpf(item.cpf)}</td>
                </tr>

              )))}
            </tbody>
          </table>

        </div>

        <div className='card-client-bottom'>
          <span onClick={inadimplente}>Ver todos</span>
        </div>
      </div>

      <div>
        <div className='card-client-top'>
          <div className='card-client-top-icon'>
            <img src={okClient} alt='cliente-ok' />
            <h3>Clientes em dia</h3>
          </div>
          <div className='card-client-top-number number-green'>
            <strong>{customersEmDia.length}</strong>
          </div>
        </div>

        <div className='card-client-table'>
          <table>
            <thead>
              <tr>
                <th>Clientes</th>
                <th>ID do Clie.</th>
                <th>CPF</th>
              </tr>
            </thead>

            <tbody>
              {customersEmDia.slice(0, 4).map((item) => (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.id}</td>
                  <td>{formatCpf(item.cpf)}</td>
                </tr>

              ))}
            </tbody>
          </table>

        </div>

        <div className='card-client-bottom'>
          <span onClick={emDia}>Ver todos</span>
        </div>
      </div>


    </div>
  );
}

export default ClientCards;
