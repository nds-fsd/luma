import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './EventMap.module.css';
import axios from 'axios';

console.log('All ENV Variables:', process.env);


const API_KEY = process.env.OPENCAGE_API;
console.log('API Key:', API_KEY);

const getCoordinates = async (cityName) => {
  try {
    const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
      params: {
        key: API_KEY,
        q: cityName,
        limit: 1
      }
    });

    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry;
      return { lat, lng };
    } else {
      throw new Error('City not found');
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw error;
  }
};

const EventMap = ({ cityName }) => {
  const [coordinates, setCoordinates] = useState({ lat: 40.4168, lng: -3.7038 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        console.log('Fetching coordinates for:', cityName);
        const coords = await getCoordinates(cityName);
        console.log('Coordinates fetched:', coords); 
        setCoordinates(coords);
      } catch (error) {
        console.error('Error setting coordinates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [cityName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapObject}>
        <MapContainer center={[coordinates.lat, coordinates.lng]} zoom={10} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[coordinates.lat, coordinates.lng]} />
        </MapContainer>
      </div>
    </div>
  );
};

export default EventMap;
