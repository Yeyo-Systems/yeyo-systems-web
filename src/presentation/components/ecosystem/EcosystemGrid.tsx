'use client';

import { useState } from 'react';
import { AppCard } from './AppCard';
import { useRealtimeApps } from '@/presentation/hooks/useRealtimeApps';
import type { AppCategory, AppStatus } from '@/domain/entities/AppProduct';
import { APP_STATUS_ORDER, getCategoryLabel, getStatusLabel } from '@/domain/entities/AppProduct';

type FilterStatus = 'all' | AppStatus;
type FilterCategory = 'all' | AppCategory;

export function EcosystemGrid() {
  const { appsWithMetrics, isLoading, error } = useRealtimeApps();
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('all');

  const availableStatuses = APP_STATUS_ORDER.filter((status) =>
    appsWithMetrics.some((app) => app.status === status)
  );
  const availableCategories = Array.from(new Set(appsWithMetrics.map((app) => app.category)));

  const filteredApps = appsWithMetrics.filter((app) => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || app.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

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
          <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand-fg text-sm font-medium mb-4">
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-live" />
            Productos Yeyo Systems
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-fg mb-4">
            Ecosistema de Apps
          </h2>
          <p className="text-lg text-fg-muted max-w-2xl mx-auto">
            Productos propios para ventas, educación, servicios e instituciones:
            lo que ya funciona, lo que estamos construyendo y lo que viene.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-10">
          <div className="flex items-center gap-2 bg-surface-muted border border-line rounded-xl p-1.5 flex-wrap justify-center">
            {(['all', ...availableStatuses] as FilterStatus[]).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                aria-pressed={statusFilter === status}
                className={`
                  px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${statusFilter === status
                    ? 'bg-surface text-brand-fg shadow-sm'
                    : 'text-fg-muted hover:text-fg'
                  }
                `}
              >
                {status === 'all' ? 'Todas' : getStatusLabel(status)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            {(['all', ...availableCategories] as FilterCategory[]).map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                aria-pressed={categoryFilter === category}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  categoryFilter === category
                    ? 'bg-brand border-brand text-white'
                    : 'border-line text-fg-muted hover:text-fg hover:border-brand/50'
                }`}
              >
                {category === 'all' ? 'Todas las categorías' : getCategoryLabel(category)}
              </button>
            ))}
          </div>
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
        ) : filteredApps.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-fg-muted text-lg">
              No hay apps con los filtros seleccionados.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {filteredApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        )}

        {!isLoading && filteredApps.length > 0 && (
          <p className="text-center text-sm text-fg-muted mt-8">
            Mostrando {filteredApps.length} de {appsWithMetrics.length} apps
          </p>
        )}
      </div>
    </section>
  );
}
