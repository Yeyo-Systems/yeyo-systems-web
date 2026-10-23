// ============================================================
// DOMAIN LAYER — AppMetric Entity
// Representa métricas públicas anónimas de una aplicación.
// No contiene datos de usuarios identificables (GDPR-safe).
// ============================================================

export interface AppMetric {
  /** ID de la app a la que pertenecen estas métricas */
  readonly appId: string;

  /** Usuarios activos en los últimos 30 días (aproximado) */
  readonly activeUsers30d: number;

  /** Total de instalaciones/descargas históricas */
  readonly totalDownloads: number;

  /** Calificación promedio en tiendas (0-5) */
  readonly averageRating: number;

  /** Número de valoraciones recibidas */
  readonly totalRatings: number;

  /** Versión más reciente disponible */
  readonly latestVersion: string;

  /** Timestamp de la última actualización de métricas (ISO 8601) */
  readonly lastUpdatedAt: string;

  /** Métricas adicionales opcionales (extensible por app) */
  readonly extra?: Record<string, number | string>;
}

/** Helper: formatea el número de descargas para mostrar en UI */
export function formatDownloads(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}K`;
  }
  return count.toString();
}

/** Helper: formatea el rating con el símbolo de estrella */
export function formatRating(rating: number): string {
  return `${rating.toFixed(1)} ★`;
}

/** Crea una métrica vacía/placeholder para una app sin datos */
export function createEmptyMetric(appId: string): AppMetric {
  return {
    appId,
    activeUsers30d: 0,
    totalDownloads: 0,
    averageRating: 0,
    totalRatings: 0,
    latestVersion: '0.0.0',
    lastUpdatedAt: new Date().toISOString(),
  };
}
