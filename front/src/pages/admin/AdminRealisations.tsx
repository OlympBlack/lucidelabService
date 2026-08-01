import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { CommonButton } from '../../components/common/CommonButton';

export const AdminRealisations: React.FC = () => {
  const [projects, setProjects] = useState([
    { id: 1, title: 'Repositionnement Marque Bancaire', category: 'BRAND', client: 'Groupe Financier Régional', year: '2025' },
    { id: 2, title: 'Plateforme E-Commerce Agro-business', category: 'DIGITAL', client: 'AgroTech Bénin', year: '2025' },
    { id: 3, title: 'Campagne de Lancement Growth Meta', category: 'GROWTH', client: 'Startup Logistique', year: '2026' },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [category, setCategory] = useState('BRAND');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      setProjects([...projects, { id: Date.now(), title, category, client, year: '2026' }]);
      setTitle('');
      setClient('');
      setIsAdding(false);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Voulez-vous supprimer ce projet ?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h2 style={{ fontSize: '24px', color: '#011a41' }}>Gestion des Réalisations (Portfolio)</h2>
          <p style={{ color: '#57647c', fontSize: '14px' }}>Mettez en valeur vos cas clients et projets récents.</p>
        </div>
        <CommonButton variant="orange" onClick={() => setIsAdding(!isAdding)}>
          <Plus size={16} /> Nouveau Projet
        </CommonButton>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} style={{ background: '#ffffff', padding: '25px', borderRadius: '12px', marginBottom: '25px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#011a41' }}>Ajouter un Projet au Portfolio</h3>
          <div className="form-group">
            <label>Titre du projet</label>
            <input type="text" className="form-control" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre..." />
          </div>
          <div className="form-group">
            <label>Nom du Client</label>
            <input type="text" className="form-control" required value={client} onChange={(e) => setClient(e.target.value)} placeholder="Nom de l'entreprise..." />
          </div>
          <div className="form-group">
            <label>Pôle / Catégorie</label>
            <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="STRATEGY">STRATEGY</option>
              <option value="BRAND">BRAND</option>
              <option value="DIGITAL">DIGITAL</option>
              <option value="GROWTH">GROWTH</option>
              <option value="CONTENT">CONTENT</option>
              <option value="ADVERTISING">ADVERTISING</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <CommonButton type="submit" variant="orange">Enregistrer</CommonButton>
            <CommonButton type="button" variant="dark" onClick={() => setIsAdding(false)}>Annuler</CommonButton>
          </div>
        </form>
      )}

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Projet</th>
              <th>Client</th>
              <th>Pôle</th>
              <th>Année</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td><strong>{p.title}</strong></td>
                <td>{p.client}</td>
                <td><span style={{ background: '#f4f7fc', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>{p.category}</span></td>
                <td>{p.year}</td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#355efc' }}><Edit size={18} /></button>
                    <button onClick={() => handleDelete(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fb2448' }}><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
