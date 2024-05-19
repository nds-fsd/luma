import React from 'react';
import styles from './DropdownMenu.module.css';

const DropdownMenu = ({
  handleLogout,
  userPicture,
  userFullName,
  handleGoToOwnProfile,
  isDropdownOpen,
  setDropdownOpen,
}) => {
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    console.log(`Option selected: ${option}`);
    setDropdownOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <div onClick={toggleDropdown} className={styles.dropdownButton}>
        <img className={styles.dropdownIcon} src={userPicture} alt={`Foto del usuario`} />
      </div>
      {isDropdownOpen && (
        <div className={styles.dropdownContent}>
          <button onClick={() => handleOptionClick('Option 1')} className={styles.dropdownItem}>
            <div className={styles.contentMain}>
              <div>
                <img className={styles.dropdownIcon} src={userPicture} alt={`Foto del usuario`} />
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
          <button onClick={() => handleOptionClick('Option 2')} className={styles.dropdownItem}>
            Configuración
          </button>
          <button onClick={handleLogout} className={styles.dropdownItem}>
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
