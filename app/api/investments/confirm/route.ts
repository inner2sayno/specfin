import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { investmentId, txHash, stripePaymentId } = body;
    if (!investmentId) {
      return NextResponse.json({ error: 'Missing investmentId' }, { status: 400 });
    }
    const investment = db.updateInvestment(investmentId, {
      paymentStatus: 'confirmed',
      txHash,
      stripePaymentId,
    });
    if (!investment) {
      return NextResponse.json({ error: 'Investment not found' }, { status: 404 });
    }
    return NextResponse.json({ investment, success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
