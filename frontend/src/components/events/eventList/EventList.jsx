import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import styles from './EventList.module.css';
import { api } from '../../../utils/api';

const EventList = ({ cityId }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const getEvents = async () => {
    const res = await api(navigate).get('/events', {
      params: { eventLocation: cityId },
    });
    return res.data;
  };

  const { data: events, isLoading, isError, error } = useQuery(['events', cityId], getEvents);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (isError) {
    return <div className={styles.error}>Error: {error.message}</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  return (
    <div className={styles.container}>
      {events.length === 0 ? (
        <div className={styles.noEvents}>
          <p>No hay eventos disponibles en esta ciudad.</p>
        </div>
      ) : (
        <ul className={styles.eventsList}>
          {events.map((event, index) => (
            <li key={index} className={styles.eventItem}>
              <Link to={`/event/${event._id}`}>
                <div className={styles.eventContent}>
                  <div className={styles.eventPictureContainer}>
                    <img src={event.eventPicture} alt={event.eventTitle} className={styles.eventPicture} />
                  </div>
                  <div className={styles.eventDetails}>
                    <h3 className={styles.eventTitle}>{event.eventTitle}</h3>
                    <p className={styles.eventDescription}>{event.eventDescription}</p>
                    <div className={styles.contentDescription}>
                      <p className={styles.eventInfo}>
                        <strong>Fecha:</strong> {formatDate(event.eventDate)}
                      </p>
                      <p className={styles.eventInfo}>
                        <strong>Organizado por:</strong> {event.owner.fullname}
                      </p>
                      <p className={styles.eventInfo}>
                        <strong>Precio:</strong> {event.eventPrice}
                      </p>
                      <p className={styles.eventInfo}>
                        <strong>Capacidad:</strong> {event.eventCapacity === -1 ? 'Ilimitada' : event.eventCapacity}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
