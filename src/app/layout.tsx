import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Image from 'next/image';
import { ThemeProvider } from '@/presentation/theme/ThemeProvider';
import { ThemeToggle } from '@/presentation/components/ui/ThemeToggle';
import { FirebaseAnalytics } from '@/presentation/components/FirebaseAnalytics';
import { COMPANY_NAME, GITHUB_ORG_URL, SITE_URL } from '@/shared/constants';
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Yeyo Systems — Software Multiplataforma en Flutter',
    template: '%s | Yeyo Systems',
  },
  description:
    'Ecosistema de aplicaciones multiplataforma construidas en Flutter. Khatu, Cortex, Saberio y más — software con propósito para transformar la experiencia de las personas.',
  keywords: [
    'Flutter',
    'aplicaciones móviles',
    'Yeyo Systems',
    'Khatu',
    'Cortex',
    'Saberio',
    'Khatu Services',
    'Amateur Things',
    'software multiplataforma',
    'apps Colombia',
  ],
  authors: [{ name: COMPANY_NAME, url: SITE_URL }],
  creator: COMPANY_NAME,
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: SITE_URL,
    siteName: COMPANY_NAME,
    title: 'Yeyo Systems — Software Multiplataforma en Flutter',
    description:
      'Ecosistema de aplicaciones multiplataforma construidas en Flutter.',
    images: [
      {
        url: '/logo.svg',
        width: 680,
        height: 160,
        alt: 'Yeyo Systems Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: COMPANY_NAME,
    description: 'Software multiplataforma en Flutter',
    images: ['/logo.svg'],
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
      <body className="min-h-full flex flex-col antialiased bg-page text-fg">
        <ThemeProvider>
          <FirebaseAnalytics />
          {/* Navigation */}
          <header className="sticky top-0 z-40 border-b border-line bg-page/85 backdrop-blur-md">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              {/* Logo / Brand */}
              <a href="#" className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl overflow-hidden">
                  <Image
                    src="/icon.svg"
                    alt="Yeyo Systems Icon"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-lg text-fg tracking-tight leading-tight">
                    Yeyo Systems
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-fg-muted font-semibold">
                    Software Ecosystem
                  </span>
                </div>
              </a>

              {/* Nav Links */}
              <div className="hidden md:flex items-center gap-6">
                <a
                  href="#ecosystem"
                  className="text-sm font-medium text-fg-muted hover:text-brand-fg transition-colors duration-200"
                >
                  Ecosistema
                </a>
                <a
                  href="#about"
                  className="text-sm font-medium text-fg-muted hover:text-brand-fg transition-colors duration-200"
                >
                  Nosotros
                </a>
                <a
                  href={GITHUB_ORG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-fg-muted hover:text-brand-fg transition-colors duration-200"
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
          <footer className="border-t border-line py-10 mt-auto bg-surface-muted">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg overflow-hidden shadow-sm">
                    <Image
                      src="/icon.svg"
                      alt="Yeyo Systems"
                      width={28}
                      height={28}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-fg">
                      Yeyo Systems
                    </span>
                    <span className="text-xs text-fg-muted">
                      Multi-Platform Software Engineering
                    </span>
                  </div>
                </div>

                <p className="text-xs text-fg-muted text-center">
                  © 2026 Yeyo Systems. Clean Architecture con Flutter &amp; Next.js.
                </p>

                <div className="flex items-center gap-5">
                  <a
                    href="#ecosystem"
                    className="text-xs text-fg-muted hover:text-brand-fg transition-colors duration-200"
                  >
                    Apps
                  </a>
                  <a
                    href="#about"
                    className="text-xs text-fg-muted hover:text-brand-fg transition-colors duration-200"
                  >
                    Filosofía
                  </a>
                  <a
                    href={GITHUB_ORG_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-fg-muted hover:text-brand-fg transition-colors duration-200"
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
