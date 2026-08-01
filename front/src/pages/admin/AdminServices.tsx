import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { CommonButton } from '../../components/common/CommonButton';
import { Modal } from '../../components/common/Modal';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { Toast } from '../../components/common/Toast';
import { api, type Service } from '../../services/api';

const emptyForm = {
  code: '',
  title: '',
  subtitle: '',
  description: '',
  details: [] as string[],
  is_active: true,
};

type FormData = typeof emptyForm;

export const AdminServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<{isOpen: boolean, id: number|null, title: string}>({ isOpen: false, id: null, title: '' });

  const fetchServices = async () => {
    setLoading(true);
    const data = await api.adminGetServices();
    setServices(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
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

  const openEdit = (s: Service) => {
    setForm({
      code: s.code,
      title: s.title,
      subtitle: s.subtitle ?? '',
      description: s.description,
      details: s.details ?? [],
      is_active: s.is_active ?? true,
    });
    setEditingId(s.id);
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
      const res = await api.updateService(editingId, payload);
      if (res.success) {
        notify('✅ Service mis à jour !');
        closeForm();
        fetchServices();
      } else {
        notify(res.message ?? 'Erreur lors de la mise à jour.', true);
      }
    } else {
      const res = await api.createService(payload);
      if (res.success) {
        notify('✅ Nouveau service créé !');
        closeForm();
        fetchServices();
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
    const res = await api.deleteService(id);
    if (res.success) {
      notify('Service supprimé définitivement.');
      setServices(services.filter((s) => s.id !== id));
    } else {
      notify(res.message ?? 'Erreur lors de la suppression.', true);
    }
  };

  const handleDetailsChange = (val: string) => {
    setForm({ ...form, details: val.split('\\n').filter(line => line.trim() !== '') });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h2 style={{ fontSize: '24px', color: '#011a41' }}>Gestion des Pôles de Services</h2>
          <p style={{ color: '#57647c', fontSize: '14px' }}>Administrez la liste des offres et expertises de LUCIDE LAB.</p>
        </div>
        <CommonButton variant="orange" onClick={openAdd}>
          <Plus size={16} /> Nouveau Service
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
        title={editingId ? '✏️ Modifier le Service' : '➕ Nouveau Service'}
        maxWidth="800px"
      >
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
            <div className="form-group">
              <label>Code (ex: STRATEGY) *</label>
              <input type="text" className="form-control" required
                value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} />
            </div>
            
            <div className="form-group">
              <label>Titre (Nom affiché) *</label>
              <input type="text" className="form-control" required
                value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Sous-titre / Accroche</label>
              <input type="text" className="form-control"
                value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Description Complète *</label>
              <textarea className="form-control" required rows={4}
                value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Détails / Liste d'atouts (1 par ligne)</label>
              <textarea className="form-control" rows={4}
                value={form.details.join('\\n')} onChange={(e) => handleDetailsChange(e.target.value)} 
                placeholder="Audit de marque\nPositionnement\nStratégie Digitale" />
            </div>

            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input type="checkbox" id="is_active"
                checked={form.is_active}
                onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
              <label htmlFor="is_active" style={{ cursor: 'pointer', fontWeight: '600', color: '#0122bc', margin: 0 }}>
                Service Actif et Visible
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '25px' }}>
            <CommonButton type="submit" variant="orange" disabled={saving}>
              {saving ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Enregistrement...</> : (editingId ? 'Mettre à Jour' : 'Créer le Service')}
            </CommonButton>
            <CommonButton type="button" variant="dark" onClick={closeForm}>Annuler</CommonButton>
          </div>
        </form>
      </Modal>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#57647c' }}>
          <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} />
          <p>Chargement des services...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Titre</th>
                <th>Sous-titre</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id}>
                  <td><strong>{s.code}</strong></td>
                  <td>{s.title}</td>
                  <td>{s.subtitle}</td>
                  <td>
                    <span style={{ 
                      background: s.is_active ? 'rgba(22, 163, 74, 0.1)' : 'rgba(156, 163, 175, 0.1)', 
                      color: s.is_active ? '#16a34a' : '#6b7280', 
                      padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' 
                    }}>
                      {s.is_active ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => openEdit(s)} title="Modifier"
                        style={{ background: 'rgba(1,34,188,0.08)', border: 'none', cursor: 'pointer', color: '#0122bc', borderRadius: '6px', padding: '6px 8px' }}>
                        <Edit size={16} />
                      </button>
                      <button onClick={() => requestDelete(s.id, s.title)} title="Supprimer"
                        style={{ background: 'rgba(251,36,72,0.08)', border: 'none', cursor: 'pointer', color: '#fb2448', borderRadius: '6px', padding: '6px 8px' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '30px' }}>Aucun service.</td>
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
        title="Supprimer le service ?"
        message={`Voulez-vous vraiment supprimer le pôle d'expertise "${deleteConfirm.title}" ?`}
      />
    </div>
  );
};

