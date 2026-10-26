// ============================================================
// INFRASTRUCTURE LAYER — Firebase Client SDK Config
// Inicialización del Firebase Client SDK para el sitio web.
// Solo usa variables NEXT_PUBLIC_ (seguras para el browser).
// NUNCA incluir credenciales del Admin SDK aquí.
// ============================================================

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import type { Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const requiredFirebaseEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
] as const;

/**
 * Singleton de Firebase App.
 * Evita re-inicialización en Hot Module Replacement de Next.js.
 */
function getFirebaseApp(): FirebaseApp {
  if (getApps().length > 0) {
    return getApp();
  }

  // Validación de config en desarrollo
  if (process.env.NODE_ENV === 'development') {
    const missingVars = requiredFirebaseEnvVars.filter(
      (variableName) => !process.env[variableName]
    );

    if (missingVars.length > 0) {
      console.warn(
        '[Firebase] Missing env vars. Using mock data source.\n',
        missingVars.join('\n')
      );
    }
  }

  return initializeApp(firebaseConfig);
}

/**
 * Instancia de Firestore para el sitio web (solo lectura).
 * La colección `public_app_metrics` tiene reglas de lectura pública.
 */
export function getFirestoreDb(): Firestore {
  const app = getFirebaseApp();
  return getFirestore(app);
}

/**
 * Instancia de Firebase Analytics (solo en cliente).
 */
export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === 'undefined') return null;

  try {
    const { getAnalytics, isSupported } = await import('firebase/analytics');
    const supported = await isSupported();
    if (supported) {
      const app = getFirebaseApp();
      return getAnalytics(app);
    }
  } catch (error) {
    console.warn('[Firebase] Analytics could not be initialized:', error);
  }
  return null;
}

/** ¿Está Firebase configurado correctamente? */
export function isFirebaseConfigured(): boolean {
  return requiredFirebaseEnvVars.every((variableName) =>
    Boolean(process.env[variableName])
  );
}

export { getFirebaseApp };
