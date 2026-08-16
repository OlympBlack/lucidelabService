import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { SocialSection } from '../common/SocialSection';

export const Footer: React.FC = () => {
  return (
    <>
      {/* SECTION NOS RÉSEAUX SOCIAUX (Suivez-nous sur nos réseaux !) */}
      <SocialSection />

      {/* FOOTER SIMPLE & ÉPURÉ */}
      <footer style={{
        background: '#00254d',
        color: '#ffffff',
        padding: '50px 20px 25px 20px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        zIndex: 4
      }}>
        <div className="container" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px'
        }}>
          {/* Logo Central */}
          <Link to="/">
            <img
              src="/assets/images/logo.png"
              alt="LUCIDE LAB Logo"
              style={{ maxHeight: '55px', filter: 'brightness(0) invert(1)', objectFit: 'contain' }}
            />
          </Link>

          {/* Contact Rapide */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '25px',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.85)'
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={15} style={{ color: '#fd8604' }} /> 0166285017
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={15} style={{ color: '#fd8604' }} /> lucidelabofficiel@gmail.com
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={15} style={{ color: '#fd8604' }} /> Cotonou, Bénin & Afrique de l'Ouest
            </span>
          </div>

          {/* Navigation Horizontale Épurée */}
          <nav style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '24px',
            fontSize: '14px',
            fontWeight: 600,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '16px 0',
            width: '100%'
          }}>
            <Link to="/" style={{ color: '#ffffff', textDecoration: 'none' }}>Accueil</Link>
            <Link to="/services" style={{ color: '#ffffff', textDecoration: 'none' }}>Nos Services</Link>
            <Link to="/realisations" style={{ color: '#ffffff', textDecoration: 'none' }}>Réalisations</Link>
            <Link to="/a-propos" style={{ color: '#ffffff', textDecoration: 'none' }}>Qui sommes-nous</Link>
            <Link to="/blog" style={{ color: '#ffffff', textDecoration: 'none' }}>Blog</Link>
            <Link to="/contact" style={{ color: '#ffffff', textDecoration: 'none' }}>Contact</Link>
          </nav>

          {/* Copyright */}
          <p style={{
            margin: 0,
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.65)',
            textAlign: 'center'
          }}>
            © {new Date().getFullYear()} LUCIDE LAB. Tous droits réservés. Cabinet d'expertise en communication et croissance de marque.
          </p>
        </div>
      </footer>
    </>
  );
};
