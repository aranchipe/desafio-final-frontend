import './styles.css';
import arrowDown from '../../assets/arrow-down.svg';
import Popup from '../Popup';
import { useState } from 'react';
import { getItem } from '../../utils/storage';


function HeaderBilling({ openProfileModal }) {

  const [popupBox, setPopupBox] = useState(false);
  const name = getItem('name');

  function openPopup() {
    if (!popupBox) {
      setPopupBox(true);
    } else {
      setPopupBox(false);
    };
  };

  return (
    <div className='container-header-billing'>
      <div className='header-title-billing'>
        <h1>Cobranças</h1>
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
  );
}

export default HeaderBilling;
