# Lamona Sushi

Aplicacion web para carta online y pedidos de Lamona Sushi.

## Estado actual

- Next.js + TypeScript + Tailwind CSS.
- Catalogo editable desde `data/menu.ts`.
- Carrito persistente en `localStorage` con Zustand.
- Checkout inicial por WhatsApp.
- Paleta visual basada en el material actual de Lamona.

## Pendiente cuando el cliente entregue informacion

1. Reemplazar fotos de productos en `public/imgPrueva`.
2. Actualizar nombres, categorias, precios e ingredientes en `data/menu.ts`.
3. Cambiar el numero de WhatsApp en `lib/whatsapp.ts`.
4. Completar direccion, horarios y redes sociales reales.
5. Definir fase de pago online: Webpay, Flow o Mercado Pago.

## Comandos

Requiere Node.js 20+ y pnpm.

```bash
pnpm install
pnpm dev
pnpm build
```

En este entorno de Codex la build fue verificada con el Node incluido en el runtime:

```bash
/Users/hansroman/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/next/dist/bin/next build
```
