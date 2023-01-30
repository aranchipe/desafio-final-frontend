import './styles.css';
import edit from '../../assets/edit.svg';
import signout from '../../assets/signout.svg';
import polygon from '../../assets/polygon.svg';
import { useNavigate } from 'react-router-dom';
import { clear } from '../../utils/storage';


function Popup({ popupBox, openProfileModal }) {
    const navigate = useNavigate()

    const handleLogout = () => {
        clear();
        navigate('/');
    }
    return (

        <>
            {popupBox &&
                <div className='container-popup'>
                    <div className='popup-polygon'>
                        <img src={polygon} alt="Polygon icon"></img>
                    </div>
                    <div className='popup'>
                        <div
                            className='popup-edit'
                            onClick={openProfileModal}
                        >
                            <img src={edit} alt="Edit icon"
                            ></img>
                            <span>Editar</span>

                        </div>
                        <div className='popup-signout' onClick={() => handleLogout()}>
                            <img src={signout} alt="Signout icon"></img>
                            <span>Sair</span>
                        </div>
                    </div>
                </div>
            }
        </>

    );
}

export default Popup;