import React, { useEffect, useState } from 'react';

const MatchingRateCircle = ({ initialRate = 85, maxRate = 95, animated = true }) => {
  const [rate, setRate] = useState(initialRate);
  
  useEffect(() => {
    if (animated && initialRate < maxRate) {
      // Animer le taux de matching
      let currentRate = initialRate;
      const interval = setInterval(() => {
        currentRate += 1;
        setRate(currentRate);
        if (currentRate >= maxRate) {
          clearInterval(interval);
        }
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [initialRate, maxRate, animated]);
  
  // Calcul des propriétés du cercle SVG
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (rate / 100) * circumference;
  
  return (
    <div className="matching-rate-circle">
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Cercle de fond */}
        <circle 
          cx="60" 
          cy="60" 
          r={radius} 
          fill="none" 
          stroke="#2a2a40" 
          strokeWidth="12" 
        />
        
        {/* Cercle de progression */}
        <circle 
          cx="60" 
          cy="60" 
          r={radius} 
          fill="none" 
          stroke="#8c52ff" 
          strokeWidth="12" 
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 60 60)" // Pour que le cercle commence en haut
          strokeLinecap="round"
        />
        
        {/* Texte du pourcentage */}
        <text 
          x="60" 
          y="60" 
          textAnchor="middle" 
          dominantBaseline="middle" 
          fill="white" 
          fontSize="24px" 
          fontWeight="bold"
        >
          {rate}%
        </text>
      </svg>
    </div>
  );
};

export default MatchingRateCircle;