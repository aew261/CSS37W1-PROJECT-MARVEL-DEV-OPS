import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout({ user, onLogout }) {
  return (
    <div className="app-shell">
      <Header user={user} onLogout={onLogout} />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;