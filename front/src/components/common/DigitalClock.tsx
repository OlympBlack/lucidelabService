import React, { useState, useEffect } from 'react';

export const DigitalClock: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDigits = (num: number) => num.toString().padStart(2, '0');

  const hours = formatDigits(time.getHours());
  const minutes = formatDigits(time.getMinutes());
  const seconds = formatDigits(time.getSeconds());

  return (
    <div className="digital-clock" title="Heure locale Cotonou (Bénin)">
      <span className="clock-pulse-dot"></span>
      <span className="clock-label">Cotonou</span>
      <span className="clock-time">{hours}:{minutes}:{seconds}</span>
    </div>
  );
};
