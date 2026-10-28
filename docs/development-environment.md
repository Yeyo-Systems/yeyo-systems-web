# Entornos y flujo de despliegue

La aplicación es un sitio estático (`output: 'export'`) publicado en Firebase
Hosting. Cada entorno vive en un proyecto Firebase distinto, propiedad de una
cuenta distinta, para que `develop` no pueda tocar producción.

| Rama | Proyecto Firebase | Cuenta propietaria | URL |
|------|-------------------|--------------------|-----|
| `develop` | `yeyo-systems-web` | `yeyo735@gmail.com` | https://yeyo-systems-web.web.app |
| `master` | `yeyo-systems` | `sergio.miranda@yeyosystems.com` | https://yeyosystems.com |

`.firebaserc` solo define los aliases `develop` y `production`, sin `default`.
Un comando manual de Firebase no puede elegir un proyecto por omisión: use
siempre `firebase --project develop ...` o `--project production ...`.

## Flujo

1. Rama de trabajo desde `develop` (`feat/`, `fix/`, `chore/`...), ligada a una
   issue aprobada.
2. PR hacia `develop` con `Closes #N`. El workflow **CI** ejecuta lint,
   typecheck y build estático.
3. Al fusionar en `develop`, el workflow **CD** publica en
   `yeyo-systems-web.web.app`.
4. Release: PR de `develop` hacia `master` (CI valida que el origen sea
   `develop` o `hotfix/*`).
5. Al fusionar en `master`, **CD** espera la aprobación del environment
   `production` y publica en `yeyosystems.com`.

Ambos despliegues pueden relanzarse desde *Actions → CD Yeyo Systems Web → Run
workflow*: `develop` desde la rama `develop` y `production` solo desde `master`.

## Workflows

| Archivo | Disparador | Función |
|---------|------------|---------|
| `.github/workflows/ci.yml` | PR hacia `develop` o `master` | Lint, typecheck, build y validación del origen de releases |
| `.github/workflows/cd.yml` | Push a `develop` o `master`, manual | Elige el entorno según la rama |
| `.github/workflows/deploy-hosting.yml` | Llamado por `cd.yml` | Verifica el aislamiento, construye y despliega en el canal `live` |

Antes de desplegar, `deploy-hosting.yml` comprueba que `FIREBASE_PROJECT_ID` y
`NEXT_PUBLIC_FIREBASE_PROJECT_ID` del environment coincidan con el proyecto
esperado para esa rama. Si no coinciden, el despliegue se detiene.

## Configuración en GitHub (Settings → Environments)

Cree dos environments: `develop` y `production`.

| Tipo | Nombre | `develop` | `production` |
|------|--------|-----------|--------------|
| Variable | `FIREBASE_PROJECT_ID` | `yeyo-systems-web` | `yeyo-systems` |
| Variable | `NEXT_PUBLIC_FIREBASE_API_KEY` | config web del proyecto | config web del proyecto |
| Variable | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | 〃 | 〃 |
| Variable | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `yeyo-systems-web` | `yeyo-systems` |
| Variable | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | 〃 | 〃 |
| Variable | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | 〃 | 〃 |
| Variable | `NEXT_PUBLIC_FIREBASE_APP_ID` | 〃 | 〃 |
| Variable | `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | 〃 | 〃 |
| Secret | `FIREBASE_SERVICE_ACCOUNT` | JSON de la cuenta de servicio de `yeyo-systems-web` | — (no aplica) |
| Variable | `GCP_WORKLOAD_IDENTITY_PROVIDER` | — | `projects/867937526837/locations/global/workloadIdentityPools/github/providers/yeyo-systems-web` |
| Variable | `GCP_SERVICE_ACCOUNT` | — | `github-hosting-deploy@yeyo-systems.iam.gserviceaccount.com` |

`deploy-hosting.yml` usa Workload Identity Federation cuando el environment
define `GCP_WORKLOAD_IDENTITY_PROVIDER` y `GCP_SERVICE_ACCOUNT`; si no, usa el
secreto `FIREBASE_SERVICE_ACCOUNT`. Producción usa la federación porque la
organización `yeyosystems.com` prohíbe crear claves JSON
(`iam.managed.disableServiceAccountKeyCreation`).

La configuración web de Firebase es pública (se envía al navegador), pero
igualmente vive en variables del environment y no en el código. Las cuentas de
servicio son secretas.

Reglas de protección recomendadas:

- `production`: *Required reviewers* y *Deployment branches* limitado a `master`.
- `develop`: *Deployment branches* limitado a `develop`.
- Branch protection en `develop` y `master`: PR obligatorio y check
  `Lint, Typecheck & Build` requerido.

### Cuenta de servicio de despliegue (una por proyecto)

Con la cuenta propietaria del proyecto:

1. Google Cloud Console → IAM → Service Accounts → *Create service account*
   (por ejemplo `github-hosting-deploy`).
2. Roles: **Firebase Hosting Admin**, **API Keys Viewer** y **Service Usage
   Consumer** (sin este último, el CLI falla con `403 Permission denied to get
   service [firebasehosting.googleapis.com]`).
3. `develop`: *Keys → Add key → JSON* y pegue el contenido en el secreto
   `FIREBASE_SERVICE_ACCOUNT` del environment. Elimine el archivo local después.
4. `production` (sin claves): pool de Workload Identity `github` con el
   proveedor OIDC `yeyo-systems-web` (emisor
   `https://token.actions.githubusercontent.com`). Condición del proveedor:
   `repository_id` de este repo, `environment == 'production'` y
   `ref == 'refs/heads/master'`. La cuenta de servicio otorga
   `roles/iam.workloadIdentityUser` al `principalSet` de ese `repository_id`.

## Comprobaciones locales

```bash
cp .env.example .env.local   # valores de yeyo-systems-web o vacíos (datos mock)
npm ci
npm run lint
npm run typecheck
npm run build                # genera out/
```

No agregue `.env.local` al repositorio ni use datos, cuentas de servicio o
secretos de producción en la máquina local.

## Rollback

- Firebase console del proyecto → Hosting → historial de releases → *Rollback*
  a la versión anterior.
- Revertir el commit en la rama correspondiente; CD vuelve a publicar.

## Runtime de servidor

El export estático no ejecuta `POST` ni SSR. El endpoint de sincronización de
métricas (`POST /api/metrics/sync`) y la elección de su runtime (App Hosting en
`yeyo-systems-web` o Cloud Functions) se tratan en la issue #2.
