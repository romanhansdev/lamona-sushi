import { NextRequest, NextResponse } from 'next/server';
import { confirmarTransaccion } from '@/lib/webpay';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const token = String(body?.token ?? '');

  if (!token) {
    return NextResponse.json({ error: 'No se recibio token de Webpay.' }, { status: 400 });
  }

  const result = await confirmarTransaccion(token);

  return NextResponse.json({
    result,
    approved: result.status === 'AUTHORIZED'
  });
}
