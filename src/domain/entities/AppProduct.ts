// ============================================================
// DOMAIN LAYER — AppProduct Entity
// Entidad pura de TypeScript: 0 dependencias externas.
// Representa una aplicación del ecosistema Yeyo Systems.
// ============================================================

import type { AppMetric } from './AppMetric';
import type { PlatformLinks } from './PlatformLinks';

export type AppStatus =
  | 'production'
  | 'beta'
  | 'alpha'
  | 'development'
  | 'maintenance'
  | 'deprecated';

export type AppCategory =
  | 'productivity'
  | 'health'
  | 'education'
  | 'ai'
  | 'services'
  | 'experimental';

export interface AppProduct {
  /** Identificador único de la aplicación (slug) */
  readonly id: string;

  /** Nombre público de la aplicación */
  readonly name: string;

  /** Subtítulo o tagline de la aplicación */
  readonly tagline: string;

  /** Descripción larga de la aplicación */
  readonly description: string;

  /** Estado actual de la aplicación */
  readonly status: AppStatus;

  /** Categoría principal de la aplicación */
  readonly category: AppCategory;

  /** Plataformas disponibles */
  readonly platforms: ReadonlyArray<Platform>;

  /** Nombre del ícono (se resolverá en la capa de presentación) */
  readonly iconName: string;

  /** Color primario de la app en formato hex */
  readonly accentColor: string;

  /** Links de descarga y acceso por plataforma */
  readonly links: PlatformLinks;

  /** Métricas públicas (puede ser undefined si aún no hay datos) */
  readonly metrics?: AppMetric;

  /** Fecha de lanzamiento público */
  readonly launchDate?: string;

  /** ¿Está disponible para descarga/acceso? */
  readonly isAvailable: boolean;
}

export type Platform =
  | 'android'
  | 'ios'
  | 'web'
  | 'macos'
  | 'windows'
  | 'linux';

/** Helper: retorna un label legible para el estado de la app */
export function getStatusLabel(status: AppStatus): string {
  const labels: Record<AppStatus, string> = {
    production: 'Production',
    beta: 'Beta',
    alpha: 'Alpha',
    development: 'In Development',
    maintenance: 'Maintenance',
    deprecated: 'Deprecated',
  };
  return labels[status];
}

/** Helper: retorna si el estado indica disponibilidad activa */
export function isActiveStatus(status: AppStatus): boolean {
  return status === 'production' || status === 'beta' || status === 'alpha';
}
