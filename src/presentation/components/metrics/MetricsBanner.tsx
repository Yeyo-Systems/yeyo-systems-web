'use client';

import { useRealtimeApps } from '@/presentation/hooks/useRealtimeApps';
import { formatDownloads } from '@/domain/entities/AppMetric';

interface MetricStat {
  label: string;
  value: string;
  icon: string;
  isLive?: boolean;
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
      label: 'Apps Activas',
      value: `${productionApps} / ${totalApps}`,
      icon: '🚀',
      isLive: true,
    },
    {
      label: 'Descargas Totales',
      value: isLoading ? '...' : formatDownloads(totalDownloads),
      icon: '📥',
      isLive: true,
    },
    {
      label: 'Usuarios Activos (30d)',
      value: isLoading ? '...' : formatDownloads(totalActiveUsers),
      icon: '👥',
      isLive: true,
    },
    {
      label: 'Plataformas',
      value: 'Flutter',
      icon: '💙',
      isLive: false,
    },
  ];

  return (
    <section className="relative py-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 via-violet-600/5 to-indigo-600/5 dark:from-indigo-600/10 dark:via-violet-600/10 dark:to-indigo-600/10" />
      <div className="absolute inset-0 border-y border-indigo-500/10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Live indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-400">MÉTRICAS EN VIVO</span>
          </div>
          {lastUpdated && (
            <span className="text-xs text-slate-400">
              Actualizado: {lastUpdated.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center group"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div
                className={`
                  text-3xl lg:text-4xl font-bold mb-1 transition-all duration-300
                  ${isLoading && stat.isLive
                    ? 'text-slate-300 dark:text-slate-600 animate-pulse'
                    : 'text-slate-900 dark:text-slate-50'
                  }
                `}
              >
                {stat.value}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {stat.label}
              </div>
              {stat.isLive && (
                <div className="mt-1.5 flex items-center justify-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-400" />
                  <span className="text-xs text-emerald-500 font-medium">Live</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
