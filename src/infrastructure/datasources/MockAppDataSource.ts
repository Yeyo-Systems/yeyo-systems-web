// ============================================================
// INFRASTRUCTURE LAYER — MockAppDataSource
// Static catalog of the ecosystem products (source of truth
// until the catalog moves to Firestore) and an empty metrics
// stream for local development without Firebase.
// ============================================================

import type { AppProduct } from '@/domain/entities/AppProduct';
import type { AppMetric } from '@/domain/entities/AppMetric';
import type { UnsubscribeFn } from '@/domain/repositories/IAppRepository';

const CATALOG: AppProduct[] = [
  {
    id: 'khatu',
    name: 'Khatu',
    tagline: 'Ventas e inventario para negocios con varias sucursales.',
    description:
      'Gestión de ventas, depósitos y tiendas. La versión actual está especializada en la venta de telas: producto por rollo entre sucursales y venta por rollo o por metro desde tienda o depósito.',
    status: 'alpha',
    category: 'sales',
    highlights: [
      'Punto de venta por rollo y por metro',
      'Depósitos, tiendas y traspasos entre sucursales',
      'Pérdidas y mermas',
      'Cuentas por cobrar y por pagar',
      'Proveedores, marcas y productos',
      'Panel de reportes con gráficas',
    ],
    upcoming: [
      'Productos por paquete y por unidad',
      'Venta por peso y por volumen',
      'Reportes en PDF',
      'Venta de productos en general',
    ],
    stack: ['Flutter'],
    platforms: ['android', 'ios', 'web'],
    links: {},
    isAvailable: false,
    isListed: true,
  },
  {
    id: 'cortex',
    name: 'Cortex',
    tagline: 'Gestión educativa para colegios, institutos y universidades.',
    description:
      'Plataforma educativa que cubre la administración académica completa. En colegios está adaptada a la Ley 070 para la gestión docente, con seguimiento para padres y alumnos.',
    status: 'alpha',
    category: 'education',
    highlights: [
      'Registros de gestión modular y semanal (Ley 070)',
      'Periodos bimestrales, trimestrales, semestrales y anuales',
      'Boletines de notas y registro de asistencia',
      'Acceso para padres de familia y alumnos',
      'Cursos completos y evaluaciones en línea para maestros',
    ],
    stack: ['Flutter'],
    platforms: ['android', 'ios', 'web'],
    links: {},
    isAvailable: false,
    isListed: true,
  },
  {
    id: 'saberio',
    name: 'Saberio',
    tagline: 'Comparte conocimiento y véndelo en línea.',
    description:
      'Plataforma para publicar contenido educativo de todo tipo y venderlo como cursos en línea.',
    status: 'alpha',
    category: 'education',
    highlights: [
      'Cursos en línea de cualquier tema',
      'Venta de cursos y contenido',
      'Evaluaciones para los alumnos',
    ],
    stack: ['Flutter'],
    platforms: ['android', 'ios', 'web'],
    links: {},
    isAvailable: false,
    isListed: true,
  },
  {
    id: 'khatu-services',
    name: 'Khatu Services',
    tagline: 'Reservas, atención y cobro para negocios de servicios.',
    description:
      'Para negocios cuyo ingreso son los servicios y no los productos: consultorios médicos y odontológicos, psicólogos, plomeros, carpinteros y más.',
    status: 'design',
    category: 'services',
    highlights: [
      'Reservas y agenda de atención',
      'Servicios registrados como productos',
      'Cobro por servicio',
    ],
    stack: ['Flutter'],
    platforms: [],
    links: {},
    isAvailable: false,
    isListed: true,
  },
  {
    id: 'penitentiary',
    name: 'Penitentiary',
    tagline: 'Gestión de la información de centros penitenciarios.',
    description:
      'Sistema web para que el penal administre los registros de las personas privadas de libertad y la información que necesita su consejo.',
    status: 'development',
    category: 'institutional',
    highlights: [
      'Estado del proceso, condena y fechas de ingreso y salida',
      'Permisos y certificados',
      'Registros de trabajo para reducción de condena',
      'Consejo de internos, rubros, campeonatos e información general',
    ],
    stack: ['Web'],
    platforms: ['web'],
    links: {},
    isAvailable: false,
    isListed: true,
  },
  {
    id: 'amateur-things',
    name: 'Amateur Things',
    tagline: 'Contenido para adultos y monetización para creadores.',
    description:
      'Plataforma para compartir contenido para adultos y generar ingresos con él.',
    status: 'alpha',
    category: 'content',
    highlights: [],
    stack: ['Flutter'],
    platforms: ['android', 'ios', 'web'],
    links: {},
    isAvailable: false,
    isListed: false,
  },
];

export class MockAppDataSource {
  async getApps(): Promise<AppProduct[]> {
    return CATALOG;
  }

  async getAppById(id: string): Promise<AppProduct | null> {
    return CATALOG.find((app) => app.id === id) ?? null;
  }

  streamPublicMetrics(callback: (metrics: AppMetric[]) => void): UnsubscribeFn {
    callback([]);
    return () => {};
  }

  async syncMetrics(metric: AppMetric): Promise<void> {
    console.info('[MockDataSource] syncMetrics called with:', metric.appId);
  }
}
