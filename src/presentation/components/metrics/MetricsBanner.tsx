'use client';

import { useRealtimeApps } from '@/presentation/hooks/useRealtimeApps';
import { formatDownloads } from '@/domain/entities/AppMetric';
import {
  APP_STAGE_ORDER,
  getAppStage,
  getStageLabel,
  showsPublicMetrics,
} from '@/domain/entities/AppProduct';

interface Stat {
  label: string;
  value: string;
}

export function MetricsBanner() {
  const { appsWithMetrics, isLoading } = useRealtimeApps();

  const stageStats: Stat[] = APP_STAGE_ORDER
    .map((stage) => ({
      label: getStageLabel(stage),
      count: appsWithMetrics.filter((app) => getAppStage(app.status) === stage).length,
    }))
    .filter((stat) => stat.count > 0)
    .map((stat) => ({ label: stat.label, value: String(stat.count) }));

  const productionApps = appsWithMetrics.filter(showsPublicMetrics);
  const totalActiveUsers = productionApps.reduce(
    (sum, app) => sum + (app.metrics?.activeUsers30d ?? 0),
    0
  );
  const usageStats: Stat[] = totalActiveUsers > 0
    ? [{ label: 'Usuarios activos (30 días)', value: formatDownloads(totalActiveUsers) }]
    : [];

  const stats = [...stageStats, ...usageStats];

  return (
    <section aria-labelledby="metrics-heading" className="py-12 bg-surface-muted border-y border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="metrics-heading" className="text-center text-xs font-semibold uppercase tracking-wider text-fg mb-8">
          Estado del ecosistema
        </h2>

        <dl className="flex flex-wrap justify-center gap-x-16 gap-y-8">
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
