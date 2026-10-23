// ============================================================
// API ROUTE — /api/metrics/sync
// Endpoint Server-to-Server (S2S) para recibir métricas
// anónimas de las apps del ecosistema Yeyo Systems.
//
// SEGURIDAD:
// - Requiere Bearer token: Authorization: Bearer {SYNC_API_SECRET}
// - Solo acepta POST (método PUT para operaciones idempotentes)
// - Valida estructura del payload antes de escribir en Firestore
// - Firebase Admin SDK para escritura (bypassa Firestore Security Rules)
// - Las Security Rules de Firestore previenen escritura directa desde el cliente
//
// FLUJO:
// App Khatu / Cortex / Saberio → POST /api/metrics/sync → Firestore public_app_metrics
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, cert, type App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import type { AppMetric } from '@/domain/entities/AppMetric';

// ============================================================
// Firebase Admin SDK — Inicialización Singleton
// ============================================================
function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Missing Firebase Admin credentials. Set FIREBASE_ADMIN_PROJECT_ID, ' +
        'FIREBASE_ADMIN_CLIENT_EMAIL, and FIREBASE_ADMIN_PRIVATE_KEY env vars.'
    );
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    projectId,
  });
}

// ============================================================
// Validación de payload
// ============================================================
function validateMetricPayload(body: unknown): body is AppMetric {
  if (!body || typeof body !== 'object') return false;
  const metric = body as Record<string, unknown>;

  return (
    typeof metric.appId === 'string' &&
    metric.appId.length > 0 &&
    typeof metric.activeUsers30d === 'number' &&
    typeof metric.totalDownloads === 'number' &&
    typeof metric.averageRating === 'number' &&
    metric.averageRating >= 0 &&
    metric.averageRating <= 5 &&
    typeof metric.totalRatings === 'number' &&
    typeof metric.latestVersion === 'string'
  );
}

// Lista blanca de app IDs permitidos
const ALLOWED_APP_IDS = [
  'khatu',
  'cortex',
  'saberio',
  'khatu-services',
  'amateur-things',
] as const;

// ============================================================
// POST Handler
// ============================================================
export async function POST(request: NextRequest): Promise<NextResponse> {
  // 1. Validar Bearer token
  const authorization = request.headers.get('authorization');
  const syncSecret = process.env.SYNC_API_SECRET;

  if (!syncSecret) {
    console.error('[metrics/sync] SYNC_API_SECRET not configured');
    return NextResponse.json(
      { error: 'Service not configured' },
      { status: 503 }
    );
  }

  if (!authorization || authorization !== `Bearer ${syncSecret}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // 2. Parsear y validar el body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  if (!validateMetricPayload(body)) {
    return NextResponse.json(
      {
        error: 'Invalid metric payload',
        required: ['appId', 'activeUsers30d', 'totalDownloads', 'averageRating', 'totalRatings', 'latestVersion'],
      },
      { status: 422 }
    );
  }

  // 3. Validar que el appId está en la lista blanca
  if (!ALLOWED_APP_IDS.includes(body.appId as typeof ALLOWED_APP_IDS[number])) {
    return NextResponse.json(
      { error: `Unknown appId: ${body.appId}. Allowed: ${ALLOWED_APP_IDS.join(', ')}` },
      { status: 422 }
    );
  }

  // 4. Escribir en Firestore via Admin SDK
  try {
    const app = getAdminApp();
    const db = getFirestore(app);

    const metricData: AppMetric = {
      ...body,
      lastUpdatedAt: new Date().toISOString(),
    };

    await db
      .collection('public_app_metrics')
      .doc(body.appId)
      .set(metricData, { merge: true });

    return NextResponse.json(
      {
        success: true,
        appId: body.appId,
        updatedAt: metricData.lastUpdatedAt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[metrics/sync] Firestore write error:', error);
    return NextResponse.json(
      { error: 'Failed to sync metrics' },
      { status: 500 }
    );
  }
}

// Rechaza todos los demás métodos HTTP
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
