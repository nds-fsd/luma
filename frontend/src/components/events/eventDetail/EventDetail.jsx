import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './EventDetail.module.css';
import { api } from '../../../utils/api';
import SubscribeBox from '../SubscribeBox/SubscribeBox';
import locationGif from '../imagenes/location.png';
import dateGif from '../imagenes/calendario.png';
import organizationGif from '../imagenes/organizer.png';
import instagramGif from '../imagenes/instagram.png';
import webGif from '../imagenes/web.png';
import linkedinGif from '../imagenes/linkedin.png';
import SubscribeWithEmail from '../../SubscribeWithEmail/SubscribeWithEmail';
import SubscribeButton from '../../DiscoverEvents/SubscribeButton/SubscribeButton';
import { getUserToken } from '../../../utils/localStorage.utils';
import { useNavigate } from 'react-router-dom';

const EventDetail = ({ userEmail, isAuthenticated }) => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getEventDetails = async () => {
      try {
        const response = await api(navigate).get(`/events/${eventId}`);
        setEvent(response.data);

        if (response.data) {
          const cityResponse = await api(navigate).get(`/city/${response.data.eventLocation._id}`);
          setCityName(cityResponse.data.cityName);
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    getEventDetails();
  }, [eventId]);

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

  const handleSubscriptionChange = (eventId, isSubscribed) => {
    if (isSubscribed) {
      setUserSubscriptions([...userSubscriptions, eventId]);
    } else {
      setUserSubscriptions(userSubscriptions.filter((id) => id !== eventId));
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.eventDetail}>
      
      <div className={styles.eventDetailContent}>
        <img src={event.eventPicture} alt='yogaImage' className={styles.eventImage} />

        <div className={styles.organizerContainer}>
          <img src={organizationGif} alt='organizer' className={styles.organizerIcon} />
          <span className={styles.organizerLabel}>Organizado por:</span>
          <span className={styles.organizerName}>{event.owner.fullname}</span>
          <br />
          <br />
          <img src={instagramGif} alt='Instagram' className={styles.socialIcon1} />
          <img src={linkedinGif} alt='LinkedIn' className={styles.socialIcon2} />
          <img src={webGif} alt='Web' className={styles.socialIcon3} />
        </div>

        <h1 className={styles.eventTitle}>{event.eventTitle}</h1>

        <p className={styles.eventDate}>
          <img src={dateGif} alt='date' className={styles.dateIcon} /> {new Date(event.eventDate).toLocaleDateString()}
        </p>

        <p className={styles.eventLocation}>
          <img src={locationGif} alt='location' className={styles.locationIcon} /> {cityName}
        </p>

        <div className={styles['subscribe-container']}>
          <div>
            <p>Suscríbete a los eventos de {cityName}</p>
            {cityName && isAuthenticated && <SubscribeWithEmail userEmail={userEmail} cityName={cityName} />}
            {cityName && !isAuthenticated && <SubscribeBox />}
          </div>
          <div style={{ marginLeft: '30px' }}>
            {cityName && isAuthenticated && <p>Suscríbete a este evento</p>}
            {cityName && isAuthenticated && (
              <SubscribeButton
                isAuthenticated={isAuthenticated}
                eventId={eventId}
                isSubscribed={userSubscriptions.includes(eventId)}
                onSubscribeChange={handleSubscriptionChange}
              />
            )}
          </div>
        </div>

        <h2 className={styles.eventTitle2}>Acerca del evento</h2>

        <p className={styles.eventDescription}>
          {event.eventDescription}
          <br /> <br />
          <span className={styles.eventTime}>
            • {event.eventStartTime}h {event.eventTitle}
          </span>
          <br />
          <span className={styles.eventTime}>• {event.eventEndTime}h</span>
          <br />
          <br />• <strong>Precio:</strong> {event.eventPrice}€ (pago el día del evento in situ)
          <br /> <br />
          ¡Nos vemos para compartir una mañana increíble!
        </p>
      </div>
    </div>
  );
};

export default EventDetail;
