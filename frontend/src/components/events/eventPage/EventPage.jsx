import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../../utils/api';
import styles from './EventPage.module.css';
import EventList from '../eventList/EventList';
import SubscribeWithEmail from '../../SubscribeButtonToCity/SubscribeButtonToCity';
import SubscribeBox from '../../SubscribeButtonToCityWithoutAuth/SubscribeButtonToCityWithoutAuth';
import EventMap from '../../EventMap/EventMap';

const EventPage = ({ userEmail, isAuthenticated }) => {
  const [city, setCity] = useState(null);
  const { cityId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCityById = async () => {
      try {
        const response = await api(navigate).get(`/city/${cityId}`);
        setCity(response.data);
      } catch (error) {
        console.error('Error al obtener la ciudad:', error);
      }
    };

    fetchCityById();
  }, [cityId, navigate]);

  const backgroundImage = city ? city.cityWallpaper : '';

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  return (
    <div className={styles['event-page']}>
      <div className={styles.headerWallpaper}>
        <div className={`${styles['blue-background']}`}>
          <h1 className={styles['title-header']}>
            Qué está pasando en <br />
            {city && <span className={styles['title-city']}>{city.cityName}</span>}
          </h1>
          <p className={styles['text-p']}>
            Los eventos más actuales e interesantes
            <br />
            {city && `en la maravillosa ciudad de ${city.cityName}.`}
          </p>
          <div className={styles['subscribe-container']}>
            {city && isAuthenticated && <SubscribeWithEmail userEmail={userEmail} cityName={city.cityName} />}
            {city && !isAuthenticated && <SubscribeBox />}
          </div>
          <hr />
        </div>
        <div className={styles.header} style={backgroundStyle}></div>
      </div>

      <div className={styles.main}>
        <h1 className={styles['title-events']}>Upcoming Events</h1>
        <EventList cityId={cityId} userEmail={userEmail} isAuthenticated={isAuthenticated}/>
      </div>

      <div className={styles.eventmap}>
        <EventMap />
      </div>
    </div>
  );
};

export default EventPage;
