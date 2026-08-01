import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { CommonButton } from '../../components/common/CommonButton';
import { Modal } from '../../components/common/Modal';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { Toast } from '../../components/common/Toast';
import { ImageUploader } from '../../components/common/ImageUploader';
import { api, type Announcement } from '../../services/api';

const emptyForm = {
  title: '',
  content: '',
  link_url: '',
  is_active: true,
};

type FormData = typeof emptyForm;

export const AdminAnnonces: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<{isOpen: boolean, id: number|null, title: string}>({ isOpen: false, id: null, title: '' });

  const fetchAnnouncements = async () => {
    setLoading(true);
    const data = await api.adminGetAnnouncements();
    setAnnouncements(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const notify = (msg: string, isError = false) => {
    if (isError) { setError(msg); setSuccess(null); }
    else { setSuccess(msg); setError(null); }
  };

  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (a: Announcement) => {
    setForm({
      title: a.title,
      content: a.content,
      link_url: a.link_url ?? '',
      is_active: a.is_active ?? true,
    });
    setEditingId(a.id);
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
      is_active: Boolean(form.is_active)
    };

    if (editingId) {
      const res = await api.updateAnnouncement(editingId, payload);
      if (res.success) {
        notify('✅ Annonce mise à jour !');
        closeForm();
        fetchAnnouncements();
      } else {
        notify(res.message ?? 'Erreur lors de la mise à jour.', true);
      }
    } else {
      const res = await api.createAnnouncement(payload);
      if (res.success) {
        notify('✅ Nouvelle annonce ajoutée !');
        closeForm();
        fetchAnnouncements();
      } else {
        notify(res.message ?? 'Erreur lors de la création.', true);
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
    const res = await api.deleteAnnouncement(id);
    if (res.success) {
      notify('Annonce supprimée définitivement.');
      setAnnouncements(announcements.filter((a) => a.id !== id));
    } else {
      notify(res.message ?? 'Erreur lors de la suppression.', true);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h2 style={{ fontSize: '24px', color: '#011a41' }}>Gestion des Annonces & Bannières</h2>
          <p style={{ color: '#57647c', fontSize: '14px' }}>Diffusez des alertes ou offres spéciales en haut du site.</p>
        </div>
        <CommonButton variant="orange" onClick={openAdd}>
          <Plus size={16} /> Nouvelle Annonce
        </CommonButton>
      </div>

      <Toast 
        message={success || error} 
        type={error ? 'error' : 'success'} 
        onClose={() => { setSuccess(null); setError(null); }} 
      />

      <Modal 
        isOpen={showForm} 
        onClose={closeForm} 
        title={editingId ? '✏️ Modifier Annonce' : '➕ Nouvelle Annonce'}
        maxWidth="700px"
      >
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div className="form-group">
              <label>Titre de l'Annonce *</label>
              <input type="text" className="form-control" required
                value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>

            <div className="form-group">
              <label>Message / Contenu *</label>
              <textarea className="form-control" rows={3} required
                value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
            </div>

            <div className="form-group">
              <label>Lien de redirection (Optionnel)</label>
              <input type="text" className="form-control" placeholder="https://..."
                value={form.link_url} onChange={(e) => setForm({ ...form, link_url: e.target.value })} />
            </div>

            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input type="checkbox" id="is_active_ann"
                checked={form.is_active}
                onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
              <label htmlFor="is_active_ann" style={{ cursor: 'pointer', fontWeight: '600', color: '#0122bc', margin: 0 }}>
                Publier cette annonce
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '25px' }}>
            <CommonButton type="submit" variant="orange" disabled={saving}>
              {saving ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Enregistrement...</> : (editingId ? 'Mettre à Jour' : 'Publier')}
            </CommonButton>
            <CommonButton type="button" variant="dark" onClick={closeForm}>Annuler</CommonButton>
          </div>
        </form>
      </Modal>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#57647c' }}>
          <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} />
          <p>Chargement des annonces...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Titre de l'Annonce</th>
                <th>Lien</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((a) => (
                <tr key={a.id}>
                  <td><strong>{a.title}</strong></td>
                  <td>{a.link_url ? <a href={a.link_url} target="_blank" rel="noreferrer" style={{ color: '#0122bc' }}>Voir lien</a> : 'Aucun'}</td>
                  <td>
                    <span style={{ 
                      background: a.is_active ? 'rgba(22, 163, 74, 0.1)' : 'rgba(156, 163, 175, 0.1)', 
                      color: a.is_active ? '#16a34a' : '#6b7280', 
                      padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' 
                    }}>
                      {a.is_active ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => openEdit(a)} title="Modifier"
                        style={{ background: 'rgba(1,34,188,0.08)', border: 'none', cursor: 'pointer', color: '#0122bc', borderRadius: '6px', padding: '6px 8px' }}>
                        <Edit size={16} />
                      </button>
                      <button onClick={() => requestDelete(a.id, a.title)} title="Supprimer"
                        style={{ background: 'rgba(251,36,72,0.08)', border: 'none', cursor: 'pointer', color: '#fb2448', borderRadius: '6px', padding: '6px 8px' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {announcements.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '30px' }}>Aucune annonce.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ ...deleteConfirm, isOpen: false })}
        onConfirm={handleConfirmDelete}
        title="Supprimer l'annonce ?"
        message={`Voulez-vous vraiment supprimer "${deleteConfirm.title}" ?`}
      />
    </div>
  );
};

