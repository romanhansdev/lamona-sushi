'use client';

import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import type { Promo } from '@/data/promos';
import { promoToProduct } from '@/data/promos';
import { formatPrice } from '@/lib/format';
import { useCart } from '@/store/cart';

export function PromoCard({ promo }: { promo: Promo }) {
  const agregar = useCart((state) => state.agregar);
  const detalle = `${promo.piezas} piezas${promo.tipo ? ` ${promo.tipo}` : ''}`;

  return (
    <article className="group grid overflow-hidden rounded-lg border border-white/10 bg-lamona-card md:grid-rows-[auto_1fr]">
      <div className="relative aspect-[4/3] overflow-hidden bg-lamona-slate">
        <Image
          src={promo.imagen}
          alt={promo.nombre}
          fill
          className="object-cover object-center transition duration-300 group-hover:scale-105"
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-black/75 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-lamona-bone">
          {detalle}
        </span>
      </div>

      <div className="grid gap-4 p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-black leading-tight text-lamona-bone">{promo.nombre}</h3>
            <p className="mt-1 text-sm font-bold text-lamona-muted">{detalle}</p>
          </div>
          <p className="shrink-0 text-xl font-black text-lamona-orange">{formatPrice(promo.precio)}</p>
        </div>

        <ul className="grid gap-2 text-sm leading-5 text-lamona-bone/76">
          {promo.incluye.map((item) => (
            <li key={item} className="rounded-md bg-white/5 px-3 py-2">
              {item}
            </li>
          ))}
        </ul>

        <button
          onClick={() => agregar(promoToProduct(promo))}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-lamona-orange px-5 py-3 text-sm font-black text-white shadow-glow transition hover:bg-lamona-orangeDark"
        >
          <ShoppingCart size={18} />
          Agregar promo
        </button>
      </div>
    </article>
  );
}
