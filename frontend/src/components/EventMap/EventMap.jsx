import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './EventMap.module.css';

const EventMap = () => {
  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapObject}>
        <MapContainer center={[40.4168, -3.7038]} zoom={5} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[40.4168, -3.7038]} />
        </MapContainer>
      </div>
    </div>
  );
};

export default EventMap;
