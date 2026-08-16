import React from 'react';
import { Target, Eye, Award, Sparkles, MapPin, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { CommonButton } from '../../components/common/CommonButton';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  return (
    <div>
      {/* STORYTELLING HEADER */}
      <section style={{
        position: 'relative',
        minHeight: '60vh',
        backgroundImage: 'linear-gradient(rgba(0, 37, 77, 0.78), rgba(0, 76, 153, 0.88)), url(/assets/images/painture_popup.jpg)',
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
            Qui sommes-nous ?
          </span>
          <h1 className="font-artistic" style={{ fontSize: '44px', fontWeight: 800, color: '#ffffff', marginBottom: '15px' }}>
            LUCIDE LAB | Cabinet d'Expertise en Communication & Croissance
          </h1>
          <p className="font-body-art" style={{ fontSize: '18px', color: '#e5e7eb', maxWidth: '780px', margin: '0 auto' }}>
            Nous sommes l'échO de vos rêves, de vos projets, de votre succès. Une agence créative avec le brin d'audace et de rigueur stratégique qu'il vous manquait.
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <div className="ptb-100" style={{ background: '#f4f7fc' }}>
        <div className="container">
          {/* MISSION & VISION */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '80px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #00254d 0%, #004C99 100%)',
              color: '#ffffff',
              padding: '45px',
              borderRadius: '20px',
              boxShadow: '0 15px 35px rgba(0, 76, 153, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <div style={{ width: '54px', height: '54px', borderRadius: '14px', background: 'rgba(253, 134, 4, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Target size={30} style={{ color: '#fd8604' }} />
                </div>
                <h3 className="font-artistic" style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>Notre Mission</h3>
              </div>
              <p style={{ fontSize: '17px', lineHeight: '1.7', color: 'rgba(255,255,255,0.9)', margin: 0 }}>
                Vous aider à rêver, rendre viables vos rêves et faire d'eux des échos ! Nous accompagnons les entreprises ambitieuses dans la construction d'une image de marque cohérente, crédible et hautement performante.
              </p>
            </div>

            <div style={{
              background: '#ffffff',
              border: '2px solid #e5e9f2',
              padding: '45px',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.04)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <div style={{ width: '54px', height: '54px', borderRadius: '14px', background: 'rgba(0, 76, 153, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={30} style={{ color: '#004C99' }} />
                </div>
                <h3 className="font-artistic" style={{ color: '#004C99', fontSize: '28px', margin: 0 }}>Notre Vision</h3>
              </div>
              <p style={{ fontSize: '17px', lineHeight: '1.7', color: '#57647c', margin: 0 }}>
                Devenir le cabinet de référence incontournable en stratégie de marque et communication 360° au Bénin, puis rayonner avec excellence à l'échelle de toute l'Afrique de l'Ouest francophone.
              </p>
            </div>
          </div>

          {/* VALEURS & PILIERS */}
          <div style={{ marginBottom: '80px' }}>
            <div className="section-title">
              <span className="sub-title">ADN & Piliers Operationnels</span>
              <h2 className="font-artistic" style={{ fontSize: '36px', color: '#004C99' }}>Nos Valeurs Fondamentales</h2>
              <p style={{ maxWidth: '650px', margin: '0 auto', color: '#57647c' }}>
                Les 4 piliers moraux et méthodologiques qui guident chacune de nos interventions.
              </p>
            </div>

            <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '25px' }}>
              <div style={{ background: '#ffffff', padding: '32px 26px', borderRadius: '16px', borderLeft: '5px solid #fd8604', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                  <Eye size={28} style={{ color: '#fd8604' }} />
                  <h3 className="font-artistic" style={{ fontSize: '22px', color: '#004C99', margin: 0 }}>Lucidité</h3>
                </div>
                <p style={{ color: '#57647c', fontSize: '15px', lineHeight: 1.65, margin: 0 }}>
                  Chaque décision stratégique repose sur une analyse claire, objective et rigoureuse des faits, des données et du marché réel.
                </p>
              </div>

              <div style={{ background: '#ffffff', padding: '32px 26px', borderRadius: '16px', borderLeft: '5px solid #004C99', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                  <Award size={28} style={{ color: '#004C99' }} />
                  <h3 className="font-artistic" style={{ fontSize: '22px', color: '#004C99', margin: 0 }}>Excellence</h3>
                </div>
                <p style={{ color: '#57647c', fontSize: '15px', lineHeight: 1.65, margin: 0 }}>
                  Le souci du détail fait la différence. Nous poussons chaque création, design et conseil stratégique au niveau le plus exigeant.
                </p>
              </div>

              <div style={{ background: '#ffffff', padding: '32px 26px', borderRadius: '16px', borderLeft: '5px solid #fd8604', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                  <Sparkles size={28} style={{ color: '#fd8604' }} />
                  <h3 className="font-artistic" style={{ fontSize: '22px', color: '#004C99', margin: 0 }}>Créativité</h3>
                </div>
                <p style={{ color: '#57647c', fontSize: '15px', lineHeight: 1.65, margin: 0 }}>
                  Concevoir des identités visuelles et conceptuelles audacieuses, originales et décalées qui captivent l'attention.
                </p>
              </div>

              <div style={{ background: '#ffffff', padding: '32px 26px', borderRadius: '16px', borderLeft: '5px solid #004C99', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                  <Target size={28} style={{ color: '#004C99' }} />
                  <h3 className="font-artistic" style={{ fontSize: '22px', color: '#004C99', margin: 0 }}>Performance</h3>
                </div>
                <p style={{ color: '#57647c', fontSize: '15px', lineHeight: 1.65, margin: 0 }}>
                  Chaque projet doit générer un impact mesurable, renforcer votre notoriété et produire un retour sur investissement concret.
                </p>
              </div>
            </div>
          </div>

          {/* CTA BANNER */}
          <div style={{
            textAlign: 'center',
            background: 'linear-gradient(135deg, #00254d 0%, #004C99 100%)',
            color: '#ffffff',
            padding: '50px 30px',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0, 76, 153, 0.25)'
          }}>
            <h2 className="font-artistic" style={{ color: '#ffffff', fontSize: '32px', marginBottom: '15px' }}>
              Vous souhaitez faire passer votre marque au niveau supérieur ?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '25px', maxWidth: '600px', margin: '0 auto 25px', fontSize: '16px' }}>
              Rencontrez nos experts en stratégie et branding à Cotonou ou organisez une visio dès aujourd'hui.
            </p>
            <Link to="/contact">
              <CommonButton variant="orange">
                Prendre rendez-vous (+229 01 66 28 50 17) <ArrowRight size={18} />
              </CommonButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
