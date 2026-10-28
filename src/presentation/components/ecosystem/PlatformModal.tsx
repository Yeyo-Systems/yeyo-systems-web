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
  description: string;
}

function getLinksForApp(app: AppProduct): PlatformLink[] {
  const links: PlatformLink[] = [];
  const { links: appLinks } = app;

  if (appLinks.playStore) {
    links.push({
      label: 'Google Play',
      url: appLinks.playStore,
      description: 'Descargar para Android',
    });
  }
  if (appLinks.appStore) {
    links.push({
      label: 'App Store',
      url: appLinks.appStore,
      description: 'Descargar para iOS',
    });
  }
  if (appLinks.web) {
    links.push({
      label: 'Web App',
      url: appLinks.web,
      description: 'Acceder desde el navegador',
    });
  }
  if (appLinks.macOS) {
    links.push({
      label: 'macOS',
      url: appLinks.macOS,
      description: 'Descargar para macOS',
    });
  }
  if (appLinks.windows) {
    links.push({
      label: 'Windows',
      url: appLinks.windows,
      description: 'Descargar para Windows',
    });
  }
  if (appLinks.linux) {
    links.push({
      label: 'Linux',
      url: appLinks.linux,
      description: 'Descargar para Linux',
    });
  }
  if (appLinks.github) {
    links.push({
      label: 'GitHub',
      url: appLinks.github,
      description: 'Ver código fuente',
    });
  }
  if (appLinks.docs) {
    links.push({
      label: 'Documentación',
      url: appLinks.docs,
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
          <p className="text-center text-fg-muted py-8">
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
                rounded-xl border border-line
                hover:border-brand/50 hover:bg-brand/5
                transition-colors duration-200 group
              "
            >
              <div className="flex-1">
                <div className="font-semibold text-fg text-sm">
                  {link.label}
                </div>
                <div className="text-xs text-fg-muted">
                  {link.description}
                </div>
              </div>
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-fg-muted group-hover:text-brand-fg transition-colors duration-200"
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
        <div className="px-6 pb-6 border-t border-line pt-4">
          <p className="text-center text-xs text-fg-muted">
            Versión actual: <span className="font-mono font-semibold text-fg">{app.metrics.latestVersion}</span>
          </p>
        </div>
      )}
    </Modal>
  );
}
