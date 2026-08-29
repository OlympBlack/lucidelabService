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
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '24px',
          padding: '50px 40px',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          transform: show ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
          opacity: show ? 1 : 0,
          transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
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
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#ffffff',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = '#fd8604';
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#fd8604';
            (e.currentTarget as HTMLButtonElement).style.transform = 'rotate(90deg)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)';
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

        <h3 className="font-artistic" style={{ fontSize: '28px', color: '#ffffff', marginBottom: '15px' }}>
          {title}
        </h3>
        
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', lineHeight: 1.6, marginBottom: '30px' }}>
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
