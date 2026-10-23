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

const categoryIcons: Record<AppProduct['category'], string> = {
  health: '💚',
  ai: '🧠',
  education: '📚',
  productivity: '⚡',
  services: '🏢',
  experimental: '🔬',
};

export function AppCard({ app }: AppCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isActive = isActiveStatus(app.status);

  return (
    <>
      <article
        className="
          group relative flex flex-col
          bg-white dark:bg-[#1E293B]
          border border-slate-200 dark:border-slate-800
          rounded-2xl overflow-hidden
          shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-black/50
          transition-all duration-300 ease-out
          hover:-translate-y-1 hover:border-indigo-500/30
          backdrop-blur-sm
        "
      >
        {/* Accent bar top */}
        <div
          className="h-1 w-full opacity-80"
          style={{ backgroundColor: app.accentColor }}
        />

        {/* Card Header */}
        <div className="p-6 flex items-start gap-4">
          {/* App Icon Placeholder */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${app.accentColor}20, ${app.accentColor}40)`,
              border: `1px solid ${app.accentColor}30`,
            }}
          >
            {categoryIcons[app.category]}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 truncate">
                {app.name}
              </h3>
              {/* Status Badge */}
              <Badge variant={app.status} pulse={isActive}>
                {getStatusLabel(app.status)}
              </Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
              {app.tagline}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="px-6 pb-4">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
            {app.description}
          </p>
        </div>

        {/* Metrics Row */}
        {app.metrics && (app.metrics.totalDownloads > 0 || app.metrics.averageRating > 0) && (
          <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-800/60 flex gap-4">
            {app.metrics.totalDownloads > 0 && (
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {formatDownloads(app.metrics.totalDownloads)}
                </span>
                <span className="text-xs text-slate-400">descargas</span>
              </div>
            )}
            {app.metrics.averageRating > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-amber-500">
                  {formatRating(app.metrics.averageRating)}
                </span>
                <span className="text-xs text-slate-400">({app.metrics.totalRatings})</span>
              </div>
            )}
          </div>
        )}

        {/* Platforms */}
        <div className="px-6 pb-4 flex flex-wrap gap-1.5 mt-auto">
          {app.platforms.map((platform) => (
            <span
              key={platform}
              className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50"
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
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              }
            >
              Ver plataformas
            </Button>
          ) : (
            <div className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-center">
              <span className="text-sm text-slate-400 font-medium">Próximamente</span>
            </div>
          )}
        </div>

        {/* Hover glow effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${app.accentColor}12 0%, transparent 70%)`,
          }}
        />
      </article>

      {/* Platform Modal */}
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
