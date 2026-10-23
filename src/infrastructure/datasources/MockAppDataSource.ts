// ============================================================
// INFRASTRUCTURE LAYER — MockAppDataSource
// DataSource de respaldo para desarrollo local.
// Provee datos realistas de las 5 apps del ecosistema
// cuando Firebase no está configurado.
// ============================================================

import type { AppProduct } from '@/domain/entities/AppProduct';
import type { AppMetric } from '@/domain/entities/AppMetric';
import type { UnsubscribeFn } from '@/domain/repositories/IAppRepository';

const MOCK_APPS: AppProduct[] = [
  {
    id: 'khatu',
    name: 'Khatu',
    tagline: 'Tu salud, simplificada.',
    description:
      'Aplicación integral de bienestar y salud personal. Lleva el control de tus hábitos, medicamentos y métricas de salud con una experiencia fluida en Flutter.',
    status: 'production',
    category: 'health',
    platforms: ['android', 'ios'],
    iconName: 'khatu',
    accentColor: '#4F46E5',
    isAvailable: true,
    launchDate: '2024-03-01',
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.yeyosystems.khatu',
      appStore: 'https://apps.apple.com/app/khatu',
    },
  },
  {
    id: 'cortex',
    name: 'Cortex',
    tagline: 'IA que trabaja contigo.',
    description:
      'Asistente de inteligencia artificial multiplataforma potenciado por Gemini. Diseñado para productividad profesional y personal con integración nativa en Flutter.',
    status: 'beta',
    category: 'ai',
    platforms: ['android', 'ios', 'web'],
    iconName: 'cortex',
    accentColor: '#7C3AED',
    isAvailable: true,
    launchDate: '2024-09-15',
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.yeyosystems.cortex',
      appStore: 'https://apps.apple.com/app/cortex',
      web: 'https://cortex.yeyosystems.com',
    },
  },
  {
    id: 'saberio',
    name: 'Saberio',
    tagline: 'Aprende. Practica. Domina.',
    description:
      'Plataforma educativa adaptativa con rutas de aprendizaje personalizadas. Combina gamificación y técnicas de estudio probadas en una experiencia Flutter premium.',
    status: 'beta',
    category: 'education',
    platforms: ['android', 'ios', 'web'],
    iconName: 'saberio',
    accentColor: '#0891B2',
    isAvailable: true,
    launchDate: '2024-11-01',
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.yeyosystems.saberio',
      web: 'https://saberio.yeyosystems.com',
    },
  },
  {
    id: 'khatu-services',
    name: 'Khatu Services',
    tagline: 'Bienestar corporativo a escala.',
    description:
      'Solución B2B de gestión de salud y bienestar para equipos de trabajo. Dashboard analítico, programas de wellness y reportes de empresa en tiempo real.',
    status: 'alpha',
    category: 'services',
    platforms: ['web', 'android', 'ios'],
    iconName: 'khatu-services',
    accentColor: '#059669',
    isAvailable: false,
    links: {
      web: 'https://services.khatu.app',
    },
  },
  {
    id: 'amateur-things',
    name: 'Amateur Things',
    tagline: 'Proyectos que cuestionan lo ordinario.',
    description:
      'Colección de experimentos, herramientas y proyectos de código abierto construidos por Yeyo Systems. Laboratorio de ideas y tecnologías emergentes.',
    status: 'development',
    category: 'experimental',
    platforms: ['web'],
    iconName: 'amateur-things',
    accentColor: '#D97706',
    isAvailable: true,
    links: {
      web: 'https://amateur-things.com',
      github: 'https://github.com/Yeyo-Systems/amateur-things',
    },
  },
];

const MOCK_METRICS: AppMetric[] = [
  {
    appId: 'khatu',
    activeUsers30d: 2847,
    totalDownloads: 15420,
    averageRating: 4.7,
    totalRatings: 892,
    latestVersion: '2.4.1',
    lastUpdatedAt: new Date().toISOString(),
  },
  {
    appId: 'cortex',
    activeUsers30d: 1203,
    totalDownloads: 4856,
    averageRating: 4.5,
    totalRatings: 287,
    latestVersion: '0.9.3',
    lastUpdatedAt: new Date().toISOString(),
  },
  {
    appId: 'saberio',
    activeUsers30d: 891,
    totalDownloads: 3102,
    averageRating: 4.6,
    totalRatings: 156,
    latestVersion: '0.7.0',
    lastUpdatedAt: new Date().toISOString(),
  },
  {
    appId: 'khatu-services',
    activeUsers30d: 0,
    totalDownloads: 0,
    averageRating: 0,
    totalRatings: 0,
    latestVersion: '0.1.0',
    lastUpdatedAt: new Date().toISOString(),
  },
  {
    appId: 'amateur-things',
    activeUsers30d: 445,
    totalDownloads: 0,
    averageRating: 0,
    totalRatings: 0,
    latestVersion: '1.0.0',
    lastUpdatedAt: new Date().toISOString(),
  },
];

export class MockAppDataSource {
  async getApps(): Promise<AppProduct[]> {
    // Simula latencia de red en desarrollo
    await new Promise((resolve) => setTimeout(resolve, 150));
    return MOCK_APPS;
  }

  async getAppById(id: string): Promise<AppProduct | null> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return MOCK_APPS.find((app) => app.id === id) ?? null;
  }

  streamPublicMetrics(callback: (metrics: AppMetric[]) => void): UnsubscribeFn {
    // Emite datos inmediatamente
    callback(MOCK_METRICS);

    // Simula actualizaciones cada 30 segundos en desarrollo
    const interval = setInterval(() => {
      const updated = MOCK_METRICS.map((m) => ({
        ...m,
        activeUsers30d: m.activeUsers30d + Math.floor(Math.random() * 10 - 5),
        lastUpdatedAt: new Date().toISOString(),
      }));
      callback(updated);
    }, 30_000);

    return () => clearInterval(interval);
  }

  async syncMetrics(metric: AppMetric): Promise<void> {
    console.log('[MockDataSource] syncMetrics called with:', metric.appId);
  }
}
