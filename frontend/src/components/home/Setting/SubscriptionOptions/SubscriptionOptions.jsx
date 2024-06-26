import React, { useState, useEffect } from 'react';
import styles from './SubscriptionOptions.module.css';
import { api } from '../../../../utils/api';

const SubscriptionOptions = ({ userEmail }) => {
  const [loading, setLoading] = useState(true);
  const [subscribedCities, setSubscribedCities] = useState([]);
  const [notificationSettings, setNotificationSettings] = useState({
    emailReminders: false,
    smsReminders: false,
    newSessions: false,
    eventPosts: false,
    commentRequests: false,
    commentReplies: false,
    newInvites: false,
    newSubscribers: false,
    eventSubmissions: false,
    marketingEmails: false,
  });

  useEffect(() => {
    const fetchUserSubscriptions = async () => {
      try {
        const response = await api().post('/subscription/userSubscriptions', { email: userEmail });
        setSubscribedCities(response.data.cities);
      } catch (error) {
        console.error('Error fetching user subscriptions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSubscriptions();
  }, [userEmail]);

  const handleSubscriptionChange = async (cityName, isSubscribed) => {
    try {
      if (isSubscribed) {
        await api().post('/subscription/unsubscribeToNews', { email: userEmail, cityName });
      } else {
        await api().post('/subscription/subscribeToNews', { email: userEmail, cityName });
      }
      setSubscribedCities((prevCities) =>
        prevCities.map((city) =>
          city.cityName === cityName ? { ...city, isSubscribed: !isSubscribed } : city
        )
      );
    } catch (error) {
      console.error('Error updating subscription status:', error);
    }
  };

  const handleNotificationChange = (setting) => {
    setNotificationSettings((prevSettings) => ({
      ...prevSettings,
      [setting]: !prevSettings[setting],
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Eventos locales</h2>
      <p className={styles.description}>
        Todos los domingos, recibirás una lista de eventos populares en las ciudades a las que estás suscrito.
      </p>
      <div className={styles.subscriptionList}>
        {subscribedCities.map((city, index) => (
          <div key={index} className={styles.subscriptionContainer}>
            <div className={styles.cityInfo}>
              <span className={styles.cityIcon}>🌆</span>
              <span className={styles.cityName}>{city.cityName}</span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={city.isSubscribed}
                onChange={() => handleSubscriptionChange(city.cityName, city.isSubscribed)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        ))}
      </div>

      <div className={styles.notifications}>
        <h2 className={styles.title}>Notificaciones y recordatorios</h2>
        <p className={styles.description}>
          Estas opciones se aplican a todos los calendarios y eventos de los que formas parte.
        </p>

        <div className={styles.notificationSection}>
          <h3 className={styles.sectionTitle}>Eventos a los que asistes</h3>
          <label>
            <input
              type="checkbox"
              checked={notificationSettings.emailReminders}
              onChange={() => handleNotificationChange('emailReminders')}
            />
            Recordatorios por correo
          </label>
          <label>
            <input
              type="checkbox"
              checked={notificationSettings.smsReminders}
              onChange={() => handleNotificationChange('smsReminders')}
            />
            Recordatorios por SMS
          </label>
        </div>

        <div className={styles.notificationSection}>
          <h3 className={styles.sectionTitle}>Eventos que organizas</h3>
          <label>
            <input
              type="checkbox"
              checked={notificationSettings.newInvites}
              onChange={() => handleNotificationChange('newInvites')}
            />
            Nuevo suscriptor
          </label>
        </div>

        <div className={styles.notificationSection}>
          <h3 className={styles.sectionTitle}>Lumatic</h3>
          <label>
            <input
              type="checkbox"
              checked={notificationSettings.marketingEmails}
              onChange={() => handleNotificationChange('marketingEmails')}
            />
            Correos de marketing
          </label>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionOptions;
