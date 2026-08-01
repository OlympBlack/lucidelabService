import React, { useState, useEffect } from 'react';
import { Image, Loader2, AlertCircle } from 'lucide-react';
import { api, type Realisation } from '../../services/api';

const PLACEHOLDER_IMAGE = (category: string) =>
  `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="220"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%230122bc"/><stop offset="1" stop-color="%23fd8604"/></linearGradient></defs><rect width="400" height="220" fill="url(%23g)"/><text x="50%25" y="46%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="28" font-family="sans-serif" font-weight="bold">${encodeURIComponent(category)}</text><text x="50%25" y="62%25" dominant-baseline="middle" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="14" font-family="sans-serif">LUCIDE LAB</text></svg>`;

export const Realisations: React.FC = () => {
  const [projects, setProjects] = useState<Realisation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await api.getRealisations();
      if (data) {
        setProjects(data);
      } else {
        setError(true);
      }
      setLoading(false);
    };
    load();
  }, []);

  // Compute unique categories from actual data
  const categories = ['ALL', ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = filter === 'ALL' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="ptb-100">
      <div className="container">
        <div className="section-title">
          <span className="sub-title">Portfolio</span>
          <h2>Découvrez Nos Réalisations</h2>
          <p>Des cas clients concrets illustrant le savoir-faire et l'impact de LUCIDE LAB.</p>
        </div>

        {/* Error State */}
        {error && (
          <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '12px', padding: '20px', textAlign: 'center', marginBottom: '30px', color: '#991b1b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <AlertCircle size={20} />
            Impossible de charger les réalisations. Vérifiez que le serveur est démarré.
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#57647c' }}>
            <Loader2 size={36} style={{ animation: 'spin 1s linear infinite', color: '#0122bc' }} />
            <p style={{ marginTop: '16px', fontWeight: '500' }}>Chargement du portfolio...</p>
          </div>
        ) : (
          <>
            {/* Filter Tabs */}
            {!error && (
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
                {categories.map((cat) => (
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
                    }}>
                    {cat === 'ALL' ? 'Tous les projets' : cat}
                  </button>
                ))}
              </div>
            )}

            {/* Projects Grid */}
            {filtered.length === 0 && !error ? (
              <div style={{ textAlign: 'center', padding: '60px', color: '#57647c' }}>
                <Image size={40} style={{ color: '#c0c9d8', marginBottom: '12px' }} />
                <p>Aucun projet dans cette catégorie pour l'instant.</p>
              </div>
            ) : (
              <div className="grid-3">
                {filtered.map((p) => (
                  <div key={p.id} className="portfolio-card">
                    <div className="portfolio-img-wrapper">
                      <img
                        src={p.image_url || PLACEHOLDER_IMAGE(p.category)}
                        alt={p.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE(p.category);
                        }}
                      />
                    </div>
                    <div className="portfolio-body">
                      <span className="portfolio-tag">{p.category}{p.year ? ` • ${p.year}` : ''}</span>
                      <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#0122bc' }}>{p.title}</h3>
                      {p.client_name && (
                        <p style={{ color: '#fd8604', fontWeight: '600', fontSize: '13px', marginBottom: '10px' }}>
                          Client : {p.client_name}
                        </p>
                      )}
                      <p style={{ color: '#57647c', fontSize: '14px', margin: 0 }}>
                        {p.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
