import React from "react";
import yogaImage from "../imagenes/yoga2.jpg";
import styles from './EventDetail.module.css';
import SubscribeBox from "../subscribe/Subscribe";
import NavBar from "../navBar/NavBar"; 
import locationGif from "../imagenes/location.png";
import dateGif from "../imagenes/calendario.png";
import organizationGif from "../imagenes/organizer.png";
import instagramGif from "../imagenes/instagram.png";
import webGif from "../imagenes/web.png";
import linkedinGif from "../imagenes/linkedin.png";


const EventDetail = () => {
    return (
        <div>
            <div className={styles["navBar-1"]}>
                <NavBar />
            </div>
            <div className={styles.eventDetail}>
                <div className={styles.eventDetailContent}>
                    <img src={yogaImage} alt="yogaImage" className={styles.eventImage} />

                    <div className={styles.organizerContainer}>
                      <img src={organizationGif} alt="organizer" className={styles.organizerIcon} />
                      <span className={styles.organizerLabel}>Organizado por:</span>
                      <span className={styles.organizerName}>It's Five Yoga</span><br/><br/>
                      <img src={instagramGif} alt="Instagram" className={styles.socialIcon1} />
                      <img src={linkedinGif} alt="LinkedIn" className={styles.socialIcon2} />
                      <img src={webGif} alt="Web" className={styles.socialIcon3} />
                    </div>

                    <h1 className={styles.eventTitle}>
                        YOGA & BRUNCH
                    </h1>

                    <p className={styles.eventDate}>
                    <img src={dateGif} alt="date" className={styles.dateIcon} /> 10 de mayo de 2024
                    </p>

                    <p className={styles.eventLocation}>
                    <img src={locationGif} alt="location" className={styles.locationIcon} /> Baldomero, Barcelona
                    </p>
                    
                    <div className={styles["subscribe-container"]}>
                        <SubscribeBox />
                    </div>

                    <h2 className={styles.eventTitle2}>Acerca del evento</h2>

                    <p className={styles.eventDescription}>
                      YOGA & BRUNCH 🧘🏾‍♀️🥐🪴

                      Este próximo domingo 12 de mayo <br/> 
                      nos vemos en la terraza secreta de Baldomero, en el passatge <br/>
                      de Mercader, compartiendo una clase de Vinyasa Flow y luego <br/> 
                      un súper delicious brunch 🤤<br/> <br/>

                      <span className={styles.eventTime}>• 11:30h Clase de Yoga</span><br/>
                      <span className={styles.eventTime}>• 13:00h Brunch - All You Can Eat + 2 bebidas incluidas</span><br/><br/>

                      • <strong>Precio:</strong> 42€ (pago el día del evento in situ)
                      <br/> <br/>

                      ¡Nos vemos para compartir una mañana increíble!
                    </p>
                </div>      



                
            </div>
        </div>
    );
}

export default EventDetail;