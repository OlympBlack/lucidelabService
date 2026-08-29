import React, { useEffect, useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { createPortal } from 'react-dom';
import '../../assets/css/fludicial.css';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title = "Message transmis avec succès !",
  message = "Merci d'avoir contacté LUCIDE LAB. Notre équipe examinera votre demande et vous recontactera très rapidement."
}) => {
  const [show, setShow] = useState(false);
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRender(true);
      setTimeout(() => setShow(true), 10);
      document.body.style.overflow = 'hidden';
    } else {
      setShow(false);
      setTimeout(() => setRender(false), 400); // match transition duration
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!render) return null;

  return createPortal(
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: show ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0)',
        backdropFilter: show ? 'blur(8px)' : 'blur(0px)',
        transition: 'all 0.4s ease',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '50px 40px',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          transform: show ? 'scale(1)' : 'scale(0.4)',
          opacity: show ? 1 : 0,
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          aria-label="Fermer"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#f1f5f9',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = '#e2e8f0';
            (e.currentTarget as HTMLButtonElement).style.color = '#0f172a';
            (e.currentTarget as HTMLButtonElement).style.transform = 'rotate(90deg)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = '#f1f5f9';
            (e.currentTarget as HTMLButtonElement).style.color = '#64748b';
            (e.currentTarget as HTMLButtonElement).style.transform = 'rotate(0deg)';
          }}
        >
          <X size={20} strokeWidth={2} />
        </button>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: '25px',
          animation: show ? 'pulse 2s infinite' : 'none'
        }}>
          <CheckCircle size={80} style={{ color: '#10b981', filter: 'drop-shadow(0 0 15px rgba(16,185,129,0.4))' }} />
        </div>

        <h3 className="font-artistic" style={{ fontSize: '28px', color: '#0f172a', marginBottom: '15px' }}>
          {title}
        </h3>
        
        <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.6, marginBottom: '30px' }}>
          {message}
        </p>

        <button
          onClick={onClose}
          style={{
            background: '#fd8604',
            color: '#fff',
            border: 'none',
            padding: '12px 30px',
            borderRadius: '100px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(253, 134, 4, 0.4)'
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(253, 134, 4, 0.6)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 15px rgba(253, 134, 4, 0.4)';
          }}
        >
          Fermer
        </button>
      </div>
    </div>,
    document.body
  );
};
