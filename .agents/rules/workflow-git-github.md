# Regla: Flujo de trabajo, Git, GitHub Issues y CHANGELOG

**Aplica a**: toda tarea, rama, commit, PR y merge
**Severidad**: CRÍTICA — ninguna acción remota sin orden explícita del usuario

---

## Acciones estrictamente restringidas

Sin una orden explícita del usuario, el agente **NO**:

- Hace `git commit` ni `git push`.
- Crea PRs (`gh pr create` o MCP) ni los marca como Ready for review.
- Hace merge de ramas.
- Despliega, ni crea o modifica recursos de Firebase, GitHub Environments, secretos, DNS o dominios.
- Toca `master` ni producción (`yeyo-systems` / `yeyosystems.com`).

Nunca `git push --force` a `develop` o `master`. Reescribir historia solo en la rama de la tarea, solo a pedido y con `--force-with-lease`.

## Ciclo de vida de una tarea

1. **Issue primero.** Ninguna tarea ni rama empieza sin decisión del usuario. Se registra como GitHub Issue con alcance y criterios de aceptación.
2. **Rama desde `develop` actualizado.** `git checkout develop` → `git pull --ff-only` → `git checkout -b <type>/YS-<N>-<kebab>`. Nunca desde la rama que esté activa.
3. **Plan visible antes de implementar.** Plan numerado en el chat: alcance, archivos y capas, riesgos, pasos y pruebas. No se edita `src/` hasta que el usuario lo apruebe ("ok", "adelante"). Una orden explícita de varios pasos cuenta como aprobación de ese alcance.
4. **Implementación por subtareas.** Una a la vez; evaluar primero el impacto en la arquitectura.
5. **PR en Draft.** Se completa la plantilla (`.github/PULL_REQUEST_TEMPLATE.md`) y se marca Ready for review solo cuando el usuario aprueba la documentación y CI está en verde.
6. **Merge squash, solo a pedido.** Revisar el preview del squash. Título: `[TYPE] YS-N - Descripción`.
7. **Después del merge.** Borrar la rama remota y cerrar la issue. La rama por defecto es `master`, así que `Closes #N` no cierra la issue al fusionar en `develop`: se cierra a mano o al publicar la release.

## Convenciones

| Elemento | Formato | Ejemplo |
|---|---|---|
| Id de tarea | `YS-<N>` (N = número de la issue en GitHub) | `YS-18` |
| Rama | `<type>/YS-<N>-<kebab>` | `fix/YS-21-theme-toggle` |
| Título de PR | `[TYPE] YS-N - Título` | `[FIX] YS-21 - Toggle de tema` |
| Commit | Conventional Commits + id | `fix(theme): respect toggle over OS (YS-21)` |
| Cuerpo de PR | `Closes #N` en **texto plano**, nunca entre backticks | `Closes #21` |

| Prefijo de rama | `[TYPE]` | Uso |
|---|---|---|
| `feature` | `[FEATURE]` | Capacidad nueva visible |
| `fix` | `[FIX]` | Corrección no urgente |
| `hotfix` | `[HOTFIX]` | Urgente en producción (desde `master`, PR a `master` y luego a `develop`) |
| `chore` | `[CHORE]` | Dependencias, tooling, CI sin cambio de comportamiento |
| `refactor` | `[REFACTOR]` | Reestructura sin cambio de comportamiento |
| `docs` | `[DOCS]` | Documentación y reglas |
| `test` | `[TEST]` | Solo tests |
| `perf` | `[PERF]` | Rendimiento |
| `build` | `[BUILD]` | Build y despliegue |

Releases: PR `develop → master` con título `[RELEASE] vX.Y.Z`. CI solo permite `develop` o `hotfix/*` hacia `master`.

## Tests (solo de alto valor)

Se agregan tests cuando hay lógica con ramas que puede romperse:

- Reglas de dominio (`getAppStage`, formateadores, validaciones).
- Validación de payloads y autorización de la ingesta de métricas.
- Mapeo de datos externos (Firestore → entidades).

No se agregan:

- Tests que solo verifican que se llamó a un mock.
- Tests de igualdad de tipos o DTOs.
- Tests de "el componente renderiza" sin un resultado observable.

Ante la duda, se omite.

## Autorrevisión antes de dar algo por terminado

1. `npm run lint`, `npm run typecheck` y `npm run build` en verde.
2. Comentarios nuevos en inglés y solo cuando aportan una restricción que el código no muestra. Sin `TODO`, `FIXME`, ids `YS-N`, `#N` ni números de PR en `src/`.
3. Sin colores ni medidas fuera del sistema de diseño (ver `styling-theme.md`).
4. Revisión de try/catch en cada archivo tocado (ver `error-handling.md`).
5. Entrada en `CHANGELOG.md` bajo `## [Unreleased]`.
6. Pasos de verificación manual en la respuesta (ver `manual-verification.md`).

## CHANGELOG y versionado

Formato [Keep a Changelog](https://keepachangelog.com/); política en `VERSIONING.md`.

- Cada PR agrega `- [TYPE] YS-N - Descripción` bajo `## [Unreleased]`.
- Orden obligatorio: agrupar por tipo (`FEATURE` → `FIX` → `REFACTOR` → `PERF` → `DOCS` → `TEST` → `BUILD` → `CHORE`) y, dentro de cada grupo, por número ascendente. Se inserta en su posición, no al final.
- La versión de `package.json` **no** se cambia en PRs de feature/fix; solo en el PR de release.

## Mantenimiento de reglas

Al cambiar una regla de proceso se actualizan en el mismo PR:

- `.agents/rules/*.md` (detalle canónico)
- `.cursor/rules/*.mdc` (Cursor)
- `.cursorrules` y `.antigravityrules` (resumen idéntico)
- `AGENTS.md`
