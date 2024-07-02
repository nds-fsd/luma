import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../../utils/api';
import styles from './UserList.module.css';
import ConfirmDeleteModal from '../../ConfirmDeleteModal/ConfirmDeleteModal';

function UserList() {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
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

  const handleRoleChange = async (id, newRole) => {
    try {
      await api(navigate).put(`/user/${id}`, { role: newRole });
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const confirmDeleteUser = async () => {
    if (selectedUser) {
      await deleteUser(selectedUser._id);
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Lista de Usuarios</h1>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.container}>
        <div className={styles.userContainer}>
          {filteredUsers.map((user, index) => (
            <div key={user._id} className={styles.user}>
              <img
                src={user.profile_picture}
                alt={`Foto del usuario: ${user.fullname}`}
                className={styles.userImage}
              />
              <Link to={`/user/${user._id}`} className={styles.textname}>
                {user.fullname}
              </Link>
              <select
                className={styles.userRole}
                value={user.role}
                onChange={(e) => handleRoleChange(user._id, e.target.value)}
              >
                <option value="ADMIN">Administrador</option>
                <option value="CREATOR">Event Creator</option>
              </select>
              <button className={styles.button} onClick={() => handleOpenModal(user)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <ConfirmDeleteModal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          onConfirm={confirmDeleteUser}
          type="user"
        />
      )}
    </div>
  );
}

export default UserList;
