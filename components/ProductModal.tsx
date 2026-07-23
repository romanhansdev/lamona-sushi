'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { ProductoMenu, SeleccionesProducto } from '@/types/menu';
import { getUnitExtraPrice, getUnitPrice, OPTION_CHANGE_EXTRA_PRICE } from '@/lib/cartPricing';
import { formatPrice } from '@/lib/format';
import { QuantitySelector } from './QuantitySelector';

interface ProductModalProps {
  producto: ProductoMenu | null;
  onClose: () => void;
  onAdd: (producto: ProductoMenu, cantidad: number, selecciones?: SeleccionesProducto) => void;
}

export function ProductModal({ producto, onClose, onAdd }: ProductModalProps) {
  const [cantidad, setCantidad] = useState(1);
  const [selecciones, setSelecciones] = useState<SeleccionesProducto>({});

  useEffect(() => {
    if (!producto) {
      return;
    }

    const defaultSelections = (producto.opciones ?? []).reduce<SeleccionesProducto>((acc, grupo) => {
      const firstOption = grupo.opciones[0];
      if (firstOption) {
        acc[grupo.id] = firstOption.id;
      }
      return acc;
    }, {});

    setCantidad(1);
    setSelecciones(defaultSelections);
  }, [producto]);

  const selectedLabels = useMemo(() => {
    if (!producto?.opciones) {
      return {};
    }

    return producto.opciones.reduce<Record<string, string>>((acc, grupo) => {
      const selectedOption = grupo.opciones.find((option) => option.id === selecciones[grupo.id]);
      if (selectedOption) {
        acc[grupo.id] = selectedOption.nombre;
      }
      return acc;
    }, {});
  }, [producto, selecciones]);

  if (!producto) {
    return null;
  }

  const unitExtraPrice = getUnitExtraPrice(producto, selecciones);
  const unitPrice = getUnitPrice(producto, selecciones);
  const total = unitPrice * cantidad;
  const hasRequiredSelections = (producto.opciones ?? []).every((grupo) => (
    !grupo.requerido || Boolean(selecciones[grupo.id])
  ));
  const proteinSelections = Object.entries(selecciones)
    .filter(([groupId]) => groupId.startsWith('proteina-'))
    .map(([, optionId]) => optionId);
  const ingredientSelections = Object.entries(selecciones)
    .filter(([groupId]) => groupId.startsWith('ingrediente-'))
    .map(([, optionId]) => optionId);
  const hasRepeatedSelections = new Set(proteinSelections).size !== proteinSelections.length
    || new Set(ingredientSelections).size !== ingredientSelections.length;
  const canAdd = hasRequiredSelections && !hasRepeatedSelections;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-end bg-black/70 p-0 backdrop-blur-sm md:place-items-center md:p-6">
      <section className="glass-panel max-h-[92vh] w-full overflow-auto rounded-t-lg md:max-w-2xl md:rounded-lg">
        <div className="relative aspect-[5/3] bg-lamona-slate">
          <Image
            src={producto.imagen}
            alt={producto.nombre}
            fill
            className="object-contain p-5"
            sizes="(min-width: 768px) 672px, 100vw"
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
            <p className="mt-2 text-xl font-black text-lamona-orange">{formatPrice(unitPrice)}</p>
            {unitExtraPrice > 0 && (
              <p className="mt-1 text-xs font-semibold text-lamona-muted">
                Incluye {formatPrice(unitExtraPrice)} extra por cambios.
              </p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase text-lamona-muted">Incluye</h3>
            <ul className="mt-3 grid gap-2 text-sm text-lamona-bone/78">
              {producto.incluye.map((item) => (
                <li key={item} className="rounded bg-white/5 px-3 py-2">{item}</li>
              ))}
            </ul>
          </div>

          {producto.opciones?.map((grupo) => (
            <fieldset key={grupo.id} className="space-y-3">
              <legend className="text-sm font-black text-lamona-bone">
                {grupo.nombre}
              </legend>
              <div className="grid gap-2">
                {grupo.opciones.map((option) => (
                  <label
                    key={option.id}
                    className="flex min-h-11 items-center gap-3 rounded-md border border-white/10 bg-black/14 px-3 py-2 text-sm font-semibold text-lamona-bone/90 transition hover:border-lamona-orange/45"
                  >
                    <input
                      type="radio"
                      name={`${producto.id}-${grupo.id}`}
                      value={option.id}
                      checked={selecciones[grupo.id] === option.id}
                      onChange={() => setSelecciones((current) => ({
                        ...current,
                        [grupo.id]: option.id
                      }))}
                      className="h-5 w-5 accent-lamona-orange"
                    />
                    <span>{option.nombre}</span>
                    {grupo.opciones[0]?.id !== option.id && (
                      <span className="ml-auto text-xs font-black text-lamona-orange">
                        +{formatPrice(OPTION_CHANGE_EXTRA_PRICE)}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-semibold text-lamona-muted">Cantidad</span>
            <QuantitySelector value={cantidad} onChange={setCantidad} />
          </div>

          <button
            className="w-full rounded-full bg-lamona-orange px-5 py-4 text-base font-black text-white shadow-glow transition hover:bg-lamona-orangeDark disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-lamona-muted disabled:shadow-none"
            disabled={!canAdd}
            onClick={() => {
              onAdd(producto, cantidad, selecciones);
              onClose();
            }}
          >
            Agregar {formatPrice(total)}
          </button>
          {hasRepeatedSelections && (
            <p className="text-center text-xs font-semibold text-red-300">
              Elige proteínas e ingredientes diferentes.
            </p>
          )}
          {Object.keys(selectedLabels).length > 0 && (
            <p className="text-center text-xs font-semibold text-lamona-muted">
              Seleccion: {Object.values(selectedLabels).join(', ')}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
