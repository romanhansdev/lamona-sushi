import type { CategoriaMenu, ProductoMenu } from '@/types/menu';

const PRODUCT_IMAGE = '/imgPrueva/imagenDePrueba4.jpeg';

const orientalFillingOptions = [
  {
    id: 'relleno',
    nombre: 'Elige tu relleno',
    requerido: true,
    opciones: [
      { id: 'salmon', nombre: 'Salmon' },
      { id: 'camaron', nombre: 'Camaron' },
      { id: 'pollo-furai', nombre: 'Pollo furai' },
      { id: 'kanikama', nombre: 'Kanikama' },
      { id: 'vegetariano', nombre: 'Vegetariano' }
    ]
  }
];

export const PROTEINAS_ARMABLE = ['Pollo', 'Camaron', 'Kanikama', 'Salmon', 'Pulpo', 'Atun'];
export const INGREDIENTES_ARMABLE = ['Palta', 'Cebollin', 'Ciboulette', 'Queso crema', 'Palmito', 'Champinon', 'Pimenton'];

const toOption = (nombre: string) => ({
  id: nombre.toLowerCase().replaceAll(' ', '-'),
  nombre
});

const armableOptions: NonNullable<ProductoMenu['opciones']> = [
  {
    id: 'proteina-1',
    nombre: 'Proteína 1',
    requerido: true,
    opciones: PROTEINAS_ARMABLE.map(toOption)
  },
  {
    id: 'proteina-2',
    nombre: 'Proteína 2',
    requerido: true,
    opciones: ['Camaron', 'Pollo', 'Kanikama', 'Salmon', 'Pulpo', 'Atun'].map(toOption)
  },
  {
    id: 'ingrediente-1',
    nombre: 'Ingrediente 1',
    requerido: true,
    opciones: INGREDIENTES_ARMABLE.map(toOption)
  },
  {
    id: 'ingrediente-2',
    nombre: 'Ingrediente 2',
    requerido: true,
    opciones: ['Cebollin', 'Palta', 'Ciboulette', 'Queso crema', 'Palmito', 'Champinon', 'Pimenton'].map(toOption)
  },
  {
    id: 'ingrediente-3',
    nombre: 'Ingrediente 3',
    requerido: true,
    opciones: ['Queso crema', 'Palta', 'Cebollin', 'Ciboulette', 'Palmito', 'Champinon', 'Pimenton'].map(toOption)
  }
];

export const categorias: CategoriaMenu[] = [
  { id: 'picar-y-compartir', nombre: 'Picar y compartir', descripcion: 'Entradas calientes y bocados para abrir el pedido.' },
  { id: 'sashimis', nombre: 'Sashimis', descripcion: 'Cortes frescos de salmon, atun o pulpo.' },
  { id: 'hand-rolls', nombre: 'Hand Rolls', descripcion: 'Formato rapido con queso crema y cebollin.' },
  { id: 'ceviches', nombre: 'Ceviches', descripcion: 'Marinados al limon con acompanamientos peruanos.' },
  { id: 'gohans-o-chirashi', nombre: 'Gohans o Chirashi', descripcion: 'Bowls con arroz, palta, sesamo y cebollin.' },
  { id: 'hosomakis', nombre: 'Hosomakis', descripcion: 'Rolls envueltos en alga nori.' },
  { id: 'california-rolls', nombre: 'California Rolls', descripcion: 'Envuelto en sesamo, ciboulette o masago.' },
  { id: 'avocado-rolls', nombre: 'Avocado Rolls', descripcion: 'Rolls envueltos en palta.' },
  { id: 'sake-rolls', nombre: 'Sake Rolls', descripcion: 'Rolls envueltos en salmon.' },
  { id: 'white-rolls', nombre: 'White Rolls', descripcion: 'Rolls envueltos en queso crema.' },
  { id: 'hot-rolls', nombre: 'Hot Rolls', descripcion: 'Rolls calientes envueltos en panko.' },
  { id: 'rolls-premium', nombre: 'Rolls Premium', descripcion: 'Preparaciones de la casa con salsas especiales.' },
  { id: 'rolls-sin-arroz-armable', nombre: 'Rolls sin Arroz (armable)', descripcion: 'Elige proteinas e ingredientes para armarlo a tu gusto.' },
  { id: 'oriental-sin-arroz', nombre: 'Oriental sin arroz', descripcion: 'Rolls estilo oriental con relleno a eleccion.' },
  { id: 'bebidas', nombre: 'Bebidas', descripcion: 'Bebidas y jugos para acompanar.' },
  { id: 'salsas', nombre: 'Salsas', descripcion: 'Salsas adicionales para completar el pedido.' }
];

