import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

export interface Testimonial {
  name: string;
  role: string;
  comment: string;
  rating: number;
  avatar?: string; // optional photo URL
}

interface TestimonialsCarouselProps {
  items: Testimonial[];
  autoPlayMs?: number;
}

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  items,
  autoPlayMs = 8000,
}) => {
  const looped = [...items, ...items];

  const [offset, setOffset] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [visible, setVisible] = useState(3);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const advance = useCallback(() => {
    setTransitioning(true);
    setOffset((prev) => prev + 1);
  }, []);

  // Silent reset when we reach the end of first copy
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

  useEffect(() => {
    timerRef.current = setInterval(advance, autoPlayMs);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [advance, autoPlayMs]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, autoPlayMs);
  };

  const goTo = (idx: number) => {
    resetTimer();
    setTransitioning(true);
    setOffset(idx);
  };

  const goPrev = () => {
    resetTimer();
    setTransitioning(true);
    setOffset((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goNext = () => {
    resetTimer();
    advance();
  };

  const translateX = -(offset * cardWidthPct);

  const activeIdx = offset % items.length;

  const btnStyle: React.CSSProperties = {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    border: '1px solid rgba(253,134,4,0.3)',
    background: 'rgba(255,255,255,0.12)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#ffffff',
    zIndex: 10,
    transition: 'all 0.25s ease',
    backdropFilter: 'blur(4px)',
    position: 'absolute',
    top: '40%',
    transform: 'translateY(-50%)',
  };

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
        {looped.map((t, idx) => (
          <div
            key={idx}
            style={{
              flex: `0 0 ${cardWidthPct}%`,
              padding: '0 12px',
              boxSizing: 'border-box',
            }}
          >
            <div style={{
              background: '#ffffff',
              border: '1px solid #e5e9f2',
              borderRadius: '16px',
              padding: '32px 26px',
              boxShadow: '0 4px 20px rgba(1,34,188,0.07)',
              position: 'relative',
              height: '100%',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {/* Decorative quote */}
              <Quote
                size={36}
                style={{
                  color: 'rgba(253,134,4,0.15)',
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                }}
              />

              {/* Stars */}
              <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={15} fill="#ffc107" color="#ffc107" />
                ))}
              </div>

              {/* Comment */}
              <p style={{
                color: '#1e293b',
                fontStyle: 'italic',
                fontSize: '14px',
                lineHeight: '1.75',
                flexGrow: 1,
                marginBottom: '22px',
              }}>
                "{t.comment}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid #f0f3f9', paddingTop: '16px' }}>
                {/* Avatar — photo or initials */}
                {t.avatar ? (
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      flexShrink: 0,
                      border: '2px solid #fd8604',
                    }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : (
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #004C99, #fd8604)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '16px',
                    flexShrink: 0,
                  }}>
                    {t.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 style={{ fontSize: '15px', color: '#004C99', margin: '0 0 2px' }}>{t.name}</h4>
                  <p style={{ color: '#fd8604', fontSize: '12px', fontWeight: '600', margin: 0 }}>{t.role}</p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={goPrev}
        aria-label="Témoignage précédent"
        style={{ ...btnStyle, left: '-14px' }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = '#fd8604';
          (e.currentTarget as HTMLButtonElement).style.borderColor = '#fd8604';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(253,134,4,0.3)';
        }}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Next Button */}
      <button
        onClick={goNext}
        aria-label="Témoignage suivant"
        style={{ ...btnStyle, right: '-14px' }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = '#fd8604';
          (e.currentTarget as HTMLButtonElement).style.borderColor = '#fd8604';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(253,134,4,0.3)';
        }}
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot Indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '28px' }}>
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Témoignage ${idx + 1}`}
            style={{
              width: activeIdx === idx ? '28px' : '8px',
              height: '8px',
              borderRadius: '4px',
              border: 'none',
              background: activeIdx === idx ? '#fd8604' : 'rgba(253,134,4,0.25)',
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
