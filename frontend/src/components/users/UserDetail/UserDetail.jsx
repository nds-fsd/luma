import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../../utils/api';
import styles from './UserDetail.module.css';

function UserDetail() {
  const [user, setUser] = useState(null);
  const [socialNetworks, setSocialNetworks] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [networkUser, setNetworkUser] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingNetworkUser, setEditingNetworkUser] = useState('');
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

  const handleAddNetwork = async () => {
    if (selectedNetwork && networkUser) {
      try {
        const response = await api().post(`/user/${userId}/socialNetworks`, {
          network: selectedNetwork,
          username: networkUser,
        });
        setSocialNetworks(response.data.user.socialNetworks);
        setSelectedNetwork('');
        setNetworkUser('');
      } catch (error) {
        console.error('Error adding social network:', error);
      }
    }
  };

  const handleDeleteNetwork = async (index) => {
    const networkToDelete = socialNetworks[index];
    try {
      await api().put(`/user/${userId}/socialNetworks`, {
        socialNetworks: socialNetworks.filter((_, i) => i !== index),
      });
      setSocialNetworks((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting social network:', error);
    }
  };

  const handleEditNetwork = async (index) => {
    try {
      const updatedNetworks = socialNetworks.map((sn, i) =>
        i === index ? { ...sn, username: editingNetworkUser } : sn
      );
      await api().put(`/user/${userId}/socialNetworks`, { socialNetworks: updatedNetworks });
      setSocialNetworks(updatedNetworks);
      setEditingIndex(null);
      setEditingNetworkUser('');
    } catch (error) {
      console.error('Error updating social network:', error);
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter') {
      handleEditNetwork(index);
    }
  };

  if (!user) {
    return <div className={styles.center}>Loading...</div>;
  }

  const availableNetworks = ['Instagram', 'Website', 'LinkedIn'].filter(
    (network) => !socialNetworks.some((sn) => sn.network === network)
  );

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
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingNetworkUser}
                  onChange={(e) => setEditingNetworkUser(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={styles.input}
                />
                <button onClick={() => handleEditNetwork(index)} className={styles.confirmButton}>✔️</button>
                <button onClick={() => { setEditingIndex(null); setEditingNetworkUser(''); }} className={styles.cancelButton}>✖️</button>
              </>
            ) : (
              <>
                <div className={styles.organizerNetworks}>
                  <div>
                    <p className={styles.textData}>
                      {sn.network === 'Instagram' && <>{sn.network}: <br/><a href={`https://www.instagram.com/${sn.username}`} target="_blank" rel="noopener noreferrer" className={styles.aLink}>{sn.username}</a></>}
                      {sn.network === 'LinkedIn' && <>{sn.network}: <br/><a href={`https://www.linkedin.com/in/${sn.username}`} target="_blank" rel="noopener noreferrer" className={styles.aLink}>{sn.username}</a></>}
                      {sn.network === 'Website' && <>{sn.network}: <br/><a href={`${sn.username}`} target="_blank" rel="noopener noreferrer" className={styles.aLink}>{sn.username}</a></>}
                    </p>
                  </div>
                  <div className={styles.buttonsEdit}>
                    <button onClick={() => { setEditingIndex(index); setEditingNetworkUser(sn.username); }} className={styles.editButton}>✏️</button>
                    <button onClick={() => handleDeleteNetwork(index)} className={styles.deleteButton}>🗑️</button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      {availableNetworks.length > 0 && (
        <div className={styles.socialNetworkContainer}>
          <select
            value={selectedNetwork}
            onChange={(e) => setSelectedNetwork(e.target.value)}
            className={styles.select}
          >
            <option value="" disabled>Selecciona una red social</option>
            {availableNetworks.map((network) => (
              <option key={network} value={network}>{network}</option>
            ))}
          </select>
          {selectedNetwork && (
            <div className={styles.inputContainer}>
              <input
                type="text"
                value={networkUser}
                onChange={(e) => setNetworkUser(e.target.value)}
                className={styles.input}
              />
              <button onClick={handleAddNetwork} className={styles.addButton}>✚</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserDetail;
