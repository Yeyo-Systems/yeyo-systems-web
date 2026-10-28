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
  /** Muestra el punto indicador de estado. */
  dot?: boolean;
}

const neutral = 'bg-surface-muted text-fg-muted border-line';

const badgeStyles: Record<BadgeVariant, string> = {
  production: 'bg-live/10 text-fg border-live/40',
  live: 'bg-live/10 text-fg border-live/40',
  beta: 'bg-brand/10 text-brand-fg border-brand/40',
  alpha: neutral,
  development: neutral,
  maintenance: neutral,
  deprecated: neutral,
  neutral,
};

const dotStyles: Record<BadgeVariant, string> = {
  production: 'bg-live',
  live: 'bg-live',
  beta: 'bg-brand-fg',
  alpha: 'bg-fg-muted',
  development: 'bg-fg-muted',
  maintenance: 'bg-fg-muted',
  deprecated: 'bg-fg-muted',
  neutral: 'bg-fg-muted',
};

export function Badge({
  variant = 'neutral',
  dot = false,
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
      {dot && <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full ${dotStyles[variant]}`} />}
      {children}
    </span>
  );
}
