# Regla: Verificación manual al entregar

**Aplica a**: toda implementación terminada (lint, typecheck y build en verde)
**Severidad**: MEDIA

---

Al entregar, la respuesta incluye una sección breve **Cómo probarlo** con:

1. **Dónde.**
   - Local: `npm run build` y servir `out/`, por ejemplo `python3 -m http.server 4173 --directory out`. `next dev` sirve para iterar, pero no refleja el export estático.
   - Develop: `https://yeyo-systems-web.web.app` después del merge a `develop`.
2. **Pasos** numerados y concretos (sección, acción, tema claro/oscuro, ancho móvil/escritorio cuando aplique).
3. **Resultado esperado** visible para el usuario.
4. **Casos negativos** opcionales (por ejemplo: Firebase sin configurar → el catálogo se muestra sin métricas).
5. **Requisitos previos** si aplican (variables de entorno, datos en Firestore, rama).

Si el cambio es solo de documentación o reglas, o no tiene superficie ejecutable: una línea **N/A** con el motivo.

Los mismos pasos se copian en la sección *Pruebas ejecutadas* del PR.
