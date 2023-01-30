import './styles.css';
import clients from '../../assets/clients.svg';
import addIcon from '../../assets/add.svg';
import filterIcon from '../../assets/filter.svg';
import orderIcon from '../../assets/order.svg';
import clientBill from '../../assets/client-bill.svg';
import searchNotFound from '../../assets/searchNotFound.svg';
import magnifyingGlass from '../../assets/magnifying-glass.svg';
import RegisterClientModal from '../RegisterClientModal';
import axios from '../../services/axios'
import { useState, useEffect } from 'react';
import { notifyError } from '../../utils/toast';
import RegisterBillModal from '../RegisterBillModal';
import { useNavigate } from 'react-router-dom'
import { clear, getItem } from '../../utils/storage';
import { searchClient } from '../../utils/search';
import { formatCpf, formatPhone } from '../../utils/format';

function DashboardCustomers() {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openRegisterBillModal, setOpenRegisterBillModal] = useState(false)
  const [currentCustomer, setCurrentCustomer] = useState({})
  const [customers, setCustomers] = useState([])
  const [customersTotal, setCustomersTotal] = useState([]);
  const [order, setOrder] = useState(false);
  const navigate = useNavigate()
  const token = getItem('token')
  const overcount = getItem('overcount')

  let customersFiltrados = []

  if (overcount === '0' && customers[0] !== 'notFound') {
    customersFiltrados = customers.filter((item) => {
      return item.overcount === '0'
    })
  } else if (overcount === 'inadimplente') {
    customersFiltrados = customers.filter((item) => {
      return item.overcount !== '0'
    })
  } else {
    customersFiltrados = customers
  }

  function handleOrderByName() {
    const orderedCustomers = customers.sort((a, b) => {
      if (!order) {
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
          return 1;
        }
        if (a.name.toUpperCase() < b.name.toUpperCase()) {
          return -1;
        }
        return 0;
      } else {
        if (b.name.toUpperCase() > a.name.toUpperCase()) {
          return 1;
        }
        if (b.name.toUpperCase() < a.name.toUpperCase()) {
          return -1;
        }
        return 0;
      }
    })

    customersFiltrados = orderedCustomers;
    setOrder(!order);
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
      setCustomers(response.data);
      setCustomersTotal(response.data);
    } catch (error) {
      return notifyError(error.response.data.mensagem);
    }
  }

  useEffect(() => {
    listCustomers()

  }, [])

  function handleSelectedCustomer(id) {
    navigate(`/customer/${id}`)
  }

  return (
    <div className='container-dashboard-customers'>
      <section className='customers-top'>
        <div className='customers-top-title'>
          <img src={clients} alt='Clients icon'></img>
          <h1>Clientes</h1>
        </div>
        <div className='customers-top-btn'>
          <button
            onClick={() => setOpenRegisterModal(true)}>
            <img
              src={addIcon}
              alt='Add icon'
            ></img>
            Adicionar cliente
          </button>
          <div className='filter-clients'>
            <img src={filterIcon} alt='Filter icon' ></img>
          </div>
          <div className="input-filter">
            <input placeholder='Pesquisar' onInput={(e) => searchClient(e, customers, setCustomers, customersTotal)}></input>
            <img src={magnifyingGlass} alt='magnifying Glass icon'></img>
          </div>

        </div>
      </section>

      <section className="style-table">
        <table className='dash-customers'>
          <thead >
            <tr>
              <th className='order-client'>
                <img className='order-client-icon' src={orderIcon} alt='Order icon' onClick={() => handleOrderByName()}></img>
                Cliente
              </th>
              <th>CPF</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Criar Cobrança</th>
            </tr>
          </thead>
          {
            customersFiltrados[0] === 'notFound' && <div className="searchNotFound">
              <img src={searchNotFound} alt='pesquisa nao encontada' />
            </div>
          }
          <tbody>
            {customersFiltrados[0] !== 'notFound' && customersFiltrados.map((item) => (
              <tr key={item.id}>
                <td
                >
                  <span
                    className='customer-name'
                    onClick={() => handleSelectedCustomer(item.id)}
                  >
                    {item.name}
                  </span>
                </td>
                <td>{formatCpf(item.cpf)}</td>
                <td>{item.email}</td>
                <td>{formatPhone(item.telephone)}</td>
                <td>
                  <div className={item.overcount === '0' ? 'status-ok' : 'status-pay'}>{item.overcount === '0' ? 'Em dia' : 'Inadimplente'}</div>
                </td>
                <td>
                  <div onClick={() => setOpenRegisterBillModal(true)} className='apply-bill'>
                    <img onClick={() => setCurrentCustomer({ name: item.name, id: item.id })} src={clientBill} alt='Bill icon'></img>
                    Cobrança
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {
        openRegisterModal &&
        <RegisterClientModal
          setOpenRegisterModal={setOpenRegisterModal}
          listCustomers={listCustomers}
        />
      }
      {
        openRegisterBillModal &&
        <RegisterBillModal
          setOpenRegisterBillModal={setOpenRegisterBillModal}
          currentCustomer={currentCustomer}
        />
      }
    </div>
  );
}


export default DashboardCustomers;