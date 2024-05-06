import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './NavBar.module.css';
import logo from '../../images/logoLumatic.svg';

const NavBar = () => {
    return (
        <header className={styles.container}>
            <div className={styles.logolumatic}>
                <img src={logo} alt="Lumatic logo" />
            </div>
            <nav className = {styles.nav}>

                <Link to="/eventos" className={styles.navcontent}>
                    <button className={styles.buttoneventos}>EXPLORAR EVENTOS</button>
                </Link>

                <Link to="/login" className={styles.navcontent}>
                    <button className={styles.buttonlogin}>INICIAR SESIÓN</button>
                </Link>

            </nav>
        </header>
    );
};

export default NavBar;
