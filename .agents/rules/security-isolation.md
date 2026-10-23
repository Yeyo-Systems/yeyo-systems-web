# Regla: Security Isolation — Protección Multi-Tenant

**Aplica a**: Todo el repositorio `yeyo-systems-web`
**Severidad**: CRÍTICA — Violaciones son incidentes de seguridad

---

## Principio Fundamental: Aislamiento de Base de Datos

Este repositorio **SOLO** tiene acceso a su propia colección de Firebase Firestore
(`public_app_metrics`). **NUNCA** debe tener acceso directo a las bases de datos
de producción de las apps del ecosistema.

---

## Bases de Datos PROHIBIDAS en este repositorio

| App | Base de Datos | Estado |
|-----|--------------|--------|
| **Khatu** | Supabase (PostgreSQL) | 🚫 PROHIBIDO — credenciales nunca aquí |
| **Cortex** | Firebase/PostgreSQL propio | 🚫 PROHIBIDO |
| **Saberio** | Base de datos propia | 🚫 PROHIBIDO |
| **Khatu Services** | Supabase | 🚫 PROHIBIDO |

---

## Variables de Entorno: Lo Que Está Permitido

### ✅ PERMITIDO en `.env.local` de este proyecto:

```env
# Firebase del proyecto yeyo-systems-web ÚNICAMENTE
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Secret para recibir métricas de otras apps (one-way push)
SYNC_API_SECRET=

# Firebase Admin (solo en servidor, NUNCA con NEXT_PUBLIC_)
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=
```

### 🚫 PROHIBIDO en cualquier archivo de este repo:

```env
# ❌ NUNCA — Credenciales de Khatu/Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# ❌ NUNCA — Connection strings de otras apps
DATABASE_URL=postgres://...
CORTEX_DB_URL=
SABERIO_API_KEY=
KHATU_INTERNAL_SECRET=
```

---

## Modelo de Push de Métricas (Arquitectura Segura)

Las apps del ecosistema **empujan** métricas hacia este servidor. Este servidor **no jala** datos.

```
Khatu App → POST /api/metrics/sync (con SYNC_API_SECRET) → Firestore public_app_metrics
Cortex App → POST /api/metrics/sync (con SYNC_API_SECRET) → Firestore public_app_metrics
Saberio   → POST /api/metrics/sync (con SYNC_API_SECRET) → Firestore public_app_metrics
                                         ↓
                              Yeyo Systems Web ← onSnapshot (solo lectura)
```

---

## Reglas de Firestore (Obligatorias)

El archivo `firestore.rules` en este repositorio DEBE tener:

```
match /public_app_metrics/{document=**} {
  allow read: if true;   // Lectura pública para el sitio web
  allow write: if false; // Escritura SOLO via Firebase Admin SDK (server-side)
}
// Ninguna otra colección debe ser accesible
match /{document=**} {
  allow read, write: if false;
}
```

---

## Checklist para Agentes antes de Modificar Infrastructure

- [ ] ¿El cambio agrega credenciales de Khatu, Cortex o Saberio? → **BLOQUEAR**
- [ ] ¿El cambio usa `NEXT_PUBLIC_` para variables del Admin SDK? → **BLOQUEAR** (expone server secrets)
- [ ] ¿El cambio lee directamente de Supabase? → **BLOQUEAR**
- [ ] ¿El endpoint `/api/metrics/sync` valida el Bearer token? → **REQUERIDO**
- [ ] ¿Las Firestore Security Rules permiten escritura pública? → **BLOQUEAR**

---

## Código Prohibido — Ejemplos

```typescript
// ❌ NUNCA en este repo
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

// ❌ NUNCA — credential hardcodeada
const apiKey = 'AIzaSyXXXXXXXXXXXXXXXXXXXX'; // ← Incidente de seguridad

// ❌ NUNCA — leer DB de otra app
const users = await fetch('https://cortex-app.com/api/internal/users');
```
