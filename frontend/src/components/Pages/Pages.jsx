import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Pages.module.css';

function Pages() {
  return (
    <div className={styles.containerbutton}>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <button className={styles.button}>SEGUIMOS AVANZANDO</button>
      </Link>
    </div>
  );
}

export default Pages;
