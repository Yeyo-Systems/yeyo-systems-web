# Regla: Manejo de errores (try/catch)

**Aplica a**: `src/**/*.ts`, `src/**/*.tsx` al escribir, editar o revisar código
**Severidad**: ALTA — los patrones prohibidos bloquean el PR

---

No se agrega ni se deja un `try/catch` si el `catch` no hace un control de error explícito e intencional. Un `try` sin un `catch` útil se elimina o se maneja bien.

## Prohibido

| Patrón | Por qué |
|---|---|
| `catch {}` / `catch (_) {}` / `.catch(() => {})` | Oculta errores |
| `console.error(e)` como única acción en un flujo crítico | El error nunca llega al usuario ni al estado |
| `catch (e) { return [] }` o `return null` sin una política nombrada | Degradación silenciosa |
| Mostrar `error.message` o `String(e)` crudo en la UI | Filtra detalles de implementación |
| Capturar `FirebaseError` o errores HTTP en componentes | Se mapean en infraestructura |
| `catch (e: any)` | Usar `unknown` y type guards |
| Promesas sin `await` ni `.catch()` (floating) | Rechazos no manejados |

## Permitido cuando es intencional

1. **Validar antes de construir.** Datos externos (Firestore, payloads de `/api/metrics/sync`) se validan con type guards que devuelven `null` o un resultado tipado; no se usa try/catch para formas inválidas esperadas.
2. **Infraestructura.** Captura errores del SDK o de red y los traduce a errores de dominio con mensaje estable.
3. **Hooks de presentación.** Capturan el error del caso de uso y lo exponen como estado (`error`) con un mensaje para el usuario, en español.
4. **Enriquecimiento opcional.** Un helper con nombre documenta "fallo de infraestructura = dato ausente", por ejemplo métricas no disponibles → se muestra el catálogo sin métricas.
5. **Route handlers / funciones de servidor.** Responden con el código HTTP correcto y un cuerpo sin detalles internos; el detalle va al log del servidor, nunca secretos.

## Checklist

1. ¿La entrada inválida se puede rechazar con validación en vez de excepciones?
2. ¿El `catch` cambia algo observable (estado, respuesta, log) que un test podría verificar?
3. ¿El fallo es esperado (dato mal formado) o inesperado (bug)? Si es inesperado, relanzar o fallar rápido.
4. ¿Debería vivir en infraestructura y no en el hook o componente?

Antes de pasar un PR a Ready for review: buscar `catch` y `.catch(` en los archivos tocados y verificar cada bloque.
