import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import styles from './SubscribeButtonToCity.module.css';
import { useNavigate } from 'react-router-dom';

const SubscribeWithEmail = ({ userEmail, cityName }) => {
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      setLoading(true);

      try {
        const response = await api(navigate).post('/subscription/check', { email: userEmail, cityName });
        setIsSubscribed(response.data.isSubscribed);
      } catch (error) {
        console.error('Error checking subscription status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSubscriptionStatus();
  }, [userEmail, cityName]);

  const handleSubscribe = async () => {
    setLoading(true);

    try {
      if (isSubscribed) {
        await api(navigate).post('/subscription/unsubscribe', { email: userEmail, cityName });
        setIsSubscribed(false);
      } else {
        await api(navigate).post('/subscription/subscribe', { email: userEmail, cityName });
        setIsSubscribed(true);
      }
    } catch (error) {
      console.error('Error subscribing:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.subscribeButton} ${isSubscribed ? styles.subscribed : ''}`}
        onClick={handleSubscribe}
        disabled={loading}
      >
        {loading ? 'Processing...' : isSubscribed ? '✓ Suscrito' : 'Suscribirse'}
      </button>
    </div>
  );
};

export default SubscribeWithEmail;
