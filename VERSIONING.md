# Versionado

| Tema | Regla |
|---|---|
| Fuente de verdad | `version` en `package.json` |
| Antes de 1.0 | `0.MINOR.PATCH`; `MINOR` para capacidades nuevas visibles, `PATCH` para correcciones |
| PR de feature/fix | Solo entrada en `CHANGELOG.md` bajo `## [Unreleased]`; **no** cambia la versión |
| Release | PR `develop → master` titulado `[RELEASE] vX.Y.Z` que actualiza `package.json` y renombra `[Unreleased]` a `[X.Y.Z] - AAAA-MM-DD` |
| Tag | `vX.Y.Z` sobre el commit de `master` después del merge |
| Hotfix | Rama `hotfix/YS-N-...` desde `master`, sube `PATCH`, PR a `master` y luego a `develop` |

El formato del changelog sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).
