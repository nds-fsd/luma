import React from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
      <div className={styles.welcomeMessage}>Bienvenidos a Lumatic</div>
    </div>
  );
};

export default LoadingSpinner;
