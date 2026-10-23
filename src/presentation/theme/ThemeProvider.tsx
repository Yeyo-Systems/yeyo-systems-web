'use client';

// ============================================================
// PRESENTATION LAYER — ThemeProvider
// Wrapper de next-themes para soporte de dark/light mode.
// Usa la clase 'dark' en el elemento <html> para Tailwind.
// ============================================================

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={true}
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
