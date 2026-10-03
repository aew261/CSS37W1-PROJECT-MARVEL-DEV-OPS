import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
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
