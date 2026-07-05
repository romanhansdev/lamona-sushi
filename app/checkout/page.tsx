'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useCart } from '@/store/cart';
import type { DatosEntrega } from '@/types/menu';
import { buildWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import { formatPrice } from '@/lib/format';
import { useHasMounted } from '@/lib/useHasMounted';

const initialData: DatosEntrega = {
  nombre: '',
  telefono: '',
  tipoEntrega: 'Retiro en local',
  direccion: '',
  comentarios: ''
};

export default function CheckoutPage() {
  const hasMounted = useHasMounted();
  const items = useCart((state) => state.items);
  const extras = useCart((state) => state.extras);
  const total = useCart((state) => state.total());
  const [datos, setDatos] = useState<DatosEntrega>(initialData);

  const message = useMemo(
    () => buildWhatsAppMessage(items, total, extras, datos),
    [items, total, extras, datos]
  );

  const whatsappUrl = buildWhatsAppUrl(message);
  const canSubmit = items.length > 0 && datos.nombre.trim() && datos.telefono.trim()
    && (datos.tipoEntrega === 'Retiro en local' || datos.direccion.trim());

  if (!hasMounted) {
    return (
      <main className="container-page py-8">
        <div className="rounded-lg border border-white/10 bg-lamona-card p-8 text-center text-lamona-muted">
          Cargando checkout...
        </div>
      </main>
    );
  }

  return (
    <main className="container-page py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black">Confirmar pedido</h1>
        <p className="mt-2 text-lamona-muted">Primera version: genera un mensaje automatico de WhatsApp con el resumen.</p>
      </div>

      {items.length === 0 ? (
        <section className="rounded-lg border border-white/10 bg-lamona-card p-8 text-center">
          <h2 className="text-2xl font-black">No hay productos para confirmar</h2>
          <Link href="/carta" className="mt-6 inline-flex rounded-full bg-lamona-orange px-6 py-3 font-black text-white">
            Ir a la carta
          </Link>
        </section>
      ) : (
        <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <form className="rounded-lg border border-white/10 bg-lamona-card p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-bold text-lamona-muted">Nombre</span>
                <input
                  value={datos.nombre}
                  onChange={(event) => setDatos({ ...datos, nombre: event.target.value })}
                  className="rounded-md border border-white/10 bg-black/20 px-3 py-3 outline-none focus:border-lamona-orange"
                  placeholder="Nombre del cliente"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-bold text-lamona-muted">Telefono</span>
                <input
                  value={datos.telefono}
                  onChange={(event) => setDatos({ ...datos, telefono: event.target.value })}
                  className="rounded-md border border-white/10 bg-black/20 px-3 py-3 outline-none focus:border-lamona-orange"
                  placeholder="+56 9 ..."
                />
              </label>
            </div>

            <div className="mt-4 grid gap-3">
              <span className="text-sm font-bold text-lamona-muted">Entrega</span>
              <div className="grid gap-3 sm:grid-cols-2">
                {(['Retiro en local', 'Delivery'] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setDatos({ ...datos, tipoEntrega: option })}
                    className={`rounded-md border px-4 py-3 text-left font-bold ${
                      datos.tipoEntrega === option
                        ? 'border-lamona-orange bg-lamona-orange/16 text-lamona-bone'
                        : 'border-white/10 bg-black/20 text-lamona-muted'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {datos.tipoEntrega === 'Delivery' && (
              <label className="mt-4 grid gap-2">
                <span className="text-sm font-bold text-lamona-muted">Direccion</span>
                <input
                  value={datos.direccion}
                  onChange={(event) => setDatos({ ...datos, direccion: event.target.value })}
                  className="rounded-md border border-white/10 bg-black/20 px-3 py-3 outline-none focus:border-lamona-orange"
                  placeholder="Calle, numero, comuna, referencia"
                />
              </label>
            )}

            <label className="mt-4 grid gap-2">
              <span className="text-sm font-bold text-lamona-muted">Comentarios</span>
              <textarea
                value={datos.comentarios}
                onChange={(event) => setDatos({ ...datos, comentarios: event.target.value })}
                className="min-h-28 rounded-md border border-white/10 bg-black/20 px-3 py-3 outline-none focus:border-lamona-orange"
                placeholder="Sin cebollin, cambio de salsa, referencia de entrega..."
              />
            </label>
          </form>

          <aside className="glass-panel h-fit rounded-lg p-5">
            <h2 className="text-xl font-black">Resumen</h2>
            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div key={item.producto.id} className="flex justify-between gap-4 text-sm">
                  <span className="text-lamona-bone/78">{item.cantidad}x {item.producto.nombre}</span>
                  <span className="font-bold">{formatPrice(item.producto.precio * item.cantidad)}</span>
                </div>
              ))}
            </div>
            <div className="my-5 h-px bg-white/10" />
            <div className="flex items-center justify-between text-lg font-black">
              <span>Total</span>
              <span className="text-lamona-orange">{formatPrice(total)}</span>
            </div>
            <a
              href={canSubmit ? whatsappUrl : undefined}
              target="_blank"
              className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 font-black text-white ${
                canSubmit ? 'bg-lamona-orange shadow-glow' : 'pointer-events-none bg-white/10 text-lamona-muted'
              }`}
            >
              <MessageCircle size={20} />
              Enviar por WhatsApp
            </a>
            <p className="mt-3 text-xs leading-5 text-lamona-muted">
              Cambia el numero real del local en `lib/whatsapp.ts` antes de publicar.
            </p>
          </aside>
        </section>
      )}
    </main>
  );
}
