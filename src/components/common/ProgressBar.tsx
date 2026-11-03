import React from 'react';

export interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  showPercentage?: boolean;
  color?: 'indigo' | 'emerald' | 'amber' | 'cyan';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  id?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  showPercentage = false,
  color = 'indigo',
  size = 'md',
  className = '',
  id
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  const colorStyles = {
    indigo: 'bg-indigo-600 dark:bg-indigo-500',
    emerald: 'bg-emerald-500 dark:bg-emerald-400',
    amber: 'bg-amber-500 dark:bg-amber-400',
    cyan: 'bg-cyan-500 dark:bg-cyan-400'
  };

  return (
    <div id={id} className={`w-full ${className}`}>
      <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`${sizeStyles[size]} ${colorStyles[color]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showPercentage && (
        <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
          <span>Progress</span>
          <span>{percentage}%</span>
        </div>
      )}
    </div>
  );
};
