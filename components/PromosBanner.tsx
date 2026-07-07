import Image from 'next/image';

export function PromosBanner() {
  return (
    <section className="relative overflow-hidden rounded-lg border border-lamona-orange/25 bg-[radial-gradient(circle_at_top_left,rgba(255,126,50,0.32),transparent_34%),linear-gradient(135deg,#1b1614,#0d0c0b_58%,#24120b)] px-6 py-10 text-center shadow-glow md:px-10 md:py-14">
      <div className="mx-auto grid max-w-4xl justify-items-center gap-5">
        <Image
          src="/logos/logomenu.jpg"
          alt="La Mona Sushi"
          width={104}
          height={104}
          className="h-24 w-24 rounded-full border border-white/15 object-cover shadow-2xl"
          priority
        />
        <div>
          <p className="text-xs font-black uppercase text-lamona-salmon">
            Fusion Nikkei
          </p>
          <h2 className="mt-2 text-4xl font-black leading-none text-lamona-bone md:text-6xl">
            Promos de sushi
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-lamona-bone/72 md:text-base">
            Combos armados para compartir, con piezas frias, calientes y opciones vegetarianas directo al carrito.
          </p>
        </div>
      </div>
    </section>
  );
}
