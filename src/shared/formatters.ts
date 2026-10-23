// ============================================================
// SHARED LAYER — Formatting Utilities
// Helpers for dates, numbers and presentation logic.
// ============================================================

/** Formatea números grandes con sufijo K, M, B */
export function formatCompactNumber(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toLocaleString();
}

/** Formatea rating numérico con decimal y estrella */
export function formatRatingValue(rating: number): string {
  return `${rating.toFixed(1)} ★`;
}

/** Formatea timestamp a string legible */
export function formatTimestamp(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return isoString;
  }
}
