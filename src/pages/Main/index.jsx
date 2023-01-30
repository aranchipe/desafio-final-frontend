import './styles.css';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';
import BillingTags from '../../components/BillingTags';
import BillingCards from '../../components/BillingCards';
import ClientCards from '../../components/ClientCards';
import EditProfileModal from '../../components/EditProfileModal';
import { useEffect, useReducer, useState } from 'react';
import axios from '../../services/axios';
import { clear, setItem } from '../../utils/storage';
import { getItem } from '../../utils/storage';
import { notifyError } from '../../utils/toast';
import { onlyNumbers } from '../../utils/format';


function Main() {
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [billing, setBilling] = useState([]);
  const token = getItem('token')

  async function listBilling() {
    try {
      const response = await axios.get('/billings', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 401) {
        clear();
        return notifyError(response.data.mensagem);
      }
      setBilling(response.data);

    } catch (error) {
      return notifyError(error.response.data.mensagem);
    }
  }

  let somaPendentes = 0

  for (let item of billing) {
    if (item.status === 'Pendente')
      somaPendentes = somaPendentes + Number(onlyNumbers(item.value))
  }

  let somaPagas = 0

  for (let item of billing) {
    if (item.status === 'Paga')
      somaPagas = somaPagas + Number(onlyNumbers(item.value))
  }

  let somaVencidas = 0

  for (let item of billing) {
    if (item.status === 'Vencida')
      somaVencidas = somaVencidas + Number(onlyNumbers(item.value))
  }

  async function userData() {
    const response = await axios.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const user = response.data;
    if (user.telephone) {
      setItem('telephone', user.telephone)
    } else {
      setItem('telephone', '')
    }

    if (user.cpf) {
      setItem('cpf', user.cpf);
    } else {
      setItem('cpf', '');
    }


  }

  useEffect(() => {
    userData();
    listBilling()
  }, [openEditProfileModal]);

  return (
    <div className={`container`}>
      <SideBar currentPage="main" />
      <div className='container-main'>
        <div className="content-header">
          <Header
            openProfileModal={() => setOpenEditProfileModal(true)}
            page='Main' />
        </div>
        <main className='main-principal'>
          <div className='billings'>
            <BillingTags
              somaPendentes={somaPendentes}
              somaPagas={somaPagas}
              somaVencidas={somaVencidas}
            />

            <BillingCards
              billing={billing}
            />

          </div>
          <ClientCards />
        </main>
      </div>
      {openEditProfileModal &&
        <EditProfileModal
          closeProfileModal={() => setOpenEditProfileModal(false)} />}
    </div>
  );
}

export default Main;
