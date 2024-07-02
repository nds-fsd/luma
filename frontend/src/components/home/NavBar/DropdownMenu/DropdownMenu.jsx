import React, { useRef, useEffect, useContext } from 'react';
import styles from './DropdownMenu.module.css';
import { AuthContext } from '../../../users/AuthContext/AuthContext';

const DropdownMenu = () => {
  const {
    handleLogout,
    handleGoToConfiguration,
    handleGoToAdmin,
    userPicture,
    userFullName,
    userRole,
    handleGoToOwnProfile,
    isDropdownOpen,
    setDropdownOpen,
    userEmail,
  } = useContext(AuthContext);

  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, setDropdownOpen]);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div onClick={toggleDropdown} className={styles.dropdownButton}>
        <img className={styles.dropdownIcon} src={userPicture} alt='Foto del usuario' />
      </div>
      {isDropdownOpen && (
        <>
          <div className={styles.dropdownTriangle}></div>
          <div className={styles.dropdownContent}>
            <button className={styles.dropdownItem}>
              <div className={styles.contentMain}>
                <div>
                  <img className={styles.dropdownIcon} src={userPicture} alt='Foto del usuario' />
                </div>
                <div className={styles.infoDropDown}>
                  <h4>{userFullName}</h4>
                  <p>{userEmail}</p>
                </div>
              </div>
            </button>
            <button onClick={handleGoToOwnProfile} className={styles.dropdownItem}>
              Ver Perfil
            </button>
            <button onClick={handleGoToConfiguration} className={styles.dropdownItem}>
              Configuración
            </button>
            {userRole === 'ADMIN' && (
              <button onClick={handleGoToAdmin} className={styles.dropdownItem}>
                Administración
              </button>
            )}
            <button onClick={handleLogout} className={styles.dropdownItem}>
              Cerrar Sesión
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DropdownMenu;
