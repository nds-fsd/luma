import React from "react";
import { Link } from "react-router-dom";
import imgHome from "../../images/imgHome.png";
import styles from "./Home.module.css";
import NavBar from "../navbar/navbar";

const Home = () => {
  return (
    <div>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.containerleft}>
          <h1>
            LOS EVENTOS <br />
            MÁS INCREÍBLES <br />
            AL ALCANCE <br />
            DE TODOS.
          </h1>
          <p className={styles.text}>
            Crea una página para tu evento, invita a tus amigos y vende
            tickets. Organiza hoy mismo un evento memorable.
          </p>
          <Link to="/crear-evento" className={styles.buttoncrearevento}>
            <button className={styles.buttoncrearevento}>CREA TU PRIMER EVENTO</button>
          </Link>
        </div>
        <div className={styles.imghome}>
          <img src={imgHome} alt="Image event" />
        </div>
      </div>
    </div>
  );
};

export default Home;