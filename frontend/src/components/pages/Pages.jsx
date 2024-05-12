import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Pages.module.css';

function Pages() {
  return (
    <div className={styles.containerbutton}>

        <Link to="/home" style={{ textDecoration: 'none' }}>
            <button className={styles.button}>HOME</button>
        </Link>
        <Link to="/login" style={{ textDecoration: 'none' }}>
            <button className={styles.button}>REGISTRAR</button>
        </Link>
        <Link to="/createevent" style={{ textDecoration: 'none' }}>
            <button className={styles.button}>CREAR EVENTO</button>
        </Link>
        <Link to="/userdetail" style={{ textDecoration: 'none' }}>
            <button className={styles.button}>DETALLE DE USUARIO</button>
        </Link>
        <Link to="/userlist" style={{ textDecoration: 'none' }}>
            <button className={styles.button}>LISTA DE USUARIOS</button>
        </Link>
    </div>
  );
}

export default Pages;
