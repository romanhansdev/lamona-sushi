import { NextRequest, NextResponse } from 'next/server';
import { crearTransaccion } from '@/lib/webpay';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const amount = Math.round(Number(body?.amount ?? 0));

  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: 'El monto del pedido no es valido.' }, { status: 400 });
  }

  const origin = request.nextUrl.origin;
  const ordenCompra = `LAMONA-${Date.now()}`;
  const sessionId = crypto.randomUUID();
  const returnUrl = `${origin}/checkout/confirmacion`;
  const transaction = await crearTransaccion(amount, ordenCompra, sessionId, returnUrl);

  return NextResponse.json({
    token: transaction.token,
    url: transaction.url,
    redirectUrl: `${transaction.url}?token_ws=${transaction.token}`,
    ordenCompra
  });
}
