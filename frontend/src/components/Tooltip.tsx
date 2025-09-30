import React, { useState } from 'react';

type TooltipProps = {
  text: React.ReactNode;
  children: React.ReactNode;
};

export default function Tooltip({ text, children }: TooltipProps) {
  const [hover, setHover] = useState(false);
  return (
    <span style={{ position: 'relative', display: 'inline-block' }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {children}
      <span style={{
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        whiteSpace: 'nowrap',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '4px 8px',
        borderRadius: 4,
        fontSize: 12,
        visibility: hover ? 'visible' : 'hidden',
        opacity: hover ? 1 : 0,
        transition: 'opacity .12s'
      }}>
        {text}
      </span>
    </span>
  );
}
