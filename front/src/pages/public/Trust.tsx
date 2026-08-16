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
      {/* STORYTELLING HEADER */}
      <section style={{
        position: 'relative',
        minHeight: '60vh',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.65)), url(/assets/images/font_confiance.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 20px 60px 20px',
        color: '#ffffff',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '900px' }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(253, 134, 4, 0.2)',
            color: '#fd8604',
            border: '1px solid #fd8604',
            padding: '6px 18px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '15px'
          }}>
            Confiance & Impact
          </span>
          <h1 className="font-artistic" style={{ fontSize: '46px', fontWeight: 800, color: '#ffffff', marginBottom: '15px' }}>
            Ils nous font confiance
          </h1>
          <p className="font-body-art" style={{ fontSize: '18px', color: '#e5e7eb', maxWidth: '750px', margin: '0 auto' }}>
            Des retours d'expérience authentiques et des résultats concrets pour nos entreprises et institutions partenaires.
          </p>
        </div>
      </section>

      {/* CONTENT AREA */}
      <div className="ptb-100" style={{ background: '#f4f7fc' }}>
        <div className="container">
          {/* PARTNERS CATEGORIES */}
          <div className="section-title">
            <span className="sub-title">Secteurs d'Intervention</span>
            <h2 className="font-artistic" style={{ fontSize: '32px', color: '#004C99' }}>Nos Domaines d'Accompagnement</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '70px' }}>
            {partners.map((p, idx) => (
              <div key={idx} style={{
                background: '#ffffff',
                border: '1px solid #e5e9f2',
                borderRadius: '16px',
                padding: '28px 15px',
                textAlign: 'center',
                boxShadow: '0 8px 20px rgba(0, 76, 153, 0.05)',
                transition: 'transform 0.3s ease'
              }}>
                <Building2 size={28} style={{ color: '#fd8604', marginBottom: '12px' }} />
                <div className="font-artistic" style={{ fontWeight: '700', color: '#004C99', fontSize: '15px' }}>{p}</div>
              </div>
            ))}
          </div>

          {/* TESTIMONIALS */}
          <div className="section-title" style={{ marginTop: '40px' }}>
            <span className="sub-title">Témoignages Clients</span>
            <h2 className="font-artistic" style={{ fontSize: '32px', color: '#004C99' }}>Ce que disent nos partenaires</h2>
          </div>

          <div className="grid-3" style={{ marginBottom: '80px', gap: '30px' }}>
            {testimonials.map((t, idx) => (
              <div key={idx} style={{
                background: '#ffffff',
                border: '1px solid #e5e9f2',
                borderRadius: '20px',
                padding: '38px 28px',
                boxShadow: '0 10px 30px rgba(0, 76, 153, 0.08)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Quote size={36} style={{ color: 'rgba(253, 134, 4, 0.18)', position: 'absolute', top: '24px', right: '24px' }} />
                
                <div style={{ display: 'flex', gap: '4px', marginBottom: '18px' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#fd8604" color="#fd8604" />
                  ))}
                </div>

                <p style={{ color: '#374151', fontStyle: 'italic', fontSize: '15px', marginBottom: '25px', lineHeight: 1.7, flexGrow: 1 }}>
                  "{t.comment}"
                </p>

                <div>
                  <h4 className="font-artistic" style={{ fontSize: '18px', color: '#004C99', marginBottom: '4px' }}>{t.name}</h4>
                  <p style={{ color: '#fd8604', fontSize: '13px', fontWeight: '700', margin: 0 }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA BANNER */}
          <div style={{
            textAlign: 'center',
            background: 'linear-gradient(135deg, #00254d 0%, #004C99 100%)',
            padding: '50px 30px',
            borderRadius: '20px',
            color: '#ffffff',
            boxShadow: '0 20px 40px rgba(0, 76, 153, 0.25)'
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
  );
};
