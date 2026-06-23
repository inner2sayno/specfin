import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

const ADMIN_KEY = process.env.ADMIN_SECRET_KEY || 'specfin-admin-2025';

export async function GET() {
  const products = await db.getProducts();
  return NextResponse.json({ products });
}

export async function POST(req: NextRequest) {
  if (req.headers.get('x-admin-key') !== ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const product = await db.createProduct(body);
    return NextResponse.json({ product }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
