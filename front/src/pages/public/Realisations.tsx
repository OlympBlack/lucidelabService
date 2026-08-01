import React, { useState } from 'react';

export const Realisations: React.FC = () => {
  const [filter, setFilter] = useState('ALL');

  const projects = [
    {
      id: 1,
      title: 'Repositionnement Marque Bancaire',
      category: 'BRAND',
      client: 'Groupe Financier Régional',
      description: 'Refonte complète de l\'identité visuelle et déploiement de la nouvelle charte graphique sur l\'ensemble des supports.',
      year: '2025',
      image: '/assets/images/hero1.jpg'
    },
    {
      id: 2,
      title: 'Plateforme E-Commerce Agro-business',
      category: 'DIGITAL',
      client: 'AgroTech Bénin',
      description: 'Conception web responsive et système de commande en ligne sécurisé pour des produits agricoles locaux.',
      year: '2025',
      image: '/assets/images/hero2.png'
    },
    {
      id: 3,
      title: 'Campagne de Lancement Growth Meta & Google',
      category: 'GROWTH',
      client: 'Startup Logistique',
      description: 'Stratégie d\'acquisition d\'utilisateurs ayant permis d\'augmenter les demandes de livraison de +180% en 3 mois.',
      year: '2026',
      image: '/assets/images/hero3.jpg'
    },
    {
      id: 4,
      title: 'Série Vidéo & Storytelling d\'Entreprise',
      category: 'CONTENT',
      client: 'Groupe Immobilier',
      description: 'Production audiovisuelle haute définition mettant en valeur les projets architecturaux phares de la marque.',
      year: '2025',
      image: '/assets/images/hero1.jpg'
    },
    {
      id: 5,
      title: 'Campagne Publicitaire Pan-Africaine',
      category: 'ADVERTISING',
      client: 'Compagnie d\'Assurance',
      description: 'Achat média multi-canal (Affichage urbain + Digital) déployé au Bénin, Togo et Côte d\'Ivoire.',
      year: '2026',
      image: '/assets/images/hero2.png'
    },
    {
      id: 6,
      title: 'Conseil en Positionnement Stratégique',
      category: 'STRATEGY',
      client: 'Institution de Microfinance',
      description: 'Définition d\'une stratégie 360° pour conquérir une nouvelle cible de jeunes entrepreneurs.',
      year: '2025',
      image: '/assets/images/hero3.jpg'
    }
  ];

  const filteredProjects = filter === 'ALL' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="ptb-100">
      <div className="container">
        <div className="section-title">
          <span className="sub-title">Nos Projets</span>
          <h2>Découvrez Nos Réalisations</h2>
          <p>Des cas clients concrets illustrant le savoir-faire et l'impact de LUCIDE LAB.</p>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
          {['ALL', 'STRATEGY', 'BRAND', 'DIGITAL', 'GROWTH', 'CONTENT', 'ADVERTISING'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '10px 20px',
                borderRadius: '20px',
                border: '1px solid #0122bc',
                background: filter === cat ? '#0122bc' : 'transparent',
                color: filter === cat ? '#ffffff' : '#0122bc',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {cat === 'ALL' ? 'Tous les projets' : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid with Visual Images */}
        <div className="grid-3">
          {filteredProjects.map((p) => (
            <div key={p.id} className="portfolio-card">
              <div className="portfolio-img-wrapper">
                <img src={p.image} alt={p.title} />
              </div>
              <div className="portfolio-body">
                <span className="portfolio-tag">{p.category} • {p.year}</span>
                <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#0122bc' }}>{p.title}</h3>
                <p style={{ color: '#fd8604', fontWeight: '600', fontSize: '13px', marginBottom: '10px' }}>
                  Client : {p.client}
                </p>
                <p style={{ color: '#57647c', fontSize: '14px', margin: 0 }}>
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
