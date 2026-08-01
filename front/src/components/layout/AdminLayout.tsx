import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Layers,
  Users,
  MessageSquare,
  Bell,
  Settings,
  Image,
  LogOut,
  UserCheck
} from 'lucide-react';
import { api } from '../../services/api';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    // Fetch dynamic count for notifications (e.g. contact messages)
    const fetchNotifications = async () => {
      const msgs = await api.getAdminMessages();
      if (msgs && Array.isArray(msgs)) {
        setNotificationCount(msgs.length); // You can filter by 'unread' if added to backend later
      }
    };
    fetchNotifications();
  }, [location.pathname]); // Refresh when navigating in admin

  const menuItems = [
    { path: '/admin/dashboard', label: 'Tableau de bord', icon: <LayoutDashboard size={18} /> },
    { path: '/admin/blogs', label: 'Blogs & Catégories', icon: <FileText size={18} /> },
    { path: '/admin/services', label: 'Gestion Services', icon: <Layers size={18} /> },
    { path: '/admin/realisations', label: 'Réalisations', icon: <Briefcase size={18} /> },
    { path: '/admin/partenaires', label: 'Partenaires & Avis', icon: <Users size={18} /> },
    { path: '/admin/messages', label: 'Messages Contact', icon: <MessageSquare size={18} /> },
    { path: '/admin/annonces', label: 'Annonces & Bannières', icon: <Bell size={18} /> },
    { path: '/admin/users', label: 'Utilisateurs & Rôles', icon: <UserCheck size={18} /> },
    { path: '/admin/media', label: 'Gestion Médias', icon: <Image size={18} /> },
    { path: '/admin/settings', label: 'Paramètres du Site', icon: <Settings size={18} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('lucide_admin_token');
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Link to="/admin/dashboard" style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src="/assets/images/logo.png"
              alt="LUCIDE LAB"
              style={{ maxHeight: '42px', filter: 'brightness(0) invert(1)', objectFit: 'contain' }}
            />
          </Link>
        </div>

        <nav className="admin-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              background: 'rgba(251, 36, 72, 0.15)',
              color: '#fb2448',
              border: '1px solid rgba(251, 36, 72, 0.3)',
              padding: '10px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <LogOut size={16} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-content">
        <header className="admin-topbar">
          <h2 style={{ fontSize: '18px', color: '#011a41' }}>Console d'Administration LUCIDE LAB</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            
            {/* Dynamic Notification Bell */}
            <Link to="/admin/messages" style={{ position: 'relative', display: 'flex', alignItems: 'center', color: '#011a41' }}>
              <Bell size={20} />
              {notificationCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-8px',
                  background: '#fb2448',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  padding: '2px 6px',
                  borderRadius: '12px',
                  lineHeight: 1
                }}>
                  {notificationCount}
                </span>
              )}
            </Link>

            <span style={{ fontSize: '14px', color: '#57647c', borderLeft: '1px solid #e5e9f2', paddingLeft: '20px' }}>
              Connecté en tant qu'<strong>Administrateur</strong>
            </span>
            <Link to="/" target="_blank" style={{ fontSize: '13px', background: '#f4f7fc', padding: '6px 12px', borderRadius: '6px', color: '#0e3e78', fontWeight: '600' }}>
              Voir le site public →
            </Link>
          </div>
        </header>


        <div className="admin-body">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
