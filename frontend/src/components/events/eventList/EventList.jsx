import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './EventList.module.css';
import api from '../../../utils/api';

function EventList({ cityId, city }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await api.get('/events', {
          params: { eventLocation: cityId },
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    getEvents();
  }, [cityId]);

  return (
    <div className={styles.eventList}>
      {events.length === 0 ? (
        <div className={styles.noEvents}>
          <p>No hay eventos disponibles en esta ciudad.</p>
        </div>
      ) : (
        events.map((event, index) => (
          <Link to={`/event/${event._id}`} key={index} className={styles.eventLink} city={city}>
            <div className={styles.event}>
              <div className={`${styles.eventItem} ${styles.hora}`}>
                <span>{new Date(event.eventDate).toLocaleDateString()}</span>
              </div>
              <div className={`${styles.eventItem} ${styles.nombre}`}>
                <span>{event.eventTitle}</span>
              </div>
              <div className={`${styles.eventItem} ${styles.organizadoPor}`}>
                <span className={styles.label}>Organizado por: </span>
                <span>{event.owner.fullname}</span>
              </div>
              <div className={`${styles.eventItem} ${styles.descripcion}`}>
                <span>{event.eventDescription}</span>
              </div>
              <div className={`${styles.eventItem} ${styles.precio}`}>
                <span className={styles.label}>Precio: </span>
                <span>{event.eventPrice}</span>
              </div>
              <div className={`${styles.eventItem} ${styles.capacidad}`} >
                <span className={styles.label} style={{ textDecoration: 'none' }}>Capacidad: </span>
                <span>{event.eventCapacity}</span>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default EventList;
