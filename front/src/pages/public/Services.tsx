import React, { useState } from 'react';
import { Compass, Palette, Globe, TrendingUp, FileText, Megaphone, CheckCircle2, ArrowRight, X, Mail } from 'lucide-react';
import { CommonButton } from '../../components/common/CommonButton';

export const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<any>(null);

  const servicesList = [
    {
      id: 'strategy',
      icon: <Compass size={28} style={{ color: '#fd8604' }} />,
      title: 'STRATEGY',
      shortDesc: 'Positionnement, audit de marque et plan de communication sur-mesure.',
      details: ['Audit & Diagnostic de marque', 'Plan stratégique & Positionnement']
    },
    {
      id: 'brand',
      icon: <Palette size={28} style={{ color: '#004C99' }} />,
      title: 'BRAND',
      shortDesc: 'Naming, logo, charte graphique et identité visuelle forte.',
      details: ['Conception de logo & Univers visuel', 'Charte graphique & Brand Guidelines']
    },
    {
      id: 'digital',
      icon: <Globe size={28} style={{ color: '#fd8604' }} />,
      title: 'DIGITAL',
      shortDesc: 'Sites web, applications mobiles et plateformes sur-mesure.',
      details: ['Création de sites & applications', 'UI/UX Design & Prototypage']
    },
    {
      id: 'growth',
      icon: <TrendingUp size={28} style={{ color: '#004C99' }} />,
      title: 'GROWTH',
      shortDesc: 'SEO, acquisition et accélération de votre chiffre d\'affaires.',
      details: ['SEO & Référencement payant (SEA)', 'Acquisition de leads B2B/B2C']
    },
    {
      id: 'content',
      icon: <FileText size={28} style={{ color: '#fd8604' }} />,
      title: 'CONTENT',
      shortDesc: 'Production vidéo, photo, copywriting et community management.',
      details: ['Production vidéo & Brand Content', 'Gestion des réseaux sociaux']
    },
    {
      id: 'advertising',
      icon: <Megaphone size={28} style={{ color: '#fd8604' }} />,
      title: 'ADVERTISING',
      shortDesc: 'Campagnes Meta, Google, LinkedIn et médias traditionnels.',
      details: ['Meta Ads, Google Ads & LinkedIn', 'Affichage, Radio & Presse']
    }
  ];


  return (
    <div>
      {/* HERO + SECTION SERVICES — même image en fond continu */}
      <div style={{
        backgroundImage: 'url(/assets/images/hero_beaute.jpg)',
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
          <div style={{ maxWidth: '900px' }} className="fade-in-up">
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '18px'
            }}>
              <span style={{ display: 'block', width: '40px', height: '1px', background: '#fd8604', opacity: 0.9 }} />
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#fd8604',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontFamily: 'Raleway, sans-serif'
              }}>Services LUCIDE LAB</span>
              <span style={{ display: 'block', width: '40px', height: '1px', background: '#fd8604', opacity: 0.9 }} />
            </div>
            <h1 className="font-artistic" style={{ fontSize: '46px', fontWeight: 800, color: '#ffffff', marginBottom: '15px' }}>
              Nos Domaines d'Expertise
            </h1>
            <p className="font-body-art" style={{ fontSize: '18px', color: '#e5e7eb', maxWidth: '750px', margin: '0 auto 25px' }}>
              Un accompagnement 360° sur-mesure pour propulser l'image, la notoriété et la croissance de votre entreprise.
            </p>
          </div>
        </section>

        {/* ── SECTION SERVICES — voile semi-transparent, image du hero visible ── */}
        <div style={{ background: 'rgba(0, 10, 30, 0.78)', backdropFilter: 'blur(1px)' }}>
          <div className="ptb-100">
            <div className="container">
              <div className="grid-3" style={{ gap: '30px' }}>
                {servicesList.map((service, idx) => (
                    <div
                      key={service.id}
                      className="fade-in-up"
                      style={{
                        background: '#ffffff',
                        border: '1px solid rgba(255,255,255,0.6)',
                        borderRadius: '16px',
                        padding: '16px 14px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                        display: 'flex',
                        flexDirection: 'column',
                        animationDelay: `${idx * 0.15}s`
                      }}
                    >
                      <div className="service-icon-wrapper" style={{
                        width: '48px',
                        height: '48px',
                      borderRadius: '14px',
                      background: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '10px',
                      transition: 'all 0.3s ease'
                    }}>
                      {service.icon}
                    </div>

                    <h3 className="font-artistic" style={{ fontSize: '16px', color: '#fd8604', marginBottom: '6px' }}>
                      {service.title}
                    </h3>
                    <p style={{ color: '#57647c', fontSize: '12px', lineHeight: 1.4, marginBottom: '10px', flexGrow: 1 }}>
                      {service.shortDesc}
                    </p>
                    
                    <ul style={{ marginBottom: '14px', padding: 0 }}>
                      {service.details.map((point, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>
                          <CheckCircle2 size={16} style={{ color: '#fd8604', flexShrink: 0, marginTop: '2px' }} />
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
                <input type="tel" required placeholder="+229 01 00 00 00 00" style={{ width: '100%', padding: '12px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none' }} />
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
