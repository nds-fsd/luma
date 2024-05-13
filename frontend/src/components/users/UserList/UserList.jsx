import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import api from '../../../utils/api';
import styles from './UserList.module.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/user');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [refresh]);

  const deleteUser = async (id) => {
    try {
      await api.delete(`/user/${id}`, {
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
      <h1 className={styles.title}>USER LIST</h1>

      <div className={styles.container}>
        <div className={styles.userContainer}>
          {users.map((user, index) => (
            <div key={user._id} className={styles.user}>
              <Link to={`/user/${user._id}`} className={styles.textname}>
                {user.fullname}
              </Link>
              <p className={styles.text}>{user.email}</p>
              <p className={styles.text}>{user.birthdate}</p>
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
