import React, { useState, useEffect } from "react";
import styles from './Clock.module.css';

const Clock = ({ timeZone, className }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options = {
        timeZone,
        hour12: false, 
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
      setTime(timeString);
    };

    updateClock();
    const intervalId = setInterval(updateClock, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone]);

  return (
    <div className={`${styles.clock} ${className}`}>
      {time}
    </div>
  );
};

export default Clock;