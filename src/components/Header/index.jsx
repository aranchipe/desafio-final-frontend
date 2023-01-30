import './style.css'
import Popup from '../Popup';
import arrowDown from '../../assets/arrow-down.svg';
import { useState } from 'react';
import { getItem } from '../../utils/storage';
import { useNavigate } from 'react-router-dom';

function Header({ openProfileModal, page }) {

  const [popupBox, setPopupBox] = useState(false);
  const name = getItem('name');
  const navigate = useNavigate();
  function openPopup() {
    if (!popupBox) {
      setPopupBox(true);
    } else {
      setPopupBox(false);
    };
  };

  return (
    <div className='container-header'>
      <div className='header-title'>
        {page === 'Main' && <h1>Resumo das cobranças</h1>}
        {page === 'Clientes' && <h2>{page}</h2>}
        {page === 'Cobranças' && <h2>{page}</h2>}
        {page === 'Detalhes' && <h2 onClick={()=>navigate('/customers')}>Clientes<span>{'>'}</span><span>Detalhes do Cliente</span></h2>}
      </div>
      <div className='header-user'>
        <div className='user-initals'>
          <h3>{name[0].toUpperCase()}{(name[1]).toUpperCase()}</h3>
        </div>
        <span>{name}</span>
        <img
          onClick={() => openPopup()}
          src={arrowDown}
          alt="Arrow down"
        ></img>
      </div>
      <Popup
        setPopupBox={setPopupBox}
        popupBox={popupBox}
        openProfileModal={openProfileModal}
      />

    </div>
  )
}

export default Header;