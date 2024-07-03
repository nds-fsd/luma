import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../../utils/api';
import styles from './EventPage.module.css';
import EventList from '../eventList/EventList';
import SubscribeButtonToCity from '../../SubscribeButtonToCity/SubscribeButtonToCity';
import SubscribeBox from '../../SubscribeButtonToCityWithoutAuth/SubscribeButtonToCityWithoutAuth';
import { AuthContext } from '../../users/AuthContext/AuthContext';
import EventMap from '../../EventMap/EventMap';

const EventPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cityId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCityById = async () => {
      try {
        const response = await api(navigate).get(`/city/${cityId}`);
        setCity(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener la ciudad:', error);
        setError('Error al obtener la ciudad');
        setLoading(false);
      }
    };

    fetchCityById();
  }, [cityId, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
            {city && isAuthenticated && <SubscribeButtonToCity cityName={city.cityName} />}
            {city && !isAuthenticated && <SubscribeBox cityName={city.cityName}/>}
          </div>
          <hr />
          <div className={styles.eventmap}>
            {city && <EventMap cityName={city.cityName} />}
          </div>
        </div>
        <div className={styles.header} style={backgroundStyle}></div>
      </div>

      <div className={styles.main}>
        <h1 className={styles['title-events']}>Upcoming Events</h1>
        <EventList cityId={cityId}/>
      </div>
    </div>
  );
};

export default EventPage;
