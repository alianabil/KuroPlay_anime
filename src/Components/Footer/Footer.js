"use client";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h3 className="footer-logo-text">KuroPlay</h3>
          <p className="footer-tagline">
            Your ultimate anime streaming experience.
          </p>
        </div>
        <nav className="footer-nav">
          <ul className="footer-links">
            <li>
              <a href="#" className="footer-link">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Terms of Service
              </a>
            </li>
          </ul>
        </nav>
        <div className="footer-social">
          <h4 className="social-heading">Follow Us</h4>
          <div className="social-icons">
            <a href="#" aria-label="Facebook" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Twitter" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="Instagram" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="YouTube" className="social-icon">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} KuroPlay. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
