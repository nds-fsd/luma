import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../utils/api';
import styles from './UserList.module.css';
import { useNavigate } from 'react-router-dom';

function UserList() {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api(navigate).get('/user');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [refresh]);

  const deleteUser = async (id) => {
    try {
      await api(navigate).delete(`/user/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Lista de Usuarios</h1>
      <div className={styles.container}>
        <div className={styles.userContainer}>
          {users.map((user, index) => (
            <div key={user._id} className={styles.user}>
              <img
                style={{ height: '120px', width: '120px', borderRadius: '50px 0 50px 0' }}
                src={user.profile_picture}
                alt={`Foto del usuario: ${user.fullname}`}
              />
              <Link to={`/user/${user._id}`} className={styles.textname}>
                {user.fullname}
              </Link>
              <h4>{user.role === 'ADMIN' ? 'Administrador' : 'Event Creator'}</h4>
              <button className={styles.button} onClick={() => deleteUser(user._id)}>
                Delete
              </button>
              {index % 5 === 4 && <br />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserList;
