import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { CommonButton } from '../../components/common/CommonButton';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@lucidelab.com');
  const [password, setPassword] = useState('password');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('lucide_admin_token', 'demo_token_12345');
    navigate('/admin/dashboard');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #011a41 0%, #0e3e78 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '40px',
        maxWidth: '420px',
        width: '100%',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img
            src="/assets/images/logo.png"
            alt="LUCIDE LAB"
            style={{ maxHeight: '60px', width: 'auto', marginBottom: '15px', objectFit: 'contain' }}
          />
          <h2 style={{ fontSize: '20px', color: '#011a41' }}>ESPACE ADMIN</h2>
          <p style={{ color: '#57647c', fontSize: '14px' }}>Connectez-vous à la console d'administration</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Adresse Email Admin</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                className="form-control"
                style={{ paddingLeft: '40px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '13px', color: '#57647c' }} />
            </div>
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                className="form-control"
                style={{ paddingLeft: '40px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '13px', color: '#57647c' }} />
            </div>
          </div>

          <CommonButton type="submit" variant="orange" style={{ width: '100%', marginTop: '10px' }}>
            Se connecter au Dashboard
          </CommonButton>
        </form>
      </div>
    </div>
  );
};
