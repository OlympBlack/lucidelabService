import React, { useState } from 'react';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const articles = [
    {
      id: 1,
      slug: 'comment-construire-une-identite-de-marque-forte-en-2026',
      title: 'Comment construire une identité de marque forte et mémorable en 2026 ?',
      excerpt: 'Le branding ne se limite pas à un beau logo. Découvrez les 5 étapes clés pour créer une marque crédible qui capte l\'attention de votre cible.',
      date: '15 Juillet 2026',
      author: 'Équipe LUCIDE LAB',
      category: 'BRANDING'
    },
    {
      id: 2,
      slug: 'les-cles-d-une-strategie-growth-reussie-en-afrique-de-l-ouest',
      title: 'Les clés d\'une stratégie de Growth Hacking réussie en Afrique de l\'Ouest',
      excerpt: 'Comprendre les spécificités des consommateurs régionaux pour maximiser le taux de conversion de vos campagnes digitales.',
      date: '28 Juin 2026',
      author: 'Expert Digital',
      category: 'GROWTH'
    },
    {
      id: 3,
      slug: 'pourquoi-la-lucidite-est-la-cle-du-positionnement-strategique',
      title: 'Pourquoi la lucidité est la clé de voûte de tout positionnement d\'entreprise',
      excerpt: 'Une analyse sans concession de vos forces et du marché est la seule manière d\'éviter les erreurs coûteuses de communication.',
      date: '10 Juin 2026',
      author: 'Directeur Stratégie',
      category: 'STRATEGY'
    }
  ];

  const filteredArticles = articles.filter(a =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ptb-100">
      <div className="container">
        <div className="section-title">
          <span className="sub-title">Blog & Actualités</span>
          <h2>Conseils, Stratégie & Branding</h2>
          <p>Explorez nos analyses et guides pratiques pour développer votre marque.</p>
        </div>

        {/* Search Bar */}
        <div style={{ maxWidth: '500px', margin: '0 auto 40px', position: 'relative' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher un article ou un thème..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '45px', borderRadius: '25px', height: '50px' }}
          />
          <Search size={20} style={{ position: 'absolute', left: '15px', top: '15px', color: '#57647c' }} />
        </div>

        {/* Articles Grid */}
        <div className="grid-3">
          {filteredArticles.map((article) => (
            <div key={article.id} className="portfolio-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                height: '160px',
                background: 'linear-gradient(135deg, #011a41 0%, #e93c05 100%)',
                padding: '20px',
                display: 'flex',
                alignItems: 'flex-end'
              }}>
                <span style={{ background: '#fff', color: '#011a41', fontWeight: 'bold', padding: '4px 12px', borderRadius: '12px', fontSize: '12px' }}>
                  {article.category}
                </span>
              </div>
              <div className="portfolio-body" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '15px', color: '#57647c', fontSize: '12px', marginBottom: '10px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={13} /> {article.date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><User size={13} /> {article.author}</span>
                </div>

                <h3 style={{ fontSize: '18px', marginBottom: '12px', color: '#011a41' }}>{article.title}</h3>
                <p style={{ color: '#57647c', fontSize: '14px', marginBottom: '20px', flexGrow: 1 }}>{article.excerpt}</p>

                <Link
                  to={`/blog/${article.slug}`}
                  style={{ color: '#e93c05', fontWeight: '700', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  Lire la suite <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const BlogDetail: React.FC = () => {
  return (
    <div className="ptb-100">
      <div className="container" style={{ maxWidth: '800px' }}>
        <span style={{ background: 'rgba(233, 60, 5, 0.1)', color: '#e93c05', fontWeight: 'bold', padding: '4px 12px', borderRadius: '12px', fontSize: '13px' }}>
          BRANDING
        </span>
        <h1 style={{ fontSize: '36px', marginTop: '15px', marginBottom: '20px' }}>
          Comment construire une identité de marque forte et mémorable en 2026 ?
        </h1>

        <div style={{ display: 'flex', gap: '20px', color: '#57647c', fontSize: '14px', marginBottom: '30px', borderBottom: '1px solid #e5e9f2', paddingBottom: '15px' }}>
          <span>Par <strong>Équipe LUCIDE LAB</strong></span>
          <span>•</span>
          <span>15 Juillet 2026</span>
          <span>•</span>
          <span>Lecture 5 min</span>
        </div>

        <div style={{ fontSize: '16px', lineHeight: '1.8', color: '#011f4c' }}>
          <p style={{ marginBottom: '20px' }}>
            Sur un marché de plus en plus saturé, l'image de marque (branding) constitue le premier levier de différenciation stratégique pour toute entreprise ambitieuse. Une marque forte ne se résume pas uniquement à un logo élégant ou une typographie tendance : elle incarne une promesse de valeur, une personnalité et une identité cohérente perçue à chaque point de contact.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>1. La Lucidité : Connaître sa valeur et sa cible</h3>
          <p style={{ marginBottom: '20px' }}>
            Avant de concevoir le moindre élément visuel, il est indispensable de poser un diagnostic lucide. Qui sont vos clients idéaux ? Quels sont leurs besoins profonds ? En quoi votre proposition se distingue-t-elle radicalement de vos concurrents directes ?
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>2. L'Excellence du Design & du Storytelling</h3>
          <p style={{ marginBottom: '20px' }}>
            La cohérence visuelle bâtit la confiance. Des guidelines claires pour le logo, la palette de couleurs, le choix des polices et le style des images créent une perception de professionnalisme incontestable dès la première seconde.
          </p>

          <div style={{ background: '#f4f7fc', padding: '25px', borderRadius: '12px', borderLeft: '4px solid #e93c05', margin: '30px 0' }}>
            <p style={{ fontStyle: 'italic', fontWeight: '600', color: '#011a41', margin: 0 }}>
              "Le détail fait la différence. Chaque interaction client renforce ou affaiblit la perception de votre marque."
            </p>
          </div>

          <h3 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>3. Mesurer et Faire Évoluer</h3>
          <p style={{ marginBottom: '20px' }}>
            La performance de marque s'évalue à travers la notoriété, le taux de conversion et la fidélité de vos clients. Chez LUCIDE LAB, nous accompagnons les entreprises dans ce pilotage continu.
          </p>
        </div>

        <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid #e5e9f2' }}>
          <Link to="/blog">
            <button className="common-btn btn-dark">← Retour aux articles</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
