import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../utils/api';
import styles from './EventPage.module.css';
import Clock from '../clock/Clock';
import EventList from '../eventList/EventList';
import SubscribeBox from '../subscribe/Subscribe';

const EventPage = () => {
  const [city, setCity] = useState(null);
  const { cityId } = useParams();

  useEffect(() => {
    const fetchCityById = async () => {
      try {
        const response = await api.get(`/city/${cityId}`);
        setCity(response.data);
      } catch (error) {
        console.error('Error al obtener la ciudad:', error);
      }
    };

    fetchCityById();
  }, [cityId]);

  const backgroundImage = city ? city.cityWallpaper : '';

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  return (
    <div>
      <div className={styles['event-page']}>
        <div className={styles.headerWallpaper}>
          <div className={`${styles['blue-background']}`}>

            <h1 className={styles['titulo-header']}>
              Qué está pasando en <br />
              {city && <span className={styles['titulo-ciudad']}>{city.cityName}</span>}{' '}
            </h1>

            <div className={styles['clock-container']}>
              <Clock timeZone='Europe/Madrid' className={styles['custom-clock']} />
            </div>

            <p className={styles['texto-p']}>
              Los eventos más actuales e interesantes
              <br />
              {city && `en la maravillosa ciudad de ${city.cityName}.`}
            </p>

            <div className={styles['subscribe-container']}>
              <SubscribeBox />
            </div>

            <hr />
          </div>
          <div className={styles.encabezado} style={backgroundStyle}></div>
        </div>
        <main className={styles.main}>
          <h1 className={styles['titulo-eventos']}>Upcoming Events</h1>
          <div>
            <EventList cityId={cityId} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default EventPage;
