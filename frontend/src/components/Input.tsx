import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({ label, className = '', ...rest }: InputProps) {
  return (
    <label className="block">
      {label && <div className="mb-1 text-sm">{label}</div>}
      <input className={`px-2 py-1 border rounded-md ${className}`} {...rest} />
    </label>
  );
}
