import React, { useState } from 'react';
import { Save, CheckCircle } from 'lucide-react';
import { CommonButton } from '../../components/common/CommonButton';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    siteName: 'LUCIDE LAB',
    tagline: 'Cabinet d\'expertise en communication et croissance de marque',
    phone: '0166285017',
    email: 'lucidelabofficiel@gmail.com',
    address: 'Cotonou, Bénin',
    logoUrl: '/assets/logo-lucidelab.png',
    faviconUrl: '/favicon.ico',
    facebook: 'https://facebook.com/lucidelabofficiel',
    linkedin: 'https://linkedin.com/company/lucidelabofficiel',
    instagram: 'https://instagram.com/lucidelabofficiel',
    metaTitle: 'LUCIDE LAB | Expertise en Communication & Branding au Bénin',
    metaDescription: 'LUCIDE LAB accompagne les entreprises ambitieuses à construire une image de marque cohérente, crédible et performante.'
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h2 style={{ fontSize: '24px', color: '#011a41' }}>Paramètres du Site & Configurations Globale</h2>
          <p style={{ color: '#57647c', fontSize: '14px' }}>Modifiez les coordonnées, le logo, le SEO et les réseaux sociaux.</p>
        </div>
      </div>

      {saved && (
        <div style={{ background: 'rgba(22, 163, 74, 0.1)', color: '#16a34a', border: '1px solid rgba(22, 163, 74, 0.3)', padding: '15px 20px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle size={20} />
          <strong>Paramètres sauvegardés avec succès !</strong>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ background: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
        <h3 style={{ fontSize: '18px', color: '#011a41', marginBottom: '20px', borderBottom: '1px solid #e5e9f2', paddingBottom: '10px' }}>Informations Générales & Coordonnées</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group">
            <label>Nom du Site / Cabinet</label>
            <input type="text" className="form-control" value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} required />
          </div>

          <div className="form-group">
            <label>Accroche Principale (Slogan)</label>
            <input type="text" className="form-control" value={settings.tagline} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} required />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
          <div className="form-group">
            <label>Téléphone Administrable *</label>
            <input type="text" className="form-control" value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} required />
          </div>

          <div className="form-group">
            <label>Email Officiel *</label>
            <input type="email" className="form-control" value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} required />
          </div>

          <div className="form-group">
            <label>Adresse Physique</label>
            <input type="text" className="form-control" value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} required />
          </div>
        </div>

        <h3 style={{ fontSize: '18px', color: '#011a41', margin: '30px 0 20px', borderBottom: '1px solid #e5e9f2', paddingBottom: '10px' }}>Identité Visuelle & Logo (Emplacement Administrable)</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group">
            <label>URL du Logo Officiel</label>
            <input type="text" className="form-control" value={settings.logoUrl} onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })} />
            <small style={{ color: '#57647c' }}>Fourni ultérieurement. Remplaçable en 1 clic.</small>
          </div>

          <div className="form-group">
            <label>URL du Favicon</label>
            <input type="text" className="form-control" value={settings.faviconUrl} onChange={(e) => setSettings({ ...settings, faviconUrl: e.target.value })} />
          </div>
        </div>

        <h3 style={{ fontSize: '18px', color: '#011a41', margin: '30px 0 20px', borderBottom: '1px solid #e5e9f2', paddingBottom: '10px' }}>Réseaux Sociaux & SEO</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
          <div className="form-group">
            <label>Facebook</label>
            <input type="url" className="form-control" value={settings.facebook} onChange={(e) => setSettings({ ...settings, facebook: e.target.value })} />
          </div>
          <div className="form-group">
            <label>LinkedIn</label>
            <input type="url" className="form-control" value={settings.linkedin} onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Instagram</label>
            <input type="url" className="form-control" value={settings.instagram} onChange={(e) => setSettings({ ...settings, instagram: e.target.value })} />
          </div>
        </div>

        <div className="form-group">
          <label>Titre Méta (SEO)</label>
          <input type="text" className="form-control" value={settings.metaTitle} onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })} />
        </div>

        <div className="form-group">
          <label>Description Méta (SEO)</label>
          <textarea className="form-control" rows={3} value={settings.metaDescription} onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}></textarea>
        </div>

        <CommonButton type="submit" variant="orange" style={{ padding: '12px 30px', marginTop: '10px' }}>
          <Save size={16} /> Enregistrer les paramètres
        </CommonButton>
      </form>
    </div>
  );
};
