import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Instagram, MapPin } from 'lucide-react';
import { categorias, destacados } from '@/data/menu';
import { formatPrice } from '@/lib/format';

export default function HomePage() {
  return (
    <main>
      <section className="container-page py-7 md:py-10">
        <div className="relative grid min-h-[calc(100vh-112px)] place-items-center overflow-hidden rounded-lg border border-lamona-orange/45 bg-[radial-gradient(circle_at_top_left,rgba(215,81,38,0.34),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(212,169,146,0.16),transparent_30%),linear-gradient(135deg,#2b140c_0%,#0b0a09_42%,#180c07_100%)] px-5 py-14 text-center shadow-glow md:px-10">
          <Image
            src="/logos/publicidad con logo.jpg"
            alt="Productos Lamona Sushi"
            fill
            className="pointer-events-none object-cover opacity-[0.08]"
            priority
            sizes="100vw"
          />
          <div className="relative z-10 mx-auto grid max-w-5xl justify-items-center">
            <Image
              src="/logos/logomenu.jpg"
              alt="La Mona Sushi"
              width={132}
              height={132}
              className="h-28 w-28 rounded-full border border-white/15 object-cover shadow-2xl md:h-32 md:w-32"
              priority
            />
            <p className="mt-8 text-xs font-black uppercase tracking-[0.32em] text-lamona-salmon md:text-sm">
              Fusion Nikkei
            </p>
            <h1 className="mt-6 text-5xl font-black leading-none text-lamona-bone md:text-7xl lg:text-8xl">
              Lamona Sushi
            </h1>
            <p className="mt-7 max-w-3xl text-lg font-bold leading-8 text-lamona-bone/86 md:text-2xl md:leading-10">
              Rolls, gohans, ceviches y promos listas para pedir online con carrito y pago Webpay Plus.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
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
