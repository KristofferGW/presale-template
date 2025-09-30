import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

export default function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium';
  const variants: Record<string, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    ghost: 'bg-transparent text-blue-600 hover:underline',
  };

  const cls = `${base} ${variants[variant] ?? variants.primary} ${className}`;

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
