import React, { useEffect, useState } from 'react';
import { Share2, Plus, Edit2, Trash2, CheckCircle, Loader2 } from 'lucide-react';
import { api } from '../../services/api';
import type { SocialLink } from '../../services/api';

export const AdminSocials: React.FC = () => {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    platform: 'facebook',
    url: '',
    icon: 'Facebook',
    is_active: true,
    sort_order: 1
  });

  const loadLinks = async () => {
    setLoading(true);
    const data = await api.adminGetSocialLinks();
    if (data) setLinks(data);
    setLoading(false);
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      name: '',
      platform: 'facebook',
      url: '',
      icon: 'Facebook',
      is_active: true,
      sort_order: links.length + 1
    });
    setIsModalOpen(true);
  };

  const openEditModal = (link: SocialLink) => {
    setEditingId(link.id);
    setFormData({
      name: link.name,
      platform: link.platform,
      url: link.url,
      icon: link.icon || 'Share2',
      is_active: link.is_active ?? true,
      sort_order: link.sort_order ?? 1
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (editingId) {
      await api.updateSocialLink(editingId, formData);
      setSuccessMsg('Réseau social mis à jour avec succès');
    } else {
      await api.createSocialLink(formData);
      setSuccessMsg('Réseau social créé avec succès');
    }

    setSubmitting(false);
    setIsModalOpen(false);
    loadLinks();
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce réseau social ?')) {
      await api.deleteSocialLink(id);
      loadLinks();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#004C99', margin: '0 0 5px 0' }}>
            Gestion des Réseaux Sociaux
          </h1>
          <p style={{ color: '#57647c', fontSize: '14px', margin: 0 }}>
            Gérez les liens sociaux affichés dans la section "Suivez-nous sur nos réseaux !" du site public.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          style={{
            background: '#004C99',
            color: '#fff',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Plus size={18} /> Ajouter un réseau
        </button>
      </div>

      {successMsg && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid #10b981',
          color: '#065f46',
          padding: '12px 18px',
          borderRadius: '8px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <CheckCircle size={18} /> {successMsg}
        </div>
      )}

      {loading ? (
        <div style={{ padding: '60px 0', textAlign: 'center', color: '#004C99' }}>
          <Loader2 size={36} style={{ animation: 'spin 1s linear infinite' }} />
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                <th style={{ padding: '14px 20px' }}>Plateforme</th>
                <th style={{ padding: '14px 20px' }}>Nom</th>
                <th style={{ padding: '14px 20px' }}>URL Link</th>
                <th style={{ padding: '14px 20px' }}>Statut</th>
                <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr key={link.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 600, color: '#1e293b' }}>
                    <span style={{
                      display: 'inline-block',
                      background: 'rgba(0, 76, 153, 0.08)',
                      color: '#004C99',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      textTransform: 'uppercase'
                    }}>
                      {link.platform}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', fontWeight: 600 }}>{link.name}</td>
                  <td style={{ padding: '14px 20px', color: '#64748b', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <a href={link.url} target="_blank" rel="noreferrer" style={{ color: '#004C99' }}>{link.url}</a>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 600,
                      background: link.is_active ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                      color: link.is_active ? '#065f46' : '#991b1b'
                    }}>
                      {link.is_active ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <button
                      onClick={() => openEditModal(link)}
                      style={{ background: 'none', border: 'none', color: '#004C99', cursor: 'pointer', marginRight: '12px' }}
                      title="Modifier"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(link.id)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                      title="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', width: '90%', maxWidth: '500px' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', color: '#004C99' }}>
              {editingId ? 'Modifier le Réseau Social' : 'Ajouter un Réseau Social'}
            </h3>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '5px' }}>Nom d'affichage</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Facebook, Instagram, WhatsApp"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '5px' }}>Plateforme</label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value, icon: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                >
                  <option value="email">Email</option>
                  <option value="facebook">Facebook</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="twitter">Twitter / X</option>
                  <option value="instagram">Instagram</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="youtube">YouTube</option>
                  <option value="tiktok">TikTok</option>
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '5px' }}>Lien URL complet</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: https://facebook.com/lucidelabofficiel"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
                <label htmlFor="is_active" style={{ cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>Actif (Visible sur le site)</label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: '10px 18px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{ padding: '10px 18px', borderRadius: '6px', border: 'none', background: '#004C99', color: '#fff', cursor: 'pointer', fontWeight: 600 }}
                >
                  {submitting ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
