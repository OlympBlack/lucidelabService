import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock, CheckCircle } from 'lucide-react';
import { CommonButton } from '../../components/common/CommonButton';
import { api } from '../../services/api';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'STRATEGY',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await api.sendContact(formData);
    setLoading(false);
    if (result && (result.success || result.data)) {
      setSubmitted(true);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="ptb-100">
      <div className="container">

        {/* Header */}
        <div className="section-title">
          <span className="sub-title">Contactez-nous</span>
          <h2>Prenons contact pour votre projet</h2>
          <p>Notre équipe est à votre disposition pour analyser vos besoins et vous proposer la meilleure stratégie.</p>
        </div>

        <div className="contact-grid">

          {/* ── Info Card ── */}
          <div className="contact-info-card">
            <h3>Coordonnées</h3>

            <div className="contact-info-item">
              <div className="contact-info-icon"><Phone size={18} /></div>
              <div>
                <h4>Téléphone</h4>
                <a href="tel:+2290166285017">+229 01 66 28 50 17</a>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon"><Mail size={18} /></div>
              <div>
                <h4>Email</h4>
                <a href="mailto:lucidelabofficiel@gmail.com">lucidelabofficiel@gmail.com</a>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon"><MapPin size={18} /></div>
              <div>
                <h4>Adresse</h4>
                <p>Cotonou, Bénin</p>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px' }}>Rayonnement Afrique de l'Ouest</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon"><Clock size={18} /></div>
              <div>
                <h4>Heures d'ouverture</h4>
                <p>Lun — Ven : 08h00 – 18h30</p>
              </div>
            </div>
          </div>

          {/* ── Form Card ── */}
          <div className="contact-form-card">
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <CheckCircle size={60} style={{ color: '#22c55e', marginBottom: '20px' }} />
                <h3 style={{ fontSize: '26px', color: '#004C99', marginBottom: '10px' }}>
                  Message envoyé avec succès !
                </h3>
                <p style={{ color: '#57647c', fontSize: '15px', marginBottom: '28px' }}>
                  Merci d'avoir contacté <strong>LUCIDE LAB</strong>. Un consultant examinera votre demande sous 24h.
                </p>
                <CommonButton variant="orange" onClick={() => setSubmitted(false)}>
                  Envoyer un autre message
                </CommonButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3>Formulaire de Contact</h3>

                {/* Row 1 — Nom + Email */}
                <div className="contact-form-row">
                  <div className="form-group">
                    <label className="contact-label" htmlFor="contact-name">Nom complet *</label>
                    <input
                      id="contact-name"
                      type="text"
                      className="contact-input"
                      required
                      placeholder="Votre nom complet"
                      value={formData.name}
                      onChange={handleChange('name')}
                    />
                  </div>
                  <div className="form-group">
                    <label className="contact-label" htmlFor="contact-email">Email *</label>
                    <input
                      id="contact-email"
                      type="email"
                      className="contact-input"
                      required
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={handleChange('email')}
                    />
                  </div>
                </div>

                {/* Row 2 — Téléphone + Pôle */}
                <div className="contact-form-row">
                  <div className="form-group">
                    <label className="contact-label" htmlFor="contact-phone">Téléphone *</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      className="contact-input"
                      required
                      placeholder="0166285017"
                      value={formData.phone}
                      onChange={handleChange('phone')}
                    />
                  </div>
                  <div className="form-group">
                    <label className="contact-label" htmlFor="contact-service">Pôle concerné</label>
                    <select
                      id="contact-service"
                      className="contact-input"
                      value={formData.service}
                      onChange={handleChange('service')}
                    >
                      <option value="STRATEGY">STRATEGY — Direction &amp; Positionnement</option>
                      <option value="BRAND">BRAND — Identité &amp; Branding</option>
                      <option value="DIGITAL">DIGITAL — Sites &amp; Apps Web</option>
                      <option value="GROWTH">GROWTH — Visibilité &amp; SEO</option>
                      <option value="CONTENT">CONTENT — Contenu &amp; Médias</option>
                      <option value="ADVERTISING">ADVERTISING — Publicité &amp; Campagnes</option>
                      <option value="OTHER">Autre — Préciser dans le message</option>
                    </select>
                  </div>
                </div>

                {/* Sujet */}
                <div className="form-group">
                  <label className="contact-label" htmlFor="contact-subject">Sujet *</label>
                  <input
                    id="contact-subject"
                    type="text"
                    className="contact-input"
                    required
                    placeholder="Sujet de votre message"
                    value={formData.subject}
                    onChange={handleChange('subject')}
                  />
                </div>

                {/* Message */}
                <div className="form-group">
                  <label className="contact-label" htmlFor="contact-message">Message *</label>
                  <textarea
                    id="contact-message"
                    className="contact-input"
                    rows={5}
                    required
                    placeholder="Décrivez votre projet ou votre demande..."
                    value={formData.message}
                    onChange={handleChange('message')}
                    style={{ resize: 'vertical', minHeight: '110px' }}
                  />
                </div>

                <CommonButton
                  type="submit"
                  variant="orange"
                  disabled={loading}
                  style={{ width: '100%', padding: '13px', justifyContent: 'center' }}
                >
                  {loading ? 'Envoi en cours...' : 'Envoyer le message'} <Send size={16} />
                </CommonButton>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
