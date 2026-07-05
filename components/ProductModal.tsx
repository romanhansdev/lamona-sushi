'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { useState } from 'react';
import type { ProductoMenu } from '@/types/menu';
import { formatPrice } from '@/lib/format';
import { QuantitySelector } from './QuantitySelector';

interface ProductModalProps {
  producto: ProductoMenu | null;
  onClose: () => void;
  onAdd: (producto: ProductoMenu, cantidad: number) => void;
}

export function ProductModal({ producto, onClose, onAdd }: ProductModalProps) {
  const [cantidad, setCantidad] = useState(1);

  if (!producto) {
    return null;
  }

  const total = producto.precio * cantidad;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-end bg-black/70 p-0 backdrop-blur-sm md:place-items-center md:p-6">
      <section className="glass-panel max-h-[92vh] w-full overflow-auto rounded-t-lg md:max-w-xl md:rounded-lg">
        <div className="relative aspect-[5/3] bg-lamona-slate">
          <Image
            src={producto.imagen}
            alt={producto.nombre}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 560px, 100vw"
          />
          <button
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/70 text-white"
            onClick={onClose}
            aria-label="Cerrar detalle"
          >
            <X size={20} />
          </button>
        </div>
        <div className="space-y-5 p-5">
          <div>
            <h2 className="text-2xl font-black">{producto.nombre}</h2>
            <p className="mt-2 text-xl font-black text-lamona-orange">{formatPrice(producto.precio)}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-lamona-muted">Incluye</h3>
            <ul className="mt-3 grid gap-2 text-sm text-lamona-bone/78">
              {producto.incluye.map((item) => (
                <li key={item} className="rounded bg-white/5 px-3 py-2">{item}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-semibold text-lamona-muted">Cantidad</span>
            <QuantitySelector value={cantidad} onChange={setCantidad} />
          </div>

          <button
            className="w-full rounded-full bg-lamona-orange px-5 py-4 text-base font-black text-white shadow-glow transition hover:bg-lamona-orangeDark"
            onClick={() => {
              onAdd(producto, cantidad);
              setCantidad(1);
              onClose();
            }}
          >
            Agregar {formatPrice(total)}
          </button>
        </div>
      </section>
    </div>
  );
}
