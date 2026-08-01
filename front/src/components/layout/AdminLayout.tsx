import React, { useEffect, useState, useRef } from 'react';
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
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      const msgs = await api.getAdminMessages();
      if (msgs && Array.isArray(msgs)) {
        setNotificationCount(msgs.length);
        setRecentMessages(msgs.slice(0, 5)); // Keep top 5 latest
      }
    };
    fetchNotifications();
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
              background: '#e93c05',
              color: '#ffffff',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'background-color 0.2s',
              boxShadow: '0 4px 10px rgba(233, 60, 5, 0.3)'
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
            <Link to="/" target="_blank" style={{ fontSize: '13px', background: '#f4f7fc', padding: '6px 12px', borderRadius: '6px', color: '#0e3e78', fontWeight: '600', textDecoration: 'none' }}>
              Voir le site public →
            </Link>

            <div style={{ width: '1px', height: '24px', background: '#e5e9f2' }}></div>
            
            {/* Dynamic Notification Bell & Dropdown */}
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{ 
                  background: 'none', border: 'none', cursor: 'pointer', 
                  display: 'flex', alignItems: 'center', color: '#011a41', padding: '5px' 
                }}
              >
                <Bell size={20} />
                {notificationCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '-2px', right: '-2px',
                    background: '#fb2448', color: '#fff', fontSize: '11px',
                    fontWeight: 'bold', padding: '2px 6px', borderRadius: '12px', lineHeight: 1
                  }}>
                    {notificationCount}
                  </span>
                )}
              </button>

              {isDropdownOpen && (
                <div style={{
                  position: 'absolute', top: '40px', right: '-40px',
                  width: '320px', background: '#fff', borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)', border: '1px solid #e5e9f2',
                  zIndex: 100, overflow: 'hidden'
                }}>
                  <div style={{ padding: '15px 20px', borderBottom: '1px solid #e5e9f2', background: '#f8fafc' }}>
                    <h4 style={{ margin: 0, fontSize: '14px', color: '#011a41', fontWeight: '700' }}>Notifications ({notificationCount})</h4>
                  </div>
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {recentMessages.length > 0 ? (
                      recentMessages.map((msg) => (
                        <Link 
                          key={msg.id} 
                          to="/admin/messages" 
                          onClick={() => setIsDropdownOpen(false)}
                          style={{ display: 'block', padding: '15px 20px', borderBottom: '1px solid #f0f2f5', textDecoration: 'none', transition: 'background-color 0.2s' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <p style={{ margin: '0 0 5px 0', fontSize: '13px', fontWeight: '600', color: '#0122bc' }}>
                            Nouveau message de {msg.name}
                          </p>
                          <p style={{ margin: 0, fontSize: '12px', color: '#57647c', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            Sujet : {msg.subject || msg.service}
                          </p>
                        </Link>
                      ))
                    ) : (
                      <div style={{ padding: '20px', textAlign: 'center', fontSize: '13px', color: '#a0aec0' }}>
                        Aucune notification
                      </div>
                    )}
                  </div>
                  <Link 
                    to="/admin/messages" 
                    onClick={() => setIsDropdownOpen(false)}
                    style={{ 
                      display: 'block', padding: '12px', textAlign: 'center', 
                      background: '#f4f7fc', color: '#0122bc', fontSize: '13px', 
                      fontWeight: '600', textDecoration: 'none' 
                    }}
                  >
                    Voir tous les messages →
                  </Link>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              style={{
                background: '#e93c05',
                color: '#ffffff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: '700',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 10px rgba(233, 60, 5, 0.25)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              Déconnexion
            </button>
          </div>
        </header>

        <div className="admin-body">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

