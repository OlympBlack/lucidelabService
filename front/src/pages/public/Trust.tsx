import React from 'react';
import { Star, Building2, Quote, ArrowRight } from 'lucide-react';
import { CommonButton } from '../../components/common/CommonButton';
import { Link } from 'react-router-dom';

export const Trust: React.FC = () => {
  const testimonials = [
    {
      name: 'Marc Lawson',
      role: 'Directeur Général, FinTech Bénin',
      comment: 'LUCIDE LAB a totalement métamorphosé notre image de marque. Leur approche rigoureuse et créative nous a permis de capter l\'attention et la confiance d\'investisseurs majeurs.',
      rating: 5
    },
    {
      name: 'Sophie Tossou',
      role: 'Fondatrice, AgroTech Solutions',
      comment: 'L\'équipe a su capter l\'essence même de notre vision et créer une identité visuelle remarquable accompagnée d\'une stratégie digitale ultra-performante.',
      rating: 5
    },
    {
      name: 'Koffi Mensah',
      role: 'Directeur Marketing, Groupe Immobilier',
      comment: 'Excellence et esthétique au rendez-vous. Les visuels et supports de communication produits par LUCIDE LAB sont d\'une qualité à couper le souffle.',
      rating: 5
    }
  ];

  const partners = [
    'Banque & Finance',
    'Agro-Tech & Industrie',
    'Immobilier & BTP',
    'Logistique & Transport',
    'Santé & Services',
    'Éducation & Formation'
  ];

  return (
    <div>
      {/* HERO + CONTENU — même image en fond continu */}
      <div style={{
        backgroundImage: 'url(/assets/images/font_confiance.jpg)',
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
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#fd8604', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'Raleway, sans-serif' }}>Confiance & Impact</span>
              <span style={{ display: 'block', width: '40px', height: '1px', background: '#fd8604', opacity: 0.9 }} />
            </div>
            <h1 className="font-artistic" style={{ fontSize: '46px', fontWeight: 800, color: '#ffffff', marginBottom: '15px' }}>
              Ils nous font confiance
            </h1>
            <p className="font-body-art" style={{ fontSize: '18px', color: '#e5e7eb', maxWidth: '750px', margin: '0 auto' }}>
              Des retours d'expérience authentiques et des résultats concrets pour nos entreprises et institutions partenaires.
            </p>
          </div>
        </section>

        {/* ── CONTENU — voile semi-transparent, image visible ── */}
        <div style={{ background: 'rgba(0, 10, 30, 0.82)', backdropFilter: 'blur(1px)' }}>
          <div className="ptb-100">
            <div className="container">
              {/* PARTNERS CATEGORIES */}
              <div className="section-title">
                <span className="sub-title" style={{ color: '#fd8604' }}>Secteurs d'Intervention</span>
                <h2 className="font-artistic" style={{ fontSize: '32px', color: '#ffffff' }}>Nos Domaines d'Accompagnement</h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '70px' }}>
                {partners.map((p, idx) => (
                  <div key={idx} style={{
                    background: 'rgba(255, 255, 255, 0.07)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    padding: '28px 15px',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease'
                  }}>
                    <Building2 size={28} style={{ color: '#fd8604', marginBottom: '12px' }} />
                    <div className="font-artistic" style={{ fontWeight: '700', color: '#ffffff', fontSize: '15px' }}>{p}</div>
                  </div>
                ))}
              </div>

              {/* TESTIMONIALS */}
              <div className="section-title" style={{ marginTop: '40px' }}>
                <span className="sub-title" style={{ color: '#fd8604' }}>Témoignages Clients</span>
                <h2 className="font-artistic" style={{ fontSize: '32px', color: '#ffffff' }}>Ce que disent nos partenaires</h2>
              </div>

              <div className="grid-3" style={{ marginBottom: '80px', gap: '30px' }}>
                {testimonials.map((t, idx) => (
                  <div key={idx} style={{
                    background: 'rgba(255, 255, 255, 0.07)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    padding: '38px 28px',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <Quote size={36} style={{ color: 'rgba(253, 134, 4, 0.3)', position: 'absolute', top: '24px', right: '24px' }} />
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '18px' }}>
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={18} fill="#fd8604" color="#fd8604" />
                      ))}
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontStyle: 'italic', fontSize: '15px', marginBottom: '25px', lineHeight: 1.7, flexGrow: 1 }}>
                      "{t.comment}"
                    </p>
                    <div>
                      <h4 className="font-artistic" style={{ fontSize: '18px', color: '#ffffff', marginBottom: '4px' }}>{t.name}</h4>
                      <p style={{ color: '#fd8604', fontSize: '13px', fontWeight: '700', margin: 0 }}>{t.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA BANNER */}
              <div style={{
                textAlign: 'center',
                background: 'rgba(0, 76, 153, 0.35)',
                border: '1px solid rgba(255,255,255,0.15)',
                backdropFilter: 'blur(12px)',
                padding: '50px 30px',
                borderRadius: '20px',
                color: '#ffffff',
              }}>
                <h2 className="font-artistic" style={{ color: '#ffffff', fontSize: '32px', marginBottom: '15px' }}>
                  Prêt à transformer votre marque avec nous ?
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '25px', maxWidth: '600px', margin: '0 auto 25px', fontSize: '16px' }}>
                  Rejoignez nos clients partenaires et bâtissons ensemble une image de marque forte et performante.
                </p>
                <Link to="/contact">
                  <CommonButton variant="orange">
                    Discuter de votre projet <ArrowRight size={18} />
                  </CommonButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
