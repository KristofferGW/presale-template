import React from 'react';
import Button from './Button';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
};

export default function Modal({ open, onClose, title, children, footer }: ModalProps) {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} onClick={onClose} />
      <div style={{ position: 'relative', maxWidth: 640, margin: '6vh auto', background: 'white', borderRadius: 8, padding: 16 }}>
        {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
        <div>{children}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
          {footer ?? <Button onClick={onClose}>Close</Button>}
        </div>
      </div>
    </div>
  );
}
