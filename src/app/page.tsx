import Image from 'next/image';
import { EcosystemGrid } from '@/presentation/components/ecosystem/EcosystemGrid';
import { MetricsBanner } from '@/presentation/components/metrics/MetricsBanner';
import { TechIcon } from '@/presentation/components/ui/TechIcon';
import { COMPANY_TECH_STACK, GITHUB_ORG_URL } from '@/shared/constants';

// ============================================================
// Home Page — Yeyo Systems Corporate Website
// ============================================================

const PRINCIPLES = [
  { label: 'Multiplataforma', desc: 'Una base de código para Android, iOS, Web, Windows, Linux y macOS.' },
  { label: 'Clean Architecture', desc: 'Capas desacopladas y reglas de dependencia estrictas.' },
  { label: 'Datos aislados', desc: 'Cada producto con su propia base de datos y sus propios permisos.' },
  { label: 'Tiempo real', desc: 'Métricas públicas agregadas y actualizadas en vivo.' },
] as const;

export default function HomePage() {
  return (
    <>
      {/* =============================================
          HERO SECTION
      ============================================= */}
      <section className="relative isolate overflow-hidden min-h-[80vh] flex items-center">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-hero-glow pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="text-center max-w-4xl mx-auto">

            <div className="flex justify-center mb-8">
              <Image
                src="/brand/logo-light.webp"
                alt="Yeyo Systems — Multi-Platform Ecosystem"
                width={840}
                height={307}
                className="w-72 sm:w-96 h-auto dark:hidden"
                priority
              />
              <Image
                src="/brand/logo-dark.webp"
                alt="Yeyo Systems — Multi-Platform Ecosystem"
                width={840}
                height={307}
                className="w-72 sm:w-96 h-auto hidden dark:block"
                priority
              />
            </div>

            <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-line bg-surface text-fg-muted text-sm font-medium mb-6">
              <span aria-hidden="true" className="w-2 h-2 rounded-full bg-live" />
              Ingeniería de software multiplataforma
            </p>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-fg tracking-tight leading-[1.08] mb-6">
              Construimos apps que{' '}
              <span className="relative inline-block">
                <span className="bg-linear-to-r from-brand via-brand-violet to-brand-light bg-clip-text text-transparent">
                  transforman
                </span>
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 w-full"
                  height="8"
                  viewBox="0 0 100 8"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="hero-underline" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor="var(--brand)" />
                      <stop offset="100%" stopColor="var(--color-brand-violet)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 6 Q25 2 50 5 Q75 8 100 4"
                    stroke="url(#hero-underline)"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              vidas.
            </h1>

            <p className="text-xl sm:text-2xl text-fg-muted leading-relaxed mb-10 max-w-3xl mx-auto">
              Yeyo Systems diseña y construye productos de software con{' '}
              <strong className="text-fg font-semibold">Flutter, Next.js y Clean Architecture</strong>
              , para Android, iOS, la Web y escritorio (Windows, Linux y macOS).
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#ecosystem"
                className="
                  inline-flex items-center gap-2 px-8 py-4 rounded-2xl
                  bg-brand hover:bg-brand-hover
                  text-white font-bold text-lg shadow-sm
                  transition-colors duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-page
                "
              >
                Explorar el ecosistema
                <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <a
                href={GITHUB_ORG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2 px-8 py-4 rounded-2xl
                  border border-line hover:border-brand/50 bg-surface
                  text-fg font-bold text-lg
                  transition-colors duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-page
                "
              >
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub Oficial
              </a>
            </div>

            {/* Tech stack */}
            <dl className="mt-16 grid gap-6 sm:grid-cols-3 text-left sm:text-center">
              {COMPANY_TECH_STACK.map((group) => (
                <div key={group.label}>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-fg-muted mb-3">
                    {group.label}
                  </dt>
                  <dd className="flex flex-wrap gap-2 sm:justify-center">
                    {group.items.map((item) => (
                      <span
                        key={item.name}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-line text-sm font-medium text-fg"
                      >
                        <TechIcon icon={item.icon} className="w-4 h-4 text-fg-muted" />
                        {item.name}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* =============================================
          METRICS BANNER
      ============================================= */}
      <MetricsBanner />

      {/* =============================================
          ECOSYSTEM GRID
      ============================================= */}
      <EcosystemGrid />

      {/* =============================================
          ABOUT SECTION
      ============================================= */}
      <section id="about" className="py-24 border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-fg mb-6">
                Tecnología con{' '}
                <span className="text-brand-emphasis">propósito</span>
              </h2>
              <div className="space-y-4 text-lg text-fg-muted leading-relaxed">
                <p>
                  Yeyo Systems nació con la convicción de que el software debe resolver
                  problemas reales de forma elegante y confiable. Usamos <strong className="text-fg">Flutter</strong> para
                  apps nativas en Android, iOS, Web y escritorio, y <strong className="text-fg">Next.js</strong> para plataformas web.
                </p>
                <p>
                  Cada producto de nuestro ecosistema sigue estrictos estándares de <strong className="text-fg">Clean Architecture</strong>,
                  aislamiento de datos y modularidad independiente, asegurando calidad y escalabilidad a largo plazo.
                </p>
              </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PRINCIPLES.map((principle) => (
                <li
                  key={principle.label}
                  className="p-5 rounded-2xl bg-surface border border-line"
                >
                  <div className="w-8 h-1 rounded-full bg-brand mb-4" aria-hidden="true" />
                  <div className="font-bold text-fg mb-1">
                    {principle.label}
                  </div>
                  <div className="text-sm text-fg-muted">
                    {principle.desc}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
