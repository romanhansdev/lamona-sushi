'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { useCart } from '@/store/cart';
import { formatPrice } from '@/lib/format';
import { getItemTotal, getUnitExtraPrice } from '@/lib/cartPricing';
import { QuantitySelector } from '@/components/QuantitySelector';
import { useHasMounted } from '@/lib/useHasMounted';
import type { ItemCarrito } from '@/types/menu';

function getCartItemId(item: ItemCarrito) {
  return item.id ?? item.producto.id;
}

function getSelectionLabels(item: ItemCarrito) {
  return (item.producto.opciones ?? [])
    .map((grupo) => {
      const selectedOption = grupo.opciones.find((option) => option.id === item.selecciones?.[grupo.id]);
      return selectedOption ? `${grupo.nombre}: ${selectedOption.nombre}` : '';
    })
    .filter(Boolean);
}

export default function CarritoPage() {
  const hasMounted = useHasMounted();
  const items = useCart((state) => state.items);
  const extras = useCart((state) => state.extras);
  const total = useCart((state) => state.total());
  const quitar = useCart((state) => state.quitar);
  const actualizarCantidad = useCart((state) => state.actualizarCantidad);
  const actualizarExtras = useCart((state) => state.actualizarExtras);

  if (!hasMounted) {
    return (
      <main className="container-page py-8">
        <div className="rounded-lg border border-white/10 bg-lamona-card p-8 text-center text-lamona-muted">
          Cargando pedido...
        </div>
      </main>
    );
  }

  return (
    <main className="container-page py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black">Tu pedido</h1>
        <p className="mt-2 text-lamona-muted">Edita cantidades, extras y revisa el total antes de confirmar.</p>
      </div>

      {items.length === 0 ? (
        <section className="rounded-lg border border-white/10 bg-lamona-card p-8 text-center">
          <h2 className="text-2xl font-black">El carrito esta vacio</h2>
          <p className="mt-2 text-lamona-muted">Agrega productos desde la carta para preparar el pedido.</p>
          <Link href="/carta" className="mt-6 inline-flex rounded-full bg-lamona-orange px-6 py-3 font-black text-white">
            Ver carta
          </Link>
        </section>
      ) : (
        <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {items.map((item) => {
              const itemId = getCartItemId(item);
              const selectionLabels = getSelectionLabels(item);
              const unitExtraPrice = getUnitExtraPrice(item.producto, item.selecciones);

              return (
              <article key={itemId} className="grid gap-4 rounded-lg border border-white/10 bg-lamona-card p-4 sm:grid-cols-[112px_1fr_auto]">
                <Image
                  src={item.producto.imagen}
                  alt={item.producto.nombre}
                  width={112}
                  height={96}
                  className="h-24 w-full rounded-md object-cover sm:w-28"
                />
                <div>
                  <h2 className="font-black">{item.producto.nombre}</h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-lamona-muted">
                    {item.producto.incluye.join(', ')}
                  </p>
                  {selectionLabels.length > 0 && (
                    <ul className="mt-3 grid gap-1 text-xs font-semibold text-lamona-bone/80">
                      {selectionLabels.map((label) => (
                        <li key={label}>{label}</li>
                      ))}
                    </ul>
                  )}
                  {unitExtraPrice > 0 && (
                    <p className="mt-2 text-xs font-semibold text-lamona-orange">
                      Extra por cambios: {formatPrice(unitExtraPrice)} c/u
                    </p>
                  )}
                  <p className="mt-3 font-black text-lamona-orange">
                    {formatPrice(getItemTotal(item))}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-3 sm:grid sm:justify-items-end">
                  <QuantitySelector
                    value={item.cantidad}
                    onChange={(cantidad) => actualizarCantidad(itemId, cantidad)}
                  />
                  <button
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm text-lamona-muted transition hover:bg-white/8 hover:text-lamona-bone"
                    onClick={() => quitar(itemId)}
                  >
                    <Trash2 size={16} />
                    Eliminar
                  </button>
                </div>
              </article>
              );
            })}
          </div>

          <aside className="glass-panel h-fit rounded-lg p-5">
            <h2 className="text-xl font-black">Extras incluidos</h2>
            <div className="mt-5 space-y-4">
              <label className="flex items-center justify-between gap-4">
                <span className="font-semibold">Wasabi</span>
                <input
                  type="checkbox"
                  checked={extras.wasabi}
                  onChange={(event) => actualizarExtras({ wasabi: event.target.checked })}
                  className="h-5 w-5 accent-lamona-orange"
                />
              </label>
              <label className="flex items-center justify-between gap-4">
                <span className="font-semibold">Jengibre</span>
                <input
                  type="checkbox"
                  checked={extras.jengibre}
                  onChange={(event) => actualizarExtras({ jengibre: event.target.checked })}
                  className="h-5 w-5 accent-lamona-orange"
                />
              </label>
              <label className="grid gap-2">
                <span className="font-semibold">Salsa soya</span>
                <input
                  type="number"
                  min={0}
                  value={extras.salsaSoya}
                  onChange={(event) => actualizarExtras({ salsaSoya: Number(event.target.value) })}
                  className="rounded-md border border-white/10 bg-black/20 px-3 py-2 outline-none focus:border-lamona-orange"
                />
              </label>
              <label className="grid gap-2">
                <span className="font-semibold">Palitos</span>
                <input
                  type="number"
                  min={0}
                  value={extras.palitos}
                  onChange={(event) => actualizarExtras({ palitos: Number(event.target.value) })}
                  className="rounded-md border border-white/10 bg-black/20 px-3 py-2 outline-none focus:border-lamona-orange"
                />
              </label>
            </div>
            <div className="my-5 h-px bg-white/10" />
            <div className="flex items-center justify-between text-lg font-black">
              <span>Total</span>
              <span className="text-lamona-orange">{formatPrice(total)}</span>
            </div>
            <div className="mt-5 grid gap-3">
              <Link href="/checkout" className="rounded-full bg-lamona-orange px-5 py-3 text-center font-black text-white shadow-glow">
                Ir a confirmar
              </Link>
              <Link href="/carta" className="rounded-full border border-white/10 px-5 py-3 text-center font-bold text-lamona-bone">
                Seguir comprando
              </Link>
            </div>
          </aside>
        </section>
      )}
    </main>
  );
}
