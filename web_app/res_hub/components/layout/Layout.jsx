import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import ImagesOverlay from '../modal/ImagesOverlay';
function Layout() {
  
  
  return (
    <div className="app-shell">
      
      <Header />

      <main className="app-main">
        <Outlet />
      </main>
      
      <Footer />

    </div>
  );
}

export default Layout;