// src/components/Navbar.js
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">Dinners</a></li>
        <li><a href="/contact">Plan your dinner</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;