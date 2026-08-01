import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Eye, EyeOff, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { CommonButton } from '../../components/common/CommonButton';
import { ImageUploader } from '../../components/common/ImageUploader';
import { Modal } from '../../components/common/Modal';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { Toast } from '../../components/common/Toast';
import { api, type Blog } from '../../services/api';

const CATEGORIES = ['STRATEGY', 'BRANDING', 'DIGITAL', 'GROWTH', 'CONTENT', 'ADVERTISING'];

const emptyForm = {
  title: '',
  category: 'BRANDING',
  excerpt: '',
  content: '',
  author: 'Équipe LUCIDE LAB',
  image_url: '',
  is_published: false,
};

type FormData = typeof emptyForm;

export const AdminBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<{isOpen: boolean, id: number|null, title: string}>({ isOpen: false, id: null, title: '' });

  // ── Fetch ─────────────────────────────────────────────────────────────────
  const fetchBlogs = async () => {
    setLoading(true);
    const data = await api.adminGetBlogs();
    setBlogs(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ── Notify ────────────────────────────────────────────────────────────────
  const notify = (msg: string, isError = false) => {
    if (isError) { setError(msg); setSuccess(null); }
    else { setSuccess(msg); setError(null); }
  };

  // ── Form handlers ─────────────────────────────────────────────────────────
  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (b: Blog) => {
    setForm({
      title: b.title,
      category: b.category,
      excerpt: b.excerpt,
      content: b.content,
      author: b.author ?? 'Équipe LUCIDE LAB',
      image_url: b.image_url ?? '',
      is_published: b.is_published ?? false,
    });
    setEditingId(b.id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (editingId) {
      const res = await api.updateBlog(editingId, { ...form, is_published: Boolean(form.is_published) });
      if (res.success) {
        notify('✅ Article mis à jour avec succès !');
        closeForm();
        fetchBlogs();
      } else {
        notify(res.message ?? 'Erreur lors de la mise à jour.', true);
      }
    } else {
      const res = await api.createBlog({ ...form, is_published: Boolean(form.is_published) });
      if (res.success) {
        notify('✅ Article créé ! Il sera visible dès sa publication.');
        closeForm();
        fetchBlogs();
      } else {
        notify(res.message ?? "Erreur lors de la création.", true);
      }
    }
    setSaving(false);
  };

  const requestDelete = (id: number, title: string) => {
    setDeleteConfirm({ isOpen: true, id, title });
  };

  const handleConfirmDelete = async () => {
    const id = deleteConfirm.id;
    if (!id) return;
    const res = await api.deleteBlog(id);
    if (res.success) {
      notify('Article supprimé définitivement.');
      setBlogs(blogs.filter((b) => b.id !== id));
    } else {
      notify(res.message ?? 'Erreur lors de la suppression.', true);
    }
  };

  const togglePublish = async (b: Blog) => {
    const res = await api.updateBlog(b.id, { is_published: !b.is_published });
    if (res.success) {
      notify(b.is_published ? 'Article dépublié (brouillon).' : '✅ Article publié sur le site !');
      setBlogs(blogs.map((x) => (x.id === b.id ? { ...x, is_published: !x.is_published } : x)));
    } else {
      notify('Erreur lors du changement de statut.', true);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h2 style={{ fontSize: '24px', color: '#011a41' }}>Gestion des Blogs & Articles</h2>
          <p style={{ color: '#57647c', fontSize: '14px' }}>Rédigez et publiez vos articles. Les articles publiés apparaissent automatiquement sur le site.</p>
        </div>
        <CommonButton variant="orange" onClick={openAdd}>
          <Plus size={16} /> Nouvel Article
        </CommonButton>
      </div>

      {/* Notifications */}
      <Toast 
        message={success || error} 
        type={error ? 'error' : 'success'} 
        onClose={() => { setSuccess(null); setError(null); }} 
      />

      {/* Form Panel Modal */}
      <Modal 
        isOpen={showForm} 
        onClose={closeForm} 
        title={editingId ? '✏️ Modifier l\'Article' : '➕ Créer un Nouvel Article'}
        maxWidth="900px"
      >

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
              {/* Title */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Titre de l'Article *</label>
                <input type="text" className="form-control" required
                  value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Ex. : Comment construire une identité de marque forte ?" />
              </div>

              {/* Category */}
              <div className="form-group">
                <label>Catégorie *</label>
                <select className="form-control" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Author */}
              <div className="form-group">
                <label>Auteur</label>
                <input type="text" className="form-control"
                  value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })}
                  placeholder="Équipe LUCIDE LAB" />
              </div>

              {/* Excerpt */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Résumé / Extrait * <span style={{ color: '#57647c', fontWeight: '400' }}>(affiché dans la liste)</span></label>
                <textarea className="form-control" required rows={2}
                  value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="Une courte description percutante de l'article (2-3 phrases max)..." />
              </div>

              {/* Content */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Contenu Complet *</label>
                <textarea className="form-control" required rows={8}
                  value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Rédigez votre article ici. Utilisez des sauts de ligne pour séparer les paragraphes..." />
              </div>

              {/* Image Upload / URL */}
              <div style={{ gridColumn: '1 / -1' }}>
                <ImageUploader
                  value={form.image_url}
                  onChange={(url) => setForm({ ...form, image_url: url })}
                  label="Image de Couverture de l'Article"
                />
              </div>

              {/* Published */}
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input type="checkbox" id="is_published"
                  checked={form.is_published}
                  onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                <label htmlFor="is_published" style={{ cursor: 'pointer', fontWeight: '600', color: '#0122bc' }}>
                  Publier immédiatement sur le site
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <CommonButton type="submit" variant="orange" disabled={saving}>
                {saving ? <><Loader2 size={16} /> Enregistrement...</> : (editingId ? 'Mettre à Jour' : 'Créer l\'Article')}
              </CommonButton>
              <CommonButton type="button" variant="dark" onClick={closeForm}>Annuler</CommonButton>
            </div>
          </form>
      </Modal>

      {/* Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#57647c' }}>
          <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: '12px' }}>Chargement des articles...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Couverture</th>
                <th>Titre de l'Article</th>
                <th>Catégorie</th>
                <th>Auteur</th>
                <th>Vues</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#57647c' }}>
                    Aucun article pour l'instant. Cliquez sur "Nouvel Article" pour commencer.
                  </td>
                </tr>
              ) : (
                blogs.map((b) => (
                  <tr key={b.id}>
                    <td>
                      {b.image_url ? (
                        <img src={b.image_url} alt={b.title}
                          style={{ width: '60px', height: '42px', objectFit: 'cover', borderRadius: '6px' }}
                          onError={(e) => { (e.target as HTMLImageElement).src = ''; (e.target as HTMLImageElement).style.display = 'none'; }} />
                      ) : (
                        <div style={{ width: '60px', height: '42px', background: 'linear-gradient(135deg, #0122bc, #fd8604)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ color: '#fff', fontSize: '10px', fontWeight: '700' }}>{b.category.slice(0, 3)}</span>
                        </div>
                      )}
                    </td>
                    <td style={{ maxWidth: '260px' }}>
                      <strong style={{ color: '#011a41', fontSize: '14px', display: 'block', marginBottom: '3px' }}>{b.title}</strong>
                      <span style={{ color: '#57647c', fontSize: '12px' }}>{b.excerpt?.slice(0, 70)}...</span>
                    </td>
                    <td>
                      <span style={{ background: '#f4f7fc', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: '#0122bc' }}>
                        {b.category}
                      </span>
                    </td>
                    <td style={{ color: '#57647c', fontSize: '13px' }}>{b.author ?? '—'}</td>
                    <td style={{ color: '#57647c', fontSize: '13px' }}>{(b.views_count ?? 0).toLocaleString()}</td>
                    <td>
                      <button onClick={() => togglePublish(b)} title={b.is_published ? 'Dépublier' : 'Publier'}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '6px',
                          background: b.is_published ? 'rgba(22,163,74,0.1)' : 'rgba(156,163,175,0.2)',
                          border: 'none', cursor: 'pointer', borderRadius: '20px',
                          padding: '5px 12px', fontSize: '12px', fontWeight: '700',
                          color: b.is_published ? '#15803d' : '#57647c'
                        }}>
                        {b.is_published ? <><Eye size={13} /> Publié</> : <><EyeOff size={13} /> Brouillon</>}
                      </button>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => openEdit(b)} title="Modifier"
                          style={{ background: 'rgba(1,34,188,0.08)', border: 'none', cursor: 'pointer', color: '#0122bc', borderRadius: '6px', padding: '6px 8px' }}>
                          <Edit size={16} />
                        </button>
                        <button onClick={() => requestDelete(b.id, b.title)} title="Supprimer"
                          style={{ background: 'rgba(251,36,72,0.08)', border: 'none', cursor: 'pointer', color: '#fb2448', borderRadius: '6px', padding: '6px 8px' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ ...deleteConfirm, isOpen: false })}
        onConfirm={handleConfirmDelete}
        title="Supprimer l'article ?"
        message={`Êtes-vous sûr de vouloir supprimer définitivement l'article "${deleteConfirm.title}" ? Cette action est irréversible.`}
        confirmText="Oui, supprimer"
      />
    </div>
  );
};
