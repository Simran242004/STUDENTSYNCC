import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>StudentSync</h3>
        <p>Buy, sell, stationery and share study materials with ease.</p>
        <ul className="footer-links">
          <li><a href="/">Home</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/Signup">Sign up</a></li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} StudentSync • All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
