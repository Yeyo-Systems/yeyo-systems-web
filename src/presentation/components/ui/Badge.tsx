import React from 'react';

export type BadgeVariant =
  | 'production'
  | 'beta'
  | 'alpha'
  | 'development'
  | 'maintenance'
  | 'deprecated'
  | 'live'
  | 'neutral';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  pulse?: boolean;
}

const badgeStyles: Record<BadgeVariant, string> = {
  production: 'bg-emerald-500/15 text-emerald-500 dark:text-emerald-400 border-emerald-500/30',
  beta: 'bg-blue-500/15 text-blue-500 dark:text-blue-400 border-blue-500/30',
  alpha: 'bg-amber-500/15 text-amber-500 dark:text-amber-400 border-amber-500/30',
  development: 'bg-slate-500/15 text-slate-500 dark:text-slate-400 border-slate-500/30',
  maintenance: 'bg-orange-500/15 text-orange-500 dark:text-orange-400 border-orange-500/30',
  deprecated: 'bg-red-500/15 text-red-500 dark:text-red-400 border-red-500/30',
  live: 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20',
  neutral: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
};

export function Badge({
  variant = 'neutral',
  pulse = false,
  children,
  className = '',
  ...props
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border
        ${badgeStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {pulse && (
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: 'currentColor' }}
        />
      )}
      {children}
    </span>
  );
}
