import { Link } from 'react-router-dom';

const linkStyle = { color: '#fff', textDecoration: 'none' };

function Header() {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        background: 'var(--color-navy)',
      }}
    >
      <Link to="/" style={{ ...linkStyle, fontWeight: 700 }}>
        ResHub
      </Link>
      <nav style={{ display: 'flex', gap: '1.25rem' }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/search" style={linkStyle}>Search</Link>
        <Link to="/login" style={linkStyle}>Log in</Link>
        <Link to="/signup" style={linkStyle}>Sign up</Link>
      </nav>
    </header>
  );
}

export default Header;