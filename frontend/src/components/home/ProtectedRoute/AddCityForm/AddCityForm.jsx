import React, { useState } from 'react';
import styles from './AddCityForm.module.css';

const AddCityForm = () => {
  const [cityName, setCityName] = useState('');
  const [cityLogo, setCityLogo] = useState('');
  const [cities, setCities] = useState([]);

  const handleAddCity = (cityName, cityLogo) => {
    setCities([...cities, { name: cityName, logo: cityLogo }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cityName.trim() && cityLogo.trim()) {
      handleAddCity(cityName, cityLogo);
      setCityName('');
      setCityLogo('');
    }
  };

  return (
    <div>
      <h1>Lista de Ciudades</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor='cityName' className={styles.label}>
          Nombre de la ciudad:
        </label>
        <input
          type='text'
          id='cityName'
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          className={styles.input}
          placeholder='Introduce el nombre de la ciudad'
        />
        <label htmlFor='cityLogo' className={styles.label}>
          Link del Logo:
        </label>
        <input
          type='text'
          id='cityLogo'
          value={cityLogo}
          onChange={(e) => setCityLogo(e.target.value)}
          className={styles.input}
          placeholder='Introduce el link del logo de la ciudad'
        />
        <button type='submit' className={styles.button}>
          Añadir Ciudad
        </button>
      </form>
      <ul>
        {cities.map((city, index) => (
          <li key={index}>
            {city.name} <img src={city.logo} alt={`${city.name} logo`} className={styles.cityLogo} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddCityForm;
