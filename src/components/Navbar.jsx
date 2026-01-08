import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogoClick = () => {
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={handleLogoClick}>
          <div className="navbar-icon">
            <img src="/logo.png" alt="Draftzi logo" className="navbar-logo-img" />
          </div>
          <span>Draftzi</span>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          <a
            href="#"
            className={`nav-link ${isActive("/") ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              const hasProfile = !!localStorage.getItem('userProfile');
              handleNavClick(hasProfile ? "/dashboard" : "/");
            }}
          >
            Home
          </a>
          <a 
            href="#" 
            className={`nav-link ${isActive("/features") ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("/features");
            }}
          >
            Features
          </a>
          <a 
            href="#" 
            className={`nav-link ${isActive("/pricing") ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("/pricing");
            }}
          >
            Pricing
          </a>
          <a 
            href="#" 
            className={`nav-link ${isActive("/about") ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("/about");
            }}
          >
            About
          </a>
          <a 
            href="#" 
            className={`nav-link ${isActive("/contact") ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("/contact");
            }}
          >
            Contact
          </a>
        </div>

        {/* Auth Buttons - hidden on dashboard */}
        {!["/dashboard","/client-vault","/documents-overview","/compliance-calendar","/notifications","/profile-settings","/upgrade-plan","/account-settings","/help"].includes(location.pathname) && (
          <div className="navbar-auth">
            <button className="auth-btn login-btn">Login</button>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className={`hamburger ${isMenuOpen ? "open" : ""}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <a
          href="#"
          className={`mobile-nav-link ${isActive("/") ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("/");
          }}
        >
          Home
        </a>
        <a 
          href="#" 
          className={`mobile-nav-link ${isActive("/features") ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("/features");
          }}
        >
          Features
        </a>
        <a 
          href="#" 
          className={`mobile-nav-link ${isActive("/pricing") ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("/pricing");
          }}
        >
          Pricing
        </a>
        <a 
          href="#" 
          className={`mobile-nav-link ${isActive("/about") ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("/about");
          }}
        >
          About
        </a>
        <a 
          href="#" 
          className={`mobile-nav-link ${isActive("/contact") ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("/contact");
          }}
        >
          Contact
        </a>
        <div className="mobile-auth">
          <button className="auth-btn login-btn">Login</button>
        </div>
      </div>
    </nav>
  );
}
