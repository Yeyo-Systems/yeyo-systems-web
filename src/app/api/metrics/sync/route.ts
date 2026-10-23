// ============================================================
// API ROUTE — /api/metrics/sync
// Info / Status Endpoint para Static Export en Firebase Hosting
// ============================================================

import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    service: 'Yeyo Systems Metrics Sync API',
    status: 'online',
    version: '1.0.0',
    mode: 'static_hosting',
    targetCollection: 'public_app_metrics',
  });
}
