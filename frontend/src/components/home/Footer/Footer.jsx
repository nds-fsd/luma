import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.footermenu}>
        <Link to='/novedades'>
          <button className={styles.footermain}>NOVEDADES</button>
        </Link>
        <Link to='/precios'>
          <button className={styles.footermain}>PRECIOS</button>
        </Link>
        <Link to='/pages'>
          <button className={styles.footermain}>AYUDA</button>
        </Link>
        <Link to='/terminos'>
          <button className={styles.footerlegal}>TÉRMINOS</button>
        </Link>
        <Link to='/privacidad'>
          <button className={styles.footerlegal}>PRIVACIDAD</button>
        </Link>
        <Link to='/seguridad'>
          <button className={styles.footerlegal}>SEGURIDAD</button>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
