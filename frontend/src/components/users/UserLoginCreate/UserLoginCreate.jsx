import React from 'react';
import { useForm } from 'react-hook-form';
import UserLogin from './UserLogin/UserLogin';
import UserCreate from './UserCreate/UserCreate';

const UserLoginCreate = () => {
  const { handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Aquí puedes agregar lógica para manejar el inicio de sesión
  };

  return (
    <div>
      <UserLogin onSubmit={handleSubmit(onSubmit)} />
    </div>
  );
};

export default UserLoginCreate;
