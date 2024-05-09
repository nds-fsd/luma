import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './UserCreate.module.css';
import api from '../../services/api';

function UserCreate() {
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    reset,
  } = useForm();
  const password = watch('password', '');

  const onSubmit = async (data) => {
    try {
      const response = await api.post(`/api/user/register`, data);
      console.log(response);
      if (response.data.success) {
        setMessage(response.data.message);
        reset();
      } else {
        setMessage(`Error: ${response.data.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.response.data.error}`);
    }
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
          />
          <input
            {...register('username', { required: true })}
            placeholder='Username'
            className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
          />
          <input
            {...register('email', { required: true })}
            placeholder='Email'
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          />
          <input
            {...register('phone_number', { required: true })}
            placeholder='Phone Number'
            className={`${styles.input} ${errors.phone_number ? styles.inputError : ''}`}
          />
          <input
            {...register('password', { required: true })}
            type='password'
            placeholder='Password'
            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
          />
          <input
            {...register('confirm_password', {
              required: true,
              validate: (value) => value === password || styles.inputError,
            })}
            type='password'
            placeholder='Confirm Password'
            className={`${styles.input} ${errors.confirm_password ? styles.inputError : ''}`}
          />
          <button type='submit' className={styles.button} disabled={!isDirty}>
            Register
          </button>
        </form>
        {(errors.username || errors.email || errors.password || errors.fullname || errors.phone_number) && (
          <span className={styles.error}>The field is required</span>
        )}
        {errors.confirm_password && <span className={styles.error}>Passwords do not match</span>}
        {message && <div className={styles.message}>{message}</div>}
      </div>
    </div>
  );
}

export default UserCreate;
