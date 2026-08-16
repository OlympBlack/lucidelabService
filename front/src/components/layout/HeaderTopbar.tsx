import React from 'react';
import { Phone, Mail, MapPin, Shield } from 'lucide-react';
import { DigitalClock } from '../common/DigitalClock';
import { Link } from 'react-router-dom';

export const HeaderTopbar: React.FC = () => {
  return (
    <div className="header-topbar">
      <div className="container topbar-wrapper">
        <div className="topbar-info topbar-info-left">
          <div className="topbar-info-item">
            <Phone size={14} style={{ color: '#e91e8c' }} />
            <span>0166285017</span>
          </div>
          <div className="topbar-info-item topbar-hide-mobile">
            <Mail size={14} style={{ color: '#e91e8c' }} />
            <span>lucidelabofficiel@gmail.com</span>
          </div>
          <div className="topbar-info-item topbar-hide-mobile">
            <MapPin size={14} style={{ color: '#e91e8c' }} />
            <span>Cotonou, Bénin</span>
          </div>
        </div>

        <div className="topbar-info topbar-info-right">
          <DigitalClock />
          <Link to="/admin/login" className="topbar-info-item" style={{ color: '#ffffff', opacity: 0.95 }}>
            <Shield size={14} style={{ color: '#e91e8c' }} />
            <span>Espace Admin</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
