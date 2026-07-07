import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Instagram, MapPin } from 'lucide-react';
import { categorias, destacados } from '@/data/menu';
import { formatPrice } from '@/lib/format';

export default function HomePage() {
  return (
    <main>
      <section className="relative min-h-[calc(100svh-112px)] overflow-hidden border-b border-white/10 bg-black">
        <Image
          src="/banners/hero-sushi-ai.png"
          alt="Sushi rolls frescos de La Mona Sushi"
          fill
          className="object-cover object-[68%_center]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,0.94)_25%,rgba(0,0,0,0.62)_48%,rgba(0,0,0,0.18)_73%,rgba(0,0,0,0.48)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_28%,rgba(215,81,38,0.28),transparent_28rem),linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.72))]" />
        <div className="container-page relative z-10 grid min-h-[calc(100svh-112px)] items-center py-10 md:py-14">
          <div className="max-w-2xl">
            <Image
              src="/logos/logomenu.jpg"
              alt="La Mona Sushi"
              width={132}
              height={132}
              className="h-20 w-20 rounded-full border border-white/15 object-cover shadow-2xl md:h-24 md:w-24"
              priority
            />
            <p className="mt-6 text-xs font-black uppercase tracking-[0.32em] text-lamona-salmon md:text-sm">
              Fusion Nikkei
            </p>
            <h1 className="mt-4 text-5xl font-black leading-[0.92] text-lamona-bone drop-shadow-2xl md:text-6xl lg:text-7xl">
              La Mona Sushi
            </h1>
            <p className="mt-4 text-3xl font-black leading-none text-lamona-orange md:text-5xl">
              Frescura sagrada
            </p>
            <p className="mt-6 max-w-xl text-base font-bold leading-7 text-lamona-bone/86 md:text-xl md:leading-8">
              Rolls, gohans y promos nikkei con retiro o delivery. Carta online lista para pedir en minutos.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-lamona-bone/78">
              <span className="rounded-full border border-white/12 bg-white/5 px-4 py-2">Av. Las Parcelas 8265</span>
              <span className="rounded-full border border-white/12 bg-white/5 px-4 py-2">Retiro y delivery</span>
              <span className="rounded-full border border-white/12 bg-white/5 px-4 py-2">Webpay Plus</span>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/carta"
                className="inline-flex items-center gap-2 rounded-full bg-lamona-orange px-6 py-4 text-sm font-black text-white shadow-glow transition hover:bg-lamona-orangeDark"
              >
                Pedir ahora
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/carta"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-4 text-sm font-black text-lamona-bone transition hover:bg-white/10"
              >
                Ver carta completa
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-lamona-black/70 py-4">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 text-sm font-semibold text-lamona-bone/72">
          <span className="inline-flex items-center gap-2"><Clock size={17} /> Lun-Dom 12:00 a 23:30</span>
          <span className="inline-flex items-center gap-2"><MapPin size={17} /> Santiago, Chile</span>
          <span className="inline-flex items-center gap-2"><Instagram size={17} /> @lamonasushi</span>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black">Categorias de la carta</h2>
            <p className="mt-2 text-lamona-muted">Explora rolls, gohans, ceviches, salsas y acompanamientos.</p>
          </div>
          <Link href="/carta" className="hidden text-sm font-bold text-lamona-orange md:block">Ver carta completa</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {categorias.map((categoria) => (
            <Link key={categoria.id} href={`/carta?categoria=${categoria.id}`} className="rounded-lg border border-white/10 bg-lamona-card p-5 transition hover:-translate-y-1 hover:border-lamona-orange/60">
              <h3 className="font-black">{categoria.nombre}</h3>
              <p className="mt-3 text-sm leading-6 text-lamona-muted">{categoria.descripcion}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <h2 className="mb-8 text-3xl font-black">Destacados</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {destacados.map((producto) => (
            <Link key={producto.id} href="/carta" className="overflow-hidden rounded-lg border border-white/10 bg-lamona-card">
              <Image src={producto.imagen} alt={producto.nombre} width={420} height={320} className="aspect-[4/3] object-cover" />
              <div className="p-4">
                <h3 className="font-black">{producto.nombre}</h3>
                <p className="mt-2 font-black text-lamona-orange">{formatPrice(producto.precio)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
