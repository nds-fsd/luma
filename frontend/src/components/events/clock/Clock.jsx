import React, { useState, useEffect } from "react";

const Clock = ({ timeZone }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString("es-ES", { timeZone }); 

  return (
    <div>
      <p>{formattedTime}</p>
    </div>
  );
};

export default Clock;