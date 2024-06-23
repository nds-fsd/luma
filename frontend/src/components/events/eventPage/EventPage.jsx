import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../../utils/api';
import styles from './EventPage.module.css';
import Clock from '../Clock/Clock';
import EventList from '../EventList/EventList';
import SubscribeWithEmail from '../../SubscribeButtonToCity/SubscribeButtonToCity';
import SubscribeBox from '../../SubscribeButtonToCityWithoutAuth/SubscribeButtonToCityWithoutAuth';

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
          <div className={styles['clock-container']}>
            <Clock timeZone='Europe/Madrid' className={styles['custom-clock']} />
          </div>
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
    </div>
  );
};

export default EventPage;
