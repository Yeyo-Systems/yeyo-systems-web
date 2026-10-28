import {
  siAndroid,
  siApple,
  siDart,
  siFirebase,
  siFlutter,
  siKotlin,
  siLinux,
  siNextdotjs,
  siOpenjdk,
  siPostgresql,
  siSupabase,
  siSwift,
  siTypescript,
} from 'simple-icons';
import type { TechIconId } from '@/shared/constants';

interface IconShape {
  path: string;
  /** Outline icons (24px grid, stroke) instead of filled brand glyphs. */
  stroke?: boolean;
}

// Simple Icons (CC0) has no Java or Windows logos for trademark reasons:
// Java uses OpenJDK; Windows, SQL and Web use neutral glyphs.
const ICONS: Record<TechIconId, IconShape> = {
  flutter: { path: siFlutter.path },
  nextjs: { path: siNextdotjs.path },
  firebase: { path: siFirebase.path },
  supabase: { path: siSupabase.path },
  postgresql: { path: siPostgresql.path },
  dart: { path: siDart.path },
  typescript: { path: siTypescript.path },
  java: { path: siOpenjdk.path },
  kotlin: { path: siKotlin.path },
  swift: { path: siSwift.path },
  android: { path: siAndroid.path },
  apple: { path: siApple.path },
  linux: { path: siLinux.path },
  windows: { path: 'M3 3h8.5v8.5H3zM12.5 3H21v8.5h-8.5zM3 12.5h8.5V21H3zM12.5 12.5H21V21h-8.5z' },
  sql: {
    stroke: true,
    path: 'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125',
  },
  web: {
    stroke: true,
    path: 'M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418',
  },
};

interface TechIconProps {
  icon: TechIconId;
  className?: string;
}

/** Monochrome icon (currentColor) so it follows the corporate palette. */
export function TechIcon({ icon, className = 'w-4 h-4' }: TechIconProps) {
  const { path, stroke } = ICONS[icon];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill={stroke ? 'none' : 'currentColor'}
      stroke={stroke ? 'currentColor' : undefined}
      strokeWidth={stroke ? 1.5 : undefined}
      strokeLinecap={stroke ? 'round' : undefined}
      strokeLinejoin={stroke ? 'round' : undefined}
    >
      <path d={path} />
    </svg>
  );
}
