# AGENTS.md — Yeyo Systems Web Platform

Instrucciones para agentes de IA (Google Antigravity, Cursor, Gemini CLI). Resumen completo en `.antigravityrules` (idéntico a `.cursorrules`); detalle canónico en `.agents/rules/`.

## Reglas

| Regla | Archivo | Cursor |
|---|---|---|
| Clean Architecture | `.agents/rules/clean-architecture.md` | `.cursor/rules/clean-architecture-and-layers.mdc` |
| Security Isolation | `.agents/rules/security-isolation.md` | `.cursor/rules/security-isolation.mdc` |
| Styling & Theme | `.agents/rules/styling-theme.md` | `.cursor/rules/styling-and-ui.mdc` |
| Manejo de errores | `.agents/rules/error-handling.md` | `.cursor/rules/error-handling-try-catch.mdc` |
| Flujo Git/GitHub y CHANGELOG | `.agents/rules/workflow-git-github.md` | `.cursor/rules/workflow-git-github-changelog.mdc` |
| Verificación manual | `.agents/rules/manual-verification.md` | `.cursor/rules/manual-verification.mdc` |

## Restricciones críticas

1. Sin orden explícita: no commit, push, PR, merge, despliegue ni cambios en Firebase, secretos, DNS o `master`.
2. No importar Next.js, React, Firebase ni Supabase en `src/domain/`.
3. No hardcodear credenciales; nunca secretos con `NEXT_PUBLIC_`.
4. Componentes solo llaman hooks; hooks llaman use cases.
5. Este sitio solo consume resúmenes públicos en Firestore; nunca lee las bases de datos de las apps.

## Stack

- Next.js 16 App Router con export estático, React 19, TypeScript strict.
- Tailwind CSS v4 con tokens semánticos, next-themes.
- Firebase 12 (Firestore `onSnapshot`, solo lectura pública).
- Estado: React state + custom hooks.

## Comandos

```bash
npm ci
npm run lint
npm run typecheck
npm run build      # genera out/
python3 -m http.server 4173 --directory out   # revisar el export estático
```

## Entornos

| Rama | Proyecto Firebase | URL |
|---|---|---|
| `develop` | `yeyo-systems-web` | https://yeyo-systems-web.web.app |
| `master` | `yeyo-systems` | https://yeyosystems.com |

Detalle, variables y rollback: `docs/development-environment.md`.

## Flujo de capas

```
Presentation (src/presentation + src/app)
 ↓ usa
Use Cases (src/domain/use-cases)
 ↓ depende de contratos
Repositories (src/domain/repositories) ← interfaces
 ↑ implementado por
Infrastructure (src/infrastructure)
```

## Aplicaciones del ecosistema

| App | Estado | Descripción |
|-----|--------|-------------|
| Khatu | Alpha | Ventas e inventario (versión telas) — datos en Supabase (AISLADO) |
| Cortex | Alpha | Gestión educativa, Ley 070 — no es una app de IA (AISLADO) |
| Saberio | Alpha | Venta de cursos y contenido educativo (AISLADO) |
| Khatu Services | En diseño | Reservas y cobro de servicios (nombre provisional) |
| Penitentiary | En desarrollo | Gestión de información penitenciaria (web) |
| Amateur Things | Alpha | Contenido para adultos — no listado en el sitio |
