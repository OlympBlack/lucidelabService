import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { api } from '../../services/api';

export const AdminPartners: React.FC = () => {
  const [testimonials, setTestimonials] = useState([
    { id: 1, name: 'Marc Lawson', role: 'Directeur Général, FinTech Bénin', comment: 'LUCIDE LAB a totalement métamorphosé notre image de marque.' },
    { id: 2, name: 'Sophie Tossou', role: 'Fondatrice, AgroTech Solutions', comment: 'L\'équipe a su capter l\'essence de notre projet et créer une plateforme web performante.' },
  ]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h2 style={{ fontSize: '24px', color: '#011a41' }}>Partenaires & Témoignages Clients</h2>
          <p style={{ color: '#57647c', fontSize: '14px' }}>Gérez la section "Ils nous font confiance" et les recommandations.</p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Client / Partenaire</th>
              <th>Fonction</th>
              <th>Témoignage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t) => (
              <tr key={t.id}>
                <td><strong>{t.name}</strong></td>
                <td>{t.role}</td>
                <td><em style={{ fontSize: '13px' }}>"{t.comment}"</em></td>
                <td>
                  <button onClick={() => setTestimonials(testimonials.filter(x => x.id !== t.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fb2448' }}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([
    { id: 1, name: 'Jean-Marc Dagba', email: 'jmd@entreprise-benin.bj', phone: '0166285017', service: 'STRATEGY', message: 'Nous souhaitons un audit complet de notre branding...', created_at: 'Aujourd\'hui 11:30' },
    { id: 2, name: 'Bernadette Kpadonou', email: 'b.k@agrotech.bj', phone: '0199001122', service: 'BRAND', message: 'Demande de devis pour création de charte graphique...', created_at: 'Hier 16:45' },
    { id: 3, name: 'Christian Akpo', email: 'c.akpo@logistique.com', phone: '0122334455', service: 'GROWTH', message: 'Besoin d\'une stratégie Google Ads et LinkedIn Ads ciblée...', created_at: '30 Juil 2026' },
  ]);

  useEffect(() => {
    api.getAdminMessages().then((data) => {
      if (data && data.length > 0) {
        setMessages(data);
      }
    });
  }, []);

  const handleDelete = (id: number) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', color: '#011a41', marginBottom: '10px' }}>Messages & Inscriptions Contact</h2>
      <p style={{ color: '#57647c', fontSize: '14px', marginBottom: '25px' }}>Consultez et gérez les demandes d'accompagnement envoyées depuis le site web à l'API Laravel.</p>

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Expéditeur</th>
              <th>Email / Tél</th>
              <th>Pôle Souhaité</th>
              <th>Message</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => (
              <tr key={m.id}>
                <td><strong>{m.name}</strong></td>
                <td>
                  <div>{m.email}</div>
                  <div style={{ fontSize: '12px', color: '#57647c' }}>{m.phone}</div>
                </td>
                <td><span style={{ background: '#f4f7fc', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>{m.service}</span></td>
                <td><div style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.message}</div></td>
                <td>{m.created_at ? new Date(m.created_at).toLocaleDateString('fr-FR') : 'Récemment'}</td>
                <td>
                  <button onClick={() => handleDelete(m.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fb2448' }}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
