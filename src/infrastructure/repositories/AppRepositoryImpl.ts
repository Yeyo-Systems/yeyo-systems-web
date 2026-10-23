// ============================================================
// INFRASTRUCTURE LAYER — AppRepositoryImpl
// Implementación concreta del contrato IAppRepository.
// Combina MockAppDataSource (datos estáticos de apps)
// con FirebasePublicDataSource (métricas en tiempo real).
// ============================================================

import type { IAppRepository, UnsubscribeFn } from '@/domain/repositories/IAppRepository';
import type { AppProduct } from '@/domain/entities/AppProduct';
import type { AppMetric } from '@/domain/entities/AppMetric';
import { MockAppDataSource } from '@/infrastructure/datasources/MockAppDataSource';
import { FirebasePublicDataSource } from '@/infrastructure/datasources/FirebasePublicDataSource';
import { isFirebaseConfigured } from '@/infrastructure/config/firebase';

export class AppRepositoryImpl implements IAppRepository {
  private readonly mockDataSource: MockAppDataSource;
  private readonly firebaseDataSource?: FirebasePublicDataSource;

  constructor() {
    this.mockDataSource = new MockAppDataSource();

    // Solo inicializa Firebase si las variables de entorno están configuradas
    if (isFirebaseConfigured()) {
      try {
        this.firebaseDataSource = new FirebasePublicDataSource();
      } catch (error) {
        console.warn(
          '[AppRepository] Firebase initialization failed, using mock data:',
          error
        );
      }
    }
  }

  async getApps(): Promise<AppProduct[]> {
    // Los datos de apps son estáticos (administrados en el repo)
    // Las métricas se enriquecen desde Firebase si está disponible
    return this.mockDataSource.getApps();
  }

  async getAppById(id: string): Promise<AppProduct | null> {
    return this.mockDataSource.getAppById(id);
  }

  streamPublicMetrics(callback: (metrics: AppMetric[]) => void): UnsubscribeFn {
    // Si Firebase está configurado, usa datos en tiempo real
    if (this.firebaseDataSource) {
      return this.firebaseDataSource.streamPublicMetrics(callback);
    }

    // Fallback: usa datos de mock con simulación de actualizaciones
    console.info('[AppRepository] Using mock metrics (Firebase not configured)');
    return this.mockDataSource.streamPublicMetrics(callback);
  }

  async syncMetrics(metric: AppMetric): Promise<void> {
    // Esta operación solo se hace en el servidor (API Route)
    // No se expone en el cliente
    throw new Error(
      'syncMetrics() should only be called from the server via /api/metrics/sync'
    );
  }
}

// ============================================================
// SINGLETON — Instancia compartida del repositorio
// Exportamos una instancia singleton para evitar múltiples
// inicializaciones de Firebase en el cliente.
// ============================================================
let repositoryInstance: AppRepositoryImpl | null = null;

export function getAppRepository(): AppRepositoryImpl {
  if (!repositoryInstance) {
    repositoryInstance = new AppRepositoryImpl();
  }
  return repositoryInstance;
}
