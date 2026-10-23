// ============================================================
// SHARED LAYER — Constants & Global Configurations
// Pure TypeScript definitions & constants for Yeyo Systems.
// ============================================================

export const COMPANY_NAME = 'Yeyo Systems';
export const COMPANY_LEGAL_NAME = 'Yeyo Systems S.A.S.';
export const COMPANY_TAGLINE = 'Multi-Platform Software Ecosystem in Flutter';
export const SITE_URL = 'https://yeyosystems.com';
export const GITHUB_ORG_URL = 'https://github.com/Yeyo-Systems';

export const BRAND_COLORS = {
  smokeLight: '#F8FAFC',
  smokeDark: '#0B0F17',
  slateSurface: '#1E293B',
  indigoAccent: '#4F46E5',
  indigoHover: '#4338CA',
  emeraldActive: '#10B981',
  emeraldHover: '#059669',
  violetGlow: '#7C3AED',
  cyanGlow: '#00F0FF',
} as const;

export const ECOSYSTEM_APPS_IDS = [
  'khatu',
  'cortex',
  'saberio',
  'khatu-services',
  'amateur-things',
] as const;

export type EcosystemAppId = (typeof ECOSYSTEM_APPS_IDS)[number];

export const FIRESTORE_COLLECTIONS = {
  PUBLIC_APP_METRICS: 'public_app_metrics',
} as const;
