import React from 'react';
import { Eye, MessageSquare, FileText, Briefcase, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const stats = [
    { title: 'Visiteurs du site (ce mois)', value: '4 850', change: '+14%', icon: <Eye />, bg: '#eef2ff', color: '#355efc' },
    { title: 'Messages de contact reçus', value: '42', change: '+8 ce mois', icon: <MessageSquare />, bg: '#fff7ed', color: '#e93c05' },
    { title: 'Articles de Blog publiés', value: '18', change: '3 brouillons', icon: <FileText />, bg: '#f0fdf4', color: '#16a34a' },
    { title: 'Projets au Portfolio', value: '24', change: '6 catégories', icon: <Briefcase />, bg: '#faf5ff', color: '#9333ea' },
  ];

  const recentMessages = [
    { name: 'Jean-Marc D.', service: 'STRATEGY', email: 'jmd@entreprise.bj', date: 'Aujourd\'hui 11:30', status: 'Nouveau' },
    { name: 'Bernadette K.', service: 'BRAND', email: 'b.k@agrotech.bj', date: 'Hier 16:45', status: 'Traité' },
    { name: 'Christian A.', service: 'GROWTH', email: 'c.akpo@logistique.com', date: '30 Juil 2026', status: 'Traité' },
  ];

  return (
    <div>
      <h2 style={{ fontSize: '24px', color: '#011a41', marginBottom: '20px' }}>Vue d'ensemble des Performances</h2>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '35px' }}>
        {stats.map((s, idx) => (
          <div key={idx} className="stat-card">
            <div>
              <p style={{ color: '#57647c', fontSize: '13px', fontWeight: '600', marginBottom: '5px' }}>{s.title}</p>
              <h3 style={{ fontSize: '28px', color: '#011a41', marginBottom: '4px' }}>{s.value}</h3>
              <span style={{ fontSize: '12px', color: s.color, fontWeight: '700' }}>{s.change}</span>
            </div>
            <div className="stat-icon" style={{ backgroundColor: s.bg, color: s.color }}>
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Tables Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '25px', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', color: '#011a41' }}>Derniers Messages de Contact</h3>
            <Link to="/admin/messages" style={{ fontSize: '13px', color: '#e93c05', fontWeight: '700' }}>Voir tout →</Link>
          </div>

          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Expéditeur</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {recentMessages.map((m, idx) => (
                  <tr key={idx}>
                    <td>
                      <strong>{m.name}</strong>
                      <div style={{ fontSize: '12px', color: '#57647c' }}>{m.email}</div>
                    </td>
                    <td><span style={{ background: '#f4f7fc', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>{m.service}</span></td>
                    <td>{m.date}</td>
                    <td>
                      <span style={{
                        background: m.status === 'Nouveau' ? 'rgba(233, 60, 5, 0.1)' : 'rgba(22, 163, 74, 0.1)',
                        color: m.status === 'Nouveau' ? '#e93c05' : '#16a34a',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}>
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '25px', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontSize: '18px', color: '#011a41', marginBottom: '20px' }}>Actions Rapides</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/admin/blogs" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: '#f4f7fc', borderRadius: '8px', color: '#011a41', fontWeight: '600' }}>
              <span>Publier un nouvel article</span>
              <ArrowUpRight size={16} />
            </Link>

            <Link to="/admin/realisations" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: '#f4f7fc', borderRadius: '8px', color: '#011a41', fontWeight: '600' }}>
              <span>Ajouter un projet au Portfolio</span>
              <ArrowUpRight size={16} />
            </Link>

            <Link to="/admin/annonces" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: '#f4f7fc', borderRadius: '8px', color: '#011a41', fontWeight: '600' }}>
              <span>Gérer les bannières / annonces</span>
              <ArrowUpRight size={16} />
            </Link>

            <Link to="/admin/settings" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: '#f4f7fc', borderRadius: '8px', color: '#011a41', fontWeight: '600' }}>
              <span>Modifier les coordonnées site</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
