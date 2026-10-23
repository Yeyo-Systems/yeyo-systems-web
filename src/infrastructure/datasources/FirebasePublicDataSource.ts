// ============================================================
// INFRASTRUCTURE LAYER — FirebasePublicDataSource
// DataSource de producción: lee de Firestore en tiempo real.
// Escucha la colección 'public_app_metrics' con onSnapshot.
// Las Firestore Security Rules garantizan que:
//   - allow read: if true  (lectura pública)
//   - allow write: if false (escritura solo via Admin SDK)
// ============================================================

import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  getDoc,
  type Firestore,
} from 'firebase/firestore';
import { getFirestoreDb } from '@/infrastructure/config/firebase';
import type { AppProduct } from '@/domain/entities/AppProduct';
import type { AppMetric } from '@/domain/entities/AppMetric';
import type { UnsubscribeFn } from '@/domain/repositories/IAppRepository';

const COLLECTION_METRICS = 'public_app_metrics';
const COLLECTION_APPS = 'public_apps';

export class FirebasePublicDataSource {
  private readonly db: Firestore;

  constructor() {
    this.db = getFirestoreDb();
  }

  async getApps(): Promise<AppProduct[]> {
    // Los datos de apps pueden venir de Firestore o de un JSON estático
    // Por defecto, retornamos el MockDataSource para la lista de apps
    // y Firebase solo para métricas en tiempo real
    throw new Error(
      'getApps() should use MockAppDataSource for static app data. ' +
        'Use streamPublicMetrics() for real-time metrics.'
    );
  }

  async getAppById(_id: string): Promise<AppProduct | null> {
    try {
      const docRef = doc(this.db, COLLECTION_APPS, _id);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) return null;
      return snapshot.data() as AppProduct;
    } catch (error) {
      console.error('[FirebaseDataSource] getAppById error:', error);
      return null;
    }
  }

  /**
   * Suscribe a la colección 'public_app_metrics' con onSnapshot.
   * Se actualiza automáticamente cada vez que Firestore recibe
   * nuevas métricas (pusheadas desde las apps del ecosistema
   * via POST /api/metrics/sync).
   */
  streamPublicMetrics(callback: (metrics: AppMetric[]) => void): UnsubscribeFn {
    const metricsQuery = query(
      collection(this.db, COLLECTION_METRICS),
      orderBy('lastUpdatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      metricsQuery,
      (snapshot) => {
        const metrics: AppMetric[] = snapshot.docs.map((docSnap) => ({
          ...(docSnap.data() as Omit<AppMetric, 'appId'>),
          appId: docSnap.id,
        }));
        callback(metrics);
      },
      (error) => {
        console.error('[FirebaseDataSource] streamPublicMetrics error:', error);
        // En caso de error, retorna array vacío para no bloquear la UI
        callback([]);
      }
    );

    return unsubscribe;
  }

  /**
   * No disponible en el DataSource de cliente.
   * La sincronización de métricas se hace via Firebase Admin SDK
   * en el API Route /api/metrics/sync.
   */
  async syncMetrics(_metric: AppMetric): Promise<void> {
    throw new Error(
      'syncMetrics() is not available in FirebasePublicDataSource (client-side). ' +
        'Use the API Route /api/metrics/sync for server-side writes.'
    );
  }
}
