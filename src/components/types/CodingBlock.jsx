import React from 'react';

export const CodingBlock = ({ code, progress }) => {
  const charsToShow = Math.floor((progress / 100) * code.length);

  return (
    <div style={{ backgroundColor: '#1e1e1e', padding: '25px', borderRadius: '12px', width: '700px', boxShadow: '0 10px 20px rgba(0,0,0,0.15)' }}>
      <pre style={{ margin: 0, fontFamily: "'Courier New', Courier, monospace", fontSize: '24px', color: '#4ade80', whiteSpace: 'pre-wrap' }}>
        <code>{code.substring(0, charsToShow)}</code>
      </pre>
    </div>
  );
};