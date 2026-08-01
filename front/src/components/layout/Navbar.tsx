import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { CommonButton } from '../common/CommonButton';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/services', label: 'Nos Services' },
    { path: '/realisations', label: 'Réalisations' },
    { path: '/a-propos', label: 'Qui sommes-nous' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const closeMobileMenu = () => setIsOpen(false);

  return (
    <div className="navbar-area">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <img
            src="/assets/images/logo.png"
            alt="LUCIDE LAB Logo"
            style={{ maxHeight: '52px', width: 'auto', objectFit: 'contain', display: 'block' }}
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="nav-menu">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Button */}
        <div className="nav-actions">
          <Link to="/contact" className="desktop-nav-cta">
            <CommonButton variant="orange">
              Projet et Dévis <ArrowRight size={16} />
            </CommonButton>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-toggle-btn"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="mobile-drawer-menu">
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #e5e9f2' }}>
              <Link to="/contact" onClick={closeMobileMenu}>
                <CommonButton variant="orange" style={{ width: '100%' }}>
                  Projet & Dévis <ArrowRight size={16} />
                </CommonButton>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};
