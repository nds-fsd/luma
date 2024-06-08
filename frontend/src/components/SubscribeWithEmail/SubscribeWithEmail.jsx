import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import styles from './SubscribeWithEmail.module.css';

const SubscribeWithEmail = ({ userEmail, cityName }) => {
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      setLoading(true);

      try {
        const response = await api().post('/subscription/check', { email: userEmail, cityName });
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
        await api().post('/subscription/unsubscribe', { email: userEmail, cityName });
        setIsSubscribed(false);
      } else {
        await api().post('/subscription/subscribe', { email: userEmail, cityName });
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
