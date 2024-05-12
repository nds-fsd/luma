import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './UserCreate.module.css';
import api from '../../utils/api';

function UserCreate() {
  const [errorServer, setErrorServer] = useState('');
  const [messageServer, setMessageServer] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm();
  const password = watch('password', '');

  const onSubmit = async (data) => {
    data.fullname = data.fullname.toUpperCase();
    data.email = data.email.toLowerCase();
    setErrorServer('');
    setMessageServer('');
    try {
      const response = await api.post(`/user/register`, data);
      if (response.data.success) {
        setMessageServer(response.data.message);
        setErrorServer('');
        reset();
      } else {
        setErrorServer(response.data.error);
        setMessageServer('');
      }
    } catch (error) {
      setErrorServer(error.response.data.error);
      setMessageServer('');
    }
  };

  const handleInputChange = () => {
    setErrorServer('');
    setMessageServer('');
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.title}>
          <h2>Bienvenidos a Lumatic</h2>
        </div>
        <div className={styles.subtitle}>Regístrate, a continuación.</div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('fullname', { required: true })}
            placeholder='Full Name'
            className={`${styles.input} ${errors.fullname ? styles.inputError : ''}`}
            onChange={handleInputChange}
            title={errors.fullname ? 'The field is required' : ''}
          />
          <input
            {...register('email', { required: true })}
            placeholder='Email'
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            onChange={handleInputChange}
            title={errors.email ? 'The field is required' : ''}
          />
          <div className={styles.dateInputContainer}>
            <label htmlFor='birthdate' className={styles.placeholder}>
              Birth Date
            </label>
            <input
              {...register('birthdate', { required: true })}
              placeholder='Birth Date'
              type='date'
              className={`${styles.dateInput} ${styles.input} ${errors.birthdate ? styles.inputError : ''}`}
              onChange={handleInputChange}
              title={errors.birthdate ? 'The field is required' : ''}
            />
          </div>
          <input
            {...register('phone_number', { required: true })}
            placeholder='Phone Number'
            className={`${styles.input} ${errors.phone_number ? styles.inputError : ''}`}
            onChange={handleInputChange}
            title={errors.phone_number ? 'The field is required' : ''}
          />
          <input
            {...register('password', { required: true })}
            type='password'
            placeholder='Password'
            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
            onChange={handleInputChange}
            title={errors.password ? 'The field is required' : ''}
          />
          <input
            {...register('confirm_password', {
              required: true,
              validate: (value) => value === password || setErrorServer(`Password don't match`),
            })}
            type='password'
            placeholder='Confirm Password'
            className={`${styles.input} ${errors.confirm_password ? styles.inputError : ''}`}
            onChange={handleInputChange}
            title={errors.confirm_password ? 'The field is required' : ''}
          />
          <button type='submit' className={styles.button} disabled={!isDirty}>
            Register
          </button>
        </form>
        <div className={styles.messagesAll}>
          {errorServer && (
            <div>
              <span className={styles.error}>{errorServer}</span>
              <br />
            </div>
          )}
          {messageServer && (
            <div>
              <span className={styles.message}>{messageServer}</span>
              <br />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserCreate;
