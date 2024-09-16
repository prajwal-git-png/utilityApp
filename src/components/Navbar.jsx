import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 



function Navbar() {
  return (
    <nav className='navbar'>
      <ul>
        <li><Link to="/image-compressor">Image Compressor</Link></li>
        <li><Link to="/qr-code-generator">QR Code Generator</Link></li>
        <li><Link to="/pdf-merger">PDF Merger</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;