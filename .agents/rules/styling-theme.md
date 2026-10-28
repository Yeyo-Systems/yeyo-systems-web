# Regla: Styling & Theme — Diseño Corporativo Yeyo Systems

**Aplica a**: Todo componente en `src/presentation/` y `src/app/`
**Severidad**: MEDIA — Las PR con estilos fuera de paleta requieren revisión

---

## Paleta de Colores Corporativa

### Modo Light (Defecto)
| Token | Hex | Uso |
|-------|-----|-----|
| `bg-smoke-light` | `#F8FAFC` | Fondo de página |
| `bg-card-light` | `#FFFFFF` | Superficie de tarjetas |
| `text-primary-light` | `#0F172A` | Texto principal |
| `text-secondary-light` | `#64748B` | Texto secundario |
| `border-light` | `#E2E8F0` | Bordes y divisores |

### Modo Dark
| Token | Hex | Uso |
|-------|-----|-----|
| `bg-smoke-dark` | `#0B0F17` | Fondo de página (gris humo profundo) |
| `bg-card-dark` | `#1E293B` | Superficie de tarjetas (pizarra) |
| `text-primary-dark` | `#F8FAFC` | Texto principal |
| `text-secondary-dark` | `#94A3B8` | Texto secundario |
| `border-dark` | `#334155` | Bordes y divisores |

### Colores de Acento (Independientes del modo)
| Token | Hex | Uso |
|-------|-----|-----|
| `accent-indigo` | `#4F46E5` | CTAs, links activos, branding corporativo |
| `accent-indigo-hover` | `#4338CA` | Estado hover de elementos indigo |
| `accent-emerald` | `#10B981` | Indicadores "Live", estado activo, métricas en tiempo real |
| `accent-emerald-dim` | `#059669` | Estado hover de elementos emerald |

---

## Tokens semánticos (obligatorios)

Definidos en `src/app/globals.css` (Tailwind v4, `@theme inline`). Cambian solos
con la clase `.dark` de next-themes, así que **no hace falta `dark:`** para los
colores de la paleta.

| Token | Clase | Claro | Oscuro | Uso |
|-------|-------|-------|--------|-----|
| `page` | `bg-page` | `#F8FAFC` | `#0B0F17` | Fondo de página |
| `surface` | `bg-surface` | `#FFFFFF` | `#1E293B` | Tarjetas, modales |
| `surface-muted` | `bg-surface-muted` | `#F1F5F9` | `#131B2B` | Secciones alternas, chips, skeletons |
| `fg` | `text-fg` | `#0F172A` | `#F8FAFC` | Texto principal |
| `fg-muted` | `text-fg-muted` | `#64748B` | `#94A3B8` | Texto secundario |
| `line` | `border-line` | `#E2E8F0` | `#334155` | Bordes y divisores |
| `brand` | `bg-brand` / `hover:bg-brand-hover` | `#4F46E5` / `#4338CA` | igual | CTAs (texto blanco) |
| `brand-fg` | `text-brand-fg` | `#4F46E5` | `#A5B4FC` | Texto e iconos indigo sobre el fondo |
| `live` | `bg-live` | `#059669` | `#10B981` | Indicadores "Live" y producción (puntos y bordes, no texto pequeño) |
| `smoke` | `bg-smoke/70` | `#0B0F17` | igual | Overlays de modal |

**Excepción de accesibilidad:** `brand-fg` usa `#A5B4FC` en oscuro porque
`#4F46E5` sobre `#0B0F17` no alcanza contraste AA para texto.

```html
<div class="bg-surface border border-line rounded-2xl shadow-sm">
  <h3 class="text-fg font-bold">Título</h3>
  <p class="text-fg-muted">Descripción</p>
  <button class="bg-brand hover:bg-brand-hover text-white">Acción</button>
</div>
```

El variant `dark:` está declarado con `@custom-variant dark (&:where(.dark, .dark *))`
para que siga al toggle y no a `prefers-color-scheme`. Úselo solo en casos que
los tokens no cubren.

---

## Tipografía

- **Fuente Principal**: `Inter` (Google Fonts) — cargada via `next/font/google`
- **Fuente Monospace**: `JetBrains Mono` — para código y métricas numéricas
- **Escala de Tamaños**: Seguir escala Tailwind (text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl, text-5xl)
- **Pesos**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

---

## Animaciones y Micro-interacciones

- **Duración estándar**: `duration-200`, con `transition-colors` o `transition-[box-shadow,border-color]`
- **Cards de apps**: cada app tiene su color de acento (`accentColor`, HEX `#RRGGBB`, validado con `resolveAccentColor`). Se pasa como variable CSS `--app-accent` en `style` (única excepción a "sin estilos inline": el color es un dato de la app) y las clases lo usan en la franja superior, el ícono, el borde y el brillo al pasar el mouse. Hover: elevación `-translate-y-1` y sombra; sin `scale`
- **Elementos "Live"**: `animate-pulse` solo en el punto indicador, no en texto
- **Sin adornos**: sin resplandores difuminados, degradados en titulares ni glassmorphism decorativo. Excepciones: el brillo ambiental del hero (`bg-hero-glow`), un degradado radial con el indigo de marca cuya intensidad sale de los tokens `--glow-core` y `--glow-halo` de cada tema; el texto "transforman" con degradado `brand → brand-violet → brand-light` y su subrayado ondulado (`brand → brand-violet`); y el acento por app de las cards
- **Modales**: `animate-fade-in` (overlay) y `animate-scale-in` (diálogo)
- **`prefers-reduced-motion`** desactiva animaciones y transiciones (ya en `globals.css`)

---

## Convenciones de Componentes

1. **SIEMPRE** usar los tokens semánticos; `dark:` solo si un token no cubre el caso
2. **SIEMPRE** usar el ThemeProvider de `src/presentation/theme/` para controlar el modo
3. **NUNCA** usar colores en inline style ni hex sueltos en clases (excepción: `global-error.tsx`, que se renderiza sin `globals.css`)
4. **NUNCA** usar colores fuera de la paleta corporativa sin aprobación
5. Los componentes deben ser **mobile-first**: estilos base para móvil, breakpoints para desktop
6. **NUNCA** usar emojis como iconos; usar SVG con `aria-hidden="true"` o texto

---

## Espaciado y Layout

- **Grid de Ecosystem**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` con `gap-6`
- **Padding de Sección**: `px-4 sm:px-6 lg:px-8 py-16 lg:py-24`
- **Max Width de Contenedor**: `max-w-7xl mx-auto`
- **Border Radius estándar**: Cards `rounded-2xl`, Botones `rounded-xl`, Badges `rounded-full`
