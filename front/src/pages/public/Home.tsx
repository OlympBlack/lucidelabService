import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  PenTool,
  TrendingUp,
  Megaphone,
  Brain,
  Printer,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Send,
  User,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';
import { api, resolveImageUrl, type Realisation } from '../../services/api';
import { SectionNavigation } from '../../components/layout/SectionNavigation';
import { TestimonialsCarousel } from '../../components/common/TestimonialsCarousel';
import { CommonButton } from '../../components/common/CommonButton';

export const Home: React.FC = () => {
  const [apiRealisations, setApiRealisations] = useState<Realisation[]>([]);

  // Hero Background Carousel
  const heroImages = useMemo(() => [
    '/assets/images/painture_popup.jpg',
    '/assets/images/hero_beaute.jpg',
    '/assets/images/hero_beaut2.jpg'
  ], []);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Split-screen Carousel state for Réalisations
  const [realisationIndex, setRealisationIndex] = useState(0);

  const realisationsCategories = [
    {
      title: "Nos Maquettes étiquettes et kakemono",
      description: "Design de packaging, étiquettes autocollantes et supports de PLV.",
      mockups: [
        { title: "Étiquettes Produits", image: "/assets/images/painture_popup.jpg" },
        { title: "Kakemono & Roll-up", image: "/assets/images/hero3.jpg" },
        { title: "Packaging Premium", image: "/assets/images/hero2.png" },
        { title: "Badges & Supports", image: "/assets/images/hero1.jpg" }
      ]
    },
    {
      title: "Branding & Identité Visuelle",
      description: "Charte graphique complète, logos originaux et univers de marque.",
      mockups: [
        { title: "Charte Graphique", image: "/assets/images/hero2.png" },
        { title: "Logo & Symboles", image: "/assets/images/logo.png" },
        { title: "Papeterie & Cartes", image: "/assets/images/painture_popup.jpg" },
        { title: "Guide de Marque", image: "/assets/images/hero3.jpg" }
      ]
    },
    {
      title: "Campagnes Digitales & Print",
      description: "Affiches grand format, flyers haut de gamme et stratégie média.",
      mockups: [
        { title: "Affiches & Bannières", image: "/assets/images/hero3.jpg" },
        { title: "Catalogue & Brochures", image: "/assets/images/painture_popup.jpg" },
        { title: "Visuels Social Media", image: "/assets/images/hero1.jpg" },
        { title: "Média d'Affichage", image: "/assets/images/hero2.png" }
      ]
    }
  ];

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formSent, setFormSent] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    api.getRealisations().then((data) => {
      if (data && data.length > 0) setApiRealisations(data);
    });
  }, []);

  const displayedCategories = useMemo(() => {
    if (apiRealisations && apiRealisations.length > 0) {
      const grouped: Record<string, Realisation[]> = {};
      apiRealisations.forEach((p) => {
        const cat = p.category || 'BRANDS';
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(p);
      });

      const fallbackMockups = [
        { title: "Stratégie & Direction", image: "/assets/images/hero1.jpg" },
        { title: "Packaging & Identité", image: "/assets/images/hero2.png" },
        { title: "Campagnes & Visuals", image: "/assets/images/hero3.jpg" },
        { title: "Création & Design Art", image: "/assets/images/painture_popup.jpg" },
      ];

      return Object.keys(grouped).map((catName) => {
        const categoryItems = grouped[catName];
        let mockups = categoryItems.map((item) => ({
          title: item.title,
          image: resolveImageUrl(item.image_url, item.category),
          client: item.client_name
        }));

        // Guarantee 4 cards in the 2x2 grid
        if (mockups.length < 4) {
          const otherItems = apiRealisations.filter(p => p.category !== catName);
          let extraIndex = 0;
          while (mockups.length < 4) {
            if (extraIndex < otherItems.length) {
              const extraItem = otherItems[extraIndex];
              mockups.push({
                title: extraItem.title,
                image: resolveImageUrl(extraItem.image_url, extraItem.category),
                client: extraItem.client_name
              });
            } else {
              const fallback = fallbackMockups[mockups.length % fallbackMockups.length];
              mockups.push(fallback);
            }
            extraIndex++;
          }
        }

        return {
          title: `Pôle ${catName}`,
          description: `Créations et projets récents de notre cabinet dans le pôle ${catName}.`,
          mockups: mockups.slice(0, 4)
        };
      });
    }
    return realisationsCategories;
  }, [apiRealisations, realisationsCategories]);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setRealisationIndex((prev) => (prev + 1) % displayedCategories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [displayedCategories.length]);

  const handleNextRealisation = () => {
    setRealisationIndex((prev) => (prev + 1) % displayedCategories.length);
  };

  const handlePrevRealisation = () => {
    setRealisationIndex((prev) => (prev === 0 ? displayedCategories.length - 1 : prev - 1));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await api.sendContact({
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        service: 'Contact Général',
        message: contactMessage
      });
      setFormSent(true);
      setTimeout(() => setFormSent(false), 3500);
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactMessage('');
    } catch {
      setFormSent(true);
    } finally {
      setFormLoading(false);
    }
  };

  const testimonials = [
    {
      name: 'Marc Lawson',
      role: 'Directeur Général, FinTech Bénin',
      comment: "LUCIDE LAB a totalement métamorphosé notre image de marque. Leur approche rigoureuse et créative nous a permis de capter l'attention de grands investisseurs.",
      rating: 5,
      avatar: '/assets/images/testimonials/testimonial1.webp'
    },
    {
      name: 'Sophie Tossou',
      role: 'Fondatrice, AgroTech Solutions',
      comment: "L'équipe a su capter l'essence même de notre vision et créer une identité visuelle remarquable accompagnée d'une stratégie digitale performante.",
      rating: 5,
      avatar: '/assets/images/testimonials/testimonial2.webp'
    },
    {
      name: 'Koffi Mensah',
      role: 'Directeur Marketing, Groupe Immobilier',
      comment: "Excellence et esthétique au rendez-vous. Les visuels et supports de communication produits par LUCIDE LAB sont d'une beauté à couper le souffle.",
      rating: 5,
      avatar: '/assets/images/testimonials/testimonial3.webp'
    }
  ];

  return (
    <div>
      {/* Vertical Navigation Controls */}
      <SectionNavigation />

      {/* SECTION 1: HERO STORYTELLING (Fixed Parallax Background & Text Scroll-over) */}
      <section className="storytelling-section" id="hero" style={{ position: 'relative', width: '100%', minHeight: '120vh' }}>
        {/* Sticky Fixed Background */}
        <div style={{ position: 'sticky', top: 0, height: '100vh', marginBottom: '-100vh', overflow: 'hidden', zIndex: 1 }}>
          {heroImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Fond Hero ${idx + 1}`}
              className="storytelling-bg-img"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: idx === heroIndex ? 1 : 0,
                transition: 'opacity 1.4s ease-in-out, transform 7s ease-out',
                transform: idx === heroIndex ? 'scale(1.05)' : 'scale(1.0)'
              }}
            />
          ))}
          <div className="storytelling-overlay" style={{ background: 'rgba(0,0,0,0.55)', position: 'absolute', inset: 0, zIndex: 1 }} />
        </div>

        {/* Content scrolling over the fixed background */}
        <div className="storytelling-content" style={{ position: 'relative', zIndex: 2, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '60px 20px 60px 20px', boxSizing: 'border-box' }}>
          <div style={{ textAlign: 'center', color: '#ffffff', maxWidth: '900px' }}>
            {/* Logo central */}
            <div style={{ marginBottom: '25px' }}>
              <img
                src="/assets/images/logo.png"
                alt="LUCIDE LAB Logo"
                style={{ maxHeight: '115px', width: 'auto', margin: '0 auto', filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.6))' }}
              />
            </div>

            {/* Heading */}
            <h1 className="font-artistic" style={{
              fontSize: '48px',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '20px',
              textShadow: '0 4px 20px rgba(0,0,0,0.7)',
              lineHeight: 1.25
            }}>
              Notre Mission ?
            </h1>

            {/* Subtitle */}
            <p className="font-body-art" style={{
              fontSize: '22px',
              fontWeight: 600,
              color: '#f3f4f6',
              lineHeight: 1.6,
              textShadow: '0 2px 12px rgba(0,0,0,0.8)',
              maxWidth: '780px',
              margin: '0 auto 35px auto'
            }}>
              Vous aider à rêver, rendre viables vos rêves et faire d'eux des échos !
            </p>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact">
                <CommonButton variant="orange">
                  Discuter de votre projet <ArrowRight size={18} />
                </CommonButton>
              </Link>
              <Link to="/services">
                <CommonButton variant="outline" style={{ color: '#ffffff', borderColor: '#ffffff' }}>
                  Découvrir nos services
                </CommonButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: QUI SOMMES-NOUS ? (STORYTELLING PARALLAX) */}
      <section className="storytelling-section" id="about">
        <div className="storytelling-bg-sticky">
          <img
            src="/assets/images/painture_popup.jpg"
            alt="Pots de peinture créatifs"
            className="storytelling-bg-img"
          />
          <div className="storytelling-overlay" style={{ background: 'rgba(0,0,0,0.55)' }} />
        </div>

        <div className="storytelling-content">
          <div className="frosted-glass-card">
            <h2 className="frosted-card-title">Qui sommes-nous ?</h2>

            <div style={{ margin: '20px 0 15px' }}>
              <img
                src="/assets/images/logo.png"
                alt="LUCIDE LAB Logo"
                style={{ maxHeight: '65px', width: 'auto', margin: '0 auto' }}
              />
            </div>

            <p className="frosted-card-subtitle">
              Nous sommes l'échO de vos rêves, de vos projets, de votre succès.
            </p>

            <p className="frosted-card-text">
              Flexibles, originaux et relativement décalés, nous sommes l'agence avec le brin de créativité qu'il vous manquait. Si vous avez des doutes, un entretien avec notre équipe dissipera à coup sûr ces derniers.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: NOS SERVICES (STORYTELLING PARALLAX) */}
      <section className="storytelling-section" id="services">
        <div className="storytelling-bg-sticky">
          <img
            src="/assets/images/painture_popup.jpg"
            alt="Pots de peinture créatifs Services"
            className="storytelling-bg-img"
          />
          <div className="storytelling-overlay" style={{ background: 'rgba(0,0,0,0.58)' }} />
        </div>

        <div className="storytelling-content">
          <div className="frosted-glass-card" style={{ maxWidth: '980px' }}>
            <h2 className="frosted-card-title" style={{ marginBottom: '6px' }}>Nos Services</h2>
            <p className="frosted-card-subtitle" style={{ marginBottom: '25px' }}>
              Idées lumineuses, résultats brillants
            </p>

            {/* 6 Grid items matching reference styling */}
            <div className="artistic-services-grid">
              <Link to="/services" className="artistic-service-item">
                <Globe className="artistic-service-icon" />
                <span className="artistic-service-label">wOb</span>
              </Link>

              <Link to="/services" className="artistic-service-item">
                <PenTool className="artistic-service-icon" />
                <span className="artistic-service-label">éditiOn</span>
              </Link>

              <Link to="/services" className="artistic-service-item">
                <TrendingUp className="artistic-service-icon" />
                <span className="artistic-service-label">marcOting</span>
              </Link>

              <Link to="/services" className="artistic-service-item">
                <Megaphone className="artistic-service-icon" />
                <span className="artistic-service-label">cOmmunication digitale</span>
              </Link>

              <Link to="/services" className="artistic-service-item">
                <Brain className="artistic-service-icon" />
                <span className="artistic-service-label">cOncepciTé</span>
              </Link>

              <Link to="/services" className="artistic-service-item">
                <Printer className="artistic-service-icon" />
                <span className="artistic-service-label">impressiOn</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: NOS RÉALISATIONS (STORYTELLING SPLIT SCREEN) */}
      <section className="storytelling-section" id="realisations">
        <div className="storytelling-bg-sticky">
          <img
            src="/assets/images/realisation.jpg"
            alt="Réalisations LUCIDE LAB"
            className="storytelling-bg-img"
          />
          <div className="storytelling-overlay" style={{ background: 'rgba(0,0,0,0.45)' }} />
        </div>

        <div className="storytelling-content" style={{ padding: 0 }}>
          <div className="split-screen-section">
            {/* Left Column (50%): Realisation background & Title */}
            <div className="split-screen-left" style={{ backgroundImage: 'url(/assets/images/realisation.jpg)' }}>
              <div className="split-screen-left-overlay" />

              <div className="split-screen-left-content">
                <h2 className="font-artistic" style={{ fontSize: '38px', fontWeight: 700, marginBottom: '14px', color: '#ffffff', textShadow: '0 2px 14px rgba(0,0,0,0.9)' }}>
                  Nos Réalisations
                </h2>
                <p className="font-body-art" style={{ fontSize: '18px', fontStyle: 'italic', color: '#ffffff', opacity: 1, marginBottom: '30px', textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>
                  Une matérialisation de nos bonnes idées
                </p>

                {/* Slider Arrows */}
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                  <button
                    onClick={handlePrevRealisation}
                    style={{
                      background: 'rgba(0,0,0,0.6)',
                      border: '1px solid rgba(255,255,255,0.4)',
                      color: '#fff',
                      borderRadius: '50%',
                      width: '42px',
                      height: '42px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: '0.2s'
                    }}
                    aria-label="Réalisation précédente"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={handleNextRealisation}
                    style={{
                      background: 'rgba(0,0,0,0.6)',
                      border: '1px solid rgba(255,255,255,0.4)',
                      color: '#fff',
                      borderRadius: '50%',
                      width: '42px',
                      height: '42px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: '0.2s'
                    }}
                    aria-label="Réalisation suivante"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column (50%): Dynamic Mockup Display */}
            <div className="split-screen-right">
              {displayedCategories.length > 0 && (
                <>
                  <h3 className="font-artistic" style={{ fontSize: '28px', color: '#111827', margin: '0 0 8px 0', textAlign: 'center' }}>
                    {displayedCategories[realisationIndex % displayedCategories.length].title}
                  </h3>
                  <p className="font-body-art" style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 20px 0', textAlign: 'center' }}>
                    {displayedCategories[realisationIndex % displayedCategories.length].description}
                  </p>

                  <div className="realisations-grid-mockup">
                    {displayedCategories[realisationIndex % displayedCategories.length].mockups.map((m, idx) => (
                      <div key={idx} className="realisation-mockup-card">
                        <img
                          src={resolveImageUrl(m.image)}
                          alt={m.title}
                          className="realisation-mockup-img"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = resolveImageUrl('');
                          }}
                        />
                        <div style={{ padding: '10px 12px', textAlign: 'center', fontSize: '13px', fontWeight: 600, color: '#374151', fontFamily: "'Amaranth', sans-serif" }}>
                          {m.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div style={{ marginTop: '25px' }}>
                <Link to="/realisations" style={{ textDecoration: 'none' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#000000',
                    fontWeight: 700,
                    fontFamily: "'Amaranth', sans-serif",
                    fontSize: '16px'
                  }}>
                    Voir l'ensemble du portfolio <ArrowRight size={18} color="#fd8604" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: TÉMOIGNAGES & PARTENAIRES (STORYTELLING PARALLAX) */}
      <section className="storytelling-section" id="testimonials">
        <div className="storytelling-bg-sticky">
          <img
            src="/assets/images/font_confiance.jpg"
            alt="Fond Ils nous font confiance"
            className="storytelling-bg-img"
          />
          <div className="storytelling-overlay" style={{ background: 'rgba(0,0,0,0.65)' }} />
        </div>

        <div className="storytelling-content">
          <div className="frosted-glass-card" style={{ maxWidth: '940px' }}>
            <h2 className="frosted-card-title">Ils nous font confiance</h2>
            <p className="frosted-card-subtitle" style={{ marginBottom: '30px' }}>
              Des retours d'expérience authentiques sur l'impact de nos créations
            </p>

            <TestimonialsCarousel items={testimonials} />
          </div>
        </div>
      </section>

      {/* SECTION 6: CONTACT & PRISE DE RENDEZ-VOUS */}
      <section className="ptb-100" style={{
        backgroundImage: 'linear-gradient(rgba(13, 13, 17, 0.82), rgba(13, 13, 17, 0.88)), url(/assets/images/contact.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
        zIndex: 3
      }} id="contact">
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '750px',
          width: '90%',
          margin: '0 auto',
          color: '#ffffff',
          textAlign: 'center'
        }}>
          <h2 className="font-artistic" style={{ fontSize: '36px', color: '#ffffff', marginBottom: '10px' }}>
            Donnons vie à vos projets d'exception.
          </h2>
          <p className="font-body-art" style={{ fontSize: '16px', color: '#a1a1aa', marginBottom: '35px' }}>
            Un entretien avec notre équipe créative dissipera à coup sûr vos doutes.
          </p>

          {formSent ? (
            <div style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid #10b981',
              padding: '25px',
              borderRadius: '6px',
              color: '#10b981',
              fontSize: '18px',
              fontWeight: 600,
              fontFamily: "'Amaranth', sans-serif"
            }}>
              Merci ! Votre message a été transmis avec succès. Nous vous recontacterons très rapidement.
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '14px', top: '15px', color: '#6b7280' }} />
                  <input
                    type="text"
                    placeholder="Votre Nom"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '13px 14px 13px 44px',
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '4px',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '14px', top: '15px', color: '#6b7280' }} />
                  <input
                    type="email"
                    placeholder="Votre Email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '13px 14px 13px 44px',
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '4px',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <Phone size={18} style={{ position: 'absolute', left: '14px', top: '15px', color: '#6b7280' }} />
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '13px 14px 13px 44px',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '4px',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ position: 'relative' }}>
                <MessageSquare size={18} style={{ position: 'absolute', left: '14px', top: '15px', color: '#6b7280' }} />
                <textarea
                  placeholder="Parlez-nous de votre projet..."
                  rows={3}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '13px 14px 13px 44px',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '4px',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'none'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={formLoading}
                style={{
                  padding: '15px',
                  background: '#fd8604',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: 700,
                  fontFamily: "'Amaranth', sans-serif",
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  transition: 'background 0.2s'
                }}
              >
                {formLoading ? 'Envoi en cours...' : 'Envoyer mon projet'}
                {!formLoading && <Send size={18} />}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
