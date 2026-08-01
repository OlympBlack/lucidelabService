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
      year: '2025'
    },
    {
      id: 2,
      title: 'Plateforme E-Commerce Agro-business',
      category: 'DIGITAL',
      client: 'AgroTech Bénin',
      description: 'Conception web responsive et système de commande en ligne sécurisé pour des produits agricoles locaux.',
      year: '2025'
    },
    {
      id: 3,
      title: 'Campagne de Lancement Growth Meta & Google',
      category: 'GROWTH',
      client: 'Startup Logistique',
      description: 'Stratégie d\'acquisition d\'utilisateurs ayant permis d\'augmenter les demandes de livraison de +180% en 3 mois.',
      year: '2026'
    },
    {
      id: 4,
      title: 'Série Vidéo & Storytelling d\'Entreprise',
      category: 'CONTENT',
      client: 'Groupe Immobilier',
      description: 'Production audiovisuelle haute définition mettant en valeur les projets architecturaux phares de la marque.',
      year: '2025'
    },
    {
      id: 5,
      title: 'Campagne Publicitaire Pan-Africaine',
      category: 'ADVERTISING',
      client: 'Compagnie d\'Assurance',
      description: 'Achat média multi-canal (Affichage urbain + Digital) déployé au Bénin, Togo et Côte d\'Ivoire.',
      year: '2026'
    },
    {
      id: 6,
      title: 'Conseil en Positionnement Strategic',
      category: 'STRATEGY',
      client: 'Institution de Microfinance',
      description: 'Définition d\'une stratégie 360° pour conquérir une nouvelle cible de jeunes entrepreneurs.',
      year: '2025'
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
                border: '1px solid #011a41',
                background: filter === cat ? '#011a41' : 'transparent',
                color: filter === cat ? '#ffffff' : '#011a41',
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

        {/* Projects Grid */}
        <div className="grid-3">
          {filteredProjects.map((p) => (
            <div key={p.id} className="portfolio-card">
              <div style={{
                height: '180px',
                background: 'linear-gradient(135deg, #011a41 0%, #0e3e78 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '22px'
              }}>
                {p.category}
              </div>
              <div className="portfolio-body">
                <span className="portfolio-tag">{p.category} • {p.year}</span>
                <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>{p.title}</h3>
                <p style={{ color: '#e93c05', fontWeight: '600', fontSize: '13px', marginBottom: '12px' }}>
                  Client: {p.client}
                </p>
                <p style={{ color: '#57647c', fontSize: '14px', marginBottom: '20px' }}>
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
