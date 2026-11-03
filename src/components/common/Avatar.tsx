import React, { useState } from 'react';

export interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  id?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = 'Student',
  size = 'md',
  className = '',
  id
}) => {
  const [imgError, setImgError] = useState(false);

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base font-semibold',
    xl: 'w-20 h-20 text-xl font-bold'
  };

  return (
    <div
      id={id}
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 select-none ${sizeStyles[size]} ${className}`}
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};
