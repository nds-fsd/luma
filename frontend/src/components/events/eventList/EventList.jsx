import React, { useState, useEffect } from 'react'; 
import styles from './EventList.module.css'; 
// import yogaImage from "../imagenes/yoga2.jpg";
// import runImage from "../imagenes/running.jpg";
import api from '../../../utils/api';

function EventList() {
    const [events, setEvents] = useState([]);
    const [refresh, setRefresh] = useState(false);
  
    useEffect(() => {
        const getEvents = async () => {
          try {
            const response = await api.get('/events');
            setEvents(response.data);
          } catch (error) {
            console.error('Error fetching events:', error);
          }
        };
      
        getEvents();
      }, [refresh]);
      
    return (
        <div className={styles.eventList}>
            {events.map((events, index) => (
                <div key={index} className={styles.event}>
                    <div className={`${styles.eventItem} ${styles.hora}`}>
                        <span>{events.eventDate}</span> 
                    </div>                    
                    {/* <div className={`${styles.eventItem} ${styles.nombre}`}>
                        <span>{evento.nombre}</span>
                    </div>
                    <div className={`${styles.eventItem} ${styles.organizadoPor}`}>
                        <span className={styles.label}>Organizado por: </span>
                        <span>{evento.organizadoPor}</span>
                    </div>
                    <div className={`${styles.eventItem} ${styles.localizacion}`}>
                        <span>{evento.localizacion}</span>
                    </div>
                    <div className={styles.eventImage}>
                        <img src={evento.imagen} alt={evento.nombre} style={{ width: '120px', height: '120px', borderRadius: '10px', marginLeft: '320px', marginTop: '-110px' }} /> 
                    </div> */}
                </div>
            ))}
        </div>
    );
}

export default EventList;


    











