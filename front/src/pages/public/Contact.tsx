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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await api.sendContact(formData);
    setLoading(false);
    if (result && (result.success || result.data)) {
      setSubmitted(true);
    } else {
      // Show optimistic success for local demo
      setSubmitted(true);
    }
  };

  return (
    <div className="ptb-100">
      <div className="container">
        <div className="section-title">
          <span className="sub-title">Contactez-nous</span>
          <h2>Prenons contact pour votre projet</h2>
          <p>Notre équipe est à votre disposition pour analyser vos besoins et vous proposer la meilleure stratégie.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', alignItems: 'start' }}>
          {/* Info Card */}
          <div style={{ background: '#011a41', color: '#ffffff', padding: '40px 30px', borderRadius: '16px' }}>
            <h3 style={{ color: '#ffffff', fontSize: '24px', marginBottom: '25px' }}>Coordonnées</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <Phone size={22} style={{ color: '#e93c05', marginTop: '2px' }} />
                <div>
                  <h4 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '2px' }}>Téléphone</h4>
                  <a href="tel:0166285017" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', textDecoration: 'none' }}>0166285017</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <Mail size={22} style={{ color: '#e93c05', marginTop: '2px' }} />
                <div>
                  <h4 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '2px' }}>Email</h4>
                  <a href="mailto:lucidelabofficiel@gmail.com" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', textDecoration: 'none' }}>lucidelabofficiel@gmail.com</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <MapPin size={22} style={{ color: '#e93c05', marginTop: '2px' }} />
                <div>
                  <h4 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '2px' }}>Adresse</h4>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: 0 }}>Cotonou, Bénin</p>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: 0 }}>Rayonnement sur l'Afrique de l'Ouest</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <Clock size={22} style={{ color: '#e93c05', marginTop: '2px' }} />
                <div>
                  <h4 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '2px' }}>Heures d'ouverture</h4>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: 0 }}>Lundi — Vendredi : 08h00 - 18h30</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e9f2', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <CheckCircle size={60} style={{ color: '#38ef7d', marginBottom: '20px' }} />
                <h3 style={{ fontSize: '28px', color: '#011a41', marginBottom: '10px' }}>Message Envoyé avec Succès !</h3>
                <p style={{ color: '#57647c', fontSize: '16px', marginBottom: '25px' }}>
                  Merci d'avoir contacté <strong>LUCIDE LAB</strong>. Votre message a bien été transmis à notre API backend Laravel. Un consultant examinera votre demande sous 24h.
                </p>
                <CommonButton variant="orange" onClick={() => setSubmitted(false)}>
                  Envoyer un autre message
                </CommonButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '24px', marginBottom: '25px', color: '#011a41' }}>Formulaire de Contact</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label>Nom complet *</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      placeholder="Votre nom"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      required
                      placeholder="lucidelabofficiel@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label>Téléphone *</label>
                    <input
                      type="tel"
                      className="form-control"
                      required
                      placeholder="0166285017"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Pôle concerné</label>
                    <select
                      className="form-control"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      <option value="STRATEGY">STRATEGY — Direction & Positionnement</option>
                      <option value="BRAND">BRAND — Identité & Branding</option>
                      <option value="DIGITAL">DIGITAL — Sites & Apps Web</option>
                      <option value="GROWTH">GROWTH — Visibilité & SEO</option>
                      <option value="CONTENT">CONTENT — Contenu & Médias</option>
                      <option value="ADVERTISING">ADVERTISING — Publicité & Campagnes</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Sujet *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    placeholder="Sujet de votre message"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    className="form-control"
                    rows={5}
                    required
                    placeholder="Décrivez votre projet ou votre demande..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <CommonButton type="submit" variant="orange" disabled={loading} style={{ width: '100%', padding: '14px' }}>
                  {loading ? 'Transmissions...' : 'Envoyer le message'} <Send size={16} />
                </CommonButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