export const AdminUsers: React.FC = () => {
  const [users] = useState([
    { id: 1, name: 'Admin Lucide', email: 'admin@lucidelab.com', role: 'Super Administrateur', status: 'Actif' }
  ]);

  return (
    <div>
      <h2 style={{ fontSize: '24px', color: '#011a41', marginBottom: '10px' }}>Utilisateurs, Rôles & Permissions</h2>
      <p style={{ color: '#57647c', fontSize: '14px', marginBottom: '25px' }}>Gérez les comptes d'accès à la console d'administration.</p>

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td><strong>{u.name}</strong></td>
                <td>{u.email}</td>
                <td><span style={{ background: '#f4f7fc', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>{u.role}</span></td>
                <td><span style={{ background: 'rgba(22, 163, 74, 0.1)', color: '#16a34a', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' }}>{u.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const AdminMedia: React.FC = () => {
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{isOpen: boolean, path: string|null, filename: string}>({ isOpen: false, path: null, filename: '' });

  const fetchMedia = async () => {
    setLoading(true);
    const data = await api.getAdminMedia();
    setMediaList(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const notify = (msg: string, isError = false) => {
    if (isError) { setError(msg); setSuccess(null); }
    else { setSuccess(msg); setError(null); }
  };

  const handleConfirmDelete = async () => {
    const path = deleteConfirm.path;
    if (!path) return;
    const res = await api.deleteAdminMedia(path);
    if (res.success) {
      notify('Média supprimé avec succès.');
      fetchMedia();
    } else {
      notify(res.message ?? 'Erreur lors de la suppression.', true);
    }
    setDeleteConfirm({ isOpen: false, path: null, filename: '' });
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', color: '#011a41', marginBottom: '10px' }}>Médiathèque & Gestion d'Images</h2>
      <p style={{ color: '#57647c', fontSize: '14px', marginBottom: '25px' }}>Stockage et organisation des logos, visuels et illustrations de projets.</p>

      <Toast 
        message={success || error} 
        type={error ? 'error' : 'success'} 
        onClose={() => { setSuccess(null); setError(null); }} 
      />

      <div style={{ marginBottom: '30px', maxWidth: '600px' }}>
        <h3 style={{ fontSize: '16px', color: '#011a41', marginBottom: '10px' }}>Ajouter un nouveau média</h3>
        <ImageUploader 
          value="" 
          onChange={(url) => { if (url) { notify('✅ Image uploadée avec succès'); fetchMedia(); } }} 
          label="Sélectionnez ou glissez une image"
        />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#57647c' }}>
          <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} />
          <p>Chargement des médias...</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {mediaList.map((media, idx) => (
            <div key={idx} style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e5e9f2' }}>
              <div style={{ height: '150px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={media.url} alt={media.filename} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '12px' }}>
                <p style={{ margin: '0 0 5px 0', fontSize: '13px', fontWeight: '600', color: '#011a41', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={media.filename}>
                  {media.filename}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#57647c' }}>{formatSize(media.size)}</span>
                  <button 
                    onClick={() => setDeleteConfirm({ isOpen: true, path: media.path, filename: media.filename })}
                    style={{ background: 'rgba(251,36,72,0.1)', border: 'none', borderRadius: '6px', padding: '6px', color: '#fb2448', cursor: 'pointer' }}
                    title="Supprimer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {mediaList.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', background: '#fff', borderRadius: '12px', border: '1px solid #e5e9f2' }}>
              <ImageIcon size={48} style={{ color: '#c0c9d8', marginBottom: '15px' }} />
              <p style={{ color: '#57647c', fontSize: '14px' }}>Aucun média trouvé.</p>
            </div>
          )}
        </div>
      )}

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ ...deleteConfirm, isOpen: false })}
        onConfirm={handleConfirmDelete}
        title="Supprimer l'image ?"
        message={`Voulez-vous vraiment supprimer "${deleteConfirm.filename}" ? Cette action est irréversible et brisera les liens de cette image sur le site.`}
      />
    </div>
  );
};
