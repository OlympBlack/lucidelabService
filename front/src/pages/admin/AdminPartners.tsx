import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { CommonButton } from '../../components/common/CommonButton';
import { Modal } from '../../components/common/Modal';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { Toast } from '../../components/common/Toast';
import { ImageUploader } from '../../components/common/ImageUploader';
import { api, type Partner } from '../../services/api';

const emptyForm = {
  name: '',
  role: '',
  testimonial: '',
  logo_url: '',
  rating: 5,
  is_active: true,
};

type FormData = typeof emptyForm;

export const AdminPartners: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<{isOpen: boolean, id: number|null, title: string}>({ isOpen: false, id: null, title: '' });

  const fetchPartners = async () => {
    setLoading(true);
    const data = await api.adminGetPartners();
    setPartners(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPartners();
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

  const openEdit = (p: Partner) => {
    setForm({
      name: p.name,
      role: p.role ?? '',
      testimonial: p.testimonial ?? '',
      logo_url: p.logo_url ?? '',
      rating: p.rating ?? 5,
      is_active: p.is_active ?? true,
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
      rating: Number(form.rating),
      is_active: Boolean(form.is_active)
    };

    if (editingId) {
      const res = await api.updatePartner(editingId, payload);
      if (res.success) {
        notify('✅ Partenaire mis à jour !');
        closeForm();
        fetchPartners();
      } else {
        notify(res.message ?? 'Erreur lors de la mise à jour.', true);
      }
    } else {
      const res = await api.createPartner(payload);
      if (res.success) {
        notify('✅ Nouveau partenaire ajouté !');
        closeForm();
        fetchPartners();
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
    const res = await api.deletePartner(id);
    if (res.success) {
      notify('Partenaire supprimé définitivement.');
      setPartners(partners.filter((p) => p.id !== id));
    } else {
      notify(res.message ?? 'Erreur lors de la suppression.', true);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h2 style={{ fontSize: '24px', color: '#011a41' }}>Partenaires & Témoignages Clients</h2>
          <p style={{ color: '#57647c', fontSize: '14px' }}>Gérez la section "Ils nous font confiance" et les recommandations.</p>
        </div>
        <CommonButton variant="orange" onClick={openAdd}>
          <Plus size={16} /> Ajouter
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
        title={editingId ? '✏️ Modifier Partenaire' : '➕ Nouveau Partenaire'}
        maxWidth="800px"
      >
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Logo / Photo de profil</label>
              <ImageUploader
                onUploadSuccess={(url) => setForm({ ...form, logo_url: url })}
                currentImage={form.logo_url}
              />
            </div>
            
            <div className="form-group">
              <label>Nom du Client / Partenaire *</label>
              <input type="text" className="form-control" required
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>

            <div className="form-group">
              <label>Fonction / Entreprise</label>
              <input type="text" className="form-control"
                value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Témoignage (Optionnel)</label>
              <textarea className="form-control" rows={3}
                value={form.testimonial} onChange={(e) => setForm({ ...form, testimonial: e.target.value })} />
            </div>

            <div className="form-group">
              <label>Note (sur 5)</label>
              <input type="number" min="1" max="5" className="form-control"
                value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} />
            </div>

            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input type="checkbox" id="is_active_partner"
                checked={form.is_active}
                onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
              <label htmlFor="is_active_partner" style={{ cursor: 'pointer', fontWeight: '600', color: '#0122bc', margin: 0 }}>
                Afficher sur le site
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '25px' }}>
            <CommonButton type="submit" variant="orange" disabled={saving}>
              {saving ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Enregistrement...</> : (editingId ? 'Mettre à Jour' : 'Ajouter')}
            </CommonButton>
            <CommonButton type="button" variant="dark" onClick={closeForm}>Annuler</CommonButton>
          </div>
        </form>
      </Modal>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#57647c' }}>
          <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} />
          <p>Chargement des partenaires...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Logo</th>
                <th>Client / Partenaire</th>
                <th>Fonction</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.logo_url ? (
                      <img src={p.logo_url} alt={p.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }} />
                    ) : (
                      <div style={{ width: '40px', height: '40px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '12px' }}>N/A</div>
                    )}
                  </td>
                  <td><strong>{p.name}</strong></td>
                  <td>{p.role}</td>
                  <td>
                    <span style={{ 
                      background: p.is_active ? 'rgba(22, 163, 74, 0.1)' : 'rgba(156, 163, 175, 0.1)', 
                      color: p.is_active ? '#16a34a' : '#6b7280', 
                      padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' 
                    }}>
                      {p.is_active ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => openEdit(p)} title="Modifier"
                        style={{ background: 'rgba(1,34,188,0.08)', border: 'none', cursor: 'pointer', color: '#0122bc', borderRadius: '6px', padding: '6px 8px' }}>
                        <Edit size={16} />
                      </button>
                      <button onClick={() => requestDelete(p.id, p.name)} title="Supprimer"
                        style={{ background: 'rgba(251,36,72,0.08)', border: 'none', cursor: 'pointer', color: '#fb2448', borderRadius: '6px', padding: '6px 8px' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {partners.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '30px' }}>Aucun partenaire.</td>
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
        title="Supprimer le partenaire ?"
        message={`Voulez-vous vraiment supprimer "${deleteConfirm.title}" ?`}
      />
    </div>
  );
};

export const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([
    { id: 1, name: 'Jean-Marc Dagba', email: 'jmd@entreprise-benin.bj', phone: '0166285017', service: 'STRATEGY', message: 'Nous souhaitons un audit complet de notre branding...', created_at: 'Aujourd\'hui 11:30' },
    { id: 2, name: 'Bernadette Kpadonou', email: 'b.k@agrotech.bj', phone: '0199001122', service: 'BRAND', message: 'Demande de devis pour création de charte graphique...', created_at: 'Hier 16:45' },
    { id: 3, name: 'Christian Akpo', email: 'c.akpo@logistique.com', phone: '0122334455', service: 'GROWTH', message: 'Besoin d\'une stratégie Google Ads et LinkedIn Ads ciblée...', created_at: '30 Juil 2026' },
  ]);

  useEffect(() => {
    api.getAdminMessages().then((data) => {
      const arr = data as any[];
      if (arr && arr.length > 0) {
        setMessages(arr);
      }
    });
  }, []);


  const handleDelete = (id: number) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', color: '#011a41', marginBottom: '10px' }}>Messages & Inscriptions Contact</h2>
      <p style={{ color: '#57647c', fontSize: '14px', marginBottom: '25px' }}>Consultez et gérez les demandes d'accompagnement envoyées depuis le site web à l'API Laravel.</p>

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Expéditeur</th>
              <th>Email / Tél</th>
              <th>Pôle Souhaité</th>
              <th>Message</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => (
              <tr key={m.id}>
                <td><strong>{m.name}</strong></td>
                <td>
                  <div>{m.email}</div>
                  <div style={{ fontSize: '12px', color: '#57647c' }}>{m.phone}</div>
                </td>
                <td><span style={{ background: '#f4f7fc', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>{m.service}</span></td>
                <td><div style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.message}</div></td>
                <td>{m.created_at ? new Date(m.created_at).toLocaleDateString('fr-FR') : 'Récemment'}</td>
                <td>
                  <button onClick={() => handleDelete(m.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fb2448' }}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
