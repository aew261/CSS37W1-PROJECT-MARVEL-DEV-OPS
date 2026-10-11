import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/components/Header.module.css';
import { supabase } from '../../lib/supabase';
function Header() {
  const navigate = useNavigate();
  

  

  const handleLogout = async () => {
    const {error}=await supabase.auth.signOut()

    if(error){
      console.log(error)
      return;
    }

    navigate('/login', { replace: true });
  };

  return (<>
    <header className={styles.header}>
      <Link className={styles.logo}>
        ResHub
      </Link>

      <nav className={styles.nav}>

        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/search" className={styles.link}>Search</Link>
        <Link to="/About" className={styles.link}>About</Link>
        <button className={styles.logoutBtn} onClick={handleLogout} >
          Logout
        </button>
        
      </nav>
    </header>

    <section  className={styles.spacer} >

    </section>
  </>);
}

export default Header;