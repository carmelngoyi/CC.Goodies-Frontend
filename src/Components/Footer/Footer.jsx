import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-column">
        <h4>MY ACCOUNT</h4>
        <ul>
          <li>Orders</li>
          <li>Shopping Lists</li>
        </ul>
        <button><Link to="/signup">Sign in/Sign Up</Link></button>
      </div>
      <div className="footer-column">
        <h4>CUSTOMER SERVICE</h4>
        <ul>
          <li>FAQs</li>
          <li>Delivery Options</li>
          <li>Returns & Exchanges</li>
          <li>Terms & Conditions</li>
          <li>Corporate Sales</li>
        </ul>
      </div>
      <div className="footer-column">
        <h4>ABOUT CC.GOODIES</h4>
        <ul>
          <li>Store Locator</li>
          <li>Contact Us</li>
          <li>About Us</li>
          <li>Careers</li>
          <li>Press & News</li>
        </ul>
      </div>
      <div className="footer-column newsletter">
        <h4>Be the first to know!</h4>
        <p>Sign up for our newsletter to know about our latest deals.</p>
        <p className="privacy">Read our <a href="#">Privacy Policy</a></p>
      </div>
    </div>
    <div className="footer-bottom">
      <p className='last-p'>© 2025 CC.Goodies. All Rights Reserved.</p>
    </div>
  </footer>
);

export default Footer;