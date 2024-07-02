import { useContext } from 'react';
import styles from './SubscribeButtonToEvent.module.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../users/AuthContext/AuthContext';
import { api } from '../../utils/api';

const SubscribeButton = ({ eventId, isSubscribed, onSubscribeChange }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      let response;
      const endpoint = isSubscribed ? `/events/${eventId}/unsubscribe` : `/events/${eventId}/subscribe`;

      response = await api().post(endpoint);
      
      onSubscribeChange(eventId, !isSubscribed);
    } catch (error) {
      console.error('Error subscribing/unsubscribing to event:', error);
    }
  };

  return (
    <button
      className={`${styles.subscribeButton} ${isSubscribed ? styles.subscribed : ''}`}
      onClick={handleSubscribe}
    >
      {isSubscribed ? '✓ Suscrito' : 'Suscribirse'}
    </button>
  );
};

export default SubscribeButton;
