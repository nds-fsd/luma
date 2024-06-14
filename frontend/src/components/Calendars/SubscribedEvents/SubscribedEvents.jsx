import { useEffect, useState } from 'react';
import { api } from '../../../utils/api';
import { getUserToken } from '../../../utils/localStorage.utils';
import styles from './SubscribedEvents.module.css';
import { Link } from 'react-router-dom';

const SubscribedEvents = ({ isAuthenticated, userFullName }) => {
  const [eventIds, setEventIds] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUserSubscriptions = async () => {
        const token = getUserToken();
        try {
          const response = await api().get('/user/subscriptions', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const subscribedEvents = response.data.subscribedEvents;
          setEventIds(subscribedEvents);

          if (subscribedEvents.length === 0) {
            setLoading(false);
          }
        } catch (error) {
          setError(error.response ? error.response.data.message : 'Error fetching subscriptions');
          setLoading(false);
        }
      };

      fetchUserSubscriptions();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (eventIds.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const response = await api().post('/events/events-by-ids', { ids: eventIds });
        const sortedEvents = response.data.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
        setEvents(sortedEvents);
      } catch (error) {
        setError(error.response ? error.response.data.message : 'Error fetching event details');
      } finally {
        setLoading(false);
      }
    };

    if (eventIds.length > 0) {
      fetchEventDetails();
    }
  }, [eventIds]);

  if (!isAuthenticated) {
    return <div className={styles.error}>Please log in to see your subscribed events.</div>;
  }

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Calendario de Suscripciones:</h2>
      {events.length === 0 ? (
        <p className={styles.noEvents}>{userFullName}, no estás suscrito a ningún evento.</p>
      ) : (
        <ul className={styles.eventsList}>
          {events.map((event) => (
            <li key={event._id} className={styles.eventItem}>
              <div className={styles.eventContent}>
                <div className={styles.eventPictureContainer}>
                  <Link to={`/event/${event._id}`}>
                    <img src={event.eventPicture} alt={event.eventTitle} className={styles.eventPicture} />
                  </Link>
                </div>
                <div className={styles.eventDetails}>
                  <div>
                    <h3 className={styles.eventTitle}>{event.eventTitle}</h3>
                    <p className={styles.eventDescription}>{event.eventDescription}</p>
                  </div>
                  <div className={styles.contentDescription}>
                    <div>
                      <p className={styles.eventInfo}>
                        <strong>Fecha:</strong> {new Date(event.eventDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className={styles.eventInfo}>
                        <strong>Hora:</strong> {event.eventStartTime}
                      </p>
                    </div>
                    <div>
                      <p className={styles.eventInfo}>
                        <strong>Localidad:</strong> {event.eventLocation.cityName}
                      </p>
                    </div>
                    <div>
                      <p className={styles.eventInfo}>
                        <strong>Precio:</strong> {event.eventPrice}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubscribedEvents;
