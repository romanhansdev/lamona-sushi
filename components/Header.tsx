'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, MapPin, ShoppingBag, UserRound } from 'lucide-react';
import { useCart } from '@/store/cart';
import { useHasMounted } from '@/lib/useHasMounted';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/carta', label: 'Carta' },
  { href: '/ubicacion', label: 'Ubicacion' },
  { href: '/contacto', label: 'Contacto' }
];

export function Header() {
  const totalItems = useCart((state) => state.totalItems());
  const hasMounted = useHasMounted();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-lamona-black/92 backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label="La Mona Sushi inicio">
          <Image
            src="/logos/logomenu.jpg"
            alt="La Mona Sushi"
            width={84}
            height={56}
            className="h-14 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-lamona-bone/78 transition hover:bg-white/8 hover:text-lamona-bone"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/ubicacion"
            className="hidden items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm text-lamona-bone/80 lg:flex"
          >
            <MapPin size={16} />
            Santiago
          </Link>
          <Link
            href="/carrito"
            className="relative grid h-11 w-11 place-items-center rounded-full bg-lamona-orange text-white shadow-glow"
            aria-label="Ver carrito"
          >
            <ShoppingBag size={20} />
            {hasMounted && totalItems > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-lamona-bone px-1 text-xs font-bold text-lamona-black">
                {totalItems}
              </span>
            )}
          </Link>
          <button className="hidden h-11 w-11 place-items-center rounded-full border border-white/10 text-lamona-bone/80 md:grid" aria-label="Cuenta">
            <UserRound size={20} />
          </button>
          <button className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-lamona-bone md:hidden" aria-label="Abrir menu">
            <Menu size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
