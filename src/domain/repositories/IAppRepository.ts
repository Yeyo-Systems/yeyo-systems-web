// ============================================================
// DOMAIN LAYER — IAppRepository (Contrato/Interface)
// Define el contrato que deben cumplir todas las
// implementaciones de repositorio de apps.
// NO contiene implementación concreta — solo tipos.
// ============================================================

import type { AppProduct } from '../entities/AppProduct';
import type { AppMetric } from '../entities/AppMetric';

/**
 * Contrato del repositorio de productos y métricas de apps.
 *
 * Las implementaciones concretas residen en:
 * src/infrastructure/repositories/AppRepositoryImpl.ts
 *
 * REGLA: Este archivo NO puede importar paquetes externos.
 */
export interface IAppRepository {
  /**
   * Retorna la lista completa de aplicaciones del ecosistema.
   * Las métricas pueden estar incluidas o no dependiendo del DataSource.
   */
  getApps(): Promise<AppProduct[]>;

  /**
   * Retorna una aplicación por su ID (slug).
   * Retorna null si no existe.
   */
  getAppById(id: string): Promise<AppProduct | null>;

  /**
   * Suscribe a actualizaciones en tiempo real de métricas públicas.
   *
   * @param callback Función que se llama cada vez que hay cambios
   * @returns Función para desuscribirse (cleanup)
   */
  streamPublicMetrics(
    callback: (metrics: AppMetric[]) => void
  ): UnsubscribeFn;

  /**
   * Sincroniza las métricas de una app (llamado desde server-side).
   * Solo disponible en la implementación con Firebase Admin.
   */
  syncMetrics(metric: AppMetric): Promise<void>;
}

/** Función de cleanup para cancelar subscripciones en tiempo real */
export type UnsubscribeFn = () => void;

/** Resultado tipado para operaciones que pueden fallar */
export type RepositoryResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };
