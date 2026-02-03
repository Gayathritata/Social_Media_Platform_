import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, Search, PlusSquare, Zap, User } from "lucide-react";
import "./AppLayout.css";
import socialLogo from '../../assets/social-logo.png';

export default function AppLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="app-layout">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <img src={socialLogo} alt="SocialApp Logo" className="navbar-logo" />
          <span>Synergy</span>
        </div>

        {/* Desktop Nav Links */}
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/chat">Chat</Link></li>
          <li><Link to="/notifications">Notifications</Link></li>
          <li><Link to="/engagement">Engage</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>

        {/* Action Items (Right Side) */}
        <div className="navbar-actions">
          <Link to="/create-post" className="desktop-create-link" title="Create Post">
            <PlusSquare size={24} />
          </Link>
          <Link to="/profile-setup" className="navbar-user">
            <User size={20} className="user-nav-icon" />
            <span className="navbar-username-text">padma</span>
          </Link>
        </div>

        {/* Hamburger Menu Toggle */}
        <div className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav ${isMenuOpen ? "open" : ""}`}>
          <ul className="mobile-nav-links">
            <li><Link to="/home" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/explore" onClick={toggleMenu}>Explore</Link></li>
            <li><Link to="/chat" onClick={toggleMenu}>Chat</Link></li>
            <li><Link to="/notifications" onClick={toggleMenu}>Notifications</Link></li>
            <li><Link to="/profile" onClick={toggleMenu}>Profile</Link></li>

            {/* Engagement Section */}
            <li className="mobile-divider">Engagement</li>
            <li><Link to="/anonymous-help" onClick={toggleMenu}>The Safe Harbor</Link></li>
            <li><Link to="/brain-teasers" onClick={toggleMenu}>Synergy Quests</Link></li>
            <li><Link to="/community-spaces" onClick={toggleMenu}>Pulse Circles</Link></li>
            <li><Link to="/life-milestones" onClick={toggleMenu}>Celebration Hall</Link></li>
          </ul>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-section">
          <h4>Synergy</h4>
          <p>Connecting people through meaningful conversations.</p>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@synergy.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
        </div>

        <div className="footer-bottom">
          © 2026 Synergy. All rights reserved.
        </div>
      </footer>

      {/* BOTTOM NAVIGATION (Mobile Only) */}
      <nav className="bottom-nav">
        <Link to="/home" className="nav-item">
          <Home size={24} />
          <span>Home</span>
        </Link>
        <Link to="/explore" className="nav-item">
          <Search size={24} />
          <span>Explore</span>
        </Link>
        <Link to="/create-post" className="nav-item create-btn">
          <PlusSquare size={32} />
        </Link>
        <Link to="/engagement" className="nav-item">
          <Zap size={24} />
          <span>Engage</span>
        </Link>
        <Link to="/profile" className="nav-item">
          <User size={24} />
          <span>Profile</span>
        </Link>
      </nav>

    </div>
  );
}

