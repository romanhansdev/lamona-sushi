'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ItemCarrito, PedidoExtras, ProductoMenu, SeleccionesProducto } from '@/types/menu';
import { getItemTotal } from '@/lib/cartPricing';

interface CartState {
  items: ItemCarrito[];
  extras: PedidoExtras;
  agregar: (producto: ProductoMenu, cantidad?: number, selecciones?: SeleccionesProducto) => void;
  quitar: (itemId: string) => void;
  actualizarCantidad: (itemId: string, cantidad: number) => void;
  actualizarExtras: (extras: Partial<PedidoExtras>) => void;
  vaciar: () => void;
  totalItems: () => number;
  total: () => number;
}

const defaultExtras: PedidoExtras = {
  wasabi: true,
  jengibre: true,
  salsaSoya: 2,
  palitos: 2
};

function createCartItemId(producto: ProductoMenu, selecciones?: SeleccionesProducto) {
  const serializedSelections = Object.entries(selecciones ?? {})
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([groupId, optionId]) => `${groupId}:${optionId}`)
    .join('|');

  return serializedSelections ? `${producto.id}__${serializedSelections}` : producto.id;
}

function getCartItemId(item: ItemCarrito) {
  return item.id ?? item.producto.id;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      extras: defaultExtras,
      agregar: (producto, cantidad = 1, selecciones) => set((state) => {
        const itemId = createCartItemId(producto, selecciones);
        const existente = state.items.find((item) => getCartItemId(item) === itemId);
        if (existente) {
          return {
            items: state.items.map((item) =>
              getCartItemId(item) === itemId
                ? { ...item, cantidad: item.cantidad + cantidad }
                : item
            )
          };
        }

        return { items: [...state.items, { id: itemId, producto, cantidad, selecciones }] };
      }),
      quitar: (itemId) => set((state) => ({
        items: state.items.filter((item) => getCartItemId(item) !== itemId)
      })),
      actualizarCantidad: (itemId, cantidad) => set((state) => ({
        items: cantidad <= 0
          ? state.items.filter((item) => getCartItemId(item) !== itemId)
          : state.items.map((item) =>
            getCartItemId(item) === itemId ? { ...item, cantidad } : item
          )
      })),
      actualizarExtras: (extras) => set((state) => ({
        extras: { ...state.extras, ...extras }
      })),
      vaciar: () => set({ items: [] }),
      totalItems: () => get().items.reduce((acc, item) => acc + item.cantidad, 0),
      total: () => get().items.reduce(
        (acc, item) => acc + getItemTotal(item),
        0
      )
    }),
    { name: 'lamona-carrito' }
  )
);
