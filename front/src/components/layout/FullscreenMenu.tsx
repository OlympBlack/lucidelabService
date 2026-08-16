import React from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FullscreenMenu: React.FC<FullscreenMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const links = [
    { label: 'Accueil', path: '/' },
    { label: 'Qui sommes-nous ?', path: '/a-propos' },
    { label: 'Nos Services', path: '/services' },
    { label: 'Réalisations', path: '/realisations' },
    { label: 'Blog & Actualités', path: '/blog' },
    { label: 'Ils nous font confiance', path: '/confiance' },
    { label: 'Contact & Rendez-vous', path: '/contact' },
  ];

  return (
    <div className="fullscreen-menu-overlay">
      {/* Top right close button */}
      <button
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          background: '#ffffff',
          color: '#000000',
          border: 'none',
          width: '48px',
          height: '48px',
          borderRadius: '2px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
          zIndex: 100000
        }}
        aria-label="Fermer le menu"
      >
        <X size={28} />
      </button>

      {/* Main Container */}
      <div style={{
        maxWidth: '900px',
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '40px',
        padding: '20px'
      }}>
        {/* Logo */}
        <Link to="/" onClick={onClose}>
          <img
            src="/assets/images/logo.png"
            alt="LUCIDE LAB Logo"
            style={{ maxHeight: '60px', width: 'auto', display: 'block' }}
          />
        </Link>

        {/* Links */}
        <nav className="fullscreen-menu-links">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="fullscreen-menu-link"
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div>
          <Link
            to="/contact"
            onClick={onClose}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#e91e8c',
              color: '#ffffff',
              padding: '14px 28px',
              borderRadius: '30px',
              fontFamily: "'Amaranth', sans-serif",
              fontSize: '18px',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'transform 0.2s ease, background-color 0.2s ease',
              boxShadow: '0 8px 25px rgba(233, 30, 140, 0.35)'
            }}
          >
            Prendre un Rendez-vous <ArrowRight size={20} />
          </Link>
        </div>

        {/* Quick info footer */}
        <div style={{
          display: 'flex',
          gap: '30px',
          color: '#a1a1aa',
          fontSize: '14px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          fontFamily: "'Raleway', sans-serif"
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Phone size={16} color="#e91e8c" /> +225 07 00 00 00 00
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mail size={16} color="#e91e8c" /> contact@lucidelab.com
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={16} color="#e91e8c" /> Abidjan, Cotonou
          </div>
        </div>
      </div>
    </div>
  );
};
