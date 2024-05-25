import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './UserLogin.module.css';
import UserCreate from '../UserCreate/UserCreate';
import api from '../../../../utils/api';
import logo from '../../../../images/Lumatic.svg';
import { setUserSession } from '../../../../utils/localStorage.utils';

const UserLogin = ({ handleLogin }) => {
  const [inputType, setInputType] = useState('email');
  const [isUserCreateOpen, setIsUserCreateOpen] = useState(false);
  const [backendError, setBackendError] = useState('');

  const openUserCreate = (event) => {
    event.preventDefault();
    setIsUserCreateOpen(true);
  };

  const closeUserCreate = () => {
    setIsUserCreateOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleInputChange = (type) => {
    setInputType(type);
    setBackendError('');
  };

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/user/login', data);
      if (response?.data.token) {
        setUserSession(response.data);
        handleLogin();
      }
    } catch (error) {
      console.error('Error ocurrió al iniciar sesión:', error);
      setBackendError(error.response?.data?.error || 'Un error inesperado ocurrió');
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        {!isUserCreateOpen && (
          <div className={styles.innerContainer}>
            <div className={styles.title}>
              <h2 style={{ color: 'white' }}>Bienvenidos a Lumatic</h2>
            </div>
            <div className={styles.subtitleLogo}>
              <div className={styles.subtitle}>Por favor, inicia sesión o regístrate a continuación.</div>
              <div><img src={logo} className={styles.logo} alt='Logo de Lumatic' /></div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className={styles.formGroup}>
                <div className={styles.text}>
                  <p
                    onClick={() => handleInputChange('email')}
                    className={inputType === 'email' ? styles.selected : ''}
                  >
                    Correo electrónico
                  </p>
                </div>
                <div className={styles.text}>
                  <p
                    onClick={() => handleInputChange('phone_number')}
                    className={inputType === 'phone_number' ? styles.selected : ''}
                  >
                    Usar número telefónico
                  </p>
                </div>
              </div>
              <div className={styles.formGroup}>
                <input
                  type={inputType === 'phone_number' ? 'tel' : 'email'}
                  placeholder={inputType === 'email' ? 'tucorreo@ejemplo.com' : '+34 675 21 56 50'}
                  id={inputType === 'email' ? 'email' : 'phone_number'}
                  {...register(inputType === 'email' ? 'email' : 'phone_number', { required: true })}
                  autoComplete='email'
                  className={styles.input}
                />
                {errors[inputType === 'email' ? 'email' : 'phone_number'] && (
                  <span className={styles.error}>
                    {inputType === 'email' ? 'Correo electrónico' : 'Teléfono'} es requerido
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                )}
              </div>
              <div className={styles.formGroup}>
                <input
                  {...register('password', {
                    required: 'La contraseña es requerida',
                    minLength: {
                      value: 8,
                      message: 'La contraseña debe tener al menos 8 caracteres',
                    },
                  })}
                  placeholder='Contraseña'
                  type='password'
                  autoComplete='current-password'
                  className={styles.input}
                />
                {errors.password && <span className={styles.error}>{errors.password.message}</span>}
              </div>
              {backendError && <span className={styles.error}>{backendError}</span>}
              <button type='submit' className={styles.button}>
                {`Continuar con ${inputType === 'email' ? 'correo electrónico' : 'teléfono'}`}
              </button>
              <div className={styles.containerRegisterUser}>
                <button onClick={openUserCreate} className={styles.link}>
                  Registro de Usuario
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      {isUserCreateOpen && <UserCreate onClose={closeUserCreate} />}
    </div>
  );
};

export default UserLogin;