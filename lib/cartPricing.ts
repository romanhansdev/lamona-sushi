import type { ItemCarrito, ProductoMenu, SeleccionesProducto } from '@/types/menu';

export const OPTION_CHANGE_EXTRA_PRICE = 1000;

export function getOptionChangeCount(producto: ProductoMenu, selecciones?: SeleccionesProducto) {
  return (producto.opciones ?? []).reduce((count, grupo) => {
    const defaultOption = grupo.opciones[0];
    const selectedOptionId = selecciones?.[grupo.id];

    if (!defaultOption || !selectedOptionId || selectedOptionId === defaultOption.id) {
      return count;
    }

    return count + 1;
  }, 0);
}

export function getUnitExtraPrice(producto: ProductoMenu, selecciones?: SeleccionesProducto) {
  return getOptionChangeCount(producto, selecciones) * OPTION_CHANGE_EXTRA_PRICE;
}

export function getUnitPrice(producto: ProductoMenu, selecciones?: SeleccionesProducto) {
  return producto.precio + getUnitExtraPrice(producto, selecciones);
}

export function getItemTotal(item: ItemCarrito) {
  return getUnitPrice(item.producto, item.selecciones) * item.cantidad;
}
