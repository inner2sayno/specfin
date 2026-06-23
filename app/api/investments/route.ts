import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

const ADMIN_KEY = process.env.ADMIN_SECRET_KEY || 'specfin-admin-2025';

export async function GET(req: NextRequest) {
  if (req.headers.get('x-admin-key') !== ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const investments = db.getInvestments();
  return NextResponse.json({ investments });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, userEmail, userName, amount, currency, paymentMethod, walletAddress } = body;
    if (!productId || !userEmail || !amount || !paymentMethod) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const product = db.getProduct(productId);
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    if (product.status !== 'open') return NextResponse.json({ error: 'Product is not open for investment' }, { status: 400 });
    if (Number(amount) < product.minInvestment) {
      return NextResponse.json({ error: 'Amount below minimum: ' + product.minInvestment }, { status: 400 });
    }
    const investment = db.createInvestment({
      productId,
      userId: userEmail,
      userEmail,
      userName: userName || userEmail,
      amount: Number(amount),
      currency: currency || 'USD',
      paymentMethod,
      paymentStatus: 'pending',
      walletAddress,
    });
    return NextResponse.json({ investment }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
