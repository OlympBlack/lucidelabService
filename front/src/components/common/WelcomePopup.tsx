import React, { useState, useEffect } from 'react';
import { X, User, Mail, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';

export const WelcomePopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if popup was already seen during this session
    const hasSeen = sessionStorage.getItem('welcome_popup_seen');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('welcome_popup_seen', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Veuillez remplir votre nom et votre adresse email.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.sendContact({
        name,
        email,
        phone: '',
        service: 'Newsletter',
        subject: 'Inscription Newsletter Popup',
        message: `Inscription à la newsletter par ${name} (${email}) via le popup.`
      });

      if (res && res.success) {
        setSubmitted(true);
        setTimeout(() => {
          handleClose();
        }, 2200);
      } else {
        setSubmitted(true);
        setTimeout(() => {
          handleClose();
        }, 2200);
      }
    } catch {
      setSubmitted(true);
      setTimeout(() => {
        handleClose();
      }, 2200);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="welcome-popup-overlay" onClick={handleClose}>
      <div className="welcome-popup-container" onClick={(e) => e.stopPropagation()}>
        <div className="welcome-popup-card">
          {/* Close Button 'X' (Inside the card) */}
          <button className="welcome-popup-close-btn" onClick={handleClose} aria-label="Fermer">
            <X size={26} color="#4b5563" />
          </button>

          {/* Left Side Image */}
          <div className="welcome-popup-image-col">
            <img
              src="/assets/images/painture_popup.jpg"
              alt="Couleurs & Peinture"
              className="welcome-popup-image"
            />
          </div>

          {/* Right Side Form Content */}
          <div className="welcome-popup-content-col">
            {submitted ? (
              <div className="welcome-popup-success">
                <CheckCircle2 size={54} color="#10b981" />
                <h3>Merci pour votre inscription !</h3>
                <p>Vous recevrez prochainement nos nouvelles offres et mises à jour.</p>
              </div>
            ) : (
              <>
                <h2 className="welcome-popup-title">
                  Inscrivez-vous pour recevoir les mises à jour !
                </h2>
                <p className="welcome-popup-subtitle">
                  Soyez informé de nos nouveaux produits ou offres.
                </p>

                {error && <div className="welcome-popup-error">{error}</div>}

                <form onSubmit={handleSubmit} className="welcome-popup-form">
                  {/* Nom field */}
                  <div className="welcome-popup-input-group">
                    <User size={18} className="welcome-popup-input-icon" />
                    <input
                      type="text"
                      placeholder="Nom"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="welcome-popup-input"
                      required
                    />
                  </div>

                  {/* Email field */}
                  <div className="welcome-popup-input-group">
                    <Mail size={18} className="welcome-popup-input-icon" />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="welcome-popup-input"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="welcome-popup-submit-btn"
                  >
                    {loading ? 'ENVOI EN COURS...' : 'ENVOYER'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
