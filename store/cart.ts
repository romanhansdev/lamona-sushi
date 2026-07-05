'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ItemCarrito, PedidoExtras, ProductoMenu } from '@/types/menu';

interface CartState {
  items: ItemCarrito[];
  extras: PedidoExtras;
  agregar: (producto: ProductoMenu, cantidad?: number) => void;
  quitar: (productoId: string) => void;
  actualizarCantidad: (productoId: string, cantidad: number) => void;
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

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      extras: defaultExtras,
      agregar: (producto, cantidad = 1) => set((state) => {
        const existente = state.items.find((item) => item.producto.id === producto.id);
        if (existente) {
          return {
            items: state.items.map((item) =>
              item.producto.id === producto.id
                ? { ...item, cantidad: item.cantidad + cantidad }
                : item
            )
          };
        }

        return { items: [...state.items, { producto, cantidad }] };
      }),
      quitar: (productoId) => set((state) => ({
        items: state.items.filter((item) => item.producto.id !== productoId)
      })),
      actualizarCantidad: (productoId, cantidad) => set((state) => ({
        items: cantidad <= 0
          ? state.items.filter((item) => item.producto.id !== productoId)
          : state.items.map((item) =>
            item.producto.id === productoId ? { ...item, cantidad } : item
          )
      })),
      actualizarExtras: (extras) => set((state) => ({
        extras: { ...state.extras, ...extras }
      })),
      vaciar: () => set({ items: [] }),
      totalItems: () => get().items.reduce((acc, item) => acc + item.cantidad, 0),
      total: () => get().items.reduce(
        (acc, item) => acc + item.producto.precio * item.cantidad,
        0
      )
    }),
    { name: 'lamona-carrito' }
  )
);
