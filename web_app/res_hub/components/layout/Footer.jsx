
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h4>Res Hub</h4>
          <p>
            Helping WSU students make informed housing decisions 
            through verified peer reviews and transparent ratings.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h5>Quick Links</h5>
            <Link to="/">Home</Link>
            <Link to="/search">Search</Link>
            <Link to="/favorites">Favorites</Link>
          </div>
          <div className="footer-column">
            <h5>Support</h5>
            <Link to="/contact">Contact Us</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
          <div className="footer-column">
            <h5>Connect</h5>
            <span>reshub@wsu.ac.za</span>
            <span>Walter Sisulu University</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>&copy; 2026 Res Hub – Marvel DevOps. All rights reserved.</p>
          <p className="footer-version">Version 1.0.0</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;