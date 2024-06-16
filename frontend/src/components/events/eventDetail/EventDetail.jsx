import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  }, [eventId, navigate]);

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
  }, [isAuthenticated, navigate]);

  const handleSubscriptionChange = (eventId, isSubscribed) => {
    if (isSubscribed) {
      setUserSubscriptions([...userSubscriptions, eventId]);
    } else {
      setUserSubscriptions(userSubscriptions.filter((id) => id !== eventId));
    }
  };

  const getSocialNetworkUrl = (owner, networkName) => {
    const network = owner.socialNetworks.find((sn) => sn.network.toLowerCase() === networkName.toLowerCase());
    if (network) {
      switch (networkName.toLowerCase()) {
        case 'instagram':
          return `https://www.instagram.com/${network.username}`;
        case 'linkedin':
          return `https://www.linkedin.com/in/${network.username}`;
        case 'website':
          return network.username;
        default:
          return '#';
      }
    }
    return '#';
  };

  if (!event) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.eventDetail}>
      <div className={styles.eventDetailContent}>
        <img src={event.eventPicture} alt='Event' className={styles.eventImage} />

        <div className={styles.organizerContainer}>
          <img src={organizationGif} alt='Organizer' className={styles.organizerIcon} />
          <span className={styles.organizerLabel}>Organizado por:</span>
          <span className={styles.organizerName}>{event.owner.fullname}</span>
        </div>

        <div className={styles.socialIcons}>
          <a href={getSocialNetworkUrl(event.owner, 'instagram')} target="_blank" rel="noopener noreferrer">
            <img src={instagramGif} alt='Instagram' className={styles.socialIcon} />
          </a>
          <a href={getSocialNetworkUrl(event.owner, 'linkedin')} target="_blank" rel="noopener noreferrer">
            <img src={linkedinGif} alt='LinkedIn' className={styles.socialIcon} />
          </a>
          <a href={getSocialNetworkUrl(event.owner, 'website')} target="_blank" rel="noopener noreferrer">
            <img src={webGif} alt='Website' className={styles.socialIcon} />
          </a>
        </div>

        <h1 className={styles.eventTitle}>{event.eventTitle}</h1>

        <div className={styles.organizerElements}>
          <div>
            <p className={styles.eventDate}>
              <img src={dateGif} alt='Date' className={styles.dateIcon} />{' '}
              {new Date(event.eventDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className={styles.eventLocation}>
              <img src={locationGif} alt='Location' className={styles.locationIcon} /> {cityName}
            </p>
          </div>
          <div className={styles.organizerShedule}>
            <div>
              <span className={styles.eventTime}>Horario: &nbsp;&nbsp;</span>
            </div>
            <div>
              <span className={styles.eventTime}>{event.eventStartTime}h - {event.eventEndTime}h</span>
            </div>
          </div>
        </div>

        <div className={styles['subscribe-container']}>
          <div>
            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Suscríbete a los eventos de {cityName}</p>
            {cityName && isAuthenticated && <SubscribeWithEmail userEmail={userEmail} cityName={cityName} />}
            {cityName && !isAuthenticated && <SubscribeBox />}
          </div>
          <div>
            {cityName && isAuthenticated && (
              <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Suscríbete a este evento</p>
            )}
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
          <br />
          <br />• <strong>Precio:</strong> {event.eventPrice}€ (pago el día del evento in situ)
          <br /> <br />
          ¡Nos vemos para compartir una experiencia increíble!
        </p>
      </div>
    </div>
  );
};

export default EventDetail;
