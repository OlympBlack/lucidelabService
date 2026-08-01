import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CommonButton } from '../../components/common/CommonButton';
import {
  Compass,
  Palette,
  Globe,
  TrendingUp,
  FileText,
  Megaphone,
  CheckCircle,
  Eye,
  Award,
  Sparkles,
  Target,
  ArrowRight,
  ShieldCheck,
  Building,
  Building2,
  Star,
  Quote
} from 'lucide-react';
import { api } from '../../services/api';

export const Home: React.FC = () => {
  const [apiServices, setApiServices] = useState<any[]>([]);

  useEffect(() => {
    api.getServices().then((data) => {
      if (data && data.length > 0) {
        setApiServices(data);
      }
    });
  }, []);

  const defaultServices = [
    {
      icon: <Compass size={32} style={{ color: '#fd8604' }} />,
      title: 'STRATEGY',
      subtitle: 'Définir la bonne direction',
      description: 'Analyse approfondie du marché, positionnement stratégique et plan de communication sur-mesure pour atteindre vos objectifs d\'affaires.'
    },
    {
      icon: <Palette size={32} style={{ color: '#fd8604' }} />,
      title: 'BRAND',
      subtitle: 'Construire une identité forte',
      description: 'Création de marque, charte graphique, branding émotionnel et design système pour marquer durablement les esprits.'
    },
    {
      icon: <Globe size={32} style={{ color: '#fd8604' }} />,
      title: 'DIGITAL',
      subtitle: 'Créer des expériences numériques',
      description: 'Sites web modernes, applications interactives et plateformes digitales conçues pour la conversion et l\'engagement.'
    },
    {
      icon: <TrendingUp size={32} style={{ color: '#fd8604' }} />,
      title: 'GROWTH',
      subtitle: 'Développer la visibilité',
      description: 'Stratégies d\'acquisition, SEO, marketing de performance et optimisation continue pour accélérer votre croissance.'
    },
    {
      icon: <FileText size={32} style={{ color: '#fd8604' }} />,
      title: 'CONTENT',
      subtitle: 'Créer du contenu qui marque',
      description: 'Storytelling puissant, création de contenus vidéo/audio, rédaction stratégique et gestion de communauté.'
    },
    {
      icon: <Megaphone size={32} style={{ color: '#fd8604' }} />,
      title: 'ADVERTISING',
      subtitle: 'Faire connaître les marques',
      description: 'Campagnes publicitaires ciblées, achat média digital & traditionnel, et maximisation du retour sur investissement.'
    }
  ];

  const getIconForCode = (code: string) => {
    switch (code) {
      case 'STRATEGY': return <Compass size={32} style={{ color: '#fd8604' }} />;
      case 'BRAND': return <Palette size={32} style={{ color: '#fd8604' }} />;
      case 'DIGITAL': return <Globe size={32} style={{ color: '#fd8604' }} />;
      case 'GROWTH': return <TrendingUp size={32} style={{ color: '#fd8604' }} />;
      case 'CONTENT': return <FileText size={32} style={{ color: '#fd8604' }} />;
      case 'ADVERTISING': return <Megaphone size={32} style={{ color: '#fd8604' }} />;
      default: return <Compass size={32} style={{ color: '#fd8604' }} />;
    }
  };

  const servicesToDisplay = apiServices.length > 0
    ? apiServices.map(s => ({
        icon: getIconForCode(s.code),
        title: s.code,
        subtitle: s.subtitle || s.title,
        description: s.description
      }))
    : defaultServices;

  const values = [
    {
      icon: <Eye size={28} style={{ color: '#fd8604' }} />,
      name: 'Lucidité',
      desc: 'Chaque décision repose sur une analyse claire et rigoureuse de la réalité de votre marché.'
    },
    {
      icon: <Award size={28} style={{ color: '#fd8604' }} />,
      name: 'Excellence',
      desc: 'Le détail fait la différence. Nous recherchons la perfection visuelle et stratégique dans chaque livrable.'
    },
    {
      icon: <Sparkles size={28} style={{ color: '#fd8604' }} />,
      name: 'Créativité',
      desc: 'Créer des expériences originales qui captivent l\'attention et marquent les esprits durablement.'
    },
    {
      icon: <Target size={28} style={{ color: '#fd8604' }} />,
      name: 'Performance',
      desc: 'Chaque projet et campagne doit produire un impact mesurable et générateur de valeur pour votre entreprise.'
    }
  ];

  const realisations = [
    {
      title: 'Repositionnement Global de Marque FinTech',
      category: 'Brand & Strategy',
      desc: 'Refonte complète de l\'identité visuelle et stratégie d\'acquisition pour une institution financière.'
    },
    {
      title: 'Plateforme E-commerce & Expansion Digital',
      category: 'Digital & Growth',
      desc: 'Développement d\'une plateforme web moderne et campagne d\'acquisition clients multi-canal.'
    },
    {
      title: 'Campagne de Lancement Produit Agro-alimentaire',
      category: 'Content & Advertising',
      desc: 'Création de contenus vidéos et campagnes ciblées en Afrique de l\'Ouest.'
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

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-area">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              
              <h1>Construisez une image de marque forte et performante.</h1>
              <p>
                <strong>LUCIDE LAB</strong> accompagne les entreprises ambitieuses à structurer leur stratégie, sublimer leur branding et accélérer leur croissance en Afrique de l'Ouest.
              </p>
              <div className="hero-btns">
                <Link to="/contact">
                  <CommonButton variant="orange">
                    Discuter de votre projet <ArrowRight size={18} />
                  </CommonButton>
                </Link>
                <Link to="/services">
                  <CommonButton variant="outline">
                    Découvrir nos services
                  </CommonButton>
                </Link>
              </div>
            </div>

            <div className="hero-card-preview">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <ShieldCheck size={36} style={{ color: '#fd8604' }} />
                <div>
                  <h3 style={{ color: '#ffffff', fontSize: '20px' }}>Notre Engagement</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>Clarté — Impact — Crédibilité</p>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '15px', marginBottom: '20px' }}>
                "Nous aidons les marques à se démarquer et à convertir leur vision en résultats tangibles."
              </p>
              <div style={{ display: 'flex', gap: '20px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '15px' }}>
                <div>
                  <h4 style={{ color: '#38ef7d', fontSize: '24px' }}>100%</h4>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>Engagement qualité</p>
                </div>
                <div>
                  <h4 style={{ color: '#38ef7d', fontSize: '24px' }}>6+</h4>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>Pôles d'expertise</p>
                </div>
                <div>
                  <h4 style={{ color: '#38ef7d', fontSize: '24px' }}>Bénin & Sub-région</h4>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>Rayonnement régional</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="ptb-100" style={{ background: '#f4f7fc' }}>
        <div className="container">
          <div className="section-title">
            <span className="sub-title">Nos Pôles d'Expertise</span>
            <h2>Des solutions adaptées à votre croissance</h2>
            <p>Une approche intégrée combinant stratégie globale, création visuelle et levier numérique.</p>
          </div>

          <div className="grid-3">
            {servicesToDisplay.map((item, idx) => (
              <div key={idx} className="service-card">
                <div className="service-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <span style={{ color: '#fd8604', fontWeight: '600', fontSize: '13px', display: 'block', marginBottom: '10px' }}>
                  {item.subtitle}
                </span>
                <p>{item.description}</p>
                <Link to="/services" style={{ color: '#0122bc', fontWeight: '700', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  En savoir plus <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Summary / Mission & Vision */}
      <section className="ptb-100">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'center' }}>
            <div>
              <span className="sub-title" style={{ color: '#fd8604', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase' }}>
                Qui sommes-nous ?
              </span>
              <h2 style={{ fontSize: '36px', marginTop: '10px', marginBottom: '20px' }}>
                Accompagner les entreprises qui exigent la crédibilité.
              </h2>
              <p style={{ color: '#57647c', marginBottom: '20px', fontSize: '16px', lineHeight: '1.7' }}>
                <strong>LUCIDE LAB</strong> est un cabinet d'expertise en communication et croissance de marque basé au Bénin. Notre mission est d'aider les entreprises ambitieuses à construire une image de marque cohérente, crédible et performante.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={20} style={{ color: '#fd8604' }} />
                  <span style={{ fontWeight: '600', color: '#0122bc' }}>Stratégies claires et orientées résultats.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={20} style={{ color: '#fd8604' }} />
                  <span style={{ fontWeight: '600', color: '#0122bc' }}>Design & Branding haut de gamme.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={20} style={{ color: '#fd8604' }} />
                  <span style={{ fontWeight: '600', color: '#0122bc' }}>Accompagnement continu et suivi de performance.</span>
                </div>
              </div>
              <Link to="/a-propos">
                <CommonButton variant="dark">
                  Découvrir notre histoire <ArrowRight size={16} />
                </CommonButton>
              </Link>
            </div>

            {/* Vision & Mission Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div style={{ background: '#0122bc', color: '#fff', padding: '30px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <Target size={24} style={{ color: '#fd8604' }} />
                  <h3 style={{ color: '#fff', fontSize: '22px' }}>Notre Mission</h3>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '15px' }}>
                  Aider les entreprises ambitieuses à construire une image de marque cohérente, crédible et performante.
                </p>
              </div>

              <div style={{ background: '#f4f7fc', border: '1px solid #e5e9f2', padding: '30px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <Building size={24} style={{ color: '#fd8604' }} />
                  <h3 style={{ color: '#0122bc', fontSize: '22px' }}>Notre Vision</h3>
                </div>
                <p style={{ color: '#57647c', fontSize: '15px' }}>
                  Devenir le cabinet de référence en communication et stratégie de marque au Bénin, puis rayonner à l'échelle de l'Afrique de l'Ouest francophone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="ptb-100" style={{ background: '#f4f7fc' }}>
        <div className="container">
          <div className="section-title">
            <span className="sub-title">Ce qui nous anime</span>
            <h2>Nos Valeurs Cardinales</h2>
            <p>Ces 4 piliers guident chacune de nos réalisations et recommandations clients.</p>
          </div>

          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className="value-card">
                <div style={{ marginBottom: '15px' }}>{v.icon}</div>
                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{v.name}</h3>
                <p style={{ color: '#57647c', fontSize: '14px' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Realisations Showcase */}
      <section className="ptb-100">
        <div className="container">
          <div className="section-title">
            <span className="sub-title">Port-folio</span>
            <h2>Nos Réalisations Récentes</h2>
            <p>Aperçu de projets accompagnés avec succès par LUCIDE LAB.</p>
          </div>

          <div className="grid-3">
            {realisations.map((item, idx) => (
              <div key={idx} className="portfolio-card">
                <div className="portfolio-body">
                  <span className="portfolio-tag">{item.category}</span>
                  <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{item.title}</h3>
                  <p style={{ color: '#57647c', fontSize: '14px' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/realisations">
              <CommonButton variant="blue">
                Voir tous nos projets <ArrowRight size={16} />
              </CommonButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Testimonials Section (Ils Nous Font Confiance) */}
      <section className="ptb-100" style={{ background: '#f4f7fc' }}>
        <div className="container">
          <div className="section-title">
            <span className="sub-title">Ils nous font confiance</span>
            <h2>Secteurs d'Activité & Témoignages Clients</h2>
            <p>Des entreprises et institutions d'Afrique de l'Ouest qui s'appuient sur l'expertise de LUCIDE LAB.</p>
          </div>

          {/* Partners Categories */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '50px' }}>
            {partners.map((p, idx) => (
              <div key={idx} style={{
                background: '#ffffff',
                border: '1px solid #e5e9f2',
                borderRadius: '12px',
                padding: '22px 15px',
                textAlign: 'center',
                fontWeight: '700',
                color: '#0122bc',
                fontSize: '15px',
                boxShadow: '0 4px 12px rgba(1, 34, 188, 0.05)'
              }}>
                <Building2 size={24} style={{ color: '#fd8604', marginBottom: '8px' }} />
                <div>{p}</div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid-3">
            {testimonials.map((t, idx) => (
              <div key={idx} style={{
                background: '#ffffff',
                border: '1px solid #e5e9f2',
                borderRadius: '16px',
                padding: '32px 24px',
                boxShadow: '0 4px 15px rgba(1, 34, 188, 0.06)',
                position: 'relative'
              }}>
                <Quote size={32} style={{ color: 'rgba(253, 134, 4, 0.2)', position: 'absolute', top: '20px', right: '20px' }} />
                
                <div style={{ display: 'flex', gap: '4px', marginBottom: '15px' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#ffc107" color="#ffc107" />
                  ))}
                </div>

                <p style={{ color: '#1e293b', fontStyle: 'italic', fontSize: '15px', marginBottom: '22px', lineHeight: '1.7' }}>
                  "{t.comment}"
                </p>

                <div>
                  <h4 style={{ fontSize: '16px', color: '#0122bc', marginBottom: '2px' }}>{t.name}</h4>
                  <p style={{ color: '#fd8604', fontSize: '13px', fontWeight: '600', margin: 0 }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action section */}
      <section className="ptb-100" style={{ background: 'linear-gradient(135deg, #0122bc 0%, #011785 100%)', color: '#fff', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: '#fff', fontSize: '38px', marginBottom: '15px' }}>Prêt à propulser l'image de votre entreprise ?</h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', maxWidth: '700px', margin: '0 auto 30px' }}>
            Contactez les experts de LUCIDE LAB dès aujourd'hui pour bénéficier d'un diagnostic et d'une proposition stratégique sur-mesure.
          </p>
          <Link to="/contact">
            <CommonButton variant="orange" style={{ padding: '15px 35px', fontSize: '16px' }}>
              Prendre contact (0166285017) <ArrowRight size={18} />
            </CommonButton>
          </Link>
        </div>
      </section>
    </div>
  );
};
