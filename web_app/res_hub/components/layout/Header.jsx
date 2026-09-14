
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header({ user, onLogout }) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <span className="logo-icon">🏠</span>
          <span className="logo-text">Res Hub</span>
        </Link>

        <nav className="header-nav">
          <ul className="nav-list">
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to="/">Home</Link>
            </li>
            <li className={location.pathname === '/search' ? 'active' : ''}>
              <Link to="/search">Search</Link>
            </li>
            <li className={location.pathname === '/favorites' ? 'active' : ''}>
              <Link to="/favorites">Favorites</Link>
            </li>
            {user && user.role === 'admin' && (
              <li className={location.pathname === '/admin' ? 'active' : ''}>
                <Link to="/admin">Admin</Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="header-auth">
          {user ? (
            <div className="user-menu">
              <span className="user-name">{user.name || 'Student'}</span>
              <button onClick={onLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;