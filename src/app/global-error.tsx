'use client';

// ============================================================
// Global Error Boundary — Next.js App Router
// Este componente NO usa ThemeProvider ni ningún hook de contexto
// para evitar el error de pre-renderizado estático en /_global-error.
// ============================================================

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0B0F17',
          color: '#F8FAFC',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '0.5rem',
              color: '#F8FAFC',
            }}
          >
            Algo salió mal
          </h1>
          <p
            style={{
              fontSize: '0.875rem',
              color: '#94A3B8',
              marginBottom: '1.5rem',
            }}
          >
            Ocurrió un error inesperado en la aplicación.
          </p>
          <button
            onClick={reset}
            style={{
              padding: '0.5rem 1.5rem',
              borderRadius: '0.75rem',
              border: 'none',
              backgroundColor: '#4F46E5',
              color: '#ffffff',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            Intentar de nuevo
          </button>
        </div>
      </body>
    </html>
  );
}
