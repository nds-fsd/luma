import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../../utils/api';
import styles from './UserDetail.module.css';

function UserDetail() {
  const [user, setUser] = useState(null);
  const [socialNetworks, setSocialNetworks] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api().get(`/user/${userId}`);
        setUser(response.data);
        fetchSocialNetworks(response.data._id);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const fetchSocialNetworks = async (id) => {
    try {
      const response = await api().get(`/user/${id}/socialNetworks`);
      setSocialNetworks(response.data.socialNetworks);
    } catch (error) {
      console.error('Error fetching social networks:', error);
    }
  };

  if (!user) {
    return <div className={styles.center}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <img
        className={styles.imagePhoto}
        src={user.profile_picture}
        alt={`Foto del usuario: ${user.fullname}`}
      />
      <h1 className={styles.nameText}>{user.fullname}</h1>
      <h4 className={styles.nameRole}>{user.role === 'ADMIN' ? 'Administrador' : 'Event Creator'}</h4>
      <p className={styles.textData}>
        Email: <br /> {user.email}
      </p>
      <p className={styles.textData}>
        Birthdate: <br /> {user.birthdate}
      </p>
      <p className={styles.textData}>
        Phone: <br /> {user.phone_number}
      </p>
      <div className={styles.socialNetworksList}>
        {socialNetworks.map((sn, index) => (
          <div key={index} className={styles.socialNetworkItem}>
            <div className={styles.organizerNetworks}>
              <div>
                <p className={styles.textData}>
                  {sn.network === 'Instagram' && <>{sn.network}: <br/><a href={`https://www.instagram.com/${sn.username}`} target="_blank" rel="noopener noreferrer" className={styles.aLink}>{sn.username}</a></>}
                  {sn.network === 'LinkedIn' && <>{sn.network}: <br/><a href={`https://www.linkedin.com/in/${sn.username}`} target="_blank" rel="noopener noreferrer" className={styles.aLink}>{sn.username}</a></>}
                  {sn.network === 'Website' && <>{sn.network}: <br/><a href={`${sn.username}`} target="_blank" rel="noopener noreferrer" className={styles.aLink}>{sn.username}</a></>}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDetail;
