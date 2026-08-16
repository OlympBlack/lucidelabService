import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import type { SocialLink } from '../../services/api';

export const SocialSection: React.FC = () => {
  const [socials, setSocials] = useState<SocialLink[]>([]);

  useEffect(() => {
    api.getSocialLinks().then((data) => {
      if (data && data.length > 0) {
        setSocials(data);
      } else {
        // Fallback default social links if server seeders are loading
        setSocials([
          { id: 1, name: 'Email', platform: 'email', url: 'mailto:lucidelabofficiel@gmail.com' },
          { id: 2, name: 'Facebook', platform: 'facebook', url: 'https://facebook.com/lucidelabofficiel' },
          { id: 3, name: 'LinkedIn', platform: 'linkedin', url: 'https://linkedin.com/company/lucidelabofficiel' },
          { id: 4, name: 'Twitter', platform: 'twitter', url: 'https://twitter.com/lucidelabofficiel' },
          { id: 5, name: 'Instagram', platform: 'instagram', url: 'https://instagram.com/lucidelabofficiel' },
          { id: 6, name: 'WhatsApp', platform: 'whatsapp', url: 'https://wa.me/2290166285017' },
        ]);
      }
    });
  }, []);

  const renderPlatformSvg = (platform: string) => {
    const p = platform.toLowerCase();

    if (p.includes('mail')) {
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      );
    }
    if (p.includes('face')) {
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      );
    }
    if (p.includes('link')) {
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3z"/>
        </svg>
      );
    }
    if (p.includes('twit') || p.includes('x')) {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    }
    if (p.includes('insta')) {
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      );
    }
    if (p.includes('what')) {
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      );
    }
    if (p.includes('you')) {
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    }
    if (p.includes('tik')) {
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.34V9.05a8.16 8.16 0 0 0 4.91 1.63V7.24a4.85 4.85 0 0 1-1-.55z"/>
        </svg>
      );
    }

    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    );
  };

  return (
    <section style={{
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url(/assets/images/contact.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      padding: '80px 20px',
      position: 'relative',
      zIndex: 3
    }}>
      <div style={{
        maxWidth: '920px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.55)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '16px',
        padding: '50px 30px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
        border: '1px solid rgba(255, 255, 255, 0.7)',
        textAlign: 'center'
      }}>
        <h2 className="font-artistic" style={{
          fontSize: '32px',
          fontWeight: 700,
          color: '#111827',
          marginBottom: '35px',
          letterSpacing: '0.5px'
        }}>
          Suivez-nous sur nos réseaux !
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
          gap: '25px 15px',
          justifyItems: 'center',
          alignItems: 'center'
        }}>
          {socials.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                color: '#4b5563',
                transition: 'transform 0.25s ease, color 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                const circle = e.currentTarget.querySelector('.social-circle-btn') as HTMLElement;
                if (circle) {
                  circle.style.backgroundColor = '#004C99';
                  circle.style.transform = 'scale(1.08)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                const circle = e.currentTarget.querySelector('.social-circle-btn') as HTMLElement;
                if (circle) {
                  circle.style.backgroundColor = '#000000';
                  circle.style.transform = 'scale(1)';
                }
              }}
            >
              <div
                className="social-circle-btn"
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.25s ease'
                }}
              >
                {renderPlatformSvg(item.platform)}
              </div>
              <span style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#374151',
                fontFamily: "'Amaranth', sans-serif"
              }}>
                {item.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
