import React from 'react';
import { useForm } from 'react-hook-form';
import UserLogin from './UserLogin/UserLogin';

const UserLoginCreate = ({ handleLogin }) => {
  const { handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Aquí puedes agregar lógica para manejar el inicio de sesión
  };

  return (
    <div>
      <UserLogin onSubmit={handleSubmit(onSubmit)} handleLogin={handleLogin}/>
    </div>
  );
};

export default UserLoginCreate;
