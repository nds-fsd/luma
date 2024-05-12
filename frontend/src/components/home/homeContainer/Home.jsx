import React from "react";
import { Link } from "react-router-dom";
import imgHomeDesktop from "../../../images/imgHome.png";
import imgHomeMobile from "../../../images/img-mobile.png";
import styles from "./Home.module.css";



const Home = () => {
    const isMobile = window.innerWidth <= 768; 
    const imgHome = isMobile ? imgHomeMobile : imgHomeDesktop;

  return (

      <div className={styles.container}>
        <div className={styles.containerleft}>
          <h1 className={styles.title}>
            LOS EVENTOS MÁS INCREÍBLES AL ALCANCE DE TODOS.
          </h1>
          <p className={styles.text}>
            Crea una página para tu evento, invita a tus amigos y vende
            tickets. Organiza hoy mismo un evento memorable.
          </p>
          <Link to="/crear-evento" style={{ textDecoration: 'none' }}>
            <button className={styles.buttoncrearevento}>CREA TU PRIMER EVENTO</button>
          </Link>
        </div>
        <div className={styles.imghome}>
            <img src={imgHome} alt="Image event" />
        </div>
      </div>

  );
};

export default Home;
