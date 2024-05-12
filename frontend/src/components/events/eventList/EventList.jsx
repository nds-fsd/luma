import React from "react";
import styles from './EventList.module.css'; 
import yogaImage from "../imagenes/yoga2.jpg";
import runImage from "../imagenes/running.jpg";

const EventList = () => {
    const eventos = [
        {
            hora: "11h",
            nombre: "YOGA AND BRUNCH", 
            organizadoPor: "It's Five Yoga",
            localizacion: "Baldomero BCN",
            imagen: yogaImage
        },
        {
            hora: "19h",
            nombre: "INTRO AL RUNNING",
            organizadoPor: "Runners BCN",
            localizacion: "Arc de Triomf",
            imagen: runImage
        }
    ];

    return (
        <div className={styles.eventList}>
            {eventos.map((evento, index) => (
                <div key={index} className={styles.event}>
                    <div className={`${styles.eventItem} ${styles.hora}`}>
                        <span>{evento.hora}</span> 
                    </div>
                    <div className={`${styles.eventItem} ${styles.nombre}`}>
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
                    </div>
                </div>
            ))}
        </div>
    );
}

export default EventList;


    











