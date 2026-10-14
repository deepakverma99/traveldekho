'use client';

import React from 'react';

export const FloatingDecorations: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Ambient background glows */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, rgb(255, 209, 51) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/2 -right-48 w-[500px] h-[500px] rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, rgb(255, 209, 51) 0%, transparent 70%)',
        }}
      />
    </div>
  );
};
