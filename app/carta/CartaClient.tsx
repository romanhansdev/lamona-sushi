'use client';

import { useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import { categorias, productos } from '@/data/menu';
import { PROMOS } from '@/data/promos';
import type { ProductoMenu } from '@/types/menu';
import { useCart } from '@/store/cart';
import { CategorySidebar } from '@/components/CategorySidebar';
import { ProductCard } from '@/components/ProductCard';
import { ProductModal } from '@/components/ProductModal';
import { PromoCard } from '@/components/PromoCard';
import { PromosBanner } from '@/components/PromosBanner';

interface CartaClientProps {
  initialCategory: string;
}

export function CartaClient({ initialCategory }: CartaClientProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [query, setQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ProductoMenu | null>(null);
  const agregar = useCart((state) => state.agregar);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return productos.filter((producto) => {
      const matchesCategory = activeCategory === 'todos' || producto.categoria === activeCategory;
      const matchesQuery = !normalizedQuery
        || producto.nombre.toLowerCase().includes(normalizedQuery)
        || producto.incluye.join(' ').toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery && producto.disponible;
    });
  }, [activeCategory, query]);

  const filteredPromos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (activeCategory !== 'todos') {
      return [];
    }

    return PROMOS.filter((promo) => {
      if (!normalizedQuery) {
        return true;
      }

      return promo.nombre.toLowerCase().includes(normalizedQuery)
        || `${promo.piezas} piezas`.includes(normalizedQuery)
        || promo.incluye.join(' ').toLowerCase().includes(normalizedQuery);
    });
  }, [activeCategory, query]);

  return (
    <>
      <section className="container-page grid gap-8 py-8 lg:grid-cols-[280px_1fr]">
        <CategorySidebar
          categorias={categorias}
          activeCategory={activeCategory}
          query={query}
          onCategoryChange={setActiveCategory}
          onQueryChange={setQuery}
        />

        <div>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black">Carta La Mona</h1>
              <p className="mt-2 text-lamona-muted">
                Carta real completa con promos, productos individuales y precios actualizados.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/api/carta-pdf"
                className="inline-flex items-center gap-2 rounded-full border border-lamona-orange/40 px-4 py-3 text-sm font-black text-lamona-bone transition hover:bg-lamona-orange/12"
              >
                <Download size={17} />
                Descargar carta en PDF
              </a>
              <p className="rounded-full border border-white/10 px-4 py-3 text-sm font-bold text-lamona-bone/78">
                {filteredProducts.length + filteredPromos.length} items
              </p>
            </div>
          </div>

          {filteredPromos.length > 0 && (
            <div className="mb-10 space-y-5">
              <PromosBanner />
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredPromos.map((promo) => (
                  <PromoCard key={promo.id} promo={promo} />
                ))}
              </div>
            </div>
          )}

          {filteredProducts.length > 0 ? (
            <section>
              <h2 className="mb-5 text-2xl font-black">Productos individuales</h2>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((producto) => (
                  <ProductCard
                    key={producto.id}
                    producto={producto}
                    onOpen={setSelectedProduct}
                    onQuickAdd={(item) => agregar(item)}
                  />
                ))}
              </div>
            </section>
          ) : (
            <div className="rounded-lg border border-white/10 bg-lamona-card p-8 text-center">
              <h2 className="text-xl font-black">No encontramos productos</h2>
              <p className="mt-2 text-lamona-muted">Prueba con otra categoria o cambia la busqueda.</p>
            </div>
          )}
        </div>
      </section>

      <ProductModal
        producto={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAdd={(producto, cantidad) => agregar(producto, cantidad)}
      />
    </>
  );
}
