import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../authentication/AuthProvider';
import styles from '../../styles/components/Header.module.css';

function Header() {
  const navigate = useNavigate();
  

  const handleLogout = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  return (
    <header className={styles.header}>
      <Link className={styles.logo}>
        ResHub
      </Link>

      <nav className={styles.nav}>

        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/search" className={styles.link}>Search</Link>
        <Link to="/about" className={styles.link}>About</Link>
        
      </nav>
    </header>
  );
}

export default Header;