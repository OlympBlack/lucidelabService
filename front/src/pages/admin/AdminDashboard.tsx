import React, { useEffect, useState } from 'react';
import { Eye, MessageSquare, FileText, Briefcase, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

export const AdminDashboard: React.FC = () => {
  const [statsData, setStatsData] = useState({
    visitors: 0,
    messages: 0,
    blogs: 0,
    projects: 0,
  });
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [msgs, blogs, projects] = await Promise.all([
          api.getAdminMessages(),
          api.adminGetBlogs(),
          api.adminGetRealisations()
        ]);

        let totalViews = 0;
        let blogsCount = 0;
        if (blogs && Array.isArray(blogs)) {
          blogsCount = blogs.length;
          totalViews = blogs.reduce((sum, b) => sum + (b.views_count || 0), 0);
        }

        const messagesCount = (msgs && Array.isArray(msgs)) ? msgs.length : 0;
        const projectsCount = (projects && Array.isArray(projects)) ? projects.length : 0;

        setStatsData({
          visitors: totalViews,
          messages: messagesCount,
          blogs: blogsCount,
          projects: projectsCount
        });

        if (msgs && Array.isArray(msgs)) {
          setRecentMessages(msgs.slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    { title: 'Vues globales du blog', value: loading ? '...' : statsData.visitors.toLocaleString('fr-FR'), change: 'Basé sur les articles', icon: <Eye />, bg: '#eef2ff', color: '#355efc' },
    { title: 'Messages de contact', value: loading ? '...' : statsData.messages, change: 'Tous les messages', icon: <MessageSquare />, bg: '#fff7ed', color: '#e93c05' },
    { title: 'Articles de Blog', value: loading ? '...' : statsData.blogs, change: 'Total articles', icon: <FileText />, bg: '#f0fdf4', color: '#16a34a' },
    { title: 'Projets au Portfolio', value: loading ? '...' : statsData.projects, change: 'Réalisations publiées', icon: <Briefcase />, bg: '#faf5ff', color: '#9333ea' },
  ];

  return (
    <div>
      <h2 style={{ fontSize: '24px', color: '#011a41', marginBottom: '20px' }}>Vue d'ensemble des Performances</h2>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '35px' }}>
        {stats.map((s, idx) => (
          <div key={idx} className="stat-card">
            <div>
              <p style={{ color: '#57647c', fontSize: '13px', fontWeight: '600', marginBottom: '5px' }}>{s.title}</p>
              <h3 style={{ fontSize: '24px', color: '#011a41', marginBottom: '4px' }}>{s.value}</h3>
              <span style={{ fontSize: '12px', color: s.color, fontWeight: '700' }}>{s.change}</span>
            </div>
            <div className="stat-icon" style={{ backgroundColor: s.bg, color: s.color, width: '48px', height: '48px', fontSize: '22px' }}>
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
                {recentMessages.length > 0 ? recentMessages.map((m, idx) => (
                  <tr key={idx}>
                    <td>
                      <strong>{m.name}</strong>
                      <div style={{ fontSize: '12px', color: '#57647c' }}>{m.email}</div>
                    </td>
                    <td><span style={{ background: '#f4f7fc', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>{m.service || 'N/A'}</span></td>
                    <td>{m.created_at ? new Date(m.created_at).toLocaleDateString('fr-FR') : 'Récemment'}</td>
                    <td>
                      <span style={{
                        background: 'rgba(233, 60, 5, 0.1)',
                        color: '#e93c05',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}>
                        Nouveau
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', color: '#57647c' }}>
                      {loading ? 'Chargement...' : 'Aucun message.'}
                    </td>
                  </tr>
                )}
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

            <Link to="/admin/reseaux-sociaux" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: '#f4f7fc', borderRadius: '8px', color: '#011a41', fontWeight: '600' }}>
              <span>Gérer les réseaux sociaux</span>
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

