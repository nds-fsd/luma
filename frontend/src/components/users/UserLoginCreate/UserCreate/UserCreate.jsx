import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './UserCreate.module.css';
import { api } from '../../../../utils/api';

function UserCreate({ onClose }) {
  const [errorServer, setErrorServer] = useState('');
  const [messageServer, setMessageServer] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    register('profile_picture');
  }, [register]);

  const handleImageUpload = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'imageProfile');
      formData.append('folder', 'Lumatic');

      const url = 'https://api.cloudinary.com/v1_1/lumatic/image/upload';
      const options = {
        method: 'POST',
        body: formData,
      };

      const response = await fetch(url, options);
      console.log(response);
      const data = await response.json();
      console.log(data.secure_url);
      setImageUrl(data.secure_url);
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
    }
  };

  const onSubmit = async (data) => {
    data.profile_picture = imageUrl;
    setErrorServer('');
    setMessageServer('');

    if (data.password !== data.confirm_password) {
      setErrorServer("Passwords don't match");
      return;
    }
    console.log(data)
    try {
      const response = await api().post('/user/register', data);
      console.log(response);
      if (response?.data.success) {
        setMessageServer(response.data.message);
        setErrorServer('');
        reset();
        window.location.reload();
      } else {
        setErrorServer(response.data.error);
        setMessageServer('');
      }
    } catch (error) {
      setErrorServer(error.response?.data?.error || 'An error occurred');
      setMessageServer('');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      event.target.value = value.toLowerCase();
    }
    setErrorServer('');
    setMessageServer('');
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    handleInputChange(event);
    // clearErrors('profile_picture');
    await handleImageUpload(file);
  };

  const autocompleteValue = Math.random().toString(36).substring(2);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.title}>
          <h2 style={{ color: 'white' }}>Bienvenidos a Lumatic</h2>
        </div>
        <div className={styles.subtitle}>Regístrate, a continuación.</div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('fullname')}
            placeholder='Full Name'
            className={styles.input}
            onChange={handleInputChange}
            autoComplete={autocompleteValue}
          />
          <input
            {...register('email')}
            placeholder='Email'
            className={styles.input}
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
              id='birthdate'
              onChange={handleInputChange}
              autoComplete={autocompleteValue}
            />
          </div>
          <input
            {...register('phone_number')}
            placeholder='Phone Number'
            className={styles.input}
            onChange={handleInputChange}
            autoComplete={autocompleteValue}
          />
          <input
            {...register('profile_picture')}
            type='file'
            className={styles.input}
            onChange={handleFileChange}
          />
          {errors.profile_picture && (
            <span className={styles.error}>{errors.profile_picture.message}</span>
          )}
          <input
            {...register('password')}
            type='password'
            placeholder='Password'
            className={styles.input}
            onChange={handleInputChange}
            autoComplete={autocompleteValue}
          />
          <input
            {...register('confirm_password')}
            type='password'
            placeholder='Confirm Password'
            className={styles.input}
            onChange={handleInputChange}
            autoComplete={autocompleteValue}
          />
          <button type='submit' className={styles.button}>
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
        <button onClick={onClose} className={styles.link}>
          Volver atrás
        </button>
      </div>
    </div>
  );
}

export default UserCreate;