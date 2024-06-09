import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../utils/api';
import styles from './DiscoverEvents.module.css';
import { getUserToken } from '../../utils/localStorage.utils';
import SubscribeButton from './SubscribeButton/SubscribeButton';
import { useNavigate } from 'react-router-dom';

const DiscoverEvents = ({ isAuthenticated }) => {
  const [cities, setCities] = useState([]);
  const [events, setEvents] = useState([]);
  const [cityEvents, setCityEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await api(navigate).get('/city');
        setCities(response.data);
      } catch (error) {
        console.error('Error al obtener las ciudades:', error);
        setError(error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await api(navigate).get('/events/most-subscribed-events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error al obtener los eventos:', error);
        setError(error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchCities(navigate), fetchEvents()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUserSubscriptions = async () => {
        const token = getUserToken();
        try {
          const response = await api(navigate).get('/user/subscriptions', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserSubscriptions(response.data.subscribedEvents);
        } catch (error) {
          console.error('Error fetching user subscriptions:', error);
        }
      };

      fetchUserSubscriptions();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (cities.length > 0 && events.length > 0) {
      const groupedEvents = cities.map((city) => ({
        ...city,
        events: events.filter((event) => event.eventLocation === city._id),
      }));
      setCityEvents(groupedEvents);
    }
  }, [cities, events]);

  const handleSubscriptionChange = (eventId, isSubscribed) => {
    if (isSubscribed) {
      setUserSubscriptions([...userSubscriptions, eventId]);
    } else {
      setUserSubscriptions(userSubscriptions.filter((id) => id !== eventId));
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
          {events.slice(0, 12).map((event) => (
            <div key={`event-${event._id}`} className={styles.eventCard}>
              <div className={styles.imageContainer}>
                <Link to={`/event/${event._id}`}>
                  <img src={event.eventPicture} alt={event.eventTitle} className={styles.eventPicture} />
                </Link>
              </div>
              <div className={styles.textContainer}>
                <h4 className={styles.eventTitle}>{event.eventTitle}</h4>
                <p className={styles.eventDescription}>{event.eventDescription}</p>
              </div>
              <SubscribeButton
                eventId={event._id}
                isSubscribed={userSubscriptions.includes(event._id.toString())}
                onSubscribeChange={handleSubscriptionChange}
                isAuthenticated={isAuthenticated}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverEvents;
