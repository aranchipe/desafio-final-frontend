import './styles.css';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';
import DashboardCustomers from '../../components/DashboardCustomers';
import EditProfileModal from '../../components/EditProfileModal';
import { useState } from 'react';


function Customers() {
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);

  return (
    <div className='container-customers'>
      <SideBar currentPage="clients" />
      <div className='container-main'>
        <div className="content-header">
          <Header
            openProfileModal={() => setOpenEditProfileModal(true)}
            page='Clientes'
          />
        </div>
        <main className="customers-main">
          <DashboardCustomers />
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

export default Customers;
