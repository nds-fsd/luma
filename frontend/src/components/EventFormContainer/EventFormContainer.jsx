import React, { useState } from 'react';
import EventForm from './EventForm/EventForm';
import UserLogin from '../users/UserLoginCreate/UserLogin/UserLogin';
import Styles from './EventFormContainer.module.css';
import { useNavigate } from 'react-router-dom';
import { getUserSession } from '../../utils/localStorage.utils'

const EventFormContainer = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  
  const user = getUserSession();
  const userId = user ? user._id : null;
  
  // const themes = {
  //   violet: {
  //     backgroundColor: 'rgb(199, 159, 236)',
  //     buttonColor: {
  //       backgroundColor: 'blueviolet',
  //       borderColor: 'blueviolet'
  //     }
  //   },
  //   pink: {
  //     backgroundColor: 'rgb(255,192,203)',
  //     buttonColor: {
  //       backgroundColor: 'rgb(255, 0, 208)',
  //       borderColor: 'rgb(255, 0, 208)'
  //     }
  //   },
  //   gold: {
  //     backgroundColor: 'rgb(242, 217, 75)',
  //     buttonColor: {
  //       backgroundColor: 'brown',
  //       borderColor: 'brown'
  //     }
  //   },
  //   orange: {
  //     backgroundColor: 'rgb(216, 118, 82)',
  //     buttonColor: {
  //       backgroundColor: 'orangered',
  //       borderColor: 'orangered'
  //     }
  //   },
  //   green: {
  //     backgroundColor: 'rgb(156, 216, 82)',
  //     buttonColor: {
  //       backgroundColor: 'green',
  //       borderColor: 'green'
  //     }
  //   }
  // };

  // const [backgroundColor, setBackgroundColor] = useState('');
  // const [buttonColor, setButtonColor] = useState(themes.violet.buttonColor);
  const [showLoginPopup, setShowLoginPopup] = useState(!isAuthenticated);

  // const handleColorChange = (color) => {
  //   setBackgroundColor(themes[color].backgroundColor);
  //   setButtonColor(themes[color].buttonColor);
  // };

  const handleLogin = () => {
    setShowLoginPopup(false);
    navigate(0); // Esto forzará la recarga de la página completa
  };

  return (
    <div className={Styles.container}>
      <EventForm
        // onColorChange={handleColorChange}
        // backgroundColor={backgroundColor}
        // buttonColor={buttonColor}
        isAuthenticated={isAuthenticated}
        userId={userId}
      />
      {!isAuthenticated  && showLoginPopup && (
        <UserLogin handleLogin={handleLogin} closePopup={() => setShowLoginPopup(false)} />
      )}
    </div>
  );
};

export default EventFormContainer;
