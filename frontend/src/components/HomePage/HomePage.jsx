import { useState } from 'react';
import { useQueryClient, useQuery } from 'react-query';
import styles from './HomePage.module.css';
import { api } from '../../utils/api';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = ({ userId }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const getEvents = async () => {
    const res = await api(navigate).get('/events');
    return res.data;
  };

  const { data: events, isLoading, isError, error } = useQuery('events', getEvents);

  const deleteEvent = async (id) => {
    try {
      await api(navigate).delete(`/events/${id}`);
      queryClient.invalidateQueries('events');
      console.log(`Evento con ID ${id} eliminado.`);
    } catch (e) {
      console.log(`Error eliminando evento con ID ${id}: `, e);
    }
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    navigate('/editevent', { state: { event } });
  };

  const userEvents = events ? events.filter((event) => event.owner && event.owner._id === userId) : [];

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
      <h2 className={styles.header}>Mis Eventos</h2>
      {userEvents.length === 0 ? (
        <p className={styles.noEvents}>No tienes eventos organizados.</p>
      ) : (
        <ul className={styles.eventsList}>
          {userEvents.map((event, index) => (
            <li key={index} className={styles.eventItem}>
              <div className={styles.eventContent}>
                <Link to={`/event/${event._id}`} className={styles.eventLink}>
                  <div className={styles.eventPictureContainer}>
                    <img src={event.eventPicture} alt={event.eventTitle} className={styles.eventPicture} />
                  </div>
                </Link>
                <div className={styles.eventDetails}>
                  <h3 className={styles.eventTitle}>{event.eventTitle}</h3>
                  <p className={styles.eventDescription}>{event.eventDescription}</p>
                  <div className={styles.contentDescription}>
                    <p className={styles.eventInfo}>
                      <strong>Fecha:</strong> {formatDate(event.eventDate)}
                    </p>
                    <p className={styles.eventInfo}>
                      <strong>Hora:</strong> {event.eventStartTime} - {event.eventEndTime}
                    </p>
                    <p className={styles.eventInfo}>
                      <strong>Ubicación:</strong> {event.eventLocation.cityName}
                    </p>
                    <p className={styles.eventInfo}>
                      <strong>Organizado por:</strong> {event.owner.fullname}
                    </p>
                  </div>
                  <div className={styles.buttonGroup}>
                    <button className={styles.button} onClick={() => deleteEvent(event._id)}>
                      Eliminar
                    </button>
                    <button className={styles.button} onClick={() => handleEditEvent(event)}>
                      Editar
                    </button>
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

export default HomePage;
