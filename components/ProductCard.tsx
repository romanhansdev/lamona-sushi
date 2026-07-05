'use client';

import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import type { ProductoMenu } from '@/types/menu';
import { formatPrice } from '@/lib/format';

interface ProductCardProps {
  producto: ProductoMenu;
  onOpen: (producto: ProductoMenu) => void;
  onQuickAdd: (producto: ProductoMenu) => void;
}

export function ProductCard({ producto, onOpen, onQuickAdd }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-lg border border-white/10 bg-lamona-card">
      <button
        className="block w-full text-left"
        onClick={() => onOpen(producto)}
        aria-label={`Ver detalle de ${producto.nombre}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-lamona-slate">
          <Image
            src={producto.imagen}
            alt={producto.nombre}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />
          {producto.precioAntes && (
            <span className="absolute left-3 top-3 rounded-full bg-black/72 px-3 py-1 text-xs font-bold text-lamona-bone">
              Promo
            </span>
          )}
        </div>
      </button>
      <div className="grid min-h-36 gap-4 p-4">
        <button className="text-left" onClick={() => onOpen(producto)}>
          <h3 className="text-base font-black leading-tight text-lamona-bone">{producto.nombre}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-lamona-muted">
            {producto.incluye.slice(0, 3).join(', ')}
          </p>
        </button>
        <div className="flex items-end justify-between gap-3">
          <div>
            {producto.precioAntes && (
              <p className="text-xs font-semibold text-lamona-muted line-through">
                {formatPrice(producto.precioAntes)}
              </p>
            )}
            <p className="text-lg font-black text-lamona-orange">{formatPrice(producto.precio)}</p>
          </div>
          <button
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lamona-orange text-white shadow-glow transition hover:bg-lamona-orangeDark"
            onClick={() => onQuickAdd(producto)}
            aria-label={`Agregar ${producto.nombre}`}
          >
            <ShoppingCart size={19} />
          </button>
        </div>
      </div>
    </article>
  );
}
