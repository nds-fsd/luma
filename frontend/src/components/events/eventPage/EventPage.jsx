import React from "react";
import Clock from "../clock/Clock";
import EventList from "../eventList/EventList";
import MiImagen from "../imagenes/Hotel-Vela.jpg"
import SubscribeBox from "../subscribe/Subscribe";
import styles from './EventPage.module.css';

const EventPage = () => {
  return (
    <div>
      
      
      <div className={styles["event-page"]}>

        <div className={styles.encabezado}>
          <img src={MiImagen} alt="Mi Imagen" className={styles.imagen} />

          <h1 className={styles["titulo-header"]}>
            Qué está pasando en <br />
            <span className={styles["titulo-barcelona"]}>BARCELONA</span>
          </h1>

          <div className={styles["clock-container"]}>
            <Clock timeZone="Europe/Madrid" />
          </div>

          <p className={styles["texto-p"]}>
            Los eventos más actuales e interesantes<br />
            en la maravillosa ciudad de Barcelona.
          </p>

          <SubscribeBox />

          <hr />
        </div>

        <main className={styles.main}>
          <h1 className={styles["titulo-eventos"]}>Upcoming Events</h1>
          <div>
            <EventList />
          </div>
        </main>
      </div>
    </div>
  );
}

export default EventPage;
