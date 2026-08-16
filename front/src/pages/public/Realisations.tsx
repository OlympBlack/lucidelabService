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
      {/* STORYTELLING HEADER */}
      <section style={{
        position: 'relative',
        minHeight: '60vh',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.65)), url(/assets/images/realisation.jpg)',
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
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '18px'
          }}>
            <span style={{ display: 'block', width: '40px', height: '1px', background: '#fd8604', opacity: 0.9 }} />
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#fd8604',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontFamily: 'Raleway, sans-serif'
            }}>Portfolio & Cas Clients</span>
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

      {/* PORTFOLIO CONTENT */}
      <div className="ptb-100" style={{ background: '#f4f7fc' }}>
        <div className="container">
          {error && (
            <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '12px', padding: '20px', textAlign: 'center', marginBottom: '30px', color: '#991b1b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <AlertCircle size={20} />
              Impossible de charger les réalisations. Vérifiez le serveur backend.
            </div>
          )}

          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#57647c' }}>
              <Loader2 size={36} style={{ animation: 'spin 1s linear infinite', color: '#004C99' }} />
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
                        border: filter === cat ? '2px solid #004C99' : '1px solid #d1d5db',
                        background: filter === cat ? '#004C99' : '#ffffff',
                        color: filter === cat ? '#ffffff' : '#004C99',
                        fontWeight: '700',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        boxShadow: filter === cat ? '0 6px 16px rgba(0, 76, 153, 0.2)' : 'none'
                      }}
                    >
                      {cat === 'ALL' ? 'Tous les projets' : `Pôle ${cat}`}
                    </button>
                  ))}
                </div>
              )}

              {/* PROJECTS GRID */}
              {filtered.length === 0 && !error ? (
                <div style={{ textAlign: 'center', padding: '60px', color: '#57647c' }}>
                  <Image size={40} style={{ color: '#c0c9d8', marginBottom: '12px' }} />
                  <p>Aucun projet disponible dans cette catégorie pour le moment.</p>
                </div>
              ) : (
                <div className="grid-3" style={{ gap: '30px' }}>
                  {filtered.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedProject(p)}
                      style={{
                        background: '#ffffff',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 10px 30px rgba(0, 76, 153, 0.08)',
                        border: '1px solid #e5e9f2',
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
                          position: 'absolute', inset: 0, background: 'rgba(0, 76, 153, 0.4)', opacity: 0, transition: 'opacity 0.3s ease',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
                        }}>
                          <Eye size={32} />
                        </div>
                      </div>

                      <div style={{ padding: '24px 22px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <span style={{ background: 'rgba(0, 76, 153, 0.08)', color: '#004C99', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}>
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

          {/* CTA BANNER */}
          <div style={{
            marginTop: '80px',
            background: 'linear-gradient(135deg, #00254d 0%, #004C99 100%)',
            borderRadius: '20px',
            padding: '50px 30px',
            color: '#ffffff',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0, 76, 153, 0.25)'
          }}>
            <h2 className="font-artistic" style={{ fontSize: '32px', color: '#ffffff', marginBottom: '12px' }}>
              Inspiré par nos réalisations ?
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)', maxWidth: '650px', margin: '0 auto 25px' }}>
              Faites de votre marque la prochaine étude de cas à succès signée LUCIDE LAB.
            </p>
            <Link to="/contact">
              <CommonButton variant="orange">
                Démarrer votre projet <ArrowRight size={18} />
              </CommonButton>
            </Link>
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
