import React, { useState } from 'react';
import { Trash2, Image as ImageIcon } from 'lucide-react';
import { CommonButton } from '../../components/common/CommonButton';

export const AdminAnnonces: React.FC = () => {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Nouveau Pôle Growth Marketing ouvert !', status: 'Actif', date: '01/08/2026' }
  ]);

  return (
    <div>
      <h2 style={{ fontSize: '24px', color: '#011a41', marginBottom: '10px' }}>Gestion des Annonces & Bannières Header</h2>
      <p style={{ color: '#57647c', fontSize: '14px', marginBottom: '25px' }}>Diffusez des alertes ou offres spéciales en haut du site.</p>

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Titre de l'Annonce</th>
              <th>Statut</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((a) => (
              <tr key={a.id}>
                <td><strong>{a.title}</strong></td>
                <td><span style={{ background: 'rgba(22, 163, 74, 0.1)', color: '#16a34a', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' }}>{a.status}</span></td>
                <td>{a.date}</td>
                <td>
                  <button onClick={() => setAnnouncements(announcements.filter(x => x.id !== a.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fb2448' }}>
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
  return (
    <div>
      <h2 style={{ fontSize: '24px', color: '#011a41', marginBottom: '10px' }}>Médiathèque & Gestion d'Images</h2>
      <p style={{ color: '#57647c', fontSize: '14px', marginBottom: '25px' }}>Stockage et organisation des logos, visuels et illustrations de projets.</p>

      <div style={{ background: '#ffffff', padding: '40px', borderRadius: '12px', textAlign: 'center', border: '2px dashed #e5e9f2' }}>
        <ImageIcon size={48} style={{ color: '#57647c', marginBottom: '15px' }} />
        <h3 style={{ fontSize: '18px', color: '#011a41', marginBottom: '10px' }}>Glissez-déposez des médias ici</h3>
        <p style={{ color: '#57647c', fontSize: '14px', marginBottom: '20px' }}>Supports acceptés: PNG, JPG, WEBP, SVG (max 10MB)</p>
        <CommonButton variant="orange">Parcourir les fichiers</CommonButton>
      </div>
    </div>
  );
};
