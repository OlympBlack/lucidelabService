import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, ArrowRight, Eye, Loader2, AlertCircle, Image, ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { api, type Blog as BlogType } from '../../services/api';
import { CommonButton } from '../../components/common/CommonButton';

const PLACEHOLDER_GRADIENT = 'linear-gradient(135deg, #004C99 0%, #e91e8c 100%)';

// ── Blog List Page ─────────────────────────────────────────────────────────
export const Blog: React.FC = () => {
  const [articles, setArticles] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await api.getBlogs();
      if (data) {
        setArticles(data);
      } else {
        setError(true);
      }
      setLoading(false);
    };
    load();
  }, []);

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (a.author ?? '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* HERO + ARTICLES — même image en fond continu */}
      <div style={{
        backgroundImage: 'url(/assets/images/blog.jpg)',
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
              <span style={{ display: 'block', width: '40px', height: '1px', background: '#e91e8c', opacity: 0.9 }} />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#e91e8c', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'Raleway, sans-serif' }}>Le Mag LUCIDE LAB</span>
              <span style={{ display: 'block', width: '40px', height: '1px', background: '#e91e8c', opacity: 0.9 }} />
            </div>
            <h1 className="font-artistic" style={{ fontSize: '46px', fontWeight: 800, color: '#ffffff', marginBottom: '15px' }}>
              Conseils, Stratégie & Branding
            </h1>
            <p className="font-body-art" style={{ fontSize: '18px', color: '#e5e7eb', maxWidth: '750px', margin: '0 auto 25px' }}>
              Explorez nos analyses, décryptages et guides pratiques pour faire rayonner votre marque.
            </p>

            {/* Search bar */}
            <div style={{ maxWidth: '420px', margin: '0 auto', position: 'relative' }}>
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 20px 14px 44px',
                  borderRadius: '30px',
                  fontSize: '14px',
                  border: 'none',
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#004C99',
                  outline: 'none',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                  boxSizing: 'border-box'
                }}
              />
              <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#004C99', pointerEvents: 'none' }} />
            </div>
          </div>
        </section>

        {/* ── ARTICLES — voile semi-transparent, image visible ── */}
        <div style={{ background: 'rgba(0, 10, 30, 0.82)', backdropFilter: 'blur(1px)' }}>
          <div className="ptb-100">
            <div className="container">
              {error && (
                <div style={{ background: 'rgba(254, 226, 226, 0.15)', border: '1px solid rgba(252,165,165,0.4)', borderRadius: '12px', padding: '20px', textAlign: 'center', marginBottom: '30px', color: '#fca5a5', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <AlertCircle size={20} /> Impossible de charger les articles du blog. Vérifiez le serveur backend.
                </div>
              )}

              {loading ? (
                <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.7)' }}>
                  <Loader2 size={36} style={{ animation: 'spin 1s linear infinite', color: '#e91e8c' }} />
                  <p style={{ marginTop: '16px', fontWeight: '500' }}>Chargement des articles...</p>
                </div>
              ) : filtered.length === 0 && !error ? (
                <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.6)' }}>
                  <Image size={40} style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '12px' }} />
                  <p>{searchTerm ? 'Aucun article ne correspond à votre recherche.' : "Aucun article publié pour l'instant."}</p>
                </div>
              ) : (
                <div className="grid-3" style={{ gap: '30px' }}>
                  {filtered.map((article) => (
                    <div key={article.id} style={{
                      background: '#ffffff',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid #e8ecf4',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.09)',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      {article.image_url ? (
                        <div style={{ height: '200px', overflow: 'hidden', background: '#00254d' }}>
                          <img src={article.image_url} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              const wrapper = (e.target as HTMLImageElement).parentElement;
                              if (wrapper) wrapper.style.background = PLACEHOLDER_GRADIENT;
                              (e.target as HTMLImageElement).style.display = 'none';
                            }} />
                        </div>
                      ) : (
                        <div style={{ height: '200px', background: PLACEHOLDER_GRADIENT, padding: '20px', display: 'flex', alignItems: 'flex-end' }}>
                          <span style={{ background: 'rgba(233,30,140,0.1)', color: '#e91e8c', fontWeight: 700, padding: '4px 12px', borderRadius: '12px', fontSize: '12px' }}>
                            {article.category}
                          </span>
                        </div>
                      )}

                      <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        {article.image_url && (
                          <span style={{ background: 'rgba(233,30,140,0.1)', color: '#e91e8c', fontWeight: 700, padding: '4px 12px', borderRadius: '12px', fontSize: '12px', width: 'fit-content', marginBottom: '12px' }}>
                            {article.category}
                          </span>
                        )}

                        <div style={{ display: 'flex', gap: '15px', color: '#9ca3af', fontSize: '13px', marginBottom: '12px', flexWrap: 'wrap' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Calendar size={14} />
                            {article.created_at ? new Date(article.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <User size={14} /> {article.author ?? 'LUCIDE LAB'}
                          </span>
                        </div>

                        <h3 className="font-artistic" style={{ fontSize: '18px', marginBottom: '12px', color: '#004C99', lineHeight: 1.4 }}>
                          {article.title}
                        </h3>
                        <p style={{ color: '#57647c', fontSize: '14px', marginBottom: '20px', flexGrow: 1, lineHeight: 1.6 }}>
                          {article.excerpt}
                        </p>

                        <Link
                          to={`/blog/${article.slug}`}
                          style={{ color: '#e91e8c', fontWeight: 700, fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
                          Lire l'article complet <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// ── Blog Detail Page ────────────────────────────────────────────────────────
export const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<BlogType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const load = async () => {
      setLoading(true);
      const data = await api.getBlogBySlug(slug);
      if (data) {
        setArticle(data);
      } else {
        setError(true);
      }
      setLoading(false);
    };
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="ptb-100" style={{ background: '#f4f7fc' }}>
        <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
          <Loader2 size={36} style={{ animation: 'spin 1s linear infinite', color: '#004C99' }} />
          <p style={{ marginTop: '16px', color: '#57647c' }}>Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="ptb-100" style={{ background: '#f4f7fc' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <AlertCircle size={48} style={{ color: '#fca5a5', marginBottom: '16px' }} />
          <h2 className="font-artistic" style={{ color: '#004C99' }}>Article introuvable</h2>
          <p style={{ color: '#57647c', marginBottom: '24px' }}>Cet article n'existe pas ou a été déplacé.</p>
          <Link to="/blog">
            <CommonButton variant="orange">
              <ArrowLeft size={16} /> Retour au blog
            </CommonButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER DETAIL */}
      <section style={{
        position: 'relative',
        minHeight: '45vh',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.65)), url(/assets/images/hero3.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 20px 50px 20px',
        color: '#ffffff',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '850px' }}>
          <span style={{
            display: 'inline-block',
            background: '#e91e8c',
            color: '#ffffff',
            padding: '5px 16px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: 700,
            marginBottom: '15px'
          }}>
            {article.category}
          </span>
          <h1 className="font-artistic" style={{ fontSize: '38px', fontWeight: 800, color: '#ffffff', marginBottom: '15px', lineHeight: 1.3 }}>
            {article.title}
          </h1>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', color: 'rgba(255,255,255,0.85)', fontSize: '14px', flexWrap: 'wrap' }}>
            <span>Par <strong>{article.author ?? 'LUCIDE LAB'}</strong></span>
            <span>•</span>
            <span>
              {article.created_at
                ? new Date(article.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
                : '—'}
            </span>
          </div>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <div className="ptb-100" style={{ background: '#f4f7fc' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 10px 30px rgba(0, 76, 153, 0.08)',
            border: '1px solid #e5e9f2'
          }}>
            {article.image_url && (
              <div style={{ borderRadius: '14px', overflow: 'hidden', marginBottom: '35px', height: '360px', background: '#00254d' }}>
                <img src={article.image_url} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}

            <div style={{ fontSize: '17px', lineHeight: 1.85, color: '#374151' }}>
              {article.content.split('\n').map((para, i) =>
                para.trim() ? (
                  <p key={i} style={{ marginBottom: '20px' }}>{para}</p>
                ) : null
              )}
            </div>

            <div style={{ marginTop: '40px', paddingTop: '25px', borderTop: '1px solid #e5e9f2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to="/blog">
                <CommonButton variant="outline" style={{ color: '#004C99', borderColor: '#004C99' }}>
                  <ArrowLeft size={16} /> Tous les articles
                </CommonButton>
              </Link>
              <Link to="/contact">
                <CommonButton variant="orange">
                  Discuter avec nos experts <ArrowRight size={16} />
                </CommonButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
