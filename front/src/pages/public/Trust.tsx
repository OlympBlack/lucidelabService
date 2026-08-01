import React from 'react';
import { Star, Building2, Quote } from 'lucide-react';
import { CommonButton } from '../../components/common/CommonButton';
import { Link } from 'react-router-dom';

export const Trust: React.FC = () => {
  const testimonials = [
    {
      name: 'Marc Lawson',
      role: 'Directeur Général, FinTech Bénin',
      comment: 'LUCIDE LAB a totalement métamorphosé notre image de marque. Leur approche rigoureuse et lucide nous a permis de gagner la confiance d\'investisseurs majeurs.',
      rating: 5
    },
    {
      name: 'Sophie Tossou',
      role: 'Fondatrice, AgroTech Solutions',
      comment: 'L\'équipe a su capter l\'essence de notre projet et créer une plateforme web performante couplée à une campagne growth qui a doublé nos ventes.',
      rating: 5
    },
    {
      name: 'Koffi Mensah',
      role: 'Directeur Marketing, Groupe Immobilier',
      comment: 'Excellence et créativité au rendez-vous. Les vidéos et visuels produits par LUCIDE LAB sont d\'une qualité digne des plus grands cabinets internationaux.',
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
    <div className="ptb-100">
      <div className="container">
        {/* Section Header */}
        <div className="section-title">
          <span className="sub-title">Ils nous font confiance</span>
          <h2>Partenaires & Témoignages Clients</h2>
          <p>Des entreprises et institutions d'Afrique de l'Ouest qui s'appuient sur l'expertise de LUCIDE LAB.</p>
        </div>

        {/* Partners Categories */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '70px' }}>
          {partners.map((p, idx) => (
            <div key={idx} style={{
              background: '#f4f7fc',
              border: '1px solid #e5e9f2',
              borderRadius: '12px',
              padding: '25px 15px',
              textAlign: 'center',
              fontWeight: '700',
              color: '#011a41',
              fontSize: '15px'
            }}>
              <Building2 size={24} style={{ color: '#e93c05', marginBottom: '10px' }} />
              <div>{p}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="section-title" style={{ marginTop: '50px' }}>
          <span className="sub-title">Retours d'expérience</span>
          <h2>Ce que nos clients disent de nous</h2>
        </div>

        <div className="grid-3" style={{ marginBottom: '60px' }}>
          {testimonials.map((t, idx) => (
            <div key={idx} style={{
              background: '#ffffff',
              border: '1px solid #e5e9f2',
              borderRadius: '16px',
              padding: '35px 25px',
              boxShadow: '0 4px 15px rgba(1, 26, 65, 0.05)',
              position: 'relative'
            }}>
              <Quote size={32} style={{ color: 'rgba(233, 60, 5, 0.2)', position: 'absolute', top: '20px', right: '20px' }} />
              
              <div style={{ display: 'flex', gap: '4px', marginBottom: '15px' }}>
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#ffc107" color="#ffc107" />
                ))}
              </div>

              <p style={{ color: '#011f4c', fontStyle: 'italic', fontSize: '15px', marginBottom: '25px', lineHeight: '1.7' }}>
                "{t.comment}"
              </p>

              <div>
                <h4 style={{ fontSize: '16px', color: '#011a41', marginBottom: '2px' }}>{t.name}</h4>
                <p style={{ color: '#e93c05', fontSize: '13px', fontWeight: '600', margin: 0 }}>{t.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, #011a41 0%, #0e3e78 100%)', padding: '50px', borderRadius: '16px', color: '#fff' }}>
          <h2 style={{ color: '#fff', marginBottom: '15px' }}>Rejoignez nos clients satisfaits</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '25px' }}>Bâtissons ensemble l'image de marque que mérite votre entreprise.</p>
          <Link to="/contact">
            <CommonButton variant="orange">
              Discuter avec notre équipe (0166285017)
            </CommonButton>
          </Link>
        </div>
      </div>
    </div>
  );
};
