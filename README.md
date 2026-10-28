# Yeyo Systems — Web Platform

<p align="center">
  <img src="public/logo.svg" alt="Yeyo Systems Logo" width="560" />
</p>

<p align="center">
  <strong>Plataforma corporativa e institucional del ecosistema de software multiplataforma en Flutter.</strong>
</p>

<p align="center">
  <a href="https://github.com/Yeyo-Systems/yeyo-systems-web/actions"><img src="https://img.shields.io/badge/Next.js-16%20App%20Router-black?logo=next.js" alt="Next.js 16" /></a>
  <a href="https://flutter.dev"><img src="https://img.shields.io/badge/Flutter-Core%20Ecosystem-02569B?logo=flutter" alt="Flutter" /></a>
  <a href="https://firebase.google.com"><img src="https://img.shields.io/badge/Firebase-Realtime%20Push-FFCA28?logo=firebase" alt="Firebase" /></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript" alt="TypeScript" /></a>
</p>

---

## 🏛️ Clean Architecture & Separación de Capas

El proyecto implementa estrictamente Clean Architecture con flujo de dependencias unidireccional:

```
Presentation (React / Next.js Components & Hooks)
    ↓ consume
Use Cases (domain/use-cases/)
    ↓ interactúa mediante contratos
Repositories (domain/repositories/ - Interfaces puras)
    ↑ implementado por
Infrastructure (infrastructure/repositories/ + datasources/)
```

### Reglas Invariantes
- **Dominio Puro (`src/domain/`)**: Cero dependencias de Next.js, React o Firebase.
- **Aislamiento de Seguridad**: La web sólo lee la colección aislada `public_app_metrics`. El diseño de métricas S2S autenticadas con `Bearer {SYNC_API_SECRET}` requiere un runtime de servidor aprobado; el export estático actual no acepta solicitudes `POST` en `/api/metrics/sync`.
- **Diseño & Paleta Corporativa**:
  - **Dark Mode**: Fondo `#0B0F17` (Gris humo profundo), superficie `#1E293B`, texto `#F8FAFC`.
  - **Light Mode**: Fondo `#F8FAFC`, superficie `#FFFFFF`, texto `#0F172A`.
  - **Acentos**: Indigo Corporativo `#4F46E5`, Verde Live `#10B981`, Resplandor Neón Cyberpunk.

---

## 📱 Apps del Ecosistema

| App | Categoría | Estado | Tecnologías | Descripción |
|---|---|---|---|---|
| **Khatu** | Salud & Bienestar | `production` | Flutter, Android, iOS | Aplicación integral de bienestar, hábitos y salud personal. |
| **Cortex** | Asistente IA | `beta` | Flutter, Multiplataforma | Asistente de inteligencia artificial y productividad. |
| **Saberio** | Educación | `beta` | Flutter, Web, Móvil | Plataforma educativa adaptativa con rutas gamificadas. |
| **Khatu Services** | Enterprise B2B | `alpha` | Flutter Web & Mobile | Solución corporativa para gestión de salud en equipos. |
| **Amateur Things** | Laboratorio Abierto | `development` | Flutter & Open Source | Proyectos experimentales y herramientas de código abierto. |

---

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 22+
- npm o pnpm

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/Yeyo-Systems/yeyo-systems-web.git
cd yeyo-systems-web

# Instalar dependencias
npm install
```

### Variables de Entorno
Copia el archivo de ejemplo y configura tus variables:
```bash
cp .env.example .env.local
```

Usa únicamente el proyecto Firebase de desarrollo (`yeyo-systems-web`) o deja
los valores vacíos para trabajar con datos mock.

### Ejecutar Servidor de Desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Compilar y Validar
```bash
npm run lint
npm run typecheck
npm run build   # export estático en out/
```

---

## 🚢 Entornos y Despliegue

| Rama | Proyecto Firebase | URL |
|---|---|---|
| `develop` | `yeyo-systems-web` | https://yeyo-systems-web.web.app |
| `master` | `yeyo-systems` | https://yeyosystems.com |

Los PR ejecutan CI (lint, typecheck, build). Al fusionar en `develop` se publica
automáticamente en el entorno de desarrollo; al fusionar `develop` en `master`
se publica en producción tras la aprobación del environment `production`.
Detalles, variables requeridas y rollback en
[`docs/development-environment.md`](docs/development-environment.md).

---

## 🔒 Reglas para Agentes de IA

Las instrucciones y restricciones para Google Antigravity, Gemini CLI y Cursor se encuentran centralizadas en:
- `AGENTS.md`
- `.agents/rules/clean-architecture.md`
- `.agents/rules/security-isolation.md`
- `.agents/rules/styling-theme.md`
- `.cursor/rules/main.mdc`

---

## 📄 Licencia

© 2026 [Yeyo Systems](https://github.com/Yeyo-Systems). Todos los derechos reservados.
