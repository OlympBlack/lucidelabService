import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { CommonButton } from '../../components/common/CommonButton';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@lucidelab.com');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
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
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#0122bc', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Adresse Email Admin</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                className="form-control"
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  borderRadius: '8px',
                  border: '2px solid #dbe3f5',
                  fontSize: '14px',
                  color: '#011a41',
                  background: '#f7f9ff',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.25s ease'
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = '#0122bc'}
                onBlur={(e) => e.target.style.borderColor = '#dbe3f5'}
                required
              />
              <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#0122bc', pointerEvents: 'none' }} />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#0122bc', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Mot de passe</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 42px',
                  borderRadius: '8px',
                  border: '2px solid #dbe3f5',
                  fontSize: '14px',
                  color: '#011a41',
                  background: '#f7f9ff',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.25s ease'
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = '#0122bc'}
                onBlur={(e) => e.target.style.borderColor = '#dbe3f5'}
                required
              />
              <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#0122bc', pointerEvents: 'none' }} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#57647c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
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
