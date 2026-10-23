# Regla: Clean Architecture — Invariantes de Desacoplamiento

**Aplica a**: Todo el código en `src/`
**Severidad**: CRÍTICA — Violaciones bloquean el PR

---

## Diagrama de Dependencias (UNIDIRECCIONAL)

```
┌─────────────────────────────────────────────────────────┐
│  PRESENTATION  (src/presentation/ + src/app/)           │
│  React Components, Custom Hooks, Pages, API Routes      │
│  ↓ puede importar                                       │
├─────────────────────────────────────────────────────────┤
│  USE CASES     (src/domain/use-cases/)                  │
│  Lógica de aplicación pura                              │
│  ↓ depende de interfaces (contratos)                    │
├─────────────────────────────────────────────────────────┤
│  REPOSITORIES  (src/domain/repositories/)               │
│  Contratos/Interfaces TypeScript únicamente             │
│  ↓ implementado por                                     │
├─────────────────────────────────────────────────────────┤
│  INFRASTRUCTURE (src/infrastructure/)                   │
│  Firebase, HTTP, Mock — implementaciones concretas      │
└─────────────────────────────────────────────────────────┘
```

---

## Invariantes Absolutos

### 1. La Capa de Dominio es TypeScript Puro

**PROHIBIDO** en `src/domain/` (entities, use-cases, repositories):

```typescript
// ❌ NUNCA
import { db } from 'firebase/firestore';
import { createClient } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';
import { useEffect } from 'react';
```

**PERMITIDO** en `src/domain/`:
```typescript
// ✅ Solo TypeScript estándar
interface AppProduct { ... }
class GetAppsUseCase { ... }
type AppStatus = 'production' | 'beta' | 'alpha' | 'development';
```

### 2. Las Entidades No Tienen Lógica de UI

Las entidades en `src/domain/entities/` son interfaces o clases TypeScript puras.
No contienen métodos de serialización para React, JSX ni CSS.

### 3. Los Use Cases No Conocen el Framework

Los Use Cases en `src/domain/use-cases/` SOLO:
- Reciben dependencias via constructor (Dependency Injection)
- Llaman métodos del contrato `IAppRepository`
- Retornan tipos del dominio

**NUNCA** llaman directamente a Firebase, Supabase, HTTP o React.

### 4. Los Componentes No Tienen Lógica de Negocio

Los React Components en `src/presentation/components/`:
- Solo llaman custom hooks de `src/presentation/hooks/`
- Solo renderizan UI basada en datos del hook
- **NO** instancian Use Cases ni Repositories directamente

### 5. La Inyección de Dependencias ocurre en Infrastructure

```typescript
// ✅ Correcto — en infrastructure/
const dataSource = new FirebasePublicDataSource();
const repository = new AppRepositoryImpl(dataSource);
const useCase = new GetAppsUseCase(repository);

// ❌ Incorrecto — en presentation/
const useCase = new GetAppsUseCase(new FirebasePublicDataSource());
```

---

## Estructura de Imports Permitida por Capa

| Desde \ Hacia | domain/ | infrastructure/ | presentation/ | app/ |
|---------------|---------|-----------------|---------------|------|
| domain/       | ✅       | ❌               | ❌             | ❌    |
| infrastructure/ | ✅     | ✅               | ❌             | ❌    |
| presentation/ | ✅       | ✅ (via hooks)   | ✅             | ❌    |
| app/          | ✅       | ✅               | ✅             | ✅    |

---

## Convenciones de Nomenclatura

- Entidades: `PascalCase.ts` (ej: `AppProduct.ts`)
- Interfaces de repositorio: `I` prefix (ej: `IAppRepository.ts`)
- Use Cases: `VerbNounUseCase.ts` (ej: `GetAppsUseCase.ts`)
- DataSources: `ProviderNounDataSource.ts` (ej: `FirebasePublicDataSource.ts`)
- Implementaciones de repo: `NounRepositoryImpl.ts`
- Hooks: `use` prefix camelCase (ej: `useRealtimeApps.ts`)
