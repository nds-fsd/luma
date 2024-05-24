// EventDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './EventDetail.module.css';
import api from '../../../utils/api';
import SubscribeBox from '../subscribe/Subscribe';
import yogaImage from '../imagenes/yoga2.jpg';
import locationGif from '../imagenes/location.png';
import dateGif from '../imagenes/calendario.png';
import organizationGif from '../imagenes/organizer.png';
import instagramGif from '../imagenes/instagram.png';
import webGif from '../imagenes/web.png';
import linkedinGif from '../imagenes/linkedin.png';

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [cityName, setCityName] = useState(null);

  useEffect(() => {
    const getEventDetails = async () => {
      try {
        const response = await api.get(`/events/${eventId}`);
        setEvent(response.data);

        if (response.data) {
            const cityResponse = await api.get(`/city/${response.data.eventLocation}`);
            setCityName(cityResponse.data.cityName);
          }

      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    getEventDetails();
  }, [eventId, cityName]);

  if (!event) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={styles.eventDetail}>
      <div className={styles.eventDetailContent}>
        <img src={event.eventPicture} alt="yogaImage" className={styles.eventImage} />

        <div className={styles.organizerContainer}>
          <img src={organizationGif} alt="organizer" className={styles.organizerIcon} />
          <span className={styles.organizerLabel}>Organizado por:</span>
          <span className={styles.organizerName}>{event.owner.fullname}</span>
          <br /><br />
          <img src={instagramGif} alt="Instagram" className={styles.socialIcon1} />
          <img src={linkedinGif} alt="LinkedIn" className={styles.socialIcon2} />
          <img src={webGif} alt="Web" className={styles.socialIcon3} />
        </div>

        <h1 className={styles.eventTitle}>{event.eventTitle}</h1>

        <p className={styles.eventDate}>
          <img src={dateGif} alt="date" className={styles.dateIcon} /> {new Date(event.eventDate).toLocaleDateString()}
        </p>

        <p className={styles.eventLocation}>
          <img src={locationGif} alt="location" className={styles.locationIcon} /> {cityName}
        </p>

        <div className={styles["subscribe-container"]}>
          <SubscribeBox />
        </div>

        <h2 className={styles.eventTitle2}>Acerca del evento</h2>

        <p className={styles.eventDescription}>
          {event.eventDescription}
          <br /> <br />
          <span className={styles.eventTime}>• {event.eventStartTime}h {event.eventTitle}</span><br />
          <span className={styles.eventTime}>• {event.eventEndTime}h</span><br /><br />
          • <strong>Precio:</strong> {event.eventPrice}€ (pago el día del evento in situ)
          <br /> <br />
          ¡Nos vemos para compartir una mañana increíble!
        </p>
      </div>
    </div>
  );
}

export default EventDetail;
