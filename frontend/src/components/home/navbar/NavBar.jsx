import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './NavBar.module.css';
import logo from '../../../images/logoLumatic.svg';
import iconLogin from '../../../images/icon-login.svg'; 

const NavBar = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <header className={styles.container}>
            <div className={styles.logolumatic}>
                <Link to="/">
                    <img src={logo} alt="Lumatic logo" />
                </Link>
            </div>
            <nav className={styles.nav}>

                <Link to="/eventos" className={styles.navcontent}>
                    <button className={styles.buttoneventos}>EXPLORAR EVENTOS</button>
                </Link>

                {!isMobile && (
                    <Link to="/login" className={styles.navcontent}>
                        <button className={styles.buttonlogin}>INICIAR SESIÓN</button>
                    </Link>
                )}
                {isMobile && (
                    <Link to="/login" className={styles.navcontent}>
                        <img src={iconLogin} className={styles.iconlogin} alt="Login icon" />
                    </Link>
                )}

            </nav>
        </header>
    );
};

export default NavBar;
