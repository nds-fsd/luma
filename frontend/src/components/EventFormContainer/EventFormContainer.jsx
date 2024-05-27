import React, { useState, useEffect } from 'react';
import EventForm from './EventForm/EventForm';
import UserLogin from '../users/UserLoginCreate/UserLogin/UserLogin';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Styles from './EventFormContainer.module.css';
import { useNavigate } from 'react-router-dom';
import { getUserSession } from '../../utils/localStorage.utils';

const EventFormContainer = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(!isAuthenticated);
  const [isLoading, setIsLoading] = useState(false);

  const user = getUserSession();
  const userId = user ? user._id : null;

  const handleLogin = () => {
    setShowLoginPopup(false);
    setIsLoading(true);
    setTimeout(() => {
      navigate(0);
    }, 500);
  };

  return (
    <div className={Styles.container}>
      {isLoading && <LoadingSpinner />}
      <EventForm
        isAuthenticated={isAuthenticated}
        userId={userId}
      />
      {!isAuthenticated && showLoginPopup && (
        <UserLogin handleLogin={handleLogin} closePopup={() => setShowLoginPopup(false)} />
      )}
    </div>
  );
};

export default EventFormContainer;
