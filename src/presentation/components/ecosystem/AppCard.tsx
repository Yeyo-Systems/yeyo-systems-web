'use client';

import React, { useState } from 'react';
import type { AppProduct, Platform } from '@/domain/entities/AppProduct';
import {
  getCategoryLabel,
  getStatusLabel,
  isActiveStatus,
  resolveAccentColor,
  showsPublicMetrics,
} from '@/domain/entities/AppProduct';
import { formatDownloads, formatRating } from '@/domain/entities/AppMetric';
import { PlatformModal } from './PlatformModal';
import { Badge, Button } from '@/presentation/components/ui';

interface AppCardProps {
  app: AppProduct;
}

const PLATFORM_LABELS: Record<Platform, string> = {
  android: 'Android',
  ios: 'iOS',
  web: 'Web',
  macos: 'macOS',
  windows: 'Windows',
  linux: 'Linux',
};

export function AppCard({ app }: AppCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isActive = isActiveStatus(app.status);
  const metrics = showsPublicMetrics(app) ? app.metrics : undefined;
  const chips = Array.from(
    new Set([...app.stack, ...app.platforms.map((platform) => PLATFORM_LABELS[platform])])
  );
  const accentStyle = { '--app-accent': resolveAccentColor(app.accentColor) } as React.CSSProperties;

  return (
    <>
      <article
        style={accentStyle}
        className="
          group relative flex flex-col
          bg-surface border border-line
          rounded-2xl overflow-hidden
          shadow-sm hover:shadow-xl hover:shadow-brand/10 dark:hover:shadow-smoke/50
          transition-all duration-300 ease-out
          hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--app-accent)_45%,transparent)]
        "
      >
        <div aria-hidden="true" className="h-1 w-full opacity-80 bg-[var(--app-accent)]" />

        <div className="p-6 flex items-start gap-4">
          <div
            aria-hidden="true"
            className="
              w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg
              text-2xl font-black text-[var(--app-accent)] dark:text-fg
              bg-linear-135 from-[color-mix(in_srgb,var(--app-accent)_13%,transparent)] to-[color-mix(in_srgb,var(--app-accent)_25%,transparent)]
              border border-[color-mix(in_srgb,var(--app-accent)_19%,transparent)]
            "
          >
            {app.name.charAt(0)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-fg">
                {app.name}
              </h3>
              <Badge variant={app.status} dot={isActive}>
                {getStatusLabel(app.status)}
              </Badge>
            </div>
            <p className="text-sm text-fg-muted mt-0.5 font-medium">
              {app.tagline}
            </p>
          </div>
        </div>

        <div className="px-6 pb-4 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
            {getCategoryLabel(app.category)}
          </p>
          <p className="text-sm text-fg-muted leading-relaxed">
            {app.description}
          </p>
        </div>

        {app.highlights.length > 0 && (
          <ul className="px-6 pb-4 space-y-1.5">
            {app.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2 text-sm text-fg">
                <svg aria-hidden="true" className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--app-accent)] dark:text-fg-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {highlight}
              </li>
            ))}
          </ul>
        )}

        {app.upcoming && app.upcoming.length > 0 && (
          <div className="mx-6 mb-4 p-3 rounded-xl bg-surface-muted border border-line">
            <p className="text-xs font-semibold uppercase tracking-wider text-fg-muted mb-1.5">
              Próximas versiones
            </p>
            <p className="text-sm text-fg-muted leading-relaxed">
              {app.upcoming.join(' · ')}
            </p>
          </div>
        )}

        {metrics && (metrics.totalDownloads > 0 || metrics.averageRating > 0) && (
          <div className="px-6 py-3 border-t border-line flex gap-4">
            {metrics.totalDownloads > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold font-mono text-fg">
                  {formatDownloads(metrics.totalDownloads)}
                </span>
                <span className="text-xs text-fg-muted">descargas</span>
              </div>
            )}
            {metrics.averageRating > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold font-mono text-fg">
                  {formatRating(metrics.averageRating)}
                </span>
                <span className="text-xs text-fg-muted">({metrics.totalRatings})</span>
              </div>
            )}
          </div>
        )}

        {chips.length > 0 && (
          <div className="px-6 pb-4 flex flex-wrap gap-1.5 mt-auto">
            {chips.map((chip) => (
              <span
                key={chip}
                className="px-2 py-0.5 rounded-md text-xs font-medium bg-surface-muted text-fg-muted border border-line"
              >
                {chip}
              </span>
            ))}
          </div>
        )}

        <div className="px-6 pb-6">
          {app.isAvailable ? (
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => setIsModalOpen(true)}
              rightIcon={
                <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              }
            >
              Ver plataformas
            </Button>
          ) : (
            <div className="w-full py-2.5 px-4 rounded-xl bg-surface-muted text-center">
              <span className="text-sm text-fg-muted font-medium">Próximamente</span>
            </div>
          )}
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--app-accent)_7%,transparent)_0%,transparent_70%)]"
        />
      </article>

      {isModalOpen && (
        <PlatformModal
          app={app}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
