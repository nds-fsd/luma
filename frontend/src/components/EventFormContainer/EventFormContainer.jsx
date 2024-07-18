import { useState, useContext } from 'react';
import EventForm from './EventForm/EventForm';
import UserLogin from '../users/UserLoginCreate/UserLogin/UserLogin';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Styles from './EventFormContainer.module.css';
import { useNavigate } from 'react-router-dom';
import { getUserSession } from '../../utils/localStorage.utils';
import { AuthContext } from '../users/AuthContext/AuthContext';

const EventFormContainer = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userId } = useContext(AuthContext);
  const [showLoginPopup, setShowLoginPopup] = useState(!isAuthenticated);
  const [isLoading, setIsLoading] = useState(false);


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
      <EventForm isAuthenticated={isAuthenticated} userId={userId} />
      {!isAuthenticated && showLoginPopup && (
        <UserLogin handleLogin={handleLogin} closePopup={() => setShowLoginPopup(false)} />
      )}
    </div>
  );
};

export default EventFormContainer;
