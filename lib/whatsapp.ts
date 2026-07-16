import type { DatosEntrega, ItemCarrito, PedidoExtras } from '@/types/menu';
import { getItemTotal, getUnitExtraPrice } from './cartPricing';
import { formatPrice } from './format';

const WHATSAPP_NUMBER = '56900000000';

function getSelectionLabels(item: ItemCarrito) {
  return (item.producto.opciones ?? [])
    .map((grupo) => {
      const selectedOption = grupo.opciones.find((option) => option.id === item.selecciones?.[grupo.id]);
      return selectedOption ? `${grupo.nombre}: ${selectedOption.nombre}` : '';
    })
    .filter(Boolean);
}

export function buildWhatsAppMessage(
  items: ItemCarrito[],
  total: number,
  extras: PedidoExtras,
  datos: DatosEntrega
) {
  const productos = items.map((item) => (
    [
      `- ${item.cantidad}x ${item.producto.nombre}: ${formatPrice(getItemTotal(item))}`,
      ...getSelectionLabels(item).map((label) => `  - ${label}`),
      getUnitExtraPrice(item.producto, item.selecciones) > 0
        ? `  - Extra por cambios: ${formatPrice(getUnitExtraPrice(item.producto, item.selecciones))} c/u`
        : ''
    ].filter(Boolean).join('\n')
  ));

  const lineas = [
    'Hola! Quiero hacer este pedido en La Mona Sushi:',
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
