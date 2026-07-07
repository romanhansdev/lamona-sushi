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
}

export interface CategoriaMenu {
  id: string;
  nombre: string;
  descripcion: string;
}

export interface ItemCarrito {
  producto: ProductoMenu;
  cantidad: number;
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
