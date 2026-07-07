'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, MessageCircle, XCircle } from 'lucide-react';
import { useCart } from '@/store/cart';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

type PaymentState = 'loading' | 'approved' | 'rejected' | 'error';

interface PendingOrder {
  message?: string;
}

export default function ConfirmacionPagoPage({
  searchParams
}: {
  searchParams: { token_ws?: string };
}) {
  const token = searchParams.token_ws;
  const vaciar = useCart((state) => state.vaciar);
  const [state, setState] = useState<PaymentState>('loading');
  const [error, setError] = useState('');
  const [pendingOrder, setPendingOrder] = useState<PendingOrder | null>(null);
  const whatsappOpened = useRef(false);

  const whatsappUrl = useMemo(() => (
    pendingOrder?.message ? buildWhatsAppUrl(pendingOrder.message) : ''
  ), [pendingOrder]);

  useEffect(() => {
    const savedOrder = window.localStorage.getItem('lamona-pedido-pendiente');
    setPendingOrder(savedOrder ? JSON.parse(savedOrder) : null);

    if (!token) {
      setState('error');
      setError('No se recibio el token de retorno de Webpay.');
      return;
    }

    async function confirmarPago() {
      try {
        const response = await fetch('/api/pago/confirmar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error || 'No se pudo confirmar el pago.');
        }

        if (payload.approved) {
          setState('approved');
          vaciar();
          window.localStorage.removeItem('lamona-pedido-pendiente');
          return;
        }

        setState('rejected');
      } catch (caughtError) {
        setState('error');
        setError(caughtError instanceof Error ? caughtError.message : 'No se pudo confirmar el pago.');
      }
    }

    confirmarPago();
  }, [token, vaciar]);

  useEffect(() => {
    if (state !== 'approved' || !whatsappUrl || whatsappOpened.current) {
      return;
    }

    whatsappOpened.current = true;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }, [state, whatsappUrl]);

  return (
    <main className="container-page py-10">
      <section className="mx-auto max-w-2xl rounded-lg border border-white/10 bg-lamona-card p-6 text-center">
        {state === 'loading' && (
          <>
            <h1 className="text-3xl font-black">Confirmando pago...</h1>
            <p className="mt-3 text-lamona-muted">Estamos validando la transaccion con Webpay Plus.</p>
          </>
        )}

        {state === 'approved' && (
          <>
            <CheckCircle2 className="mx-auto text-lamona-orange" size={54} />
            <h1 className="mt-5 text-3xl font-black">Pago aprobado</h1>
            <p className="mt-3 text-lamona-muted">
              El pedido quedo pagado. Abrimos WhatsApp con el resumen para avisar al local.
            </p>
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-lamona-orange px-6 py-3 font-black text-white shadow-glow"
              >
                <MessageCircle size={19} />
                Reabrir resumen en WhatsApp
              </a>
            )}
          </>
        )}

        {state === 'rejected' && (
          <>
            <XCircle className="mx-auto text-red-300" size={54} />
            <h1 className="mt-5 text-3xl font-black">Pago no aprobado</h1>
            <p className="mt-3 text-lamona-muted">Webpay no autorizo la transaccion. Puedes volver al checkout e intentarlo otra vez.</p>
            <Link href="/checkout" className="mt-6 inline-flex rounded-full bg-lamona-orange px-6 py-3 font-black text-white">
              Volver al checkout
            </Link>
          </>
        )}

        {state === 'error' && (
          <>
            <XCircle className="mx-auto text-red-300" size={54} />
            <h1 className="mt-5 text-3xl font-black">No pudimos confirmar el pago</h1>
            <p className="mt-3 text-lamona-muted">{error}</p>
            <Link href="/checkout" className="mt-6 inline-flex rounded-full bg-lamona-orange px-6 py-3 font-black text-white">
              Volver al checkout
            </Link>
          </>
        )}
      </section>
    </main>
  );
}
