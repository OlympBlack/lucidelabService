import React from 'react';
import { Target, Eye, Award, Sparkles, MapPin } from 'lucide-react';
import { CommonButton } from '../../components/common/CommonButton';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  return (
    <div className="ptb-100">
      <div className="container">
        {/* Main Intro */}
        <div className="section-title">
          <span className="sub-title">Qui sommes-nous ?</span>
          <h2>LUCIDE LAB | Cabinet d'Expertise en Communication <br/> et Croissance de Marque</h2>
          <p style={{ maxWidth: '800px', margin: '0 auto' }}>
            Nous offrons de l'expertise en stratégie, branding, digital, growth et contenu pour accompagner les entreprises qui veulent une image de marque crédible et performante.
          </p>
        </div>

        {/* Mission & Vision Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '80px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #011a41 0%, #0e3e78 100%)',
            color: '#ffffff',
            padding: '40px',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(1, 26, 65, 0.15)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(233, 60, 5, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Target size={28} style={{ color: '#e93c05' }} />
              </div>
              <h3 style={{ color: '#ffffff', fontSize: '26px' }}>Notre Mission</h3>
            </div>
            <p style={{ fontSize: '18px', lineHeight: '1.7', color: 'rgba(255,255,255,0.9)' }}>
              Nous aidons les entreprises ambitieuses à construire une image de marque cohérente, crédible et performante.
            </p>
          </div>

          <div style={{
            background: '#ffffff',
            border: '2px solid #e5e9f2',
            padding: '40px',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(14, 62, 120, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={28} style={{ color: '#0e3e78' }} />
              </div>
              <h3 style={{ color: '#011a41', fontSize: '26px' }}>Notre Vision</h3>
            </div>
            <p style={{ fontSize: '18px', lineHeight: '1.7', color: '#57647c' }}>
              Devenir le cabinet de référence en communication et stratégie de marque au Bénin, puis rayonner à l'échelle de l'Afrique de l'Ouest francophone.
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div style={{ marginBottom: '80px' }}>
          <div className="section-title">
            <span className="sub-title">ADN & Piliers</span>
            <h2>Nos Valeurs</h2>
            <p>Les 4 engagements moraux et opérationnels de notre cabinet.</p>
          </div>

          <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            <div style={{ background: '#f4f7fc', padding: '30px', borderRadius: '12px', borderLeft: '5px solid #e93c05' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                <Eye size={28} style={{ color: '#e93c05' }} />
                <h3 style={{ fontSize: '22px' }}>Lucidité</h3>
              </div>
              <p style={{ color: '#57647c', fontSize: '15px' }}>
                Chaque décision repose sur une analyse claire, objective et rigoureuse des faits et du marché.
              </p>
            </div>

            <div style={{ background: '#f4f7fc', padding: '30px', borderRadius: '12px', borderLeft: '5px solid #011a41' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                <Award size={28} style={{ color: '#011a41' }} />
                <h3 style={{ fontSize: '22px' }}>Excellence</h3>
              </div>
              <p style={{ color: '#57647c', fontSize: '15px' }}>
                Le détail fait la différence. Nous poussons chaque création et conseil au niveau le plus exigeant.
              </p>
            </div>

            <div style={{ background: '#f4f7fc', padding: '30px', borderRadius: '12px', borderLeft: '5px solid #fb2448' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                <Sparkles size={28} style={{ color: '#fb2448' }} />
                <h3 style={{ fontSize: '22px' }}>Créativité</h3>
              </div>
              <p style={{ color: '#57647c', fontSize: '15px' }}>
                Créer des expériences visuelles et conceptuelles audacieuses qui captivent et marquent les esprits.
              </p>
            </div>

            <div style={{ background: '#f4f7fc', padding: '30px', borderRadius: '12px', borderLeft: '5px solid #355efc' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                <Target size={28} style={{ color: '#355efc' }} />
                <h3 style={{ fontSize: '22px' }}>Performance</h3>
              </div>
              <p style={{ color: '#57647c', fontSize: '15px' }}>
                Chaque projet doit produire un impact mesurable et générer un retour sur investissement concret.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', background: '#011a41', color: '#fff', padding: '50px 30px', borderRadius: '16px' }}>
          <h2 style={{ color: '#fff', marginBottom: '15px' }}>Vous souhaitez faire passer votre marque au niveau supérieur ?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '25px', maxWidth: '600px', margin: '0 auto 25px' }}>
            Rencontrez nos experts en stratégie et branding à Cotonou ou à distance.
          </p>
          <Link to="/contact">
            <CommonButton variant="orange">
              Prendre rendez-vous (0166285017)
            </CommonButton>
          </Link>
        </div>
      </div>
    </div>
  );
};
