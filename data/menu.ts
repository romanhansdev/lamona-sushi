import type { CategoriaMenu, ProductoMenu } from '@/types/menu';

export const categorias: CategoriaMenu[] = [
  {
    id: 'combinaciones',
    nombre: 'Combinaciones',
    descripcion: 'Tablas pensadas para compartir.'
  },
  {
    id: 'rolls-especiales',
    nombre: 'Rolls Especiales',
    descripcion: 'Rolls con los favoritos de la casa.'
  },
  {
    id: 'gohan',
    nombre: 'Gohan',
    descripcion: 'Bowls contundentes con base, proteína y salsas.'
  },
  {
    id: 'tempura',
    nombre: 'Tempura & Panko',
    descripcion: 'Opciones crocantes para antojos fuertes.'
  },
  {
    id: 'extras',
    nombre: 'Extras',
    descripcion: 'Salsas, agregados y acompañamientos.'
  }
];

export const productos: ProductoMenu[] = [
  {
    id: 'tabla-lamona-30',
    nombre: 'Tabla Lamona 30 piezas',
    slug: 'tabla-lamona-30',
    categoria: 'combinaciones',
    precio: 21900,
    precioAntes: 24900,
    imagen: '/imgPrueva/imagenDePrueba4.jpeg',
    incluye: ['10 California salmón', '10 tempura pollo', '10 veggie palta', 'Soya, wasabi y jengibre'],
    destacado: true,
    disponible: true
  },
  {
    id: 'tabla-mix-50',
    nombre: 'Tabla Mix 50 piezas',
    slug: 'tabla-mix-50',
    categoria: 'combinaciones',
    precio: 34900,
    precioAntes: 38900,
    imagen: '/imgPrueva/imagenDePrueba5.jpeg',
    incluye: ['20 rolls fríos', '20 rolls calientes', '10 piezas especiales', 'Salsas incluidas'],
    destacado: true,
    disponible: true
  },
  {
    id: 'combo-duo',
    nombre: 'Combo Dúo Lamona',
    slug: 'combo-duo',
    categoria: 'combinaciones',
    precio: 17900,
    imagen: '/imgPrueva/imagen de pueba 1.jpeg',
    incluye: ['20 piezas mixtas', '2 bebidas', 'Salsa acevichada'],
    disponible: true
  },
  {
    id: 'acevichado-roll',
    nombre: 'Acevichado Roll',
    slug: 'acevichado-roll',
    categoria: 'rolls-especiales',
    precio: 7200,
    imagen: '/imgPrueva/imagenDePrueba2.avif',
    incluye: ['Camarón furai', 'Palta', 'Queso crema', 'Salsa acevichada'],
    destacado: true,
    disponible: true
  },
  {
    id: 'salmon-teriyaki',
    nombre: 'Salmón Teriyaki Roll',
    slug: 'salmon-teriyaki',
    categoria: 'rolls-especiales',
    precio: 6900,
    imagen: '/imgPrueva/imagenDePrueba3.jpeg',
    incluye: ['Salmón', 'Queso crema', 'Cebollín', 'Salsa teriyaki'],
    disponible: true
  },
  {
    id: 'veggie-lamona',
    nombre: 'Veggie Lamona Roll',
    slug: 'veggie-lamona',
    categoria: 'rolls-especiales',
    precio: 5900,
    imagen: '/imgPrueva/imagenDePrueba4.jpeg',
    incluye: ['Palta', 'Champiñón', 'Pepino', 'Queso crema'],
    disponible: true
  },
  {
    id: 'gohan-marino',
    nombre: 'Gohan Marino',
    slug: 'gohan-marino',
    categoria: 'gohan',
    precio: 8900,
    imagen: '/imgPrueva/gohanmarino.jpeg',
    incluye: ['Arroz sushi', 'Salmón', 'Camarón', 'Palta', 'Salsa spicy'],
    destacado: true,
    disponible: true
  },
  {
    id: 'gohan-pollo-furai',
    nombre: 'Gohan Pollo Furai',
    slug: 'gohan-pollo-furai',
    categoria: 'gohan',
    precio: 7900,
    imagen: '/imgPrueva/imagenDePrueba5.jpeg',
    incluye: ['Arroz sushi', 'Pollo furai', 'Palta', 'Queso crema', 'Salsa teriyaki'],
    disponible: true
  },
  {
    id: 'gohan-veggie',
    nombre: 'Gohan Veggie',
    slug: 'gohan-veggie',
    categoria: 'gohan',
    precio: 6900,
    imagen: '/imgPrueva/imagen de pueba 1.jpeg',
    incluye: ['Arroz sushi', 'Palta', 'Champiñón', 'Pepino', 'Cebollín'],
    disponible: true
  },
  {
    id: 'tempura-ebi',
    nombre: 'Tempura Ebi Roll',
    slug: 'tempura-ebi',
    categoria: 'tempura',
    precio: 7400,
    imagen: '/imgPrueva/imagenDePrueba2.avif',
    incluye: ['Camarón', 'Queso crema', 'Palta', 'Cobertura tempura'],
    disponible: true
  },
  {
    id: 'panko-chicken',
    nombre: 'Panko Chicken Roll',
    slug: 'panko-chicken',
    categoria: 'tempura',
    precio: 6800,
    imagen: '/imgPrueva/imagenDePrueba3.jpeg',
    incluye: ['Pollo', 'Queso crema', 'Cebollín', 'Cobertura panko'],
    disponible: true
  },
  {
    id: 'salsa-acevichada',
    nombre: 'Salsa Acevichada',
    slug: 'salsa-acevichada',
    categoria: 'extras',
    precio: 900,
    imagen: '/imgPrueva/imagenDePrueba4.jpeg',
    incluye: ['Porción individual'],
    disponible: true
  }
];

export const destacados = productos.filter((producto) => producto.destacado);
