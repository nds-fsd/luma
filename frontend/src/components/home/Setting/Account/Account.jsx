import { useState, useEffect, useContext } from 'react';
import { api } from '../../../../utils/api';
import { removeSession } from '../../../../utils/localStorage.utils';
import styles from './Account.module.css';
import { AuthContext } from '../../../users/AuthContext/AuthContext';
import ConfirmDeleteModal from '../../../ConfirmDeleteModal/ConfirmDeleteModal';

function Account() {
  const { userId } = useContext(AuthContext);
  const [user, setUser] = useState({
    fullname: '',
    email: '',
    birthdate: '',
    phone_number: '',
    profile_picture: '',
  });
  const [socialNetworks, setSocialNetworks] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [networkUser, setNetworkUser] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingNetworkUser, setEditingNetworkUser] = useState('');
  const [editUserData, setEditUserData] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api().get(`/user/${userId}`);
        setUser({
          fullname: response.data.fullname || '',
          email: response.data.email || '',
          birthdate: response.data.birthdate || '',
          phone_number: response.data.phone_number || '',
          profile_picture: response.data.profile_picture || '',
          role: response.data.role || '',
        });
        setProfilePictureUrl(response.data.profile_picture || '');
        fetchSocialNetworks(response.data._id);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setMessage('');
      }
    };

    fetchUser();
  }, [userId]);

  const fetchSocialNetworks = async (id) => {
    try {
      const response = await api().get(`/user/${id}/socialNetworks`);
      setSocialNetworks(response.data.socialNetworks || []);
    } catch (error) {
      console.error('Error fetching social networks:', error);
      setMessage('');
      setSocialNetworks([]);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await api().put(`/user/${userId}`, user);
      const response = await api().get(`/user/${userId}`);
      setUser({
        fullname: response.data.fullname || '',
        email: response.data.email || '',
        birthdate: response.data.birthdate || '',
        phone_number: response.data.phone_number || '',
        profile_picture: response.data.profile_picture || '',
      });
      setEditUserData(false);
      setError('');
    } catch (error) {
      console.error('Error updating user details:', error);
      setMessage('');
    }
  };

  const handleImageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'imageProfile');
    formData.append('folder', 'Lumatic');

    const url = 'https://api.cloudinary.com/v1_1/lumatic/image/upload';
    const options = {
      method: 'POST',
      body: formData,
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setProfilePictureUrl(data.secure_url);

        return api().put(`/user/${userId}/profile_picture`, {
          profile_picture: data.secure_url,
        });
      })
      .then((response) => {
        setUser((prevUser) => ({
          ...prevUser,
          profile_picture: response.data.user.profile_picture,
        }));
        setError('');
      })
      .catch((error) => {
        console.error('Error uploading image to Cloudinary:', error);
        setMessage('');
      });
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
        setError('');
      } catch (error) {
        console.error('Error adding social network:', error);
        setMessage('');
      }
    }
  };

  const handleDeleteNetwork = async (index) => {
    try {
      const updatedNetworks = socialNetworks.filter((_, i) => i !== index);
      await api().put(`/user/${userId}/socialNetworks`, {
        socialNetworks: updatedNetworks,
      });
      setSocialNetworks(updatedNetworks);
      setError('');
    } catch (error) {
      console.error('Error deleting social network:', error);
      setMessage('');
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
      setError('');
    } catch (error) {
      console.error('Error updating social network:', error);
      setMessage('');
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setMessage('');
      return;
    }
    try {
      await api().put(`/user/${userId}/password`, { currentPassword: password, newPassword });
      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setMessage('Password changed successfully');
      setError('');
    } catch (error) {
      console.error('Error changing password:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('Error changing password');
      }
      setMessage('');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await api().delete(`/user/${userId}`);
      removeSession();
      window.location.reload();
    } catch (error) {
      console.error('Error deleting account:', error);
      setMessage('');
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyDown = (event, handler, index = null) => {
    if (event.key === 'Enter') {
      if (index !== null) {
        handler(index);
      } else {
        handler();
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    await handleImageUpload(file);
  };

  if (!user) {
    return <div className={styles.center}>Loading...</div>;
  }

  const availableNetworks = ['Instagram', 'Website', 'LinkedIn'].filter(
    (network) => !socialNetworks.some((sn) => sn.network === network)
  );

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div className={styles.profileContainer}>
          <div className={styles.profileImageContainer}>
            <img className={styles.imagePhoto} src={profilePictureUrl} alt={`Foto del usuario: ${user.fullname}`} />
            <div className={styles.editIcon}>
              <label htmlFor='fileInput' className={styles.fileLabel}>
                📷
              </label>
              <input type='file' id='fileInput' className={styles.fileInput} onChange={handleFileChange} />
            </div>
          </div>
          <div>
            {editUserData ? (
              <>
                <input
                  type='text'
                  name='fullname'
                  value={user.fullname}
                  onChange={handleInputChange}
                  onKeyDown={(e) => handleKeyDown(e, handleUpdateUser)}
                  className={styles.input}
                />
                <button onClick={handleUpdateUser} className={styles.confirmButton}>
                  ✔️
                </button>
                <button onClick={() => setEditUserData(false)} className={styles.cancelButton}>
                  ✖️
                </button>
              </>
            ) : (
              <>
                <h1 className={styles.nameText}>{user.fullname}</h1>
                <h4 className={styles.nameRole}>{user.role === 'ADMIN' ? 'Administrador' : 'Event Creator'}</h4>
                <button onClick={() => setEditUserData(true)} className={styles.editButton}>
                  Editar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.detailsSection}>
        <div className={styles.section}>
          <label className={styles.label}>Correo</label>
          <input
            type='email'
            name='email'
            value={user.email}
            onChange={handleInputChange}
            onKeyDown={(e) => handleKeyDown(e, handleUpdateUser)}
            className={styles.input}
            disabled={!editUserData}
          />
        </div>
        <div className={styles.section}>
          <label className={styles.label}>Fecha de Nacimiento</label>
          <input
            type='date'
            name='birthdate'
            value={user.birthdate}
            onChange={handleInputChange}
            onKeyDown={(e) => handleKeyDown(e, handleUpdateUser)}
            className={styles.input}
            disabled={!editUserData}
          />
        </div>
        <div className={styles.section}>
          <label className={styles.label}>Teléfono</label>
          <input
            type='tel'
            name='phone_number'
            value={user.phone_number}
            onChange={handleInputChange}
            onKeyDown={(e) => handleKeyDown(e, handleUpdateUser)}
            className={styles.input}
            disabled={!editUserData}
          />
        </div>
      </div>
      <div className={styles.socialNetworksSection}>
        <h3 className={styles.subHeading}>Redes Sociales</h3>
        {socialNetworks.map((sn, index) => (
          <div key={index} className={styles.socialNetworkItem}>
            {editingIndex === index ? (
              <>
                <div className={styles.organizerButtons}>
                  <div>
                    <input
                      type='text'
                      value={editingNetworkUser}
                      onChange={(e) => setEditingNetworkUser(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, handleEditNetwork, index)}
                      className={styles.input}
                    />
                  </div>
                  <div>
                    <button onClick={() => handleEditNetwork(index)} className={styles.confirmButton}>
                      ✔️
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setEditingIndex(null);
                        setEditingNetworkUser('');
                      }}
                      className={styles.cancelButton}
                    >
                      ✖️
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.networkInfo}>
                  <p className={styles.textData}>
                    {sn.network === 'Instagram' && (
                      <>
                        {sn.network}: <br />
                        <a
                          href={`https://www.instagram.com/${sn.username}`}
                          target='_blank'
                          rel='noopener noreferrer'
                          className={styles.aLink}
                        >
                          {sn.username}
                        </a>
                      </>
                    )}
                    {sn.network === 'LinkedIn' && (
                      <>
                        {sn.network}: <br />
                        <a
                          href={`https://www.linkedin.com/in/${sn.username}`}
                          target='_blank'
                          rel='noopener noreferrer'
                          className={styles.aLink}
                        >
                          {sn.username}
                        </a>
                      </>
                    )}
                    {sn.network === 'Website' && (
                      <>
                        {sn.network}: <br />
                        <a href={`${sn.username}`} target='_blank' rel='noopener noreferrer' className={styles.aLink}>
                          {sn.username}
                        </a>
                      </>
                    )}
                  </p>
                </div>
                <div className={styles.buttonsEdit}>
                  <button
                    onClick={() => {
                      setEditingIndex(index);
                      setEditingNetworkUser(sn.username);
                    }}
                    className={styles.editButton}
                  >
                    ✏️
                  </button>
                  <button onClick={() => handleDeleteNetwork(index)} className={styles.deleteButton}>
                    🗑️
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      {availableNetworks.length > 0 && (
        <div className={styles.addNetworkSection}>
          <h3 className={styles.subHeading}>Agregar Red Social</h3>
          <select
            value={selectedNetwork}
            onChange={(e) => setSelectedNetwork(e.target.value)}
            className={styles.select}
          >
            <option value='' disabled>
              Selecciona una red social
            </option>
            {availableNetworks.map((network) => (
              <option key={network} value={network}>
                {network}
              </option>
            ))}
          </select>
          {selectedNetwork && (
            <div className={styles.inputContainer}>
              <input
                type='text'
                value={networkUser}
                onChange={(e) => setNetworkUser(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, handleAddNetwork)}
                className={styles.input}
              />
              <button onClick={handleAddNetwork} className={styles.addButton}>
                ✚
              </button>
            </div>
          )}
        </div>
      )}
      <div className={styles.passwordSection}>
        <h3 className={styles.subHeading}>Cambiar Contraseña</h3>
        <div className={styles.section}>
          <label className={styles.label}>Contraseña Actual</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.section}>
          <label className={styles.label}>Nueva Contraseña</label>
          <input
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.section}>
          <label className={styles.label}>Confirmar Nueva Contraseña</label>
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.messagesContainer}>
          <div>
            <button onClick={handleChangePassword} className={styles.confirmButton}>
              Cambiar Contraseña
            </button>
          </div>
          <div className={styles.messageContainer}>
            {message && <p className={styles.successMessage}>{message}</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}
          </div>
        </div>
      </div>
      <div className={styles.deleteAccountSection}>
        <h3 className={styles.subHeading}>Eliminar Cuenta</h3>
        <button onClick={handleOpenModal} className={styles.deleteButton}>
          Eliminar Cuenta
        </button>
      </div>
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        onConfirm={handleDeleteAccount}
        type='account'
      />
    </div>
  );
}

export default Account;
