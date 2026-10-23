// ============================================================
// DOMAIN LAYER — PlatformLinks Entity
// Agrupa los links de descarga y acceso por plataforma.
// Todos los campos son opcionales: no todas las apps
// están en todas las plataformas.
// ============================================================

export interface PlatformLinks {
  /** URL de la versión web / landing page de la app */
  readonly web?: string;

  /** URL de Google Play Store */
  readonly playStore?: string;

  /** URL de Apple App Store */
  readonly appStore?: string;

  /** URL de descarga para macOS */
  readonly macOS?: string;

  /** URL de descarga para Windows */
  readonly windows?: string;

  /** URL de descarga para Linux */
  readonly linux?: string;

  /** URL del repositorio GitHub (si es open source) */
  readonly github?: string;

  /** URL de documentación pública */
  readonly docs?: string;
}

/** Helper: retorna las plataformas disponibles como array */
export function getAvailablePlatforms(links: PlatformLinks): string[] {
  const platformMap: Array<[keyof PlatformLinks, string]> = [
    ['android' as never, 'Android'],
    ['playStore', 'Android'],
    ['appStore', 'iOS'],
    ['web', 'Web'],
    ['macOS', 'macOS'],
    ['windows', 'Windows'],
    ['linux', 'Linux'],
  ];

  return platformMap
    .filter(([key]) => links[key as keyof PlatformLinks])
    .map(([, label]) => label)
    .filter((v, i, arr) => arr.indexOf(v) === i); // Deduplicar
}

/** Helper: ¿tiene al menos un link de descarga móvil? */
export function hasMobileDownload(links: PlatformLinks): boolean {
  return Boolean(links.playStore || links.appStore);
}

/** Helper: ¿tiene descarga para escritorio? */
export function hasDesktopDownload(links: PlatformLinks): boolean {
  return Boolean(links.macOS || links.windows || links.linux);
}
