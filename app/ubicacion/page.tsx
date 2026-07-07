import { Clock, MapPin } from 'lucide-react';

const direccion = 'Av. Las Parcelas 8265, Local 2, Santiago, Chile';
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;
const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(direccion)}&output=embed`;

export default function UbicacionPage() {
  return (
    <main className="container-page py-10">
      <section className="max-w-3xl">
        <h1 className="text-4xl font-black">Ubicacion y horarios</h1>
        <p className="mt-3 text-lg leading-8 text-lamona-muted">
          Encuentranos en nuestro local y revisa el mapa para coordinar retiro o delivery.
        </p>
      </section>
      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <article className="rounded-lg border border-white/10 bg-lamona-card p-6">
          <MapPin className="text-lamona-orange" />
          <h2 className="mt-4 text-2xl font-black">Av. Las Parcelas 8265</h2>
          <p className="mt-3 text-lamona-muted">Local 2, Santiago, Chile</p>
          <div className="mt-6 flex items-center gap-3 text-lamona-bone/78">
            <Clock size={20} />
            Lun-Dom 12:00 a 23:30
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-full bg-lamona-orange px-5 py-3 text-sm font-black text-white shadow-glow transition hover:bg-lamona-orangeDark"
          >
            Abrir en Google Maps
          </a>
        </article>
        <div className="min-h-80 overflow-hidden rounded-lg border border-white/10 bg-lamona-slate">
          <iframe
            title="Mapa La Mona Sushi"
            src={mapsEmbedUrl}
            className="h-full min-h-80 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </main>
  );
}
