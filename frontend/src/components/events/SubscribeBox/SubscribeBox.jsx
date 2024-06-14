import React, { useState } from "react";
import styles from "./SubscribeBox.module.css"; 

const SubscribeBox = () => {
    const [email, setEmail] = useState("");

    const handleInputChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = () => {
        alert(`¡Te has suscrito con éxito!: ${email}!`);
        setEmail(""); 
    };

    return (
        <div className={styles["subscribe-box-container"]}>
            <input
                type="email"
                placeholder="myname@email.com"
                value={email}
                onChange={handleInputChange}
                className={styles["subscribe-input"]}
            />
            <button onClick={handleSubmit} className={styles["subscribe-button"]}>Suscribirse</button>
        </div>
    );
};

export default SubscribeBox;