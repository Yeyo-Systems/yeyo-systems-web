// ============================================================
// SERVER / CLOUD FUNCTION HANDLER — syncMetricsHandler
// Lógica para recibir métricas anónimas del ecosistema.
// ============================================================

import { initializeApp, getApps, cert, type App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import type { AppMetric } from '@/domain/entities/AppMetric';

function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Missing Firebase Admin credentials.');
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    projectId,
  });
}

const ALLOWED_APP_IDS = [
  'khatu',
  'cortex',
  'saberio',
  'khatu-services',
  'amateur-things',
] as const;

export async function processSyncMetrics(authHeader: string | null, body: unknown) {
  const syncSecret = process.env.SYNC_API_SECRET;

  if (!syncSecret || authHeader !== `Bearer ${syncSecret}`) {
    return { status: 401, data: { error: 'Unauthorized' } };
  }

  if (!body || typeof body !== 'object') {
    return { status: 400, data: { error: 'Invalid payload' } };
  }

  const metric = body as AppMetric;
  if (!ALLOWED_APP_IDS.includes(metric.appId as typeof ALLOWED_APP_IDS[number])) {
    return { status: 422, data: { error: `Unknown appId: ${metric.appId}` } };
  }

  const app = getAdminApp();
  const db = getFirestore(app);

  const metricData: AppMetric = {
    ...metric,
    lastUpdatedAt: new Date().toISOString(),
  };

  await db
    .collection('public_app_metrics')
    .doc(metric.appId)
    .set(metricData, { merge: true });

  return { status: 200, data: { success: true, appId: metric.appId } };
}
