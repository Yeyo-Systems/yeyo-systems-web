# AGENTS.md — Yeyo Systems Web Platform

> Este archivo instruye a los agentes de IA (Google Antigravity, Gemini CLI) sobre las reglas
> de desarrollo y arquitectura de este repositorio.

## Reglas Activas

Todas las reglas de este proyecto se encuentran en `.agents/rules/`. Los agentes **DEBEN**
leer y aplicar estas reglas antes de realizar cualquier modificación de código.

| Regla | Archivo | Descripción |
|-------|---------|-------------|
| Clean Architecture | `.agents/rules/clean-architecture.md` | Invariantes de desacoplamiento entre capas |
| Security Isolation | `.agents/rules/security-isolation.md` | Prohibición de credenciales de producción |
| Styling & Theme | `.agents/rules/styling-theme.md` | Paleta corporativa y convenciones de UI |

## Stack Tecnológico

- **Framework**: Next.js 15+ App Router (TypeScript)
- **Estilos**: Tailwind CSS v3 + Variables CSS personalizadas
- **Base de Datos**: Firebase Firestore (solo lectura pública)
- **Estado**: React Context + Custom Hooks
- **Arquitectura**: Clean Architecture (Domain / Infrastructure / Presentation)

## Flujo de Capas (INMUTABLE)

```
Presentation (React/Next.js)
    ↓ usa
Use Cases (domain/use-cases/)
    ↓ depende de contratos
Repositories (domain/repositories/)  ← Interfaces
    ↑ implementado por
Infrastructure (infrastructure/repositories/ + datasources/)
```

## Restricciones para Agentes

1. **NO** importar paquetes de Next.js, Firebase o Supabase en `src/domain/`.
2. **NO** hardcodear credenciales. Usar siempre `process.env.VARIABLE_NAME`.
3. **NO** mezclar lógica de negocio en componentes React (`src/presentation/`).
4. Los componentes de presentación **solo** llaman hooks; los hooks llaman use cases.
5. Ver `.agents/rules/security-isolation.md` antes de cualquier cambio en `infrastructure/`.

## Aplicaciones del Ecosistema Yeyo Systems

| App | Estado | Descripción |
|-----|--------|-------------|
| Khatu | Production | App principal — datos en Supabase (AISLADO) |
| Cortex | Beta | IA multiplataforma — Firebase/PostgreSQL (AISLADO) |
| Saberio | Beta | Plataforma educativa (AISLADO) |
| Khatu Services | Alpha | Servicios B2B |
| Amateur Things | Development | Proyectos experimentales |
