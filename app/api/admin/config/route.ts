import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

const ADMIN_KEY = process.env.ADMIN_SECRET_KEY || 'specfin-admin-2025';

function checkAdmin(req: NextRequest) {
  return req.headers.get('x-admin-key') === ADMIN_KEY;
}

export async function GET(req: NextRequest) {
  if (!checkAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json({ config: db.getSiteConfig() });
}

export async function PUT(req: NextRequest) {
  if (!checkAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const config = db.updateSiteConfig(body);
    return NextResponse.json({ config });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
