import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { CommonButton } from '../../components/common/CommonButton';

export const AdminBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState([
    { id: 1, title: 'Comment construire une identité de marque forte et mémorable en 2026 ?', category: 'BRANDING', date: '15/07/2026', views: 420 },
    { id: 2, title: 'Les clés d\'une stratégie de Growth Hacking réussie en Afrique de l\'Ouest', category: 'GROWTH', date: '28/06/2026', views: 310 },
    { id: 3, title: 'Pourquoi la lucidité est la clé de voûte du positionnement', category: 'STRATEGY', date: '10/06/2026', views: 285 },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCat, setNewCat] = useState('BRANDING');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim()) {
      setBlogs([...blogs, {
        id: Date.now(),
        title: newTitle,
        category: newCat,
        date: new Date().toLocaleDateString('fr-FR'),
        views: 0
      }]);
      setNewTitle('');
      setIsAdding(false);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Voulez-vous supprimer cet article ?')) {
      setBlogs(blogs.filter(b => b.id !== id));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h2 style={{ fontSize: '24px', color: '#011a41' }}>Gestion des Blogs & Catégories</h2>
          <p style={{ color: '#57647c', fontSize: '14px' }}>Rédigez, modifiez et organisez vos articles de presse et conseils.</p>
        </div>
        <CommonButton variant="orange" onClick={() => setIsAdding(!isAdding)}>
          <Plus size={16} /> Nouveau Blog
        </CommonButton>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} style={{ background: '#ffffff', padding: '25px', borderRadius: '12px', marginBottom: '25px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#011a41' }}>Créer un nouvel article</h3>
          <div className="form-group">
            <label>Titre de l'article</label>
            <input type="text" className="form-control" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Titre de l'article..." />
          </div>
          <div className="form-group">
            <label>Catégorie</label>
            <select className="form-control" value={newCat} onChange={(e) => setNewCat(e.target.value)}>
              <option value="STRATEGY">STRATEGY</option>
              <option value="BRANDING">BRANDING</option>
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
              <th>Titre de l'Article</th>
              <th>Catégorie</th>
              <th>Date de Publication</th>
              <th>Vues</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <tr key={b.id}>
                <td><strong>{b.title}</strong></td>
                <td><span style={{ background: '#f4f7fc', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>{b.category}</span></td>
                <td>{b.date}</td>
                <td>{b.views} vues</td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#355efc' }}><Edit size={18} /></button>
                    <button onClick={() => handleDelete(b.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fb2448' }}><Trash2 size={18} /></button>
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
