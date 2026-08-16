import React, { useState, useEffect } from 'react';
import { Image, Loader2, AlertCircle, Eye, X, ArrowRight, CheckCircle } from 'lucide-react';
import { api, resolveImageUrl, type Realisation } from '../../services/api';
import { CommonButton } from '../../components/common/CommonButton';
import { Link } from 'react-router-dom';

export const Realisations: React.FC = () => {
  const [projects, setProjects] = useState<Realisation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState<Realisation | null>(null);

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

  const categories = ['ALL', ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = filter === 'ALL' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      {/* HERO + PORTFOLIO — même image en fond continu */}
      <div style={{
        backgroundImage: 'url(/assets/images/realisation.jpg)',
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
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#fd8604', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'Raleway, sans-serif' }}>Portfolio & Cas Clients</span>
              <span style={{ display: 'block', width: '40px', height: '1px', background: '#fd8604', opacity: 0.9 }} />
            </div>
            <h1 className="font-artistic" style={{ fontSize: '46px', fontWeight: 800, color: '#ffffff', marginBottom: '15px' }}>
              Nos Réalisations
            </h1>
            <p className="font-body-art" style={{ fontSize: '18px', color: '#e5e7eb', maxWidth: '750px', margin: '0 auto' }}>
              Une matérialisation concrète de nos stratégies, designs et campagnes d'impact pour nos clients partenaires.
            </p>
          </div>
        </section>

        {/* ── PORTFOLIO — voile semi-transparent, image visible ── */}
        <div style={{ background: 'rgba(0, 10, 30, 0.82)', backdropFilter: 'blur(1px)' }}>
          <div className="ptb-100">
            <div className="container">
              {error && (
                <div style={{ background: 'rgba(254, 226, 226, 0.15)', border: '1px solid rgba(252,165,165,0.4)', borderRadius: '12px', padding: '20px', textAlign: 'center', marginBottom: '30px', color: '#fca5a5', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <AlertCircle size={20} />
                  Impossible de charger les réalisations. Vérifiez le serveur backend.
                </div>
              )}

              {loading ? (
                <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.7)' }}>
                  <Loader2 size={36} style={{ animation: 'spin 1s linear infinite', color: '#fd8604' }} />
                  <p style={{ marginTop: '16px', fontWeight: '500' }}>Chargement du portfolio en cours...</p>
                </div>
              ) : (
                <>
                  {/* FILTER TABS */}
                  {!error && (
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '45px' }}>
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setFilter(cat)}
                          style={{
                            padding: '10px 24px',
                            borderRadius: '30px',
                            border: filter === cat ? '2px solid #fd8604' : '1px solid rgba(255,255,255,0.25)',
                            background: filter === cat ? '#fd8604' : 'rgba(255,255,255,0.08)',
                            color: '#ffffff',
                            fontWeight: '700',
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.25s ease',
                            backdropFilter: 'blur(8px)'
                          }}
                        >
                          {cat === 'ALL' ? 'Tous les projets' : `Pôle ${cat}`}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* PROJECTS GRID */}
                  {filtered.length === 0 && !error ? (
                    <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.6)' }}>
                      <Image size={40} style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '12px' }} />
                      <p>Aucun projet disponible dans cette catégorie pour le moment.</p>
                    </div>
                  ) : (
                    <div className="grid-3" style={{ gap: '30px' }}>
                      {filtered.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => setSelectedProject(p)}
                          style={{
                            background: 'rgba(255, 255, 255, 0.55)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255,255,255,0.6)',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <div style={{ position: 'relative', height: '220px', overflow: 'hidden', background: '#00254d' }}>
                            <img
                              src={resolveImageUrl(p.image_url, p.category)}
                              alt={p.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = resolveImageUrl('', p.category);
                              }}
                            />
                            <div style={{
                              position: 'absolute', inset: 0, background: 'rgba(253, 134, 4, 0.35)', opacity: 0, transition: 'opacity 0.3s ease',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
                            }}>
                              <Eye size={32} />
                            </div>
                          </div>

                          <div style={{ padding: '24px 22px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                              <span style={{ background: 'rgba(253, 134, 4, 0.1)', color: '#fd8604', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}>
                                {p.category}
                              </span>
                              {p.year && <span style={{ fontSize: '12px', color: '#9ca3af' }}>{p.year}</span>}
                            </div>
                            <h3 className="font-artistic" style={{ fontSize: '18px', color: '#004C99', marginBottom: '8px' }}>
                              {p.title}
                            </h3>
                            {p.client_name && (
                              <p style={{ color: '#fd8604', fontWeight: 600, fontSize: '13px', marginBottom: '10px' }}>
                                Client : {p.client_name}
                              </p>
                            )}
                            <p style={{ color: '#57647c', fontSize: '14px', lineHeight: 1.6, margin: 0, flexGrow: 1 }}>
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
        </div>
      </div>

      {/* PROJECT DETAIL MODAL */}
      {selectedProject && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 20, 50, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100000,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            maxWidth: '680px',
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
          }}>
            <button
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(0, 0, 0, 0.5)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 2
              }}
            >
              <X size={20} />
            </button>

            <div style={{ height: '280px', position: 'relative', background: '#00254d' }}>
              <img
                src={resolveImageUrl(selectedProject.image_url, selectedProject.category)}
                alt={selectedProject.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ padding: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <span style={{ background: 'rgba(0, 76, 153, 0.1)', color: '#004C99', padding: '4px 14px', borderRadius: '14px', fontSize: '12px', fontWeight: 700 }}>
                  {selectedProject.category}
                </span>
                {selectedProject.client_name && (
                  <span style={{ color: '#fd8604', fontWeight: 600, fontSize: '13px' }}>
                    Client : {selectedProject.client_name}
                  </span>
                )}
              </div>

              <h2 className="font-artistic" style={{ fontSize: '26px', color: '#004C99', marginBottom: '14px' }}>
                {selectedProject.title}
              </h2>

              <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.7, marginBottom: '25px' }}>
                {selectedProject.description}
              </p>

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                <Link to="/contact" onClick={() => setSelectedProject(null)}>
                  <CommonButton variant="orange">
                    Projet similaire ? Contactez-nous <ArrowRight size={16} />
                  </CommonButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
