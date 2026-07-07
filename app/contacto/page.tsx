import { Instagram, Mail, Phone } from 'lucide-react';

export default function ContactoPage() {
  return (
    <main className="container-page py-10">
      <section className="max-w-3xl">
        <h1 className="text-4xl font-black">Contacto</h1>
        <p className="mt-3 text-lg leading-8 text-lamona-muted">
          Seccion lista para completar con los canales oficiales de La Mona Sushi.
        </p>
      </section>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <article className="rounded-lg border border-white/10 bg-lamona-card p-5">
          <Phone className="text-lamona-orange" />
          <h2 className="mt-4 font-black">Telefono</h2>
          <p className="mt-2 text-lamona-muted">+56 9 0000 0000</p>
        </article>
        <article className="rounded-lg border border-white/10 bg-lamona-card p-5">
          <Instagram className="text-lamona-orange" />
          <h2 className="mt-4 font-black">Instagram</h2>
          <p className="mt-2 text-lamona-muted">@lamonasushi</p>
        </article>
        <article className="rounded-lg border border-white/10 bg-lamona-card p-5">
          <Mail className="text-lamona-orange" />
          <h2 className="mt-4 font-black">Correo</h2>
          <p className="mt-2 text-lamona-muted">contacto@lamonasushi.cl</p>
        </article>
      </div>
    </main>
  );
}
