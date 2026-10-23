'use client';

import React from 'react';
import type { AppProduct } from '@/domain/entities/AppProduct';
import { Modal } from '@/presentation/components/ui/Modal';

interface PlatformModalProps {
  app: AppProduct;
  isOpen: boolean;
  onClose: () => void;
}

interface PlatformLink {
  label: string;
  url: string;
  icon: string;
  description: string;
}

function getLinksForApp(app: AppProduct): PlatformLink[] {
  const links: PlatformLink[] = [];
  const { links: appLinks } = app;

  if (appLinks.playStore) {
    links.push({
      label: 'Google Play',
      url: appLinks.playStore,
      icon: '▶',
      description: 'Descargar para Android',
    });
  }
  if (appLinks.appStore) {
    links.push({
      label: 'App Store',
      url: appLinks.appStore,
      icon: '🍎',
      description: 'Descargar para iOS',
    });
  }
  if (appLinks.web) {
    links.push({
      label: 'Web App',
      url: appLinks.web,
      icon: '🌐',
      description: 'Acceder desde el navegador',
    });
  }
  if (appLinks.macOS) {
    links.push({
      label: 'macOS',
      url: appLinks.macOS,
      icon: '🖥',
      description: 'Descargar para macOS',
    });
  }
  if (appLinks.windows) {
    links.push({
      label: 'Windows',
      url: appLinks.windows,
      icon: '🪟',
      description: 'Descargar para Windows',
    });
  }
  if (appLinks.linux) {
    links.push({
      label: 'Linux',
      url: appLinks.linux,
      icon: '🐧',
      description: 'Descargar para Linux',
    });
  }
  if (appLinks.github) {
    links.push({
      label: 'GitHub',
      url: appLinks.github,
      icon: '⬡',
      description: 'Ver código fuente',
    });
  }
  if (appLinks.docs) {
    links.push({
      label: 'Documentación',
      url: appLinks.docs,
      icon: '📖',
      description: 'Ver documentación',
    });
  }

  return links;
}

export function PlatformModal({ app, isOpen, onClose }: PlatformModalProps) {
  const platformLinks = getLinksForApp(app);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={app.name}
      subtitle="Selecciona tu plataforma de descarga o acceso"
      maxWidth="md"
    >
      {/* Platform Links */}
      <div className="p-6 space-y-3">
        {platformLinks.length === 0 ? (
          <p className="text-center text-slate-400 py-8">
            No hay plataformas disponibles aún.
          </p>
        ) : (
          platformLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center gap-4 p-4
                rounded-xl border border-slate-200 dark:border-slate-800
                hover:border-indigo-500/50 dark:hover:border-indigo-500/50
                hover:bg-indigo-50/50 dark:hover:bg-indigo-500/5
                transition-all duration-200 group
              "
            >
              <span className="text-2xl w-8 text-center flex-shrink-0">
                {link.icon}
              </span>
              <div className="flex-1">
                <div className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                  {link.label}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {link.description}
                </div>
              </div>
              <svg
                className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          ))
        )}
      </div>

      {/* Version info if available */}
      {app.metrics?.latestVersion && (
        <div className="px-6 pb-6 border-t border-slate-100 dark:border-slate-800/60 pt-4">
          <p className="text-center text-xs text-slate-400">
            Versión actual: <span className="font-mono font-semibold text-slate-600 dark:text-slate-300">{app.metrics.latestVersion}</span>
          </p>
        </div>
      )}
    </Modal>
  );
}
