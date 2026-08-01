import React, { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { CommonButton } from './CommonButton';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
  isOpen, onClose, onConfirm, title, message, 
  confirmText = 'Supprimer', cancelText = 'Annuler' 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(1, 26, 65, 0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1100, padding: '20px'
    }}>
      <div style={{
        background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '400px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)', padding: '30px'
      }}>
        <div style={{
          width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(251, 36, 72, 0.1)',
          color: '#fb2448', display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <AlertTriangle size={32} />
        </div>
        
        <h3 style={{ margin: '0 0 10px 0', fontSize: '20px', color: '#011a41' }}>{title}</h3>
        <p style={{ margin: '0 0 25px 0', color: '#57647c', fontSize: '14px', lineHeight: '1.6' }}>
          {message}
        </p>

        <div style={{ display: 'flex', gap: '12px', width: '100%', justifyContent: 'center' }}>
          <CommonButton type="button" variant="dark" onClick={onClose} style={{ flex: 1, justifyContent: 'center' }}>
            {cancelText}
          </CommonButton>
          <CommonButton type="button" onClick={() => { onConfirm(); onClose(); }} style={{ flex: 1, justifyContent: 'center', background: '#fb2448', color: '#fff' }}>
            {confirmText}
          </CommonButton>
        </div>
      </div>
    </div>
  );
};
