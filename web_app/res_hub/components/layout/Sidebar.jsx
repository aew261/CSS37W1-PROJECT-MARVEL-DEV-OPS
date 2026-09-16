
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/my-reviews', label: 'My Reviews', icon: '⭐' },
    { path: '/saved-residences', label: 'Saved Residences', icon: '❤️' },
    { path: '/profile', label: 'Profile', icon: '👤' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  // Admin-only menu items
  const adminItems = [
    { path: '/admin/users', label: 'Manage Users', icon: '👥' },
    { path: '/admin/residences', label: 'Manage Residences', icon: '🏠' },
    { path: '/admin/reviews', label: 'Moderate Reviews', icon: '🔍' },
    { path: '/admin/flags', label: 'Flagged Content', icon: '🚩' },
  ];

  return (
    <>
      {/* Overlay */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Res Hub</h3>
          <button className="sidebar-close" onClick={onClose}>
            ×
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {menuItems.map((item) => (
              <li 
                key={item.path} 
                className={location.pathname === item.path ? 'active' : ''}
              >
                <Link to={item.path} onClick={onClose}>
                  <span className="menu-icon">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Admin Section */}
          <div className="sidebar-divider"></div>
          <p className="sidebar-section-title">Admin</p>
          <ul className="sidebar-menu admin-menu">
            {adminItems.map((item) => (
              <li 
                key={item.path} 
                className={location.pathname === item.path ? 'active' : ''}
              >
                <Link to={item.path} onClick={onClose}>
                  <span className="menu-icon">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;