// ============================================================
// DOMAIN LAYER — StreamPublicMetricsUseCase
// Caso de uso: suscribirse a métricas públicas en tiempo real.
// Usa el patrón Observer via callback.
// ============================================================

import type { IAppRepository, UnsubscribeFn } from '../repositories/IAppRepository';
import type { AppMetric } from '../entities/AppMetric';

export class StreamPublicMetricsUseCase {
  constructor(private readonly repository: IAppRepository) {}

  /**
   * Inicia un stream de métricas en tiempo real.
   *
   * @param onUpdate Callback invocado con el array de métricas actualizado
   * @param onError  Callback invocado si hay un error en el stream
   * @returns Función de cleanup para cancelar la suscripción
   *
   * @example
   * const unsubscribe = useCase.execute(
   *   (metrics) => setMetrics(metrics),
   *   (error) => console.error(error)
   * );
   * // En cleanup:
   * unsubscribe();
   */
  execute(
    onUpdate: (metrics: AppMetric[]) => void,
    onError?: (error: Error) => void
  ): UnsubscribeFn {
    try {
      return this.repository.streamPublicMetrics((metrics) => {
        // Ordenar métricas por totalDownloads descendente
        const sorted = [...metrics].sort(
          (a, b) => b.totalDownloads - a.totalDownloads
        );
        onUpdate(sorted);
      });
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error(String(error)));
      // Retorna función de cleanup vacía en caso de error
      return () => {};
    }
  }

  /**
   * Obtiene una métrica específica por appId desde el stream.
   * Útil para apps que solo necesitan sus propias métricas.
   */
  executeForApp(
    appId: string,
    onUpdate: (metric: AppMetric | undefined) => void,
    onError?: (error: Error) => void
  ): UnsubscribeFn {
    return this.execute(
      (metrics) => {
        const metric = metrics.find((m) => m.appId === appId);
        onUpdate(metric);
      },
      onError
    );
  }
}
