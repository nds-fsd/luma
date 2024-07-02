import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import logo from '../../../images/logoLumatic.svg';
import iconLogin from '../../../images/icon-login.svg';
import iconEvent from '../../../images/event.png';
import iconExplorer from '../../../images/explorar.png';
import iconAddEvent from '../../../images/anadir.png';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import { AuthContext } from '../../users/AuthContext/AuthContext';

const NavBar = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className={styles.container}>
      <div className={styles.logolumatic}>
        <Link to='/'>
          <img src={logo} alt='Lumatic logo' />
        </Link>
      </div>
      <div className={styles.navMain}>
        <nav className={styles.nav}>
          {isAuthenticated ? (
            <div className={styles.organizerLinks}>
              <div>
                {!isMobile && (
                  <Link to='/home' className={styles.navcontent}>
                    <button className={styles.buttoneventos}>EVENTOS</button>
                  </Link>
                )}
                {isMobile && (
                  <Link to='/home' className={styles.navcontent}>
                    <img src={iconEvent} className={styles.iconEvent} alt='Events icon' />
                  </Link>
                )}
              </div>
              <div>
                {!isMobile && (
                  <Link to='/discoverevents' className={styles.navcontent}>
                    <button className={styles.buttoneventos}>DESCUBRIR</button>
                  </Link>
                )}
                {isMobile && (
                  <Link to='/discoverevents' className={styles.navcontent}>
                    <img src={iconExplorer} className={styles.iconExplorer} alt='Discover Events icon' />
                  </Link>
                )}
              </div>
              <div>
                {!isMobile && (
                  <Link to='/eventcreate' className={styles.navcontent}>
                    <button className={styles.buttoneventos}>CREAR EVENTO</button>
                  </Link>
                )}
                {isMobile && (
                  <Link to='/eventcreate' className={styles.navcontent}>
                    <img src={iconAddEvent} className={styles.iconAddEvent} alt='Add Event icon' />
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <Link to='/discoverevents' className={styles.navcontent}>
              <button className={styles.buttoneventos}>EXPLORAR EVENTOS</button>
            </Link>
          )}
          {isAuthenticated ? (
            <DropdownMenu />
          ) : (
            <div>
              {!isMobile && (
                <Link to='/login' className={styles.navcontent}>
                  <button className={styles.buttonlogin}>INICIAR SESIÓN</button>
                </Link>
              )}
              {isMobile && (
                <Link to='/login' className={styles.navcontent}>
                  <img src={iconLogin} className={styles.iconlogin} alt='Login icon' />
                </Link>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
