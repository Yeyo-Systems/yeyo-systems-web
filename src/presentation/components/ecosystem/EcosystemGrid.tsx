'use client';

import { useState } from 'react';
import { AppCard } from './AppCard';
import { useRealtimeApps } from '@/presentation/hooks/useRealtimeApps';
import type { AppProduct } from '@/domain/entities/AppProduct';

type FilterStatus = 'all' | AppProduct['status'];
type FilterCategory = 'all' | AppProduct['category'];

const statusFilters: Array<{ value: FilterStatus; label: string }> = [
  { value: 'all', label: 'Todas' },
  { value: 'production', label: 'Production' },
  { value: 'beta', label: 'Beta' },
  { value: 'alpha', label: 'Alpha' },
  { value: 'development', label: 'En Desarrollo' },
];

export function EcosystemGrid() {
  const { appsWithMetrics, isLoading, error } = useRealtimeApps();
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('all');

  // Extraer categorías únicas de las apps disponibles
  const availableCategories = Array.from(
    new Set(appsWithMetrics.map((app) => app.category))
  );

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

        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-fg mb-3">
            Ecosistema
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-fg mb-4">
            Ecosistema de Apps
          </h2>
          <p className="text-lg text-fg-muted max-w-2xl mx-auto">
            Software multiplataforma construido en Flutter, diseñado para impactar
            la vida de las personas a través de la tecnología.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {/* Status Filters */}
          <div className="flex items-center gap-1 bg-surface-muted border border-line rounded-xl p-1 flex-wrap justify-center">
            {statusFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setStatusFilter(filter.value)}
                aria-pressed={statusFilter === filter.value}
                className={`
                  px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200
                  ${statusFilter === filter.value
                    ? 'bg-surface text-brand-fg shadow-sm'
                    : 'text-fg-muted hover:text-fg'
                  }
                `}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <button
              onClick={() => setCategoryFilter('all')}
              aria-pressed={categoryFilter === 'all'}
              className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-colors duration-200 ${
                categoryFilter === 'all'
                  ? 'bg-brand border-brand text-white'
                  : 'border-line text-fg-muted hover:text-fg hover:border-brand/50'
              }`}
            >
              Todas las categorías
            </button>
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                aria-pressed={categoryFilter === cat}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-colors duration-200 capitalize ${
                  categoryFilter === cat
                    ? 'bg-brand border-brand text-white'
                    : 'border-line text-fg-muted hover:text-fg hover:border-brand/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Apps Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        )}

        {/* Apps count */}
        {!isLoading && filteredApps.length > 0 && (
          <p className="text-center text-sm text-fg-muted mt-8">
            Mostrando {filteredApps.length} de {appsWithMetrics.length} apps
          </p>
        )}
      </div>
    </section>
  );
}
