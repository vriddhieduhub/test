import React from 'react';

export const ParagraphBlock = ({ text, progress }) => {
  const chars = text.split("");
  const totalChars = chars.length;

  return (
    <p style={{ fontSize: '48px', color: '#333', margin: 0, width: '750px', lineHeight: '1.4', fontFamily: "'Kalam', cursive", display: 'flex', flexWrap: 'wrap', whiteSpace: 'pre-wrap' }}>
      {chars.map((char, index) => {
        const charThreshold = (index / totalChars) * 100;
        
        let opacity = 0;
        if (progress > charThreshold) {
          opacity = Math.min((progress - charThreshold) / 3, 1);
        }

        return (
          <span 
            key={index} 
            style={{ 
              opacity: opacity,
              transform: `scale(${opacity * 0.05 + 0.95})`,
              display: 'inline-block'
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </p>
  );
};