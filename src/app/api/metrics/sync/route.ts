// ============================================================
// API ROUTE — /api/metrics/sync
// Descriptor estático para Firebase Hosting.
// La recepción S2S requiere un runtime de servidor independiente.
// ============================================================

import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    service: 'Yeyo Systems Metrics Sync API descriptor',
    status: 'static_only',
    version: '1.0.0',
    mode: 'static_hosting',
    targetCollection: 'public_app_metrics',
    acceptsMetrics: false,
    message:
      'Metric synchronization is unavailable on static hosting. Deploy an approved server runtime before enabling POST.',
  });
}
