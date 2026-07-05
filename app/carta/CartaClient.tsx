'use client';

import { useMemo, useState } from 'react';
import { categorias, productos } from '@/data/menu';
import type { ProductoMenu } from '@/types/menu';
import { useCart } from '@/store/cart';
import { CategorySidebar } from '@/components/CategorySidebar';
import { ProductCard } from '@/components/ProductCard';
import { ProductModal } from '@/components/ProductModal';

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
              <h1 className="text-4xl font-black">Carta Lamona</h1>
              <p className="mt-2 text-lamona-muted">
                Productos demo listos para reemplazar por fotos, precios y nombres reales.
              </p>
            </div>
            <p className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-lamona-bone/78">
              {filteredProducts.length} productos
            </p>
          </div>

          {filteredProducts.length > 0 ? (
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
