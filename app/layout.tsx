import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'La Mona Sushi | Pedidos online',
  description: 'Carta online de La Mona Sushi con carrito y pedidos por WhatsApp.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
