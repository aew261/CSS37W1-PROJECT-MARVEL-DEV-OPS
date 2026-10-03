import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../authentication/AuthProvider';
import styles from '../../styles/components/Header.module.css';

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, displayName, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  return (
    <header className={styles.header}>
      <Link to={isAuthenticated ? '/' : '/login'} className={styles.logo}>
        ResHub
      </Link>

      <nav className={styles.nav}>
        {isAuthenticated ? (
          <>
            <Link to="/" className={styles.link}>Home</Link>
            <Link to="/search" className={styles.link}>Search</Link>
            {isAdmin && (
              <Link to="/admin" className={styles.link}>Admin Dashboard</Link>
            )}

            {/* Logged-in indicator: replaces the Log in / Sign up buttons */}
            <div className={styles.userArea}>
              <span className={styles.userChip} title={displayName}>
                <FaUserCircle className={styles.userIcon} aria-hidden="true" />
                <span className={styles.userName}>{displayName}</span>
              </span>
              <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
                <FaSignOutAlt aria-hidden="true" />
                <span>Log out</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.link}>Log in</Link>
            <Link to="/signup" className={styles.signupBtn}>Sign up</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;