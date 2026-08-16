import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Loader2, Star } from 'lucide-react';
import { CommonButton } from '../../components/common/CommonButton';
import { ImageUploader } from '../../components/common/ImageUploader';
import { Modal } from '../../components/common/Modal';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { Toast } from '../../components/common/Toast';
import { api, type Realisation } from '../../services/api';

const CATEGORIES = ['STRATEGY', 'BRAND', 'DIGITAL', 'GROWTH', 'CONTENT', 'ADVERTISING'];

const emptyForm = {
  title: '',
  client_name: '',
  category: 'BRAND',
  description: '',
  image_url: '',
  year: new Date().getFullYear().toString(),
  is_featured: false,
};

type FormData = typeof emptyForm;

export const AdminRealisations: React.FC = () => {
  const [projects, setProjects] = useState<Realisation[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<{isOpen: boolean, id: number|null, title: string}>({ isOpen: false, id: null, title: '' });

  // ── Fetch ─────────────────────────────────────────────────────────────────
  const fetchProjects = async () => {
    setLoading(true);
    const data = await api.adminGetRealisations();
    setProjects(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ── Notify helpers ────────────────────────────────────────────────────────
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

  const openEdit = (p: Realisation) => {
    setForm({
      title: p.title,
      client_name: p.client_name,
      category: p.category,
      description: p.description,
      image_url: p.image_url ?? '',
      year: p.year ?? new Date().getFullYear().toString(),
      is_featured: p.is_featured ?? false,
    });
    setEditingId(p.id);
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

    const payload = {
      ...form,
      is_featured: Boolean(form.is_featured),
    };

    if (editingId) {
      const res = await api.updateRealisation(editingId, payload);
      if (res.success) {
        notify('✅ Projet mis à jour avec succès !');
        closeForm();
        fetchProjects();
      } else {
        notify(res.message ?? 'Erreur lors de la mise à jour.', true);
      }
    } else {
      const res = await api.createRealisation(payload);
      if (res.success) {
        notify('✅ Nouveau projet ajouté au portfolio !');
        closeForm();
        fetchProjects();
      } else {
        notify(res.message ?? "Erreur lors de l'ajout.", true);
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
    const res = await api.deleteRealisation(id);
    if (res.success) {
      notify('Projet supprimé définitivement.');
      setProjects(projects.filter((p) => p.id !== id));
    } else {
      notify(res.message ?? 'Erreur lors de la suppression.', true);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h2 style={{ fontSize: '24px', color: '#011a41' }}>Gestion des Réalisations (Portfolio)</h2>
          <p style={{ color: '#57647c', fontSize: '14px' }}>Mettez en valeur vos cas clients. Tout ajout/modification est visible en temps réel sur le site.</p>
        </div>
        <CommonButton variant="orange" onClick={openAdd}>
          <Plus size={16} /> Nouveau Projet
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
        title={editingId ? '✏️ Modifier le Projet' : '➕ Nouveau Projet Portfolio'}
        maxWidth="900px"
      >
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
              {/* Title */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Titre du Projet *</label>
                <input type="text" className="form-control" required
                  value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Ex. : Repositionnement Marque Bancaire" />
              </div>

              {/* Client */}
              <div className="form-group">
                <label>Nom du Client *</label>
                <input type="text" className="form-control" required
                  value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                  placeholder="Ex. : Groupe Financier Régional" />
              </div>

              {/* Year */}
              <div className="form-group">
                <label>Année de Réalisation</label>
                <input type="text" className="form-control"
                  value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })}
                  placeholder="2026" />
              </div>

              {/* Category */}
              <div className="form-group">
                <label>Pôle / Catégorie *</label>
                <select className="form-control" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Is Featured */}
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '28px' }}>
                <input type="checkbox" id="is_featured"
                  checked={form.is_featured}
                  onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                <label htmlFor="is_featured" style={{ cursor: 'pointer', fontWeight: '600', color: '#fd8604', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Star size={16} /> Mettre en vedette (Page d'Accueil)
                </label>
              </div>

              {/* Description */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Description du Projet *</label>
                <textarea className="form-control" required rows={3}
                  value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Décrivez le défi client et les résultats obtenus..." />
              </div>

              {/* Image URL / Upload */}
              <div style={{ gridColumn: '1 / -1' }}>
                <ImageUploader
                  value={form.image_url}
                  onChange={(url) => setForm({ ...form, image_url: url })}
                  label="Image de Couverture du Projet"
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <CommonButton type="submit" variant="orange" disabled={saving}>
                {saving ? <><Loader2 size={16} className="spin" /> Enregistrement...</> : (editingId ? 'Mettre à Jour' : 'Ajouter au Portfolio')}
              </CommonButton>
              <CommonButton type="button" variant="dark" onClick={closeForm}>Annuler</CommonButton>
            </div>
          </form>
      </Modal>

      {/* Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#57647c' }}>
          <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: '12px' }}>Chargement des réalisations...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Visuel</th>
                <th>Projet</th>
                <th>Client</th>
                <th>Pôle</th>
                <th>Année</th>
                <th>Vedette</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#57647c' }}>
                    Aucun projet pour l'instant. Cliquez sur "Nouveau Projet" pour commencer.
                  </td>
                </tr>
              ) : (
                projects.map((p) => (
                  <tr key={p.id}>
                    <td>
                      {p.image_url ? (
                        <img src={p.image_url} alt={p.title}
                          style={{ width: '60px', height: '42px', objectFit: 'cover', borderRadius: '6px' }}
                          onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="42" fill="%23f4f7fc"><rect width="60" height="42" fill="%23e5e9f2"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2357647c" font-size="10">IMG</text></svg>'; }} />
                      ) : (
                        <div style={{ width: '60px', height: '42px', background: '#f4f7fc', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c0c9d8', fontSize: '10px', fontWeight: '600' }}>
                          IMG
                        </div>
                      )}

                    </td>
                    <td><strong style={{ color: '#011a41' }}>{p.title}</strong></td>
                    <td style={{ color: '#57647c', fontSize: '14px' }}>{p.client_name}</td>
                    <td>
                      <span style={{ background: '#f4f7fc', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: '#0122bc' }}>
                        {p.category}
                      </span>
                    </td>
                    <td>{p.year ?? '—'}</td>
                    <td>
                      {p.is_featured
                        ? <Star size={18} fill="#fd8604" color="#fd8604" />
                        : <Star size={18} color="#c0c9d8" />}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => openEdit(p)} title="Modifier"
                          style={{ background: 'rgba(1,34,188,0.08)', border: 'none', cursor: 'pointer', color: '#0122bc', borderRadius: '6px', padding: '6px 8px' }}>
                          <Edit size={16} />
                        </button>
                        <button onClick={() => requestDelete(p.id, p.title)} title="Supprimer"
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
        title="Supprimer le projet ?"
        message={`Êtes-vous sûr de vouloir supprimer définitivement le projet "${deleteConfirm.title}" du portfolio ?`}
        confirmText="Oui, supprimer"
      />
    </div>
  );
};
