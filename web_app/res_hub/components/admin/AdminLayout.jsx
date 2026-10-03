import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaChartLine, FaCloudUploadAlt, FaArrowLeft, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../authentication/AuthProvider';
import { getInitials } from '../../authentication/authUtils';
import AdminSearch from './AdminSearch';
import styles from '../../styles/components/admin_layout.module.css';

const NAV_ITEMS = [
  { to: '/admin', label: 'Home / Analytics', icon: FaChartLine, end: true },
  { to: '/admin/upload', label: 'Upload Residence', icon: FaCloudUploadAlt, end: false },
];

function AdminLayout() {
  const navigate = useNavigate();
  const { session, displayName, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  return (
    <div className={styles.shell}>

      {/* ============ TOP HEADER ============ */}
      <header className={styles.topbar}>

        {/* Left: app name / logo */}
        <Link to="/admin" className={styles.brand}>
          <span className={styles.brandMark}>RH</span>
          <span>RES HUB</span>
        </Link>

        {/* Center: global search */}
        <div className={styles.searchSlot}>
          <AdminSearch />
        </div>

        {/* Right: profile info + logout */}
        <div className={styles.profile}>
          <span className={styles.avatar} aria-hidden="true">{getInitials(displayName)}</span>
          <div className={styles.profileText}>
            <span className={styles.profileName} title={session?.user?.email}>{displayName}</span>
            <span className={styles.profileRole}>Administrator</span>
          </div>
          <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
            <FaSignOutAlt aria-hidden="true" />
            <span>Log out</span>
          </button>
        </div>

      </header>

      <div className={styles.body}>

        {/* ============ SIDEBAR ============ */}
        <aside className={styles.sidebar}>
          <p className={styles.sidebarLabel}>Menu</p>
          <nav className={styles.sidebarNav} aria-label="Admin navigation">
            {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
              >
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          <Link to="/" className={styles.backLink}>
            <FaArrowLeft aria-hidden="true" />
            <span>Back to student site</span>
          </Link>
        </aside>

        {/* ============ PAGE CONTENT ============ */}
        <main className={styles.content}>
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default AdminLayout;