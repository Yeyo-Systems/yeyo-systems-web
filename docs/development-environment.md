# Entorno de desarrollo aislado

`develop` es la rama de integración. Los cambios se implementan en ramas de
trabajo y se incorporan mediante pull request hacia `develop`. `master` sigue
reservada para producción y no debe recibir despliegues ni cambios indirectos
desde el flujo de desarrollo.

El archivo `.firebaserc` no define un proyecto predeterminado. Así, un comando
manual de Firebase no puede elegir producción por omisión. Para cualquier
operación autorizada, use siempre `firebase --project <id-aprobado> ...`.

## Variables y proyectos

El entorno de desarrollo debe usar un proyecto Firebase distinto del de
producción. Su Firestore, Authentication, Storage, Analytics y secretos no se
comparten con producción.

En GitHub, configure variables de repositorio para los valores públicos del
Web SDK con sufijo `_DEVELOP` o `_PRODUCTION`, según el workflow. Configure las
cuentas de servicio exclusivamente como secretos:

- `FIREBASE_PROJECT_ID_DEVELOP` y `FIREBASE_SERVICE_ACCOUNT_YEYO_SYSTEMS_DEVELOP`
- `FIREBASE_PROJECT_ID_PRODUCTION` y `FIREBASE_SERVICE_ACCOUNT_YEYO_SYSTEMS`

Un workflow falla antes de desplegar si no están configuradas las variables
necesarias. No se permiten valores de respaldo que apunten a otro entorno.

## Hosting y métricas

Firebase Hosting sirve el export estático actual. La ruta
`/api/metrics/sync` solo publica un descriptor estático y no acepta métricas.
Antes de habilitar `POST`, se debe aprobar un runtime de servidor aislado
(Firebase App Hosting o un servicio backend separado), su modelo de secretos,
límites de payload, idempotencia y estrategia de rotación.

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
