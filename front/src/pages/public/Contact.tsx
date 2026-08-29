import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';
import { CommonButton } from '../../components/common/CommonButton';
import { SuccessModal } from '../../components/common/SuccessModal';
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
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Regex email stricte (Frontend)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMsg("Format de l'adresse email invalide.");
      return;
    }

    setLoading(true);
    setErrorMsg('');
    const result = await api.sendContact(formData);
    setLoading(false);
    
    if (result && (result.success || result.data)) {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: 'STRATEGY', subject: '', message: '' });
    } else {
      if (result && result.errors && result.errors.email) {
        setErrorMsg("L'adresse email saisie n'existe pas. Veuillez vérifier que le domaine est correct et réessayer.");
      } else {
        setErrorMsg(result?.message || "Une erreur s'est produite lors de l'envoi du message.");
      }
    }
  };

  return (
    <div>
      {/* HERO + FORMULAIRE — même image en fond continu */}
      <div style={{
        backgroundImage: 'url(/assets/images/contact.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
        {/* ── HERO ── */}
        <section style={{
          position: 'relative',
          minHeight: '60vh',
          background: 'linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.65))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 20px 60px 20px',
          color: '#ffffff',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '900px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
              <span style={{ display: 'block', width: '40px', height: '1px', background: '#fd8604', opacity: 0.9 }} />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#fd8604', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'Raleway, sans-serif' }}>Contact & Consultation</span>
              <span style={{ display: 'block', width: '40px', height: '1px', background: '#fd8604', opacity: 0.9 }} />
            </div>
            <h1 className="font-artistic" style={{ fontSize: '46px', fontWeight: 800, color: '#ffffff', marginBottom: '15px' }}>
              Donnons vie à vos projets d'exception
            </h1>
            <p className="font-body-art" style={{ fontSize: '18px', color: '#e5e7eb', maxWidth: '750px', margin: '0 auto' }}>
              Un entretien direct avec notre équipe créative et stratégique dissipera à coup sûr vos doutes.
            </p>
          </div>
        </section>

        {/* ── FORMULAIRE — voile cendre plus marqué ── */}
        <div style={{ background: 'rgba(100, 105, 115, 0.35)', backdropFilter: 'blur(12px)' }}>
          <div className="ptb-100">
            <div className="container">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '35px', alignItems: 'start' }}>

                {/* INFO CARD */}
                <div style={{
                  background: 'rgba(0, 76, 153, 0.9)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '20px',
                  padding: '40px 30px',
                  color: '#ffffff',
                }}>
                  <h3 className="font-artistic" style={{ fontSize: '26px', color: '#ffffff', marginBottom: '30px', borderBottom: '2px solid rgba(253, 134, 4, 0.4)', paddingBottom: '10px' }}>
                    Nos Coordonnées
                  </h3>

                  <div style={{ display: 'flex', gap: '16px', marginBottom: '25px', alignItems: 'center' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fd8604', flexShrink: 0 }}>
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Téléphone Direct</h4>
                      <a href="tel:+2290166285017" style={{ color: '#ffffff', fontWeight: 700, fontSize: '18px', textDecoration: 'none' }}>
                        +229 01 66 28 50 17
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', marginBottom: '25px', alignItems: 'center' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fd8604', flexShrink: 0 }}>
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Email Officiel</h4>
                      <a href="mailto:lucidelabofficiel@gmail.com" style={{ color: '#ffffff', fontWeight: 600, fontSize: '15px', textDecoration: 'none' }}>
                        lucidelabofficiel@gmail.com
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', marginBottom: '25px', alignItems: 'center' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fd8604', flexShrink: 0 }}>
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Adresse & Rayonnement</h4>
                      <p style={{ color: '#ffffff', fontWeight: 600, fontSize: '16px', margin: '0 0 2px' }}>Cotonou, Bénin</p>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', margin: 0 }}>Afrique de l'Ouest & International</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fd8604', flexShrink: 0 }}>
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Horaires d'Ouverture</h4>
                      <p style={{ color: '#ffffff', fontWeight: 600, fontSize: '15px', margin: 0 }}>Lundi - Vendredi : 08h00 – 18h30</p>
                    </div>
                  </div>
                </div>

                {/* FORM CARD */}
                <div style={{ background: 'rgba(210, 215, 225, 0.75)', borderRadius: '20px', padding: '45px', border: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
                  <SuccessModal 
                    isOpen={submitted} 
                    onClose={() => setSubmitted(false)}
                  />
                  
                  <form onSubmit={handleSubmit} noValidate style={{ display: submitted ? 'none' : 'block' }}>
                    <h3 className="font-artistic" style={{ fontSize: '26px', color: '#004C99', marginBottom: '25px' }}>
                      Formulaire de Prise de Contact
                    </h3>

                    {errorMsg && (
                      <div style={{ background: '#fee2e2', border: '1px solid #ef4444', color: '#b91c1c', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', fontWeight: 500 }}>
                        {errorMsg}
                      </div>
                    )}

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>Nom complet *</label>
                          <input
                            type="text"
                            required
                            placeholder="Votre nom complet"
                            value={formData.name}
                            onChange={handleChange('name')}
                            style={{ width: '100%', padding: '12px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', background: '#f9fafb', color: '#111827' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>Email *</label>
                          <input
                            type="email"
                            required
                            placeholder="votre@email.com"
                            value={formData.email}
                            onChange={handleChange('email')}
                            style={{ width: '100%', padding: '12px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', background: '#f9fafb', color: '#111827' }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>Téléphone *</label>
                          <input
                            type="tel"
                            required
                            placeholder="+229 01 00 00 00 00"
                            value={formData.phone}
                            onChange={handleChange('phone')}
                            style={{ width: '100%', padding: '12px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', background: '#f9fafb', color: '#111827' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>Pôle concerné</label>
                          <select
                            value={formData.service}
                            onChange={handleChange('service')}
                            style={{ width: '100%', padding: '12px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', background: '#f9fafb', color: '#111827' }}
                          >
                            <option value="STRATEGY">STRATEGY — Direction & Positionnement</option>
                            <option value="BRAND">BRAND — Identité & Branding</option>
                            <option value="DIGITAL">DIGITAL — Sites & Apps Web</option>
                            <option value="GROWTH">GROWTH — Visibilité & SEO</option>
                            <option value="CONTENT">CONTENT — Contenu & Médias</option>
                            <option value="ADVERTISING">ADVERTISING — Publicité & Campagnes</option>
                            <option value="OTHER">Autre — Préciser dans le message</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>Sujet *</label>
                        <input
                          type="text"
                          required
                          placeholder="Sujet de votre message"
                          value={formData.subject}
                          onChange={handleChange('subject')}
                          style={{ width: '100%', padding: '12px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', background: '#f9fafb', color: '#111827' }}
                        />
                      </div>

                      <div style={{ marginBottom: '22px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>Message *</label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Décrivez votre projet ou votre besoin..."
                          value={formData.message}
                          onChange={handleChange('message')}
                          style={{ width: '100%', padding: '12px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none', resize: 'none', boxSizing: 'border-box', background: '#f9fafb', color: '#111827' }}
                        />
                      </div>

                      <CommonButton
                        type="submit"
                        variant="orange"
                        disabled={loading}
                        style={{ width: '100%', padding: '14px' }}
                      >
                        {loading ? 'Envoi en cours...' : 'Envoyer mon message'} <Send size={18} />
                      </CommonButton>
                    </form>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
