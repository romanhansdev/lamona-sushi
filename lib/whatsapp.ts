import type { DatosEntrega, ItemCarrito, PedidoExtras } from '@/types/menu';
import { formatPrice } from './format';

const WHATSAPP_NUMBER = '56900000000';

export function buildWhatsAppMessage(
  items: ItemCarrito[],
  total: number,
  extras: PedidoExtras,
  datos: DatosEntrega
) {
  const productos = items.map((item) => (
    `- ${item.cantidad}x ${item.producto.nombre}: ${formatPrice(item.producto.precio * item.cantidad)}`
  ));

  const lineas = [
    'Hola! Quiero hacer este pedido en Lamona Sushi:',
    '',
    ...productos,
    '',
    `Total: ${formatPrice(total)}`,
    '',
    'Extras:',
    `- Wasabi: ${extras.wasabi ? 'Si' : 'No'}`,
    `- Jengibre: ${extras.jengibre ? 'Si' : 'No'}`,
    `- Salsa soya: ${extras.salsaSoya}`,
    `- Palitos: ${extras.palitos}`,
    '',
    'Datos de entrega:',
    `- Nombre: ${datos.nombre}`,
    `- Telefono: ${datos.telefono}`,
    `- Tipo: ${datos.tipoEntrega}`,
    datos.tipoEntrega === 'Delivery' ? `- Direccion: ${datos.direccion}` : '- Retiro en local',
    datos.comentarios ? `- Comentarios: ${datos.comentarios}` : ''
  ].filter(Boolean);

  return lineas.join('\n');
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
