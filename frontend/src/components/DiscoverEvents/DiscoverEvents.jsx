import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import styles from './DiscoverEvents.module.css';
import { getUserToken } from '../../utils/localStorage.utils';

const DiscoverEvents = ({ IsAuthenticated }) => {
  const [cities, setCities] = useState([]);
  const [events, setEvents] = useState([]);
  const [cityEvents, setCityEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const [subscriptionStatus, setSubscriptionStatus] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await api.get('/city');
        setCities(response.data);
      } catch (error) {
        console.error('Error al obtener las ciudades:', error);
        setError(error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error al obtener los eventos:', error);
        setError(error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchCities(), fetchEvents()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (IsAuthenticated) {
      const fetchUserSubscriptions = async () => {
        const token = getUserToken();
        try {
          console.log('Fetching user subscriptions');
          const response = await api.get('/user/subscriptions', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setUserSubscriptions(response.data.subscribedEvents);
        } catch (error) {
          console.error('Error fetching user subscriptions:', error);
        }
      };

      fetchUserSubscriptions();
    }
  }, [IsAuthenticated]);

  useEffect(() => {
    if (cities.length > 0 && events.length > 0) {
      const groupedEvents = cities.map((city) => ({
        ...city,
        events: events.filter((event) => event.eventLocation === city._id),
      }));
      setCityEvents(groupedEvents);
    }
  }, [cities, events]);

  const handleSubscribe = async (eventId) => {
    if (!IsAuthenticated) {
      navigate('/login');
      return;
    }

    const token = getUserToken();
    try {
      const isSubscribed = userSubscriptions.includes(eventId);
      let response;

      if (isSubscribed) {
        response = await api.post(`/events/${eventId}/unsubscribe`, {}, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setUserSubscriptions(userSubscriptions.filter(id => id !== eventId));
        setSubscriptionStatus({ ...subscriptionStatus, [eventId]: 'Unsubscribed successfully' });
      } else {
        response = await api.post(`/events/${eventId}/subscribe`, {}, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setUserSubscriptions([...userSubscriptions, eventId]);
        setSubscriptionStatus({ ...subscriptionStatus, [eventId]: 'Subscribed successfully' });
      }
    } catch (error) {
      console.error('Error subscribing/unsubscribing to event:', error);
      setSubscriptionStatus({ ...subscriptionStatus, [eventId]: 'Action failed' });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.containerMain}>
      <div className={styles.containerContent}>
        <h1 className={styles.title}>Descubrir Eventos en España</h1>
        <div className={styles.content}>
          <p className={styles.paragraph}>
            ¿Buscas planes emocionantes para disfrutar en España? En Descubrir Eventos, te ofrecemos una selección
            cuidadosamente curada de los mejores eventos en ciudades de toda España.
          </p>
          <p className={styles.paragraph}>
            Desde festivales de música y arte hasta ferias gastronómicas y eventos deportivos, hay algo para todos los
            gustos y preferencias. Sumérgete en la rica cultura española y descubre nuevas experiencias que te
            sorprenderán.
          </p>
          <p className={styles.paragraph}>
            Nuestra lista de eventos populares se actualiza regularmente, ¡así que siempre encontrarás algo nuevo por
            descubrir! No te pierdas la oportunidad de explorar lo mejor que España tiene para ofrecer en
            entretenimiento y diversión.
          </p>
          <p className={styles.paragraph}>¡Empieza a Descubrir Ahora!</p>
          <h3 style={{ textAlign: 'center', margin: '0' }}>Eventos populares</h3>
          <p style={{ textAlign: 'center', marginTop: '0' }}>¡Se actualizan todos los días!</p>
        </div>
      </div>
      <div className={styles.containerCities}>
        <div className={styles.container}>
          {cityEvents.map((city) => (
            <Link to={`/city/${city._id}`} key={`city-${city._id}`} className={styles.cityLink}>
              <div className={styles.cityContainer}>
                <img src={city.cityLogo} alt={`${city.cityName} logo`} className={styles.cityLogo} />
                <div className={styles.cityInfo}>
                  <div>
                    <h4 className={styles.cityName}>{city.cityName}</h4>
                  </div>
                  <div>
                    <p className={styles.eventCount}>{city.events.length} eventos</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.featuredSection}>
        <div className={styles.featuredHeader}>
          <h3>Calendarios destacados</h3>
          <p>Que nos encantan</p>
        </div>
        <div className={styles.eventGrid}>
          {events.map((event) => (
            <div key={`event-${event._id}`} className={styles.eventCard}>
              <div className={styles.imageContainer}>
                <img src={event.eventPicture} alt={event.eventTitle} className={styles.eventPicture} />
              </div>
              <div className={styles.textContainer}>
                <h4 className={styles.eventTitle}>{event.eventTitle}</h4>
                <p className={styles.eventDescription}>{event.eventDescription}</p>
              </div>
              <button 
                className={`${styles.subscribeButton} ${userSubscriptions.includes(event._id.toString()) ? styles.subscribed : ''}`}
                onClick={() => handleSubscribe(event._id)}
              >
                {userSubscriptions.includes(event._id.toString()) ? '✓ Suscrito' : 'Suscribirse'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverEvents;
