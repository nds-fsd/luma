import React, { useRef, useEffect } from 'react';
import styles from './DropdownMenu.module.css';

const DropdownMenu = ({
  handleLogout,
  handleGoToConfiguration,
  userPicture,
  userFullName,
  userRole,
  handleGoToOwnProfile,
  isDropdownOpen,
  setDropdownOpen,
}) => {
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    console.log(`Option selected: ${option}`);
    setDropdownOpen(false);
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
        <img className={styles.dropdownIcon} src={userPicture} alt="Foto del usuario" />
      </div>
      {isDropdownOpen && (
        <div className={styles.dropdownContent}>
          <button onClick={() => handleOptionClick('Option 1')} className={styles.dropdownItem}>
            <div className={styles.contentMain}>
              <div>
                <img className={styles.dropdownIcon} src={userPicture} alt="Foto del usuario" />
              </div>
              <div className={styles.infoDropDown}>
                <h4>{userFullName}</h4>
                <p>Personal</p>
              </div>
            </div>
          </button>
          <button onClick={handleGoToOwnProfile} className={styles.dropdownItem}>
            Ver Perfil
          </button>
          {userRole === 'ADMIN' && (
            <button onClick={handleGoToConfiguration} className={styles.dropdownItem}>
              Configuración
            </button>
          )}
          <button onClick={handleLogout} className={styles.dropdownItem}>
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
