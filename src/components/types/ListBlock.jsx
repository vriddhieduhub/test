import React from 'react';

export const ListBlock = ({ items, progress }) => {
  // প্রগ্রেস অনুযায়ী একটার পর একটা আইটেম রিভিল হবে
  const itemsToShow = Math.floor((progress / 100) * (items.length + 1));

  return (
    <ul style={{ listStyleType: 'disc', paddingLeft: '30px', margin: 0, fontSize: '35px', fontFamily: "'Kalam', cursive", color: '#1e3a8a' }}>
      {items.map((item, index) => {
        if (index >= itemsToShow) return null;
        return (
          <li key={index} style={{ marginBottom: '20px', animation: 'pop 0.3s ease-out' }}>
            {item}
          </li>
        );
      })}
    </ul>
  );
};