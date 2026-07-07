import type { ProductoMenu } from '@/types/menu';

export interface Promo {
  id: string;
  nombre: string;
  piezas: number;
  tipo?: string;
  incluye: string[];
  precio: number;
  imagen: string;
}

export const PROMOS: Promo[] = [
  {
    id: 'promo-1',
    nombre: 'Promo 1',
    piezas: 20,
    incluye: ['Ebi Hot Roll (frito)', 'California Tori (sesamo)'],
    precio: 6990,
    imagen: '/promos/promo-1.jpg'
  },
  {
    id: 'promo-2',
    nombre: 'Promo 2',
    piezas: 30,
    incluye: ['Sake Hot (frito)', 'Avocado Tori (palta)', 'California Kani (ciboulette)'],
    precio: 9990,
    imagen: '/promos/promo-2.jpg'
  },
  {
    id: 'promo-3',
    nombre: 'Promo 3',
    piezas: 40,
    tipo: 'fritas',
    incluye: ['Ebi Hot', 'Kani Hot', 'Tori Hot', 'Chercanes Hot'],
    precio: 13990,
    imagen: '/promos/promo-3.jpg'
  },
  {
    id: 'promo-4',
    nombre: 'Promo 4',
    piezas: 40,
    tipo: 'mixta',
    incluye: ['Tori Hot (frito)', 'Ebi Hot (frito)', 'Avocado Sake (palta)', 'Cheese Ebi (queso)'],
    precio: 14990,
    imagen: '/promos/promo-4.jpg'
  },
  {
    id: 'promo-5',
    nombre: 'Promo 5',
    piezas: 40,
    tipo: 'vegetarianas',
    incluye: ['California Chercanes (sesamo)', 'Avocado Natura (palta)', 'Cheese Natura (queso)', 'Chercanes Hot (frito)'],
    precio: 14990,
    imagen: '/promos/promo-5.jpg'
  },
  {
    id: 'promo-6',
    nombre: 'Promo 6',
    piezas: 60,
    incluye: ['Sake Ebi (salmon)', 'Avocado Tori (palta)', 'California Kani (ciboulette)', 'California Sake (masago)', 'Mona Hot Roll (frito)', 'Tori Hot Roll (frito)'],
    precio: 20990,
    imagen: '/promos/promo-6.jpg'
  },
  {
    id: 'promo-7',
    nombre: 'Promo 7',
    piezas: 80,
    incluye: ['California Chercanes (ciboulette)', 'California Sake (sesamo)', 'Cheese Kani (queso)', 'Avocado Tori (palta)', 'Sake Ebi Furay (salmon)', 'Ebi Hot (frito)', 'Tori Hot (frito)', '5 Arrollados Primavera', '5 Gysas Mixtas'],
    precio: 28990,
    imagen: '/promos/promo-7.jpg'
  },
  {
    id: 'promo-8',
    nombre: 'Promo 8',
    piezas: 100,
    incluye: ['Avocado Tori (palta)', 'Avocado Ebi (palta)', 'California Kani (sesamo)', 'Sake Katsu (salmon)', 'Cheese Ebi (queso)', 'Kani Hot (frito)', 'Ebi Hot (frito)', 'Sake Hot (frito)', 'Acevichado Roll', '5 Arrollado Primavera', '5 Gyosas Mixtas'],
    precio: 35990,
    imagen: '/promos/promo-8.jpg'
  }
];

export function promoToProduct(promo: Promo): ProductoMenu {
  return {
    id: promo.id,
    nombre: `${promo.nombre} - ${promo.piezas} piezas`,
    slug: promo.id,
    categoria: 'promos',
    precio: promo.precio,
    imagen: promo.imagen,
    incluye: promo.incluye,
    destacado: promo.piezas >= 60,
    disponible: true
  };
}
