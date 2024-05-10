import React, { useState, useEffect } from 'react';
import users from '../../../../public/users.json';
//import { api } from "../../utils/apiWrapper";


/*const getAllUsers = () => {
  return api.get('/api/users')
      .then(res => {
          return res.data
      })
      .catch(e => console.log(e));
}
*/


function UserList() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    setUser(users);
  }, []);



  return (
    <div className="user-list">
      <h1>Lista de Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>Foto de Perfil</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {user.map((userData, index) => (
            <tr key={index}>
              <td>
                <img src="ruta/a/imagen-predeterminada.jpg" alt="Foto de perfil" className="profile-pic" />
              </td>
              <td>{userData.fullname}</td>
              <td>{userData.email}</td>
              <td>{userData.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
