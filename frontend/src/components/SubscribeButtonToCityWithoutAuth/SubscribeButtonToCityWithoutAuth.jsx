import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './SubscribeButtonToCityWithoutAuth.module.css';
import { api } from '../../utils/api';

const SubscribeBox = ({ cityName }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await api().post('/subscription/subscribe', { email: data.email, cityName });
      setMessage(response.data.message);
      reset();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error subscribing');
    }
  };

  return (
    <div className={styles['subscribe-box-container']}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.organizerElements}>
          <div>
            <input
              type='email'
              placeholder='myname@email.com'
              {...register('email', { required: 'Email is required' })}
              className={styles['subscribe-input']}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div>
            <button type='submit' className={styles.subscribeButton}>
              Suscribirse
            </button>
          </div>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SubscribeBox;
