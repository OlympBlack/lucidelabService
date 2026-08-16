import React, { useState } from 'react';
import { Compass, Palette, Globe, TrendingUp, FileText, Megaphone, CheckCircle2, ArrowRight, X, Phone, Mail } from 'lucide-react';
import { CommonButton } from '../../components/common/CommonButton';
import { Link } from 'react-router-dom';

export const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<any>(null);

  const servicesList = [
    {
      id: 'strategy',
      icon: <Compass size={40} style={{ color: '#fd8604' }} />,
      title: 'STRATEGY — Définir la bonne direction',
      shortDesc: 'Positionnement stratégique, audit de marque et plan de communication sur-mesure pour dominer votre marché.',
      details: [
        'Audit & Diagnostic de marque 360°',
        'Étude de marché & Analyse concurrentielle',
        'Plateforme de marque & Positionnement',
        'Plan d\'action & Stratégie de communication'
      ]
    },
    {
      id: 'brand',
      icon: <Palette size={40} style={{ color: '#004C99' }} />,
      title: 'BRAND — Construire une identité forte',
      shortDesc: 'Naming, création de logo, charte graphique et branding émotionnel pour captiver et marquer les esprits.',
      details: [
        'Naming & Identité verbale',
        'Conception de logo & Univers visuel HD',
        'Charte graphique & Brand Guidelines',
        'Design packaging & Supports de communication'
      ]
    },
    {
      id: 'digital',
      icon: <Globe size={40} style={{ color: '#fd8604' }} />,
      title: 'DIGITAL — Créer des expériences numériques',
      shortDesc: 'Conception web, applications web/mobile et plateformes sur-mesure orientées haute conversion.',
      details: [
        'Création de sites vitrines & corporate',
        'Développement d\'applications Web & Mobile',
        'UI/UX Design & Prototypage interactif',
        'Optimisation de la conversion (CRO)'
      ]
    },
    {
      id: 'growth',
      icon: <TrendingUp size={40} style={{ color: '#004C99' }} />,
      title: 'GROWTH — Développer la visibilité',
      shortDesc: 'Stratégies d\'acquisition d\'utilisateurs, SEO, référencement et leviers d\'accélération de chiffre d\'affaires.',
      details: [
        'Référencement naturel (SEO) & Référencement payant (SEA)',
        'Stratégies d\'acquisition de leads B2B/B2C',
        'Marketing automation & Lead Nurturing',
        'Analyse des métriques de croissance'
      ]
    },
    {
      id: 'content',
      icon: <FileText size={40} style={{ color: '#fd8604' }} />,
      title: 'CONTENT — Créer du contenu qui marque',
      shortDesc: 'Production audiovisuelle, storytelling captivant, rédaction et social media management engageant.',
      details: [
        'Production vidéo & Brand Content',
        'Shooting photo professionnel',
        'Gestion des réseaux sociaux (Community Management)',
        'Rédaction stratégique & Copywriting'
      ]
    },
    {
      id: 'advertising',
      icon: <Megaphone size={40} style={{ color: '#004C99' }} />,
      title: 'ADVERTISING — Faire connaître les marques',
      shortDesc: 'Campagnes publicitaires ciblées (Meta, Google, LinkedIn) et stratégie médias traditionnels à fort impact.',
      details: [
        'Gestion de campagnes Meta Ads, Google Ads & LinkedIn Ads',
        'Achat d\'espace média traditionnel (Affichage, Radio, Presse)',
        'Optimisation du ROI publicitaire',
        'Reporting & Tableaux de bord de performance'
      ]
    }
  ];

  return (
    <div>
      {/* HERO STORYTELLING HEADER */}
      <section style={{
        position: 'relative',
        minHeight: '60vh',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.65)), url(/assets/images/hero_beaute.jpg)',
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
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            padding: '6px 18px',
            borderRadius: '30px',
            fontSize: '13px',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '18px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fd8604', boxShadow: '0 0 10px #fd8604' }} />
            <span>Services LUCIDE LAB</span>
          </div>
          <h1 className="font-artistic" style={{ fontSize: '46px', fontWeight: 800, color: '#ffffff', marginBottom: '15px' }}>
            Nos Domaines d'Expertise
          </h1>
          <p className="font-body-art" style={{ fontSize: '18px', color: '#e5e7eb', maxWidth: '750px', margin: '0 auto 25px' }}>
            Un accompagnement 360° sur-mesure pour propulser l'image, la notoriété et la croissance de votre entreprise.
          </p>
        </div>
      </section>

      {/* SERVICES CONTENT GRID */}
      <div className="ptb-100" style={{ background: '#f4f7fc' }}>
        <div className="container">
          <div className="grid-3" style={{ gap: '30px' }}>
            {servicesList.map((service) => (
              <div
                key={service.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '32px 28px',
                  boxShadow: '0 10px 30px rgba(0, 76, 153, 0.08)',
                  border: '1px solid #e5e9f2',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '14px',
                  background: 'rgba(0, 76, 153, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  {service.icon}
                </div>

                <h3 className="font-artistic" style={{ fontSize: '20px', color: '#004C99', marginBottom: '12px' }}>
                  {service.title}
                </h3>
                <p style={{ color: '#57647c', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px', flexGrow: 1 }}>
                  {service.shortDesc}
                </p>
                
                <ul style={{ marginBottom: '25px', padding: 0 }}>
                  {service.details.map((point, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#374151', marginBottom: '8px' }}>
                      <CheckCircle2 size={16} style={{ color: '#fd8604', flexShrink: 0 }} />
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

          {/* CTA BANNER */}
          <div style={{
            marginTop: '80px',
            background: 'linear-gradient(135deg, #00254d 0%, #004C99 100%)',
            borderRadius: '20px',
            padding: '50px 30px',
            color: '#ffffff',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0, 76, 153, 0.25)'
          }}>
            <h2 className="font-artistic" style={{ fontSize: '32px', color: '#ffffff', marginBottom: '12px' }}>
              Besoin d'un accompagnement personnalisé ?
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)', maxWidth: '650px', margin: '0 auto 25px' }}>
              Contactez nos experts pour une analyse gratuite de vos besoins et un devis adapté à votre projet.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact">
                <CommonButton variant="orange">
                  <Phone size={18} /> Prendre rendez-vous (+229 01 66 28 50 17)
                </CommonButton>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL SERVICE INQUIRY */}
      {selectedService && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 20, 50, 0.82)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100000,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            maxWidth: '580px',
            width: '100%',
            padding: '35px',
            position: 'relative',
            boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
          }}>
            <button
              onClick={() => setSelectedService(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#f4f7fc',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#004C99'
              }}
            >
              <X size={20} />
            </button>

            <span style={{ color: '#fd8604', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Demande d'accompagnement
            </span>
            <h3 className="font-artistic" style={{ fontSize: '22px', marginBottom: '8px', color: '#004C99' }}>
              {selectedService.title}
            </h3>
            <p style={{ color: '#57647c', marginBottom: '22px', fontSize: '14px' }}>
              Remplissez ce formulaire pour fixer un entretien direct avec l'un de nos directeurs de pôle.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert('Votre demande a bien été transmise à notre équipe !'); setSelectedService(null); }}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Nom complet *</label>
                <input type="text" required placeholder="Votre nom" style={{ width: '100%', padding: '12px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none' }} />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Email professionnel *</label>
                <input type="email" required placeholder="votre@entreprise.com" style={{ width: '100%', padding: '12px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none' }} />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Téléphone *</label>
                <input type="tel" required placeholder="+229 01 66 28 50 17" style={{ width: '100%', padding: '12px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none' }} />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Détails de votre projet</label>
                <textarea rows={3} placeholder="Expliquez-nous brièvement vos objectifs..." style={{ width: '100%', padding: '12px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none', resize: 'none' }}></textarea>
              </div>

              <CommonButton type="submit" variant="orange" style={{ width: '100%' }}>
                Envoyer ma demande de consultation <Mail size={16} />
              </CommonButton>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
