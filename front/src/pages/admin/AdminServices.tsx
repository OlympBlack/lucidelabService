import React from 'react';
import { Edit } from 'lucide-react';

export const AdminServices: React.FC = () => {
  const services = [
    { title: 'STRATEGY', tagline: 'Définir la bonne direction', status: 'Actif' },
    { title: 'BRAND', tagline: 'Construire une identité forte', status: 'Actif' },
    { title: 'DIGITAL', tagline: 'Créer des expériences numériques', status: 'Actif' },
    { title: 'GROWTH', tagline: 'Développer la visibilité', status: 'Actif' },
    { title: 'CONTENT', tagline: 'Créer du contenu qui marque', status: 'Actif' },
    { title: 'ADVERTISING', tagline: 'Faire connaître les marques', status: 'Actif' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h2 style={{ fontSize: '24px', color: '#011a41' }}>Gestion des Pôles de Services</h2>
          <p style={{ color: '#57647c', fontSize: '14px' }}>Administrez la liste des 6 offres et expertises de LUCIDE LAB.</p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Nom du Pôle</th>
              <th>Slogan & Accroche</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s, idx) => (
              <tr key={idx}>
                <td><strong>{s.title}</strong></td>
                <td>{s.tagline}</td>
                <td>
                  <span style={{ background: 'rgba(22, 163, 74, 0.1)', color: '#16a34a', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' }}>
                    {s.status}
                  </span>
                </td>
                <td>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#355efc' }}><Edit size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
