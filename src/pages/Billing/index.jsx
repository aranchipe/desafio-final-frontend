import './styles.css';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';
import DashboardBilling from '../../components/DashboardBilling';
import axios from '../../services/axios'
import { useEffect, useState } from 'react';
import EditProfileModal from '../../components/EditProfileModal';
import { getItem } from '../../utils/storage'

function Billing() {
  const [billing, setBilling] = useState([]);
  const [billingsTotal, setBillingsTotal] = useState([]);
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const token = getItem('token')

  async function listBilling() {
    try {
      const response = await axios.get('/billings', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setBilling(response.data);
      setBillingsTotal(response.data);

    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    listBilling()

  }, [])

  return (
    <div className='container-billing'>
      <SideBar
        currentPage="billing"
        listBilling={listBilling}
      />
      <div className='container-billing-main'>
        <div className="content-header-billing">
          <Header
            openProfileModal={() => setOpenEditProfileModal(true)}
            page='Cobranças'
          />
        </div>
        <main className="billing-main">
          <DashboardBilling
            billing={billing}
            setBilling={setBilling}
            listBilling={listBilling}
            billingsTotal={billingsTotal}
          />
        </main>
      </div>
      {openEditProfileModal &&
        <EditProfileModal
          closeProfileModal={() => setOpenEditProfileModal(false)}
        />
      }

    </div>
  );
}

export default Billing;
