'use client';

// ============================================================
// PRESENTATION LAYER — useRealtimeApps Hook
// Conecta la Vista con StreamPublicMetricsUseCase.
// Combina los datos estáticos de apps con métricas en tiempo real.
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import { GetAppsUseCase } from '@/domain/use-cases/GetAppsUseCase';
import { StreamPublicMetricsUseCase } from '@/domain/use-cases/StreamPublicMetricsUseCase';
import { getAppRepository } from '@/infrastructure/repositories/AppRepositoryImpl';
import type { AppProduct } from '@/domain/entities/AppProduct';
import type { AppMetric } from '@/domain/entities/AppMetric';

interface UseRealtimeAppsState {
  apps: AppProduct[];
  metrics: Map<string, AppMetric>;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

interface UseRealtimeAppsReturn extends UseRealtimeAppsState {
  /** Apps enriquecidas con sus métricas en tiempo real */
  appsWithMetrics: AppProduct[];
  /** Refresca los datos de apps (útil para pull-to-refresh) */
  refresh: () => void;
}

export function useRealtimeApps(): UseRealtimeAppsReturn {
  const [state, setState] = useState<UseRealtimeAppsState>({
    apps: [],
    metrics: new Map(),
    isLoading: true,
    error: null,
    lastUpdated: null,
  });

  const loadApps = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const repository = getAppRepository();
      const getAppsUseCase = new GetAppsUseCase(repository);
      const apps = await getAppsUseCase.execute({ onlyAvailable: false });

      setState((prev) => ({
        ...prev,
        apps,
        isLoading: false,
        lastUpdated: new Date(),
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to load apps',
      }));
    }
  }, []);

  // Cargar apps estáticas al montar
  useEffect(() => {
    loadApps();
  }, [loadApps]);

  // Suscribirse a métricas en tiempo real
  useEffect(() => {
    const repository = getAppRepository();
    const streamUseCase = new StreamPublicMetricsUseCase(repository);

    const unsubscribe = streamUseCase.execute(
      (metrics) => {
        const metricsMap = new Map<string, AppMetric>();
        metrics.forEach((m) => metricsMap.set(m.appId, m));

        setState((prev) => ({
          ...prev,
          metrics: metricsMap,
          lastUpdated: new Date(),
        }));
      },
      (error) => {
        console.warn('[useRealtimeApps] Metrics stream error:', error.message);
        // No seteamos error aquí para no bloquear la UI si falla solo las métricas
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // Combinar apps con sus métricas correspondientes
  const appsWithMetrics: AppProduct[] = state.apps.map((app) => {
    const metric = state.metrics.get(app.id);
    if (!metric) return app;
    return { ...app, metrics: metric };
  });

  return {
    ...state,
    appsWithMetrics,
    refresh: loadApps,
  };
}
