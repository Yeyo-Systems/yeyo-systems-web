import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/presentation/theme/ThemeProvider';
import { ThemeToggle } from '@/presentation/components/ui/ThemeToggle';
import './globals.css';

// ============================================================
// Tipografía corporativa
// ============================================================
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// ============================================================
// SEO Metadata
// ============================================================
export const metadata: Metadata = {
  title: {
    default: 'Yeyo Systems — Software Multiplataforma en Flutter',
    template: '%s | Yeyo Systems',
  },
  description:
    'Ecosistema de aplicaciones multiplataforma construidas en Flutter. Khatu, Cortex, Saberio y más — software con propósito para mejorar la vida de las personas.',
  keywords: [
    'Flutter',
    'aplicaciones móviles',
    'Yeyo Systems',
    'Khatu',
    'Cortex',
    'Saberio',
    'software multiplataforma',
    'apps Colombia',
  ],
  authors: [{ name: 'Yeyo Systems', url: 'https://yeyosystems.com' }],
  creator: 'Yeyo Systems',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://yeyosystems.com',
    siteName: 'Yeyo Systems',
    title: 'Yeyo Systems — Software Multiplataforma en Flutter',
    description:
      'Ecosistema de aplicaciones multiplataforma construidas en Flutter.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Yeyo Systems',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yeyo Systems',
    description: 'Software multiplataforma en Flutter',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8FAFC' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0F17' },
  ],
  width: 'device-width',
  initialScale: 1,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased bg-[#F8FAFC] dark:bg-[#0B0F17] text-slate-900 dark:text-slate-50 transition-colors duration-300">
        <ThemeProvider>
          {/* Navigation */}
          <header className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#0B0F17]/80 backdrop-blur-md">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <span className="text-white text-sm font-black">Y</span>
                </div>
                <span className="font-bold text-lg text-slate-900 dark:text-slate-50 tracking-tight">
                  Yeyo Systems
                </span>
              </div>

              {/* Nav Links */}
              <div className="hidden md:flex items-center gap-6">
                <a
                  href="#ecosystem"
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                >
                  Apps
                </a>
                <a
                  href="#about"
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                >
                  Nosotros
                </a>
                <a
                  href="https://github.com/Yeyo-Systems"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                >
                  GitHub
                </a>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-3">
                <ThemeToggle />
              </div>
            </nav>
          </header>

          {/* Main Content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="border-t border-slate-200 dark:border-slate-800 py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center">
                    <span className="text-white text-xs font-black">Y</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Yeyo Systems
                  </span>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  © {new Date().getFullYear()} Yeyo Systems. Construido con Flutter &amp; Next.js.
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/Yeyo-Systems"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-indigo-500 transition-colors duration-200"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
