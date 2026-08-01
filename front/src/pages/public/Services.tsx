import React, { useState } from 'react';
import { Compass, Palette, Globe, TrendingUp, FileText, Megaphone, CheckCircle2, ArrowRight, X } from 'lucide-react';
import { CommonButton } from '../../components/common/CommonButton';

export const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<any>(null);

  const servicesList = [
    {
      id: 'strategy',
      icon: <Compass size={40} />,
      title: 'STRATEGY — Définir la bonne direction',
      shortDesc: 'Positionnement stratégique, audit de marque et plan de communication sur-mesure.',
      details: [
        'Audit & Diagnostic de marque',
        'Étude de marché & Analyse concurrentielle',
        'Plateforme de marque & Positionnement',
        'Plan d\'action & Stratégie de communication 360°'
      ]
    },
    {
      id: 'brand',
      icon: <Palette size={40} />,
      title: 'BRAND — Construire une identité forte',
      shortDesc: 'Naming, création de logo, charte graphique et branding émotionnel pour marquer les esprits.',
      details: [
        'Naming & Identité verbale',
        'Conception de logo & Univers visuel',
        'Charte graphique & Brand Guidelines',
        'Design packaging & Supports de communication'
      ]
    },
    {
      id: 'digital',
      icon: <Globe size={40} />,
      title: 'DIGITAL — Créer des expériences numériques',
      shortDesc: 'Conception web, applications web/mobile et plateformes sur-mesure orientées conversion.',
      details: [
        'Création de sites vitrines & corporate',
        'Développement d\'applications Web & Mobile',
        'UI/UX Design & Prototypage',
        'Optimisation de la conversion (CRO)'
      ]
    },
    {
      id: 'growth',
      icon: <TrendingUp size={40} />,
      title: 'GROWTH — Développer la visibilité',
      shortDesc: 'Stratégies d\'acquisition d\'utilisateurs, SEO, référencement et leviers d\'accélération.',
      details: [
        'Référencement naturel (SEO) & Référencement payant (SEA)',
        'Stratégies d\'acquisition de leads B2B/B2C',
        'Marketing automation & Lead Nurturing',
        'Analyse des métriques de croissance'
      ]
    },
    {
      id: 'content',
      icon: <FileText size={40} />,
      title: 'CONTENT — Créer du contenu qui marque',
      shortDesc: 'Production audiovisuelle, storytelling captivant, rédaction et social media management.',
      details: [
        'Production vidéo & Brand Content',
        'Shooting photo professionnel',
        'Gestion des réseaux sociaux (Community Management)',
        'Rédaction stratégique & Copywriting'
      ]
    },
    {
      id: 'advertising',
      icon: <Megaphone size={40} />,
      title: 'ADVERTISING — Faire connaître les marques',
      shortDesc: 'Campagnes publicitaires ciblées (Meta, Google, LinkedIn) et stratégie médias traditionnels.',
      details: [
        'Gestion de campagnes Meta Ads, Google Ads & LinkedIn Ads',
        'Achat d\'espace média traditionnel (Affichage, Radio, Presse)',
        'Optimisation du ROI publicitaire',
        'Reporting & Tableaux de bord de performance'
      ]
    }
  ];

  return (
    <div className="ptb-100">
      <div className="container">
        <div className="section-title">
          <span className="sub-title">Services LUCIDE LAB</span>
          <h2>Nos Domaines d'Expertise</h2>
          <p>Un accompagnement complet et spécialisé pour propulser l'image et la croissance de votre entreprise.</p>
        </div>

        <div className="grid-3 mb-5">
          {servicesList.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.shortDesc}</p>
              
              <ul style={{ marginBottom: '25px' }}>
                {service.details.map((point, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#57647c', marginBottom: '6px' }}>
                    <CheckCircle2 size={14} style={{ color: '#e93c05', flexShrink: 0 }} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <CommonButton
                variant="orange"
                onClick={() => setSelectedService(service)}
                style={{ width: '100%' }}
              >
                Demander ce service <ArrowRight size={16} />
              </CommonButton>
            </div>
          ))}
        </div>

        {/* Modal for Service Inquiry */}
        {selectedService && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(1, 26, 65, 0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              maxWidth: '600px',
              width: '100%',
              padding: '35px',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
              <button
                onClick={() => setSelectedService(null)}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>

              <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#011a41' }}>{selectedService.title}</h3>
              <p style={{ color: '#57647c', marginBottom: '20px', fontSize: '14px' }}>
                Remplissez ce formulaire pour planifier une session d'analyse avec notre équipe d'experts.
              </p>

              <form onSubmit={(e) => { e.preventDefault(); alert('Votre demande a bien été envoyée !'); setSelectedService(null); }}>
                <div className="form-group">
                  <label>Nom complet *</label>
                  <input type="text" className="form-control" required placeholder="Votre nom" />
                </div>

                <div className="form-group">
                  <label>Email professionnel *</label>
                  <input type="email" className="form-control" required placeholder="votre@email.com" />
                </div>

                <div className="form-group">
                  <label>Téléphone *</label>
                  <input type="tel" className="form-control" required placeholder="0166285017" />
                </div>

                <div className="form-group">
                  <label>Détails du projet</label>
                  <textarea className="form-control" rows={3} placeholder="Présentez brièvement vos besoins..."></textarea>
                </div>

                <CommonButton type="submit" variant="orange" style={{ width: '100%' }}>
                  Envoyer ma demande
                </CommonButton>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
