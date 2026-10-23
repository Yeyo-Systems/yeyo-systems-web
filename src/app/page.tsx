import Image from 'next/image';
import { EcosystemGrid } from '@/presentation/components/ecosystem/EcosystemGrid';
import { MetricsBanner } from '@/presentation/components/metrics/MetricsBanner';
import { GITHUB_ORG_URL } from '@/shared/constants';

// ============================================================
// Home Page — Yeyo Systems Corporate Website
// ============================================================

export default function HomePage() {
  return (
    <>
      {/* =============================================
          HERO SECTION
      ============================================= */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(79,70,229,0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(79,70,229,0.4) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Radial glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-violet-600/10 dark:bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="text-center max-w-4xl mx-auto">

            {/* Isotipo Hero con resplandor */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 rounded-3xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500 group-hover:duration-200 animate-pulse" />
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden shadow-2xl p-1 bg-[#0B0F17] border border-slate-700/60 flex items-center justify-center">
                  <Image
                    src="/icon.svg"
                    alt="Yeyo Systems Brand"
                    width={112}
                    height={112}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Software Multiplataforma en Flutter
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-[1.08] mb-6">
              Construimos apps que{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
                  transforman
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="8"
                  viewBox="0 0 100 8"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 6 Q25 2 50 5 Q75 8 100 4"
                    stroke="url(#gradient)"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor="#4F46E5" />
                      <stop offset="100%" stopColor="#7C3AED" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>{' '}
              vidas.
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-3xl mx-auto">
              Yeyo Systems es un estudio de ingeniería y software multiplataforma especializado en{' '}
              <strong className="text-slate-800 dark:text-slate-200 font-semibold">
                Flutter &amp; Clean Architecture
              </strong>
              . Creamos experiencias digitales de alto impacto para Android, iOS, Desktop y Web.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#ecosystem"
                className="
                  inline-flex items-center gap-2 px-8 py-4 rounded-2xl
                  bg-indigo-600 hover:bg-indigo-500
                  text-white font-bold text-lg
                  shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50
                  transition-all duration-300 hover:-translate-y-0.5
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-[#0B0F17]
                "
              >
                Explorar el ecosistema
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <a
                href={GITHUB_ORG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2 px-8 py-4 rounded-2xl
                  border-2 border-slate-200 dark:border-slate-700
                  hover:border-indigo-500/50 dark:hover:border-indigo-500/50
                  text-slate-700 dark:text-slate-300 font-bold text-lg
                  hover:bg-indigo-50 dark:hover:bg-indigo-500/5
                  transition-all duration-300 hover:-translate-y-0.5
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-[#0B0F17]
                "
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub Oficial
              </a>
            </div>

            {/* Floating app badges */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
              {[
                { name: 'Khatu', tag: 'Health & Wellness' },
                { name: 'Cortex', tag: 'AI Assistant' },
                { name: 'Saberio', tag: 'Adaptive Education' },
                { name: 'Khatu Services', tag: 'Enterprise B2B' },
                { name: 'Amateur Things', tag: 'Open Lab' },
              ].map((app) => (
                <div
                  key={app.name}
                  className="
                    px-4 py-2 rounded-xl
                    bg-white dark:bg-slate-800/60
                    border border-slate-200 dark:border-slate-700/60
                    text-sm font-medium text-slate-600 dark:text-slate-400
                    shadow-sm
                    backdrop-blur-sm
                    flex items-center gap-2
                  "
                >
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{app.name}</span>
                  <span className="text-xs text-slate-400">· {app.tag}</span>
                </div>
              ))}
            </div>
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
      <section id="about" className="py-24 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-6">
                Tecnología con{' '}
                <span className="text-indigo-600 dark:text-indigo-400">propósito</span>
              </h2>
              <div className="space-y-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  Yeyo Systems nació con la convicción de que el software debe resolver
                  problemas reales de forma elegante y confiable. Adoptamos <strong className="text-slate-800 dark:text-slate-200">Flutter</strong> como
                  núcleo tecnológico para brindar consistencia nativa en Android, iOS, Desktop y la Web.
                </p>
                <p>
                  Cada producto de nuestro ecosistema sigue estrictos estándares de <strong className="text-slate-800 dark:text-slate-200">Clean Architecture</strong>,
                  aislamiento de datos y modularidad independiente, asegurando calidad y escalabilidad a largo plazo.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Flutter Core', desc: 'Desarrollo multiplataforma nativo', icon: '💙' },
                { label: 'Clean Architecture', desc: 'Desacoplamiento e invariantes estrictas', icon: '🏗️' },
                { label: 'Firebase Realtime', desc: 'Push metrics y streaming reactivo', icon: '🔥' },
                { label: 'TypeScript & Next.js', desc: 'Web platform e integración S2S', icon: '📘' },
              ].map((tech) => (
                <div
                  key={tech.label}
                  className="
                    p-5 rounded-2xl
                    bg-white dark:bg-slate-800/60
                    border border-slate-200 dark:border-slate-700/60
                    hover:border-indigo-500/30 dark:hover:border-indigo-500/30
                    transition-all duration-200
                    group
                  "
                >
                  <div className="text-3xl mb-3">{tech.icon}</div>
                  <div className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                    {tech.label}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {tech.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
