// src/components/Header.jsx
import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import BrochurePDF from './BrochurePDF';  // Adjust path if needed
import './Header.css';
import logo from '../assets/image.png'; // Adjust path if needed
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div className="top-navbar">
        <div className="logo">
          <img src={logo} alt="NDP Logo" />
        </div>
        <div className="right-buttons">
          <PDFDownloadLink
            document={<BrochurePDF />}
            fileName="NDP-Brochure-2025.pdf"
            className="btn brochure"
            style={{ color: 'white', textDecoration: 'none' }}
          >
            {({ loading }) => (loading ? 'Preparing brochure...' : 'Download Brochure')}
          </PDFDownloadLink>

       

          <Link to="/register" className="btn register">Register</Link>
          <Link to="/login" className="btn login">Login</Link>
          <Link to="/admin-login" className="btn login">Management</Link>

        </div>
      </div>

      <div className="ticker">
        <marquee behavior="scroll" direction="left">
          B.Tech, UG/PG Admissions are open for 2025-26 AY. Claim Your Spot. Download Admission Brochure to know more about NDP.
        </marquee>
      </div>
    </>
  );
};

export default Header;
