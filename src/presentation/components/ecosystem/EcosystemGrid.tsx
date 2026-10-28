'use client';

import { AppCard } from './AppCard';
import { useRealtimeApps } from '@/presentation/hooks/useRealtimeApps';
import { APP_STAGE_ORDER, getAppStage, getStageLabel } from '@/domain/entities/AppProduct';

export function EcosystemGrid() {
  const { appsWithMetrics, isLoading, error } = useRealtimeApps();

  const sections = APP_STAGE_ORDER
    .map((stage) => ({
      stage,
      apps: appsWithMetrics.filter((app) => getAppStage(app.status) === stage),
    }))
    .filter((section) => section.apps.length > 0);

  if (error) {
    return (
      <div role="alert" className="text-center py-20">
        <p className="text-fg">No se pudieron cargar las aplicaciones.</p>
        <p className="text-xs text-fg-muted mt-1">{error}</p>
      </div>
    );
  }

  return (
    <section id="ecosystem" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-fg mb-3">
            Ecosistema
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-fg mb-4">
            Nuestras aplicaciones
          </h2>
          <p className="text-lg text-fg-muted max-w-2xl mx-auto">
            Productos propios para ventas, educación, servicios e instituciones:
            lo que ya funciona, lo que estamos construyendo y lo que viene.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-80 rounded-2xl bg-surface-muted border border-line animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-14">
            {sections.map(({ stage, apps }) => (
              <section key={stage} aria-labelledby={`stage-${stage}`}>
                <div className="flex items-baseline gap-3 mb-6 border-b border-line pb-3">
                  <h3 id={`stage-${stage}`} className="text-xl font-bold text-fg">
                    {getStageLabel(stage)}
                  </h3>
                  <span className="text-sm font-mono text-fg-muted">{apps.length}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                  {apps.map((app) => (
                    <AppCard key={app.id} app={app} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
