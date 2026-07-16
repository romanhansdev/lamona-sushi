export interface OpcionProducto {
  id: string;
  nombre: string;
}

export interface GrupoOpcionesProducto {
  id: string;
  nombre: string;
  requerido?: boolean;
  opciones: OpcionProducto[];
}

export type SeleccionesProducto = Record<string, string>;

export interface ProductoMenu {
  id: string;
  nombre: string;
  slug: string;
  categoria: string;
  precio: number;
  precioAntes?: number;
  imagen: string;
  incluye: string[];
  destacado?: boolean;
  disponible: boolean;
  notas?: string;
  opciones?: GrupoOpcionesProducto[];
}

export interface CategoriaMenu {
  id: string;
  nombre: string;
  descripcion: string;
}

export interface ItemCarrito {
  id: string;
  producto: ProductoMenu;
  cantidad: number;
  selecciones?: SeleccionesProducto;
}

export interface PedidoExtras {
  wasabi: boolean;
  jengibre: boolean;
  salsaSoya: number;
  palitos: number;
}

export interface DatosEntrega {
  nombre: string;
  telefono: string;
  tipoEntrega: 'Retiro en local' | 'Delivery';
  direccion: string;
  comentarios: string;
}
