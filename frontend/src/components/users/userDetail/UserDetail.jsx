import React, { useState, useEffect } from 'react'; 
import { useParams } from 'react-router-dom'; 
import api from '../../../utils/api';
import styles from './UserDetail.module.css';

function UserDetail() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div className={styles.center}>Loading...</div>; 
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.nametext}>{user.fullname}</h1>
      <p className={styles.textdata}>Email: <br /> {user.email}</p>
      <p className={styles.textdata}>Birthdate: <br /> {user.birthdate}</p>
      <p className={styles.textdata}>Phone: <br /> {user.phone_number}</p>

    </div>
  );
}  /* Test */

export default UserDetail;
