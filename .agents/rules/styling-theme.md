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

## Clases Tailwind Estandarizadas

### Fondo de Página
```html
<!-- ✅ Correcto -->
<body class="bg-[#F8FAFC] dark:bg-[#0B0F17]">

<!-- ✅ Alternativa con custom tokens (tailwind.config.ts) -->
<body class="bg-smoke-light dark:bg-smoke-dark">
```

### Tarjetas / Cards
```html
<div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
```

### Glassmorphism (para elementos destacados)
```html
<div class="backdrop-blur-md bg-white/10 dark:bg-slate-900/30 border border-white/20 dark:border-slate-700/50 rounded-2xl">
```

### Texto
```html
<h1 class="text-slate-900 dark:text-slate-50 font-bold">
<p class="text-slate-600 dark:text-slate-400">
```

### Botón Primario (Acento Indigo)
```html
<button class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/25">
```

### Badge "Live" (Acento Emerald)
```html
<span class="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
  Live
</span>
```

---

## Tipografía

- **Fuente Principal**: `Inter` (Google Fonts) — cargada via `next/font/google`
- **Fuente Monospace**: `JetBrains Mono` — para código y métricas numéricas
- **Escala de Tamaños**: Seguir escala Tailwind (text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl, text-5xl)
- **Pesos**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

---

## Animaciones y Micro-interacciones

- **Duración estándar**: `duration-200` para hovers, `duration-300` para transiciones de estado
- **Easing**: `ease-in-out` por defecto
- **Hover en cards**: `hover:scale-[1.02] hover:shadow-xl transition-all`
- **Elementos "Live"**: `animate-pulse` solo para el dot indicador, no para texto
- **Entrada de elementos**: Usar `animate-fade-in` con Tailwind animations plugin o CSS custom

---

## Convenciones de Componentes

1. **SIEMPRE** usar dark mode con la clase `dark:` — no usar JS para cambiar colores
2. **SIEMPRE** usar el ThemeProvider de `src/presentation/theme/` para controlar el modo
3. **NUNCA** usar colores inline style en componentes (excepto gradientes complejos)
4. **NUNCA** usar colores fuera de la paleta corporativa sin aprobación
5. Los componentes deben ser **mobile-first**: estilos base para móvil, breakpoints para desktop

---

## Espaciado y Layout

- **Grid de Ecosystem**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` con `gap-6`
- **Padding de Sección**: `px-4 sm:px-6 lg:px-8 py-16 lg:py-24`
- **Max Width de Contenedor**: `max-w-7xl mx-auto`
- **Border Radius estándar**: Cards `rounded-xl`, Botones `rounded-lg`, Badges `rounded-full`
