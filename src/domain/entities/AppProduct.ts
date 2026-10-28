// ============================================================
// DOMAIN LAYER — AppProduct Entity
// Pure TypeScript: no external dependencies.
// A product of the Yeyo Systems ecosystem.
// ============================================================

import type { AppMetric } from './AppMetric';
import type { PlatformLinks } from './PlatformLinks';

export type AppStatus =
  | 'production'
  | 'beta'
  | 'alpha'
  | 'development'
  | 'design'
  | 'planned'
  | 'maintenance'
  | 'deprecated';

export type AppCategory =
  | 'sales'
  | 'education'
  | 'content'
  | 'services'
  | 'institutional';

/** Roadmap group shown on the site, derived from the status. */
export type AppStage = 'production' | 'development' | 'design' | 'planned';

export type Platform =
  | 'android'
  | 'ios'
  | 'web'
  | 'macos'
  | 'windows'
  | 'linux';

export interface AppProduct {
  readonly id: string;
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
  readonly status: AppStatus;
  readonly category: AppCategory;
  /** Key capabilities, most relevant first. */
  readonly highlights: ReadonlyArray<string>;
  /** Next planned capabilities. */
  readonly upcoming?: ReadonlyArray<string>;
  /** Main technologies (e.g. Flutter, Next.js). */
  readonly stack: ReadonlyArray<string>;
  readonly platforms: ReadonlyArray<Platform>;
  readonly links: PlatformLinks;
  /** Public metrics; only meaningful for apps in production. */
  readonly metrics?: AppMetric;
  /** Whether public download or access links exist. */
  readonly isAvailable: boolean;
  /** Unlisted apps are never shown on the public site. */
  readonly isListed: boolean;
}

export function getStatusLabel(status: AppStatus): string {
  const labels: Record<AppStatus, string> = {
    production: 'Estable',
    beta: 'Beta',
    alpha: 'Alpha',
    development: 'En desarrollo',
    design: 'En diseño',
    planned: 'Planificada',
    maintenance: 'Mantenimiento',
    deprecated: 'Descontinuada',
  };
  return labels[status];
}

export function getCategoryLabel(category: AppCategory): string {
  const labels: Record<AppCategory, string> = {
    sales: 'Ventas e inventario',
    education: 'Educación',
    content: 'Contenido',
    services: 'Servicios',
    institutional: 'Institucional',
  };
  return labels[category];
}

/** Deprecated apps have no stage and are not shown. */
export function getAppStage(status: AppStatus): AppStage | null {
  switch (status) {
    case 'production':
    case 'maintenance':
      return 'production';
    case 'beta':
    case 'alpha':
    case 'development':
      return 'development';
    case 'design':
      return 'design';
    case 'planned':
      return 'planned';
    case 'deprecated':
      return null;
  }
}

export const APP_STAGE_ORDER: ReadonlyArray<AppStage> = ['production', 'development', 'design', 'planned'];

export function getStageLabel(stage: AppStage): string {
  const labels: Record<AppStage, string> = {
    production: 'En producción',
    development: 'En desarrollo',
    design: 'En diseño',
    planned: 'Próximamente',
  };
  return labels[stage];
}

/** Statuses with users on a public release (live indicator). */
export function isActiveStatus(status: AppStatus): boolean {
  return status === 'production' || status === 'beta';
}

/** Public metrics are shown only for apps in production. */
export function showsPublicMetrics(app: AppProduct): boolean {
  return getAppStage(app.status) === 'production';
}
