import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './UserCreate.module.css';
import api from '../../../../utils/api';

function UserCreate() {
  const [errorServer, setErrorServer] = useState('');
  const [messageServer, setMessageServer] = useState('');

  const {
    register,
    handleSubmit,
    formState: { isDirty },
    reset,
    watch,
  } = useForm();

  const password = watch('password', '');

  const onSubmit = async (data) => {
    data.fullname = data.fullname.toUpperCase();
    data.email = data.email.toLowerCase();
    setErrorServer('');
    setMessageServer('');

    if (data.password !== data.confirm_password) {
      setErrorServer("Password don't match");
      return;
    }

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'fullname') {
      event.target.value = value.toUpperCase();
    }
    if (name === 'email') {
      event.target.value = value.toLowerCase();
    }
    setErrorServer('');
    setMessageServer('');
  };

  const autocompleteValue = Math.random().toString(36).substring(2);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.title}>
          <h2>Bienvenidos a Lumatic</h2>
        </div>
        <div className={styles.subtitle}>Regístrate, a continuación.</div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('fullname')}
            placeholder='Full Name'
            className={`${styles.input}`}
            onChange={handleInputChange}
            autoComplete={autocompleteValue}
          />
          <input
            {...register('email')}
            placeholder='Email'
            className={`${styles.input}`}
            onChange={handleInputChange}
            autoComplete={autocompleteValue}
          />
          <div className={styles.dateInputContainer}>
            <label htmlFor='birthdate' className={styles.placeholder}>
              Birth Date
            </label>
            <input
              {...register('birthdate')}
              placeholder='Birth Date'
              type='date'
              className={`${styles.input} ${styles.dateInput}`}
              id='dateInput'
              onChange={handleInputChange}
              autoComplete={autocompleteValue}
            />
          </div>
          <input
            {...register('phone_number')}
            placeholder='Phone Number'
            className={`${styles.input}`}
            onChange={handleInputChange}
            autoComplete={autocompleteValue}
          />
          <input
            {...register('profile_picture')}
            placeholder='Link Profile Picture'
            className={`${styles.input}`}
            onChange={handleInputChange}
            autoComplete={autocompleteValue}
          />
          <input
            {...register('password')}
            type='password'
            placeholder='Password'
            className={`${styles.input}`}
            onChange={handleInputChange}
            autoComplete={autocompleteValue}
          />
          <input
            {...register('confirm_password')}
            type='password'
            placeholder='Confirm Password'
            className={`${styles.input}`}
            onChange={handleInputChange}
            autoComplete={autocompleteValue}
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
