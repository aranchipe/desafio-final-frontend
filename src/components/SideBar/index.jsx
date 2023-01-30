import './styles.css';
import homeLogo from '../../assets/home.svg';
import homeLogoActive from '../../assets/homeActive.svg';
import clientLogo from '../../assets/clients.svg';
import clientLogoActive from '../../assets/clientsActive.svg';
import billingLogo from '../../assets/billing.svg';
import billingLogoActive from '../../assets/billingActive.svg';
import line from '../../assets/line.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeItem } from '../../utils/storage'



function SideBar({ currentPage, listBilling }) {
  const [homeState, setHomeState] = useState(currentPage === 'main' ? true : false);
  const [clientsState, setClientsState] = useState(currentPage === 'clients' ? true : false);
  const [billingState, setBillingState] = useState(currentPage === 'billing' ? true : false);

  const navigate = useNavigate();

  const handleClickHome = () => {
    if (currentPage === 'main') {
      setHomeState(true);
      setClientsState(false);
      setBillingState(false);
    }

    navigate('/main');
  }

  const handleClickClients = () => {
    if (currentPage === 'clients') {
      setHomeState(false);
      setClientsState(true);
      setBillingState(false);
    }

    navigate('/customers');
    removeItem('overcount');
  }

  const handleClickBilling = () => {
    if (currentPage === 'billing') {
      setHomeState(false);
      setClientsState(false);
      setBillingState(true);
    }

    removeItem('categoria');
    navigate('/billing');
    listBilling();
  }
  return (
    <div className='container-side'>
      <div className='container-icons
       home' onClick={() => handleClickHome()}>
        <img src={homeState ? homeLogoActive : homeLogo} alt="Home icon"></img>
        <h3 className={homeState && `current-line`}>Home</h3>
        {homeState && <img src={line} alt="Line icon" className='line-icon'></img>}
      </div>

      <div className='container-icons' onClick={() => handleClickClients()}>
        <img src={clientsState ? clientLogoActive : clientLogo} alt="Client icon"></img>
        <h3 className={clientsState && `current-line`}>Clientes</h3>
        {clientsState && <img src={line} alt="Line icon" className='line-icon2'></img>}
      </div>

      <div className='container-icons' onClick={() => handleClickBilling()}>
        <img src={billingState ? billingLogoActive : billingLogo} alt="Billing icon"></img>
        <h3 className={billingState && `current-line`}>Cobranças</h3>
        {billingState && (<img src={line} alt="Line icon" className='line-icon3'></img>)}
      </div>

    </div>
  );
}

export default SideBar;
