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
            {events.map((event, index) => (
                <div key={index} className={styles.event}>
                    <div className={`${styles.eventItem} ${styles.hora}`}>
                        <span>{new Date(event.eventDate).toLocaleDateString()}</span> 
                    </div>                    
                    <div className={`${styles.eventItem} ${styles.nombre}`}>
                        <span>{event.eventTitle}</span>
                    </div>
                    <div className={`${styles.eventItem} ${styles.organizadoPor}`}>
                        <span className={styles.label}>Organizado por: </span>
                        <span>{event.owner.fullname}</span>
                    </div>
                    <div className={`${styles.eventItem} ${styles.descripcion}`}>
                        <span>{event.eventDescription}</span>
                    </div>
                    <div className={`${styles.eventItem} ${styles.precio}`}>
                        <span className={styles.label}>Precio: </span>
                        <span>{event.eventPrice}</span>
                    </div>
                    <div className={`${styles.eventItem} ${styles.capacidad}`}>
                        <span className={styles.label}>Capacidad: </span>
                        <span>{event.eventCapacity}</span>
                    </div>

                   
                </div>
            ))}
        </div>
    );
}

export default EventList;


    











