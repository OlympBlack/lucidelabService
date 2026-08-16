import React from 'react';
import { Target, Eye, Award, Sparkles, MapPin, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { CommonButton } from '../../components/common/CommonButton';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  return (
    <div>
      {/* HERO + CONTENU — même image en fond continu */}
      <div style={{
        backgroundImage: 'url(/assets/images/painture_popup.jpg)',
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
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#fd8604', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'Raleway, sans-serif' }}>Qui sommes-nous ?</span>
              <span style={{ display: 'block', width: '40px', height: '1px', background: '#fd8604', opacity: 0.9 }} />
            </div>
            <h1 className="font-artistic" style={{ fontSize: '44px', fontWeight: 800, color: '#ffffff', marginBottom: '15px' }}>
              LUCIDE LAB | Cabinet d'Expertise en Communication & Croissance
            </h1>
            <p className="font-body-art" style={{ fontSize: '18px', color: '#e5e7eb', maxWidth: '780px', margin: '0 auto' }}>
              Nous sommes l'échO de vos rêves, de vos projets, de votre succès. Une agence créative avec le brin d'audace et de rigueur stratégique qu'il vous manquait.
            </p>
          </div>
        </section>

        {/* ── CONTENU — voile semi-transparent, image visible ── */}
        <div style={{ background: 'rgba(0, 10, 30, 0.82)', backdropFilter: 'blur(1px)' }}>
          <div className="ptb-100">
            <div className="container">
              {/* MISSION & VISION */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '80px' }}>
                <div style={{
                  background: 'rgba(0, 76, 153, 0.35)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(12px)',
                  color: '#ffffff',
                  padding: '45px',
                  borderRadius: '20px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                    <div style={{ width: '54px', height: '54px', borderRadius: '14px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Target size={30} style={{ color: '#fd8604' }} />
                    </div>
                    <h3 className="font-artistic" style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>Notre Mission</h3>
                  </div>
                  <p style={{ fontSize: '17px', lineHeight: '1.7', color: 'rgba(255,255,255,0.9)', margin: 0 }}>
                    Vous aider à rêver, rendre viables vos rêves et faire d'eux des échos ! Nous accompagnons les entreprises ambitieuses dans la construction d'une image de marque cohérente, crédible et hautement performante.
                  </p>
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.07)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(12px)',
                  padding: '45px',
                  borderRadius: '20px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                    <div style={{ width: '54px', height: '54px', borderRadius: '14px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MapPin size={30} style={{ color: '#fd8604' }} />
                    </div>
                    <h3 className="font-artistic" style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>Notre Vision</h3>
                  </div>
                  <p style={{ fontSize: '17px', lineHeight: '1.7', color: 'rgba(255,255,255,0.8)', margin: 0 }}>
                    Devenir le cabinet de référence incontournable en stratégie de marque et communication 360° au Bénin, puis rayonner avec excellence à l'échelle de toute l'Afrique de l'Ouest francophone.
                  </p>
                </div>
              </div>

              {/* VALEURS & PILIERS */}
              <div style={{ marginBottom: '40px' }}>
                <div className="section-title">
                  <span className="sub-title" style={{ color: '#fd8604' }}>ADN & Piliers</span>
                  <h2 className="font-artistic" style={{ fontSize: '32px', color: '#ffffff' }}>Nos Valeurs</h2>
                </div>

                <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '25px' }}>
                  {[
                    { icon: <Eye size={28} style={{ color: '#fd8604' }} />, title: 'Lucidité', accent: '#fd8604', text: 'Chaque décision stratégique repose sur une analyse claire, objective et rigoureuse des faits, des données et du marché réel.' },
                    { icon: <Award size={28} style={{ color: '#fd8604' }} />, title: 'Excellence', accent: '#fd8604', text: 'Le souci du détail fait la différence. Nous poussons chaque création, design et conseil stratégique au niveau le plus exigeant.' },
                    { icon: <Sparkles size={28} style={{ color: '#fd8604' }} />, title: 'Créativité', accent: '#fd8604', text: 'Concevoir des identités visuelles et conceptuelles audacieuses, originales et décalées qui captivent l\'attention.' },
                    { icon: <Target size={28} style={{ color: '#fd8604' }} />, title: 'Performance', accent: '#fd8604', text: 'Chaque projet doit générer un impact mesurable, renforcer votre notoriété et produire un retour sur investissement concret.' },
                  ].map((v, i) => (
                    <div key={i} style={{ background: 'rgba(255, 255, 255, 0.88)', backdropFilter: 'blur(12px)', padding: '32px 26px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', borderLeft: `4px solid ${v.accent}` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                        {v.icon}
                        <h3 className="font-artistic" style={{ fontSize: '22px', color: '#004C99', margin: 0 }}>{v.title}</h3>
                      </div>
                      <p style={{ color: '#57647c', fontSize: '15px', lineHeight: 1.65, margin: 0 }}>{v.text}</p>
                    </div>
                  ))}
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
