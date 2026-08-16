import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface SectionNavigationProps {
  onScrollUp?: () => void;
  onScrollDown?: () => void;
}

export const SectionNavigation: React.FC<SectionNavigationProps> = ({ onScrollUp, onScrollDown }) => {
  const handleUp = () => {
    if (onScrollUp) {
      onScrollUp();
    } else {
      const container = document.querySelector('.section-snap-container');
      if (container) {
        container.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
      } else {
        window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
      }
    }
  };

  const handleDown = () => {
    if (onScrollDown) {
      onScrollDown();
    } else {
      const container = document.querySelector('.section-snap-container');
      if (container) {
        container.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      } else {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="section-nav-controls" aria-label="Navigation verticale">
      <button onClick={handleUp} className="section-nav-btn" title="Section précédente">
        <ChevronUp size={16} />
      </button>
      <button onClick={handleDown} className="section-nav-btn" title="Section suivante">
        <ChevronDown size={16} />
      </button>
    </div>
  );
};
