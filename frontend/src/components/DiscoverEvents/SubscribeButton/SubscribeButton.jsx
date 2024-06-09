import React from 'react';
import styles from './SubscribeButton.module.css';
import { getUserToken } from '../../../utils/localStorage.utils';
import { api } from '../../../utils/api';
import { useNavigate } from 'react-router-dom';

const SubscribeButton = ({ eventId, isSubscribed, onSubscribeChange, isAuthenticated }) => {
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const token = getUserToken();
    try {
      let response;

      if (isSubscribed) {
        response = await api(navigate).post(
          `/events/${eventId}/unsubscribe`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        onSubscribeChange(eventId, false);
      } else {
        response = await api(navigate).post(
          `/events/${eventId}/subscribe`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        onSubscribeChange(eventId, true);
      }
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
