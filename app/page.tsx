import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Instagram, MapPin } from 'lucide-react';
import { categorias, destacados } from '@/data/menu';
import { formatPrice } from '@/lib/format';

export default function HomePage() {
  return (
    <main>
      <section className="container-page grid min-h-[calc(100vh-80px)] items-center gap-10 py-10 lg:grid-cols-[1fr_0.9fr]">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex rounded-full border border-lamona-orange/40 bg-lamona-orange/12 px-4 py-2 text-sm font-bold text-lamona-salmon">
            Sushi fresco, oscuro y con carácter
          </p>
          <h1 className="text-5xl font-black leading-[0.95] text-lamona-bone md:text-7xl">
            Lamona Sushi
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-lamona-bone/72">
            Carta online preparada para recibir pedidos, editar productos y conectar pagos cuando el cliente entregue la información final.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/carta"
              className="inline-flex items-center gap-2 rounded-full bg-lamona-orange px-6 py-4 text-sm font-black text-white shadow-glow transition hover:bg-lamona-orangeDark"
            >
              Pedir ahora
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/ubicacion"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 px-6 py-4 text-sm font-bold text-lamona-bone transition hover:bg-white/8"
            >
              Ver ubicacion
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-lamona-orange/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-lg border border-white/10 bg-lamona-slate">
            <Image
              src="/logos/publicidad con logo.jpg"
              alt="Productos Lamona Sushi"
              width={720}
              height={720}
              className="aspect-square object-cover"
              priority
            />
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
            <h2 className="text-3xl font-black">Categorias listas para editar</h2>
            <p className="mt-2 text-lamona-muted">Cambia nombres, fotos y precios desde `data/menu.ts`.</p>
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
