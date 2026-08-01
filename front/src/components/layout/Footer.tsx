import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { CommonButton } from '../common/CommonButton';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <>
      <footer className="footer-area">
        <div className="container footer-grid">
          {/* Col 1: About */}
          <div className="footer-item">
            <div className="footer-logo mb-4">
              <Link to="/">
                <img
                  src="/assets/images/logo.png"
                  alt="LUCIDE LAB Logo"
                  style={{ maxHeight: '55px', filter: 'brightness(0) invert(1)', objectFit: 'contain' }}
                />
              </Link>
            </div>
            <p>
              Cabinet d'expertise en communication et croissance de marque. Nous accompagnons les entreprises ambitieuses à construire une image de marque cohérente, crédible et performante.
            </p>
            <ul className="footer-contact-list" style={{ marginTop: '15px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>
                <Phone size={16} style={{ color: '#fd8604' }} />
                <span>0166285017</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>
                <Mail size={16} style={{ color: '#fd8604' }} />
                <a href="mailto:lucidelabofficiel@gmail.com" style={{ color: 'inherit' }}>lucidelabofficiel@gmail.com</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.8)' }}>
                <MapPin size={16} style={{ color: '#fd8604' }} />
                <span>Cotonou, Bénin & Afrique de l'Ouest</span>
              </li>
            </ul>
          </div>

          {/* Col 2: Navigation */}
          <div className="footer-item">
            <h3>Navigation</h3>
            <ul className="footer-links">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/a-propos">Qui sommes-nous</Link></li>
              <li><Link to="/services">Nos Services</Link></li>
              <li><Link to="/realisations">Réalisations</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: Nos Expertises */}
          <div className="footer-item">
            <h3>Nos Pôles</h3>
            <ul className="footer-links">
              <li><Link to="/services">STRATEGY — Direction</Link></li>
              <li><Link to="/services">BRAND — Identité forte</Link></li>
              <li><Link to="/services">DIGITAL — Web & Apps</Link></li>
              <li><Link to="/services">GROWTH — Croissance</Link></li>
              <li><Link to="/services">CONTENT — Storytelling</Link></li>
              <li><Link to="/services">ADVERTISING — Publicité</Link></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="footer-item">
            <h3>Newsletter</h3>
            <p>Abonnez-vous pour recevoir nos dernières actualités et conseils en branding.</p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="email"
                className="form-control"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <CommonButton type="submit" variant="orange">
                {subscribed ? 'Inscrit avec succès !' : 'S\'abonner'} <Send size={14} />
              </CommonButton>
            </form>
          </div>
        </div>
      </footer>

      <div className="copyright-area">
        <div className="container">
          <p>© {new Date().getFullYear()} LUCIDE LAB. Tous droits réservés. Cabinet d'expertise en communication et croissance de marque.</p>
        </div>
      </div>
    </>
  );
};
