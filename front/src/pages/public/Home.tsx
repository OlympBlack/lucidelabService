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
  Building,
  Building2,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { api, type Realisation } from '../../services/api';

export const Home: React.FC = () => {
  const [apiServices, setApiServices] = useState<any[]>([]);
  const [apiRealisations, setApiRealisations] = useState<Realisation[]>([]);

  // Hero Slider setup: hero1.jpg, hero2.png, hero3.jpg
  const heroImages = [
    { src: '/assets/images/hero1.jpg', alt: 'LUCIDE LAB Stratégie et Branding' },
    { src: '/assets/images/hero2.png', alt: 'LUCIDE LAB Création et Digital' },
    { src: '/assets/images/hero3.jpg', alt: 'LUCIDE LAB Croissance et Performance' },
  ];

  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const nextHero = () => {
    setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevHero = () => {
    setCurrentHeroIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    api.getServices().then((data) => {
      if (data && data.length > 0) setApiServices(data);
    });
    api.getRealisations().then((data) => {
      if (data && data.length > 0) setApiRealisations(data);
    });
  }, []);

  const defaultServices = [
    {
      icon: <Compass size={26} style={{ color: '#fd8604' }} />,
      title: 'STRATEGY',
      subtitle: 'Définir la bonne direction',
      description: 'Analyse approfondie du marché, positionnement stratégique et plan de communication sur-mesure pour atteindre vos objectifs d\'affaires.'
    },
    {
      icon: <Palette size={26} style={{ color: '#fd8604' }} />,
      title: 'BRAND',
      subtitle: 'Construire une identité forte',
      description: 'Création de marque, charte graphique, branding émotionnel et design système pour marquer durablement les esprits.'
    },
    {
      icon: <Globe size={26} style={{ color: '#fd8604' }} />,
      title: 'DIGITAL',
      subtitle: 'Créer des expériences numériques',
      description: 'Sites web modernes, applications interactives et plateformes digitales conçues pour la conversion et l\'engagement.'
    },
    {
      icon: <TrendingUp size={26} style={{ color: '#fd8604' }} />,
      title: 'GROWTH',
      subtitle: 'Développer la visibilité',
      description: 'Stratégies d\'acquisition, SEO, marketing de performance et optimisation continue pour accélérer votre croissance.'
    },
    {
      icon: <FileText size={26} style={{ color: '#fd8604' }} />,
      title: 'CONTENT',
      subtitle: 'Créer du contenu qui marque',
      description: 'Storytelling puissant, création de contenus vidéo/audio, rédaction stratégique et gestion de communauté.'
    },
    {
      icon: <Megaphone size={26} style={{ color: '#fd8604' }} />,
      title: 'ADVERTISING',
      subtitle: 'Faire connaître les marques',
      description: 'Campagnes publicitaires ciblées, achat média digital & traditionnel, et maximisation du retour sur investissement.'
    }
  ];

  const getIconForCode = (code: string) => {
    switch (code) {
      case 'STRATEGY': return <Compass size={26} style={{ color: '#fd8604' }} />;
      case 'BRAND': return <Palette size={26} style={{ color: '#fd8604' }} />;
      case 'DIGITAL': return <Globe size={26} style={{ color: '#fd8604' }} />;
      case 'GROWTH': return <TrendingUp size={26} style={{ color: '#fd8604' }} />;
      case 'CONTENT': return <FileText size={26} style={{ color: '#fd8604' }} />;
      case 'ADVERTISING': return <Megaphone size={26} style={{ color: '#fd8604' }} />;
      default: return <Compass size={26} style={{ color: '#fd8604' }} />;
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

  // Dynamic realisations from API: featured first, then latest, up to 3
  const realisations = apiRealisations.length > 0
    ? [
        ...apiRealisations.filter((r) => r.is_featured),
        ...apiRealisations.filter((r) => !r.is_featured)
      ].slice(0, 3)
    : [];

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

            {/* Right side: Slightly compact 3-Image Slider */}
            <div className="hero-slider-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '480px',
                  height: '370px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: '0 16px 36px rgba(0,0,0,0.28)',
                  background: 'rgba(255, 255, 255, 0.05)'
                }}
              >
                {heroImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.src}
                    alt={img.alt}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: idx === currentHeroIndex ? 1 : 0,
                      transition: 'opacity 0.7s ease-in-out',
                      pointerEvents: idx === currentHeroIndex ? 'auto' : 'none'
                    }}
                  />
                ))}

                {/* Manual Previous Navigation Button */}
                <button
                  onClick={prevHero}
                  aria-label="Image précédente"
                  style={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(1, 34, 188, 0.75)',
                    backdropFilter: 'blur(6px)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
                  }}
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Manual Next Navigation Button */}
                <button
                  onClick={nextHero}
                  aria-label="Image suivante"
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(1, 34, 188, 0.75)',
                    backdropFilter: 'blur(6px)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
                  }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Slider Pagination Dots */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                {heroImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentHeroIndex(idx)}
                    aria-label={`Vue ${idx + 1}`}
                    style={{
                      width: idx === currentHeroIndex ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      background: idx === currentHeroIndex ? '#fd8604' : 'rgba(255, 255, 255, 0.4)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - 4 Cards on 1 Line with Bottom CTA */}
      <section className="ptb-100" style={{ background: '#f4f7fc' }}>
        <div className="container">
          <div className="section-title">
            <span className="sub-title">Nos Pôles d'Expertise</span>
            <h2>Des solutions adaptées à votre croissance</h2>
            <p>Une approche intégrée combinant stratégie globale, création visuelle et levier numérique.</p>
          </div>

          <div className="grid-4">
            {servicesToDisplay.slice(0, 4).map((item, idx) => (
              <div key={idx} className="service-card">
                <div className="service-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <span style={{ color: '#fd8604', fontWeight: '600', fontSize: '13px', display: 'block', marginBottom: '8px' }}>
                  {item.subtitle}
                </span>
                <p>{item.description}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '35px' }}>
            <Link to="/services">
              <CommonButton variant="blue">
                Voir tous nos pôles d'expertise <ArrowRight size={16} />
              </CommonButton>
            </Link>
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

      {/* Realisations Showcase with Project Visual Images */}
      <section className="ptb-100">
        <div className="container">
          <div className="section-title">
            <span className="sub-title">Port-folio</span>
            <h2>Nos Réalisations Récentes</h2>
            <p>Aperçu de projets accompagnés avec succès par LUCIDE LAB.</p>
          </div>

          <div className="grid-3">
            {realisations.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#57647c' }}>
                Les réalisations seront affichées ici dès qu'elles seront ajoutées depuis l'administration.
              </div>
            ) : realisations.map((item) => (
              <div key={item.id} className="portfolio-card">
                <div className="portfolio-img-wrapper">
                  <img
                    src={item.image_url || `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="220"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%230122bc"/><stop offset="1" stop-color="%23fd8604"/></linearGradient></defs><rect width="400" height="220" fill="url(%23g)"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="22" font-family="sans-serif" font-weight="bold">${encodeURIComponent(item.category)}</text></svg>`}
                    alt={item.title}
                    onError={(e) => { (e.target as HTMLImageElement).src = '/assets/images/hero1.jpg'; }}
                  />
                </div>
                <div className="portfolio-body">
                  <span className="portfolio-tag">{item.category}{item.year ? ` • ${item.year}` : ''}</span>
                  <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#0122bc' }}>{item.title}</h3>
                  {item.client_name && (
                    <p style={{ color: '#fd8604', fontWeight: '600', fontSize: '13px', marginBottom: '8px' }}>
                      Client : {item.client_name}
                    </p>
                  )}
                  <p style={{ color: '#57647c', fontSize: '14px' }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>


          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/realisations">
              <CommonButton variant="blue">
                Voir plus de projets <ArrowRight size={16} />
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
