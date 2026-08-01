import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, ArrowRight, Eye, Loader2, AlertCircle, Image } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { api, type Blog as BlogType } from '../../services/api';

const PLACEHOLDER_GRADIENT = 'linear-gradient(135deg, #0122bc 0%, #fd8604 100%)';

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
    <div className="ptb-100">
      <div className="container">
        <div className="section-title">
          <span className="sub-title">Blog & Actualités</span>
          <h2>Conseils, Stratégie & Branding</h2>
          <p>Explorez nos analyses et guides pratiques pour développer votre marque.</p>
        </div>

        {/* Search */}
        <div style={{ maxWidth: '360px', margin: '-10px auto 36px', position: 'relative' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher un article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              paddingLeft: '38px',
              paddingRight: '14px',
              borderRadius: '18px',
              height: '36px',
              fontSize: '13px',
              border: '2px solid #0122bc',
              boxShadow: '0 2px 12px rgba(1,34,188,0.10)',
              background: '#f4f7fc',
              color: '#011a41',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <Search
            size={15}
            style={{
              position: 'absolute',
              left: '13px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#0122bc',
              pointerEvents: 'none',
            }}
          />
        </div>




        {/* Error */}
        {error && (
          <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '12px', padding: '20px', textAlign: 'center', marginBottom: '30px', color: '#991b1b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <AlertCircle size={20} /> Impossible de charger les articles. Vérifiez que le serveur est démarré.
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#57647c' }}>
            <Loader2 size={36} style={{ animation: 'spin 1s linear infinite', color: '#0122bc' }} />
            <p style={{ marginTop: '16px', fontWeight: '500' }}>Chargement des articles...</p>
          </div>
        ) : filtered.length === 0 && !error ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#57647c' }}>
            <Image size={40} style={{ color: '#c0c9d8', marginBottom: '12px' }} />
            <p>{searchTerm ? 'Aucun article ne correspond à votre recherche.' : 'Aucun article publié pour l\'instant.'}</p>
          </div>
        ) : (
          <div className="grid-3">
            {filtered.map((article) => (
              <div key={article.id} className="portfolio-card" style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Cover Image */}
                {article.image_url ? (
                  <div className="portfolio-img-wrapper" style={{ height: '180px' }}>
                    <img src={article.image_url} alt={article.title}
                      onError={(e) => {
                        const wrapper = (e.target as HTMLImageElement).parentElement;
                        if (wrapper) wrapper.style.background = PLACEHOLDER_GRADIENT;
                        (e.target as HTMLImageElement).style.display = 'none';
                      }} />
                  </div>
                ) : (
                  <div style={{
                    height: '180px',
                    background: PLACEHOLDER_GRADIENT,
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'flex-end',
                    borderRadius: '12px 12px 0 0'
                  }}>
                    <span style={{ background: '#fff', color: '#0122bc', fontWeight: 'bold', padding: '4px 12px', borderRadius: '12px', fontSize: '12px' }}>
                      {article.category}
                    </span>
                  </div>
                )}

                <div className="portfolio-body" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  {article.image_url && (
                    <span style={{ background: 'rgba(1,34,188,0.08)', color: '#0122bc', fontWeight: 'bold', padding: '3px 10px', borderRadius: '10px', fontSize: '12px', display: 'inline-block', marginBottom: '10px', width: 'fit-content' }}>
                      {article.category}
                    </span>
                  )}

                  <div style={{ display: 'flex', gap: '15px', color: '#57647c', fontSize: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} />
                      {article.created_at ? new Date(article.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <User size={13} /> {article.author ?? 'LUCIDE LAB'}
                    </span>
                    {(article.views_count ?? 0) > 0 && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Eye size={13} /> {article.views_count?.toLocaleString()} vues
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '17px', marginBottom: '12px', color: '#011a41', lineHeight: '1.4' }}>{article.title}</h3>
                  <p style={{ color: '#57647c', fontSize: '14px', marginBottom: '20px', flexGrow: 1, lineHeight: '1.6' }}>{article.excerpt}</p>

                  <Link
                    to={`/blog/${article.slug}`}
                    style={{ color: '#fd8604', fontWeight: '700', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
                    Lire la suite <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
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
      <div className="ptb-100">
        <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
          <Loader2 size={36} style={{ animation: 'spin 1s linear infinite', color: '#0122bc' }} />
          <p style={{ marginTop: '16px', color: '#57647c' }}>Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="ptb-100">
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <AlertCircle size={48} style={{ color: '#fca5a5', marginBottom: '16px' }} />
          <h2 style={{ color: '#011a41' }}>Article introuvable</h2>
          <p style={{ color: '#57647c', marginBottom: '24px' }}>Cet article n'existe pas ou a été supprimé.</p>
          <Link to="/blog">
            <button className="common-btn btn-dark">← Retour aux articles</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="ptb-100">
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Cover image */}
        {article.image_url && (
          <div style={{ borderRadius: '14px', overflow: 'hidden', marginBottom: '30px', height: '320px' }}>
            <img src={article.image_url} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        {/* Category badge */}
        <span style={{
          background: 'rgba(253,134,4,0.12)',
          color: '#fd8604',
          fontWeight: 'bold',
          padding: '5px 14px',
          borderRadius: '12px',
          fontSize: '13px'
        }}>
          {article.category}
        </span>

        <h1 style={{ fontSize: '32px', marginTop: '16px', marginBottom: '20px', color: '#011a41', lineHeight: '1.3' }}>
          {article.title}
        </h1>

        {/* Meta */}
        <div style={{ display: 'flex', gap: '20px', color: '#57647c', fontSize: '14px', marginBottom: '30px', borderBottom: '1px solid #e5e9f2', paddingBottom: '15px', flexWrap: 'wrap' }}>
          <span>Par <strong>{article.author ?? 'LUCIDE LAB'}</strong></span>
          <span>•</span>
          <span>
            {article.created_at
              ? new Date(article.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
              : '—'}
          </span>
          {(article.views_count ?? 0) > 0 && (
            <>
              <span>•</span>
              <span>{article.views_count?.toLocaleString()} vues</span>
            </>
          )}
        </div>

        {/* Content */}
        <div style={{ fontSize: '16px', lineHeight: '1.85', color: '#1e293b' }}>
          {article.content.split('\n').map((para, i) =>
            para.trim() ? (
              <p key={i} style={{ marginBottom: '18px' }}>{para}</p>
            ) : null
          )}
        </div>

        {/* Back button */}
        <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid #e5e9f2' }}>
          <Link to="/blog">
            <button className="common-btn btn-dark">← Retour aux articles</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
