'use client';

import React, { useState } from 'react';
import type { AppProduct } from '@/domain/entities/AppProduct';
import { getStatusLabel, isActiveStatus } from '@/domain/entities/AppProduct';
import { formatDownloads, formatRating } from '@/domain/entities/AppMetric';
import { PlatformModal } from './PlatformModal';
import { Badge, Button } from '@/presentation/components/ui';

interface AppCardProps {
  app: AppProduct;
}

export function AppCard({ app }: AppCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isActive = isActiveStatus(app.status);

  return (
    <>
      <article
        className="
          flex flex-col
          bg-surface border border-line
          rounded-2xl overflow-hidden
          shadow-sm hover:shadow-md hover:border-brand/40
          transition-[box-shadow,border-color] duration-200
        "
      >
        {/* Card Header */}
        <div className="p-6 flex items-start gap-4">
          <div
            aria-hidden="true"
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-brand/10 border border-brand/20 text-brand-fg text-lg font-bold"
          >
            {app.name.charAt(0)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-fg truncate">
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

        {/* Description */}
        <div className="px-6 pb-4">
          <p className="text-sm text-fg-muted leading-relaxed line-clamp-3">
            {app.description}
          </p>
        </div>

        {/* Metrics Row */}
        {app.metrics && (app.metrics.totalDownloads > 0 || app.metrics.averageRating > 0) && (
          <div className="px-6 py-3 border-t border-line flex gap-4">
            {app.metrics.totalDownloads > 0 && (
              <div className="flex items-center gap-1.5">
                <svg aria-hidden="true" className="w-3.5 h-3.5 text-fg-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="text-xs font-semibold font-mono text-fg">
                  {formatDownloads(app.metrics.totalDownloads)}
                </span>
                <span className="text-xs text-fg-muted">descargas</span>
              </div>
            )}
            {app.metrics.averageRating > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold font-mono text-fg">
                  {formatRating(app.metrics.averageRating)}
                </span>
                <span className="text-xs text-fg-muted">({app.metrics.totalRatings})</span>
              </div>
            )}
          </div>
        )}

        {/* Platforms */}
        <div className="px-6 pb-4 flex flex-wrap gap-1.5 mt-auto">
          {app.platforms.map((platform) => (
            <span
              key={platform}
              className="px-2 py-0.5 rounded-md text-xs font-medium bg-surface-muted text-fg-muted border border-line"
            >
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </span>
          ))}
        </div>

        {/* CTA Button */}
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
            <div className="w-full py-2.5 px-4 rounded-xl bg-surface-muted border border-line text-center">
              <span className="text-sm text-fg-muted font-medium">Próximamente</span>
            </div>
          )}
        </div>
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
