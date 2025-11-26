import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="footer-section">
          <h1 className="footer-h1">CC.Goodies</h1>
          <p className="footer-p">Fresh Goodies Daily</p>
          <div className="footer-socials">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="footer-social-link">Facebook</a>
            <a href="https://www.instagram.com/woolworths_sa?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="footer-social-link">Instagram</a>
          </div>
        </div>

        <div className="footer-section">
          <h2 className="footer-h2">Contact Us</h2>
          <p className="footer-p">Address: 123 Shop St, Goodies City</p>
          <p className="footer-p">Phone: +27 69 456 7890</p>
          <p className="footer-p">Email: cc.goodies@gmail.com</p>
        </div>

        <div className="footer-section">
          <h2 className="footer-h2">Business Hours</h2>
          <p className="footer-p">Monday - Friday: 10:00 - 17:00</p>
          <p className="footer-p">Saturday: 10:00 - 16:00</p>
          <p className="footer-p">Sunday: Closed</p>
          <p className='footer-p'>Public holidays: Closed
          </p>
        </div>
      </div>
      
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} CC.Goodies. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;