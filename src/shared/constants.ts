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
} as const;

export type TechIconId =
  | 'flutter'
  | 'nextjs'
  | 'firebase'
  | 'supabase'
  | 'postgresql'
  | 'dart'
  | 'typescript'
  | 'java'
  | 'kotlin'
  | 'swift'
  | 'sql'
  | 'android'
  | 'apple'
  | 'web'
  | 'windows'
  | 'linux';

export interface TechStackItem {
  readonly name: string;
  readonly icon: TechIconId;
}

export interface TechStackGroup {
  readonly label: string;
  readonly items: ReadonlyArray<TechStackItem>;
}

/** Tecnologías, lenguajes y plataformas con los que trabaja la empresa. */
export const COMPANY_TECH_STACK: ReadonlyArray<TechStackGroup> = [
  {
    label: 'Tecnologías',
    items: [
      { name: 'Flutter', icon: 'flutter' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'Firebase', icon: 'firebase' },
      { name: 'Supabase', icon: 'supabase' },
      { name: 'PostgreSQL', icon: 'postgresql' },
    ],
  },
  {
    label: 'Lenguajes',
    items: [
      { name: 'Dart', icon: 'dart' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Java', icon: 'java' },
      { name: 'Kotlin', icon: 'kotlin' },
      { name: 'Swift', icon: 'swift' },
      { name: 'SQL', icon: 'sql' },
    ],
  },
  {
    label: 'Plataformas',
    items: [
      { name: 'Android', icon: 'android' },
      { name: 'iOS', icon: 'apple' },
      { name: 'Web', icon: 'web' },
      { name: 'Windows', icon: 'windows' },
      { name: 'Linux', icon: 'linux' },
      { name: 'macOS', icon: 'apple' },
    ],
  },
];

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
