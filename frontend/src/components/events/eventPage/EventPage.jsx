import React from "react";
import Clock from "../clock/Clock";
import EventList from "../eventList/EventList";
import SubscribeBox from "../subscribe/Subscribe";
import styles from './EventPage.module.css';

const EventPage = () => {
  return (
    <div>
      <div className={styles['event-page']}>
        <div className={styles.encabezado}>
          <div>         
            <h1 className={styles["titulo-header"]}>
              Qué está pasando en <br />
              <span className={styles["titulo-barcelona"]}>BARCELONA</span>
            </h1>

            <div className={styles["clock-container"]}>
              <Clock timeZone="Europe/Madrid" className={styles["custom-clock"]} />
            </div>

            <p className={styles["texto-p"]}>
              Los eventos más actuales e interesantes<br />
              en la maravillosa ciudad de Barcelona.
            </p>

            <div className={styles["subscribe-container"]}>
              <SubscribeBox />
            </div>

            <hr />
          </div>
        </div>

        <main className={styles.main}>
          <h1 className={styles['titulo-eventos']}>Upcoming Events</h1>
          <div>
            <EventList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default EventPage;
