import React, { useState } from 'react';
import EventForm from './EventForm/EventForm';
import UserLogin from '../users/UserLoginCreate/UserLogin/UserLogin';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Styles from './EventFormContainer.module.css';
import { useNavigate } from 'react-router-dom';

const EventFormContainer = ({ IsAuthenticated }) => {
  const navigate = useNavigate();
  const themes = {
    violet: {
      backgroundColor: 'rgb(199, 159, 236)',
      buttonColor: {
        backgroundColor: 'blueviolet',
        borderColor: 'blueviolet'
      }
    },
    pink: {
      backgroundColor: 'rgb(255,192,203)',
      buttonColor: {
        backgroundColor: 'rgb(255, 0, 208)',
        borderColor: 'rgb(255, 0, 208)'
      }
    },
    gold: {
      backgroundColor: 'rgb(242, 217, 75)',
      buttonColor: {
        backgroundColor: 'brown',
        borderColor: 'brown'
      }
    },
    orange: {
      backgroundColor: 'rgb(216, 118, 82)',
      buttonColor: {
        backgroundColor: 'orangered',
        borderColor: 'orangered'
      }
    },
    green: {
      backgroundColor: 'rgb(156, 216, 82)',
      buttonColor: {
        backgroundColor: 'green',
        borderColor: 'green'
      }
    }
  };

  const [backgroundColor, setBackgroundColor] = useState('');
  const [buttonColor, setButtonColor] = useState(themes.violet.buttonColor);
  const [showLoginPopup, setShowLoginPopup] = useState(!IsAuthenticated);
  const [isLoading, setIsLoading] = useState(false);

  const handleColorChange = (color) => {
    setBackgroundColor(themes[color].backgroundColor);
    setButtonColor(themes[color].buttonColor);
  };

  const handleLogin = () => {
    setShowLoginPopup(false);
    setIsLoading(true);
    setTimeout(() => {
      navigate(0); // Esto forzará la recarga de la página completa
    }, 500); // Retraso para mostrar el spinner antes de la recarga
  };

  return (
    <div className={Styles.container} style={{ backgroundColor }}>
      {isLoading && <LoadingSpinner />}
      <EventForm
        onColorChange={handleColorChange}
        backgroundColor={backgroundColor}
        buttonColor={buttonColor}
      />
      {!IsAuthenticated && showLoginPopup && (
        <UserLogin handleLogin={handleLogin} closePopup={() => setShowLoginPopup(false)} />
      )}
    </div>
  );
};

export default EventFormContainer;
