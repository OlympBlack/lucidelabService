import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { resolveImageUrl, type Realisation } from '../../services/api';

interface RealisationsCarouselProps {
  items: Realisation[];
  autoPlayMs?: number;
}



export const RealisationsCarousel: React.FC<RealisationsCarouselProps> = ({
  items,
  autoPlayMs = 8000,
}) => {
  // We duplicate items to create a seamless infinite loop:
  // [items... items...] — when we reach the end of first copy, we instantly reset
  const looped = [...items, ...items];

  const [offset, setOffset] = useState(0);       // current card index (0-based, into looped array)
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // How many cards visible at once depends on viewport
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setVisible(1);
      else if (window.innerWidth < 1024) setVisible(2);
      else setVisible(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const cardWidthPct = 100 / visible;

  // Advance one card to the left
  const advance = useCallback(() => {
    setTransitioning(true);
    setOffset((prev) => {
      const next = prev + 1;
      // When we've consumed all originals, snap back without transition
      if (next >= items.length) {
        // schedule snap after transition ends
        return next;
      }
      return next;
    });
  }, [items.length]);

  // Handle end of looped section — silent reset
  useEffect(() => {
    if (!transitioning) return;
    const t = setTimeout(() => {
      if (offset >= items.length) {
        setTransitioning(false);
        setOffset(0);
      } else {
        setTransitioning(false);
      }
    }, 650);
    return () => clearTimeout(t);
  }, [offset, transitioning, items.length]);

  // Start autoplay
  useEffect(() => {
    timerRef.current = setInterval(advance, autoPlayMs);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [advance, autoPlayMs]);

  const goTo = (idx: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTransitioning(true);
    setOffset(idx);
    timerRef.current = setInterval(advance, autoPlayMs);
  };

  const goPrev = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTransitioning(true);
    setOffset((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    timerRef.current = setInterval(advance, autoPlayMs);
  };

  const goNext = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    advance();
    timerRef.current = setInterval(advance, autoPlayMs);
  };

  const translateX = -(offset * cardWidthPct);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Track */}
      <div
        style={{
          display: 'flex',
          transform: `translateX(${translateX}%)`,
          transition: transitioning ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          willChange: 'transform',
        }}
      >
        {looped.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            style={{
              flex: `0 0 ${cardWidthPct}%`,
              padding: '0 10px',
              boxSizing: 'border-box',
            }}
          >
            <div className="portfolio-card" style={{ height: '100%' }}>
              <div className="portfolio-img-wrapper">
                <img
                  src={resolveImageUrl(item.image_url, item.category)}
                  alt={item.title}
                  onError={(e) => { (e.target as HTMLImageElement).src = resolveImageUrl('', item.category); }}
                />
              </div>
              <div className="portfolio-body">
                <span className="portfolio-tag">
                  {item.category}{item.year ? ` • ${item.year}` : ''}
                </span>
                <h3 style={{ fontSize: '17px', marginBottom: '8px', color: '#004C99', lineHeight: '1.35' }}>
                  {item.title}
                </h3>
                {item.client_name && (
                  <p style={{ color: '#fd8604', fontWeight: '600', fontSize: '13px', marginBottom: '8px' }}>
                    Client : {item.client_name}
                  </p>
                )}
                <p style={{ color: '#57647c', fontSize: '13px', lineHeight: '1.55', margin: 0 }}>
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={goPrev}
        aria-label="Projet précédent"
        style={{
          position: 'absolute',
          left: '-14px',
          top: '40%',
          transform: 'translateY(-50%)',
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          border: '1px solid rgba(0,76,153,0.2)',
          background: '#ffffff',
          boxShadow: '0 4px 16px rgba(0,76,153,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#004C99',
          zIndex: 10,
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = '#004C99';
          (e.currentTarget as HTMLButtonElement).style.color = '#fff';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = '#ffffff';
          (e.currentTarget as HTMLButtonElement).style.color = '#004C99';
        }}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Next Button */}
      <button
        onClick={goNext}
        aria-label="Projet suivant"
        style={{
          position: 'absolute',
          right: '-14px',
          top: '40%',
          transform: 'translateY(-50%)',
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          border: '1px solid rgba(0,76,153,0.2)',
          background: '#ffffff',
          boxShadow: '0 4px 16px rgba(0,76,153,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#004C99',
          zIndex: 10,
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = '#004C99';
          (e.currentTarget as HTMLButtonElement).style.color = '#fff';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = '#ffffff';
          (e.currentTarget as HTMLButtonElement).style.color = '#004C99';
        }}
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot Indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Projet ${idx + 1}`}
            style={{
              width: (offset % items.length) === idx ? '28px' : '8px',
              height: '8px',
              borderRadius: '4px',
              border: 'none',
              background: (offset % items.length) === idx ? '#fd8604' : 'rgba(1,34,188,0.2)',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.35s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};
