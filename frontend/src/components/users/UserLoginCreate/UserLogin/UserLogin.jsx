import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './UserLogin.module.css';
import UserCreate from '../UserCreate/UserCreate'; 

const UserLogin = () => {
  const [inputType, setInputType] = useState('email');
  const [isUserCreateOpen, setIsUserCreateOpen] = useState(false);

  const openUserCreate = () => {
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
  };

  const onSubmit = (data) => {
    console.log(data);
    // Aquí enviar los datos del nuevo usuario al backend
  };

  return (
    <div className={styles.outerContainer}>
      {!isUserCreateOpen && ( 
      <div className={styles.innerContainer}>
        <div className={styles.title}>
          <h2>Bienvenidos a Lumatic</h2>
        </div>
        <div className={styles.subtitle}>Por favor, inicia sesión o regístrate a continuación.</div>
      
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.formGroup}>
              <div className={styles.text}>
                <p onClick={() => handleInputChange('email')} className={inputType === 'email' ? styles.selected : ''}>
                  Correo electrónico
                </p>
              </div>
              <div className={styles.text}>
                <p onClick={() => handleInputChange('phone')} className={inputType === 'phone' ? styles.selected : ''}>
                  Usar número telefónico
                </p>
              </div>
            </div>
            <div className={styles.formGroup}>
              <input
                type={inputType === 'phone' ? 'tel' : 'email'}
                placeholder={inputType === 'email' ? 'you@email.com' : '+34 675 21 56 50'}
                id='username'
                {...register('username', { required: true })}
                className={styles.input}
              />
              {errors.username && (
                <span className={styles.error}>{inputType === 'email' ? 'Email' : 'Phone'} is required</span>
              )}
            </div>
            <button type='submit' className={styles.button}>
              {`Continuar con el ${inputType === 'email' ? 'correo electrónico' : 'teléfono'}`}
            </button>
            <button type='button' className={styles.buttonGoogle}>
              Iniciar sesión con Google
            </button>
            <div className={styles.containerRegisterUser}>
              <button onClick={openUserCreate} className={styles.link}>
                Registro de Usuario
              </button>
            </div>
          </form>
       
        
      </div>
       )}
      {isUserCreateOpen && <UserCreate onClose={closeUserCreate} />}
    </div>
  );
};

export default UserLogin;
