import { Clock, MapPin } from 'lucide-react';

export default function UbicacionPage() {
  return (
    <main className="container-page py-10">
      <section className="max-w-3xl">
        <h1 className="text-4xl font-black">Ubicacion y horarios</h1>
        <p className="mt-3 text-lg leading-8 text-lamona-muted">
          Placeholder para agregar direccion real, mapa embebido y zonas de delivery.
        </p>
      </section>
      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <article className="rounded-lg border border-white/10 bg-lamona-card p-6">
          <MapPin className="text-lamona-orange" />
          <h2 className="mt-4 text-2xl font-black">Santiago, Chile</h2>
          <p className="mt-3 text-lamona-muted">Direccion pendiente de confirmar por el cliente.</p>
          <div className="mt-6 flex items-center gap-3 text-lamona-bone/78">
            <Clock size={20} />
            Lun-Dom 12:00 a 23:30
          </div>
        </article>
        <div className="grid min-h-80 place-items-center rounded-lg border border-white/10 bg-lamona-slate p-6 text-center text-lamona-muted">
          Mapa pendiente: aqui se puede insertar Google Maps cuando tengamos la direccion final.
        </div>
      </div>
    </main>
  );
}
