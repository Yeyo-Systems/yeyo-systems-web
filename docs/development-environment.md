# Entorno de desarrollo aislado

`develop` es la rama de integración. Los cambios se implementan en ramas de
trabajo y se incorporan mediante pull request hacia `develop`. `master` sigue
reservada para producción y no debe recibir despliegues ni cambios indirectos
desde el flujo de desarrollo.

El archivo `.firebaserc` no define un proyecto predeterminado. Así, un comando
manual de Firebase no puede elegir producción por omisión. Para cualquier
operación autorizada, use siempre `firebase --project <id-aprobado> ...`.

## Proyectos Firebase

| Entorno | Proyecto Firebase | Plataforma |
|---------|-------------------|------------|
| **develop** | `yeyo-systems-7d609` | App Hosting (SSR) |
| **production** | `yeyo-systems` | Firebase Hosting (a migrar) |

## Arquitectura de despliegue

El modo de la app es **SSR (Next.js estándar)** — no `output: 'export'`.
Esto permite:
- API Routes reales (`/api/metrics/sync`, etc.)
- Server-side rendering
- Conexión con APIs de Khatu, Cortex, Saberio desde el backend

`develop` se despliega en **Firebase App Hosting** (`yeyo-systems-7d609`).
`master` (producción) sigue en Firebase Hosting clásico hasta que se apruebe
la migración.

## Variables y proyectos

En GitHub, configure variables de repositorio con sufijo `_DEVELOP` o
`_PRODUCTION`. Configure las cuentas de servicio exclusivamente como secretos:

- `FIREBASE_PROJECT_ID_DEVELOP` = `yeyo-systems-7d609`
- `FIREBASE_SERVICE_ACCOUNT_YEYO_SYSTEMS_DEVELOP` — Secret JSON
- Variables `NEXT_PUBLIC_*_DEVELOP` — los valores del SDK de `yeyo-systems-7d609`

## Comprobaciones locales

```bash
cp .env.example .env.local
npm ci
npm run lint
npm run typecheck
npm run build
```

No agregues `.env.local` al repositorio ni uses datos, cuentas de servicio o
secretos de producción en la máquina local.

