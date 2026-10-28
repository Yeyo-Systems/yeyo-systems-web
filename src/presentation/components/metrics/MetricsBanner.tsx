'use client';

import { useRealtimeApps } from '@/presentation/hooks/useRealtimeApps';
import { formatDownloads } from '@/domain/entities/AppMetric';

interface MetricStat {
  label: string;
  value: string;
}

export function MetricsBanner() {
  const { appsWithMetrics, isLoading, lastUpdated } = useRealtimeApps();

  // Calcular métricas globales del ecosistema
  const totalDownloads = appsWithMetrics.reduce(
    (sum, app) => sum + (app.metrics?.totalDownloads ?? 0),
    0
  );
  const totalActiveUsers = appsWithMetrics.reduce(
    (sum, app) => sum + (app.metrics?.activeUsers30d ?? 0),
    0
  );
  const productionApps = appsWithMetrics.filter(
    (app) => app.status === 'production' || app.status === 'beta'
  ).length;
  const totalApps = appsWithMetrics.length;

  const stats: MetricStat[] = [
    {
      label: 'Apps activas',
      value: `${productionApps} / ${totalApps}`,
    },
    {
      label: 'Descargas totales',
      value: formatDownloads(totalDownloads),
    },
    {
      label: 'Usuarios activos (30 días)',
      value: formatDownloads(totalActiveUsers),
    },
  ];

  return (
    <section aria-labelledby="metrics-heading" className="py-12 bg-surface-muted border-y border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 mb-8">
          <h2 id="metrics-heading" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-fg">
            <span aria-hidden="true" className="w-2 h-2 rounded-full bg-live animate-pulse" />
            Métricas en vivo
          </h2>
          {lastUpdated && (
            <span className="text-xs text-fg-muted">
              Actualizado: {lastUpdated.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse text-center">
              <dt className="text-sm text-fg-muted font-medium">
                {stat.label}
              </dt>
              <dd
                className={`
                  text-3xl lg:text-4xl font-bold font-mono mb-1
                  ${isLoading ? 'text-fg-muted animate-pulse' : 'text-fg'}
                `}
              >
                {isLoading ? '—' : stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