type RawProducto = {
  id: string;
  nombre: string;
  categoria: string;
  descripcion?: string;
  precio: number;
  imagen?: string;
  notas?: string;
  destacado?: boolean;
  opciones?: ProductoMenu['opciones'];
};

const rawProductos: RawProducto[] = [
  { id: 'gyozas-pollo-cerdo-verdura', nombre: 'Gyozas de pollo, cerdo o verduras (5un)', categoria: 'picar-y-compartir', precio: 3800 },
  { id: 'gyozas-camaron', nombre: 'Gyozas de camaron (5un)', categoria: 'picar-y-compartir', precio: 4000 },
  { id: 'arrollados-primavera', nombre: 'Arrollados primavera (5un)', categoria: 'picar-y-compartir', precio: 3500 },
  { id: 'arrollados-jamon-queso', nombre: 'Arrollados jamon queso (5un)', categoria: 'picar-y-compartir', precio: 4000 },
  { id: 'camarones-apanados', nombre: 'Camarones apanados (7un)', categoria: 'picar-y-compartir', precio: 4500 },
  { id: 'filetillos-pollo-apanados', nombre: 'Filetillos de pollo apanados (7un)', categoria: 'picar-y-compartir', precio: 4000 },
  { id: 'sashimi-6-cortes', nombre: 'Sashimi 6 cortes', categoria: 'sashimis', descripcion: 'Salmon, atun o pulpo', precio: 5990 },
  { id: 'sashimi-12-cortes', nombre: 'Sashimi 12 cortes', categoria: 'sashimis', descripcion: 'Salmon, atun o pulpo', precio: 9990 },
  { id: 'sashimi-mixto-12-cortes', nombre: 'Sashimi mixto 12 cortes', categoria: 'sashimis', precio: 10990, destacado: true },
  { id: 'hand-pollo-kanikama', nombre: 'Hand Roll Pollo / Kanikama', categoria: 'hand-rolls', precio: 3000 },
  { id: 'hand-vegetariano', nombre: 'Hand Roll Vegetariano', categoria: 'hand-rolls', precio: 3000 },
  { id: 'hand-camaron', nombre: 'Hand Roll Camaron', categoria: 'hand-rolls', precio: 3500 },
  { id: 'ceviche-clasico', nombre: 'Ceviche clasico', categoria: 'ceviches', descripcion: 'Finos cortes de pescado marinados al limon', precio: 6990, destacado: true },
  { id: 'ceviche-mixto', nombre: 'Ceviche mixto de la casa', categoria: 'ceviches', descripcion: 'Salmon, pulpo, camaron marinados al limon', precio: 8990 },
  { id: 'gohan-pollo-furay', nombre: 'Gohan Pollo Furay', categoria: 'gohans-o-chirashi', descripcion: 'Pollo apanado', precio: 5500 },
  { id: 'gohan-marino', nombre: 'Gohan Marino', categoria: 'gohans-o-chirashi', descripcion: 'Camaron cocido o salmon crudo', precio: 6000, imagen: '/imgPrueva/gohanmarino.jpeg', destacado: true },
  { id: 'gohan-vegetariano', nombre: 'Gohan Vegetariano', categoria: 'gohans-o-chirashi', descripcion: 'Champinon, pimenton, pepino', precio: 5500 },
  { id: 'hosomaki-2-ingredientes', nombre: 'Hosomaki (2 ingredientes a eleccion)', categoria: 'hosomakis', descripcion: 'Envuelto en alga nori', precio: 3000 },
  { id: 'california-chicken', nombre: 'California Chicken', categoria: 'california-rolls', descripcion: 'Pollo apanado, queso crema y cebollin', precio: 3600 },
  { id: 'california-ebi-cheese', nombre: 'California Ebi Cheese', categoria: 'california-rolls', descripcion: 'Camaron, queso crema, palta', precio: 3800 },
  { id: 'california-sake', nombre: 'California Sake', categoria: 'california-rolls', descripcion: 'Salmon, palta', precio: 3900 },
  { id: 'california-tako', nombre: 'California Tako', categoria: 'california-rolls', descripcion: 'Pulpo, queso crema, palta', precio: 3900 },
  { id: 'california-maguro-spicy', nombre: 'California Maguro Spicy', categoria: 'california-rolls', descripcion: 'Atun, queso crema, salsa spicy', precio: 3900 },
  { id: 'california-chercanes', nombre: 'California Chercanes', categoria: 'california-rolls', descripcion: 'Champinon apanado, queso crema, palta y cebollin', precio: 3900 },
  { id: 'avocado-tori', nombre: 'Avocado Tori', categoria: 'avocado-rolls', descripcion: 'Pollo apanado, queso crema, cebollin', precio: 4500 },
  { id: 'avocado-ebi', nombre: 'Avocado Ebi', categoria: 'avocado-rolls', descripcion: 'Camaron, queso crema, palta', precio: 4600 },
  { id: 'avocado-kani', nombre: 'Avocado Kani', categoria: 'avocado-rolls', descripcion: 'Kanikama, queso crema, cebollin', precio: 4600 },
  { id: 'avocado-sake', nombre: 'Avocado Sake', categoria: 'avocado-rolls', descripcion: 'Salmon, queso crema, palta', precio: 4800 },
  { id: 'avocado-tako', nombre: 'Avocado Tako', categoria: 'avocado-rolls', descripcion: 'Pulpo, queso crema, ciboulette', precio: 4900 },
  { id: 'avocado-ebi-furay', nombre: 'Avocado Ebi Furay', categoria: 'avocado-rolls', descripcion: 'Camaron apanado, queso crema, cebollin', precio: 4800 },
  { id: 'avocado-natura', nombre: 'Avocado Natura', categoria: 'avocado-rolls', descripcion: 'Palmito, pimenton, queso crema, cebollin', precio: 4800 },
  { id: 'avocado-maguro', nombre: 'Avocado Maguro', categoria: 'avocado-rolls', descripcion: 'Atun, queso crema, ciboulette', precio: 4900 },
  { id: 'avocado-mona-roll', nombre: 'Avocado Mona Roll', categoria: 'avocado-rolls', precio: 4900 },
  { id: 'sake-ebi', nombre: 'Sake Ebi', categoria: 'sake-rolls', descripcion: 'Camaron, queso crema, palta', precio: 4600 },
  { id: 'sake-katsu', nombre: 'Sake Katsu', categoria: 'sake-rolls', descripcion: 'Pollo apanado, queso crema, cebollin', precio: 4500 },
  { id: 'sake-green', nombre: 'Sake Green', categoria: 'sake-rolls', descripcion: 'Salmon, palta, cebollin', precio: 4800 },
  { id: 'sake-ebi-furay', nombre: 'Sake Ebi Furay', categoria: 'sake-rolls', descripcion: 'Camaron apanado, queso crema, palta', precio: 4800 },
  { id: 'sake-tako', nombre: 'Sake Tako', categoria: 'sake-rolls', descripcion: 'Pulpo, queso crema, cebollin, topping de salsa acevichada', precio: 5000 },
  { id: 'sake-maguro', nombre: 'Sake Maguro', categoria: 'sake-rolls', descripcion: 'Atun, queso crema, ciboulette', precio: 5200 },
  { id: 'cheese-ebi', nombre: 'Cheese Ebi', categoria: 'white-rolls', descripcion: 'Camaron, palta, cebollin', precio: 4600 },
  { id: 'cheese-katsu', nombre: 'Cheese Katsu', categoria: 'white-rolls', descripcion: 'Pollo apanado, palta, cebollin', precio: 4500 },
  { id: 'cheese-sake', nombre: 'Cheese Sake', categoria: 'white-rolls', descripcion: 'Salmon, palta', precio: 4800 },
  { id: 'cheese-tako-furay', nombre: 'Cheese Tako Furay', categoria: 'white-rolls', descripcion: 'Pulpo apanado, palta, cebollin', precio: 4900 },
  { id: 'cheese-natura', nombre: 'Cheese Natura', categoria: 'white-rolls', descripcion: 'Champinon, pimenton, palta, cebollin', precio: 4800 },
  { id: 'cheese-kani', nombre: 'Cheese Kani', categoria: 'white-rolls', descripcion: 'Kanikama, palta', precio: 4600 },
  { id: 'tori-hot', nombre: 'Tori Hot', categoria: 'hot-rolls', descripcion: 'Pollo, queso crema, cebollin', precio: 4500 },
  { id: 'kani-hot', nombre: 'Kani Hot', categoria: 'hot-rolls', descripcion: 'Kanikama, queso crema, cebollin', precio: 4800 },
  { id: 'sake-hot', nombre: 'Sake Hot', categoria: 'hot-rolls', descripcion: 'Salmon, queso crema, cebollin', precio: 4800 },
  { id: 'chercanes-hot', nombre: 'Chercanes Hot', categoria: 'hot-rolls', descripcion: 'Champinon, queso crema, palta, cebollin', precio: 4600 },
  { id: 'tako-hot', nombre: 'Tako Hot', categoria: 'hot-rolls', descripcion: 'Pulpo, queso crema, cebollin', precio: 4900 },
  { id: 'mona-hot-roll', nombre: 'Mona Hot Roll', categoria: 'hot-rolls', descripcion: 'Salmon, camaron, queso crema, cebollin', precio: 5000 },
  { id: 'ebi-hot-roll', nombre: 'Ebi Hot Roll', categoria: 'hot-rolls', descripcion: 'Camaron, queso crema, cebollin', precio: 4600 },
  { id: 'acevichado-roll', nombre: 'Acevichado Roll', categoria: 'rolls-premium', descripcion: 'Camaron apanado, queso crema, cebollin, envuelto en arroz, cubierto de ceviche, banado en salsa acevichada', precio: 5000, destacado: true },
  { id: 'olivo-roll', nombre: 'Olivo Roll', categoria: 'rolls-premium', descripcion: 'Pulpo, queso crema, cebollin, envuelto en palta, banado en salsa de olivo', precio: 6000 },
  { id: 'tokio-roll', nombre: 'Tokio Roll', categoria: 'rolls-premium', descripcion: 'Pulpo marinado en aceite de sesamo, palta, cebollin, envuelto en salmon', precio: 6000 },
  { id: 'mystic-roll', nombre: 'Mystic Roll', categoria: 'rolls-premium', descripcion: 'Pollo apanado, queso crema, envuelto en palta, banado con salsa de mango y topping de almendras tostadas', precio: 6000 },
  { id: 'criollo-roll', nombre: 'Criollo Roll', categoria: 'rolls-premium', descripcion: 'Camaron, queso crema, palta, envuelto en arroz, banado en salsa huancaina y coronado con salsa criolla', precio: 6000 },
  { id: 'mixtura-roll', nombre: 'Mixtura Roll', categoria: 'rolls-premium', descripcion: 'Camaron apanado, queso crema, palta, coronado con lomo salteado y papas hilo', precio: 6500, destacado: true },
  { id: 'rolls-sin-arroz-base', nombre: 'Roll sin arroz (armable)', categoria: 'rolls-sin-arroz-armable', descripcion: 'Elige 2 proteinas + 3 ingredientes. Cada cambio sobre la seleccion base agrega $1.000.', precio: 6500, opciones: armableOptions },
  { id: 'niu-malibu-keto-oriental-sin-arroz', nombre: 'Malibu Keto Oriental (Sin arroz)', categoria: 'oriental-sin-arroz', descripcion: 'Camaron, salmon, atun, pepino, envuelto en palta, sin arroz', precio: 7700, imagen: '/productos/niu-oriental/01-malibu-keto-oriental-sin-arroz.webp', opciones: orientalFillingOptions, destacado: true },
  { id: 'niu-veggie-keto-oriental', nombre: 'Veggie Keto Oriental', categoria: 'oriental-sin-arroz', descripcion: 'Palmito, champinon, palta y pepino sin arroz, envuelto en palta.', precio: 6600, imagen: '/productos/niu-oriental/02-veggie-keto-oriental.webp', opciones: orientalFillingOptions },
  { id: 'niu-ebi-keto-oriental', nombre: 'Ebi Keto Oriental', categoria: 'oriental-sin-arroz', descripcion: 'Camaron, salmon, queso crema y cebollin sin arroz, envuelto en palta, salsa acevichada, shichimi y ciboulette.', precio: 8100, imagen: '/productos/niu-oriental/03-ebi-keto-oriental.webp', opciones: orientalFillingOptions },
  { id: 'niu-almond-oriental', nombre: 'Almond Oriental', categoria: 'oriental-sin-arroz', descripcion: 'Pollo teriyaki, queso crema y cebollin sin arroz, envuelto en palta y almendras picadas.', precio: 6600, imagen: '/productos/niu-oriental/04-almond-oriental.webp', opciones: orientalFillingOptions },
  { id: 'niu-coreano-oriental', nombre: 'Coreano Oriental', categoria: 'oriental-sin-arroz', descripcion: 'Pollo furai, queso crema y cebollin sin arroz, envuelto en nori tempurizado, salsa coreana gratinada y chips de wantan.', precio: 6000, imagen: '/productos/niu-oriental/05-coreano-oriental.webp', opciones: orientalFillingOptions },
  { id: 'niu-ebi-oriental', nombre: 'Ebi Oriental', categoria: 'oriental-sin-arroz', descripcion: 'Camaron furai, queso crema, palta y cebollin, envuelto en pollo apanado y salsa teriyaki.', precio: 6700, imagen: '/productos/niu-oriental/06-ebi-oriental.webp', opciones: orientalFillingOptions },
  { id: 'niu-avocado-furai-oriental', nombre: 'Avocado Furai Oriental', categoria: 'oriental-sin-arroz', descripcion: 'Camaron furai, queso crema y cebollin, envuelto en palta tempura y cubierto con salsa acevichada, sin arroz.', precio: 7500, imagen: '/productos/niu-oriental/07-avocado-furai-oriental.webp', opciones: orientalFillingOptions },
  { id: 'niu-sabi-oriental', nombre: 'Sabi Oriental', categoria: 'oriental-sin-arroz', descripcion: 'Camaron furai, salmon, palta, queso crema y ciboulette, envuelto en palta, sin arroz.', precio: 8100, imagen: '/productos/niu-oriental/08-sabi-oriental.webp', opciones: orientalFillingOptions },
  { id: 'niu-tempura-spicy-oriental', nombre: 'Tempura Spicy Oriental', categoria: 'oriental-sin-arroz', descripcion: 'Camaron furai, queso crema, salsa spicy y cebollin, envuelto en nori tempurizado y cubierto con salsa acevichada ahumada y shichimi, sin arroz.', precio: 7200, imagen: '/productos/niu-oriental/09-tempura-spicy-oriental.webp', opciones: orientalFillingOptions },
  { id: 'niu-niu-furai-oriental', nombre: 'Niu Furai Oriental', categoria: 'oriental-sin-arroz', descripcion: 'Pollo furai, queso crema y cebollin, envuelto en pollo apanado y cubierto con salsa acevichada ahumada, sin arroz.', precio: 6700, imagen: '/productos/niu-oriental/10-niu-furai-oriental.webp', opciones: orientalFillingOptions },
  { id: 'niu-poseidon-oriental', nombre: 'Poseidon Oriental', categoria: 'oriental-sin-arroz', descripcion: 'Camaron furai, salmon y atun, envuelto en palta y cubierto en salsa acevichada con masago y shichimi, sin arroz.', precio: 8200, imagen: '/productos/niu-oriental/11-poseidon-oriental.webp', opciones: orientalFillingOptions },
  { id: 'niu-tori-oriental', nombre: 'Tori Oriental', categoria: 'oriental-sin-arroz', descripcion: 'Pollo furai, queso crema, cebollin y champinon, cubierto en pollo apanado en panko, sesamo y salsa teriyaki.', precio: 6500, imagen: '/productos/niu-oriental/12-tori-oriental.webp', opciones: orientalFillingOptions },
  { id: 'niu-tonkatsu-oriental', nombre: 'Tonkatsu Oriental', categoria: 'oriental-sin-arroz', descripcion: 'Pollo furai, camaron furai, palta y cebollin sin arroz, envuelto en pollo furai, cubierto con salsa tonkatsu, salsa unagui y papas hilo.', precio: 7900, imagen: '/productos/niu-oriental/13-tonkatsu-oriental.webp', opciones: orientalFillingOptions },
  { id: 'lata', nombre: 'Lata', categoria: 'bebidas', precio: 1000 },
  { id: 'bebida', nombre: 'Bebida', categoria: 'bebidas', precio: 2000 },
  { id: 'jugo', nombre: 'Jugo', categoria: 'bebidas', precio: 2000 },
  { id: 'bebida-grande', nombre: 'Bebida 1.5L', categoria: 'bebidas', precio: 3000, notas: 'Confirmar con el cliente el formato exacto: el PDF original lista dos precios de bebida sin distinguir el tamano.' },
  { id: 'salsa-soya', nombre: 'Salsa Soya', categoria: 'salsas', precio: 500 },
  { id: 'salsa-teriyaki', nombre: 'Salsa Teriyaki', categoria: 'salsas', precio: 500 },
  { id: 'salsa-spicy', nombre: 'Salsa Spicy', categoria: 'salsas', precio: 500 },
  { id: 'salsa-mango', nombre: 'Salsa Mango', categoria: 'salsas', precio: 800 },
  { id: 'salsa-acevichada', nombre: 'Salsa Acevichada', categoria: 'salsas', precio: 800 },
  { id: 'salsa-olivo', nombre: 'Salsa Olivo', categoria: 'salsas', precio: 800 },
  { id: 'salsa-huancaina', nombre: 'Salsa Huancaina', categoria: 'salsas', precio: 800 }
];

export const productos: ProductoMenu[] = rawProductos.map((producto) => ({
  ...producto,
  slug: producto.id,
  imagen: producto.imagen ?? PRODUCT_IMAGE,
  incluye: producto.descripcion ? [producto.descripcion] : [],
  disponible: true
}));

export const destacados = productos.filter((producto) => producto.destacado);
