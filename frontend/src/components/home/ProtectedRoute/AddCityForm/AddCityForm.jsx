import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './AddCityForm.module.css';
import { api } from '../../../../utils/api';
import { useNavigate } from 'react-router-dom';

const AddCityForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [cities, setCities] = useState([]);
  const [messageServer, setMessageServer] = useState('');
  const [errorServer, setErrorServer] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await api(navigate).get('/city');
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  const onSubmit = async (data) => {
    reset();

    try {
      const response = await api(navigate).post(`/city`, data);
      console.log(response.data);
      if (response.data) {
        setMessageServer(response.data.message);
        setErrorServer('');
        setCities([...cities, { cityName: data.cityName, cityLogo: data.cityLogo }]);
        reset();
      } else {
        setErrorServer(response.data.error);
        setMessageServer('');
      }
    } catch (error) {
      setErrorServer(error.response ? error.response.data.error : 'Server error');
      setMessageServer('');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Lista de Ciudades</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label htmlFor='cityName' className={styles.label}>
          Nombre de la ciudad:
        </label>
        <input
          type='text'
          id='cityName'
          {...register('cityName', { required: 'The field is required!' })}
          className={styles.input}
          placeholder='Introduce el nombre de la ciudad'
        />
        {errors.cityName && <p className={styles.error}>{errors.cityName.message}</p>}
        
        <label htmlFor='cityLogo' className={styles.label}>
          Link del Logo:
        </label>
        <input
          type='text'
          id='cityLogo'
          {...register('cityLogo', { required: 'The field is required!' })}
          className={styles.input}
          placeholder='Introduce el link del logo de la ciudad'
        />
        {errors.cityLogo && <p className={styles.error}>{errors.cityLogo.message}</p>}
        
        <label htmlFor='cityWallpaper' className={styles.label}>
          Link del Wallpaper:
        </label>
        <input
          type='text'
          id='cityWallpaper'
          {...register('cityWallpaper', { required: 'The field is required!' })}
          className={styles.input}
          placeholder='Introduce el link del wallpaper de la ciudad'
        />
        {errors.cityWallpaper && <p className={styles.error}>{errors.cityWallpaper.message}</p>}
        
        <button type='submit' className={styles.button}>
          Añadir Ciudad
        </button>
      </form>
      {messageServer && <p className={styles.success}>{messageServer}</p>}
      {errorServer && <p className={styles.error}>{errorServer}</p>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre de la ciudad</th>
            <th>Logo</th>
            <th>Wallpaper</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city, index) => (
            <tr key={index}>
              <td>{city.cityName}</td>
              <td><img src={city.cityLogo} alt={`${city.cityName} logo`} className={styles.cityLogo} /></td>
              <td><img src={city.cityWallpaper} alt={`${city.cityName} wallpaper`} className={styles.cityWallpaper} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddCityForm;
