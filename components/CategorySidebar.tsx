'use client';

import { Search } from 'lucide-react';
import type { CategoriaMenu } from '@/types/menu';

interface CategorySidebarProps {
  categorias: CategoriaMenu[];
  activeCategory: string;
  query: string;
  onCategoryChange: (category: string) => void;
  onQueryChange: (query: string) => void;
}

export function CategorySidebar({
  categorias,
  activeCategory,
  query,
  onCategoryChange,
  onQueryChange
}: CategorySidebarProps) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
      <label className="flex h-12 items-center gap-3 rounded-full border border-white/10 bg-lamona-card px-4 text-lamona-muted">
        <Search size={18} />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Busca tu roll"
          className="min-w-0 flex-1 bg-transparent text-sm text-lamona-bone outline-none placeholder:text-lamona-muted"
        />
      </label>

      <div className="flex gap-2 overflow-x-auto pb-2 lg:grid lg:overflow-visible lg:pb-0">
        <button
          className={`shrink-0 rounded-full px-4 py-3 text-sm font-bold transition lg:rounded-md lg:text-left ${
            activeCategory === 'todos'
              ? 'bg-lamona-orange text-white'
              : 'bg-white/5 text-lamona-bone/78 hover:bg-white/10'
          }`}
          onClick={() => onCategoryChange('todos')}
        >
          Todos
        </button>
        {categorias.map((categoria) => (
          <button
            key={categoria.id}
            className={`shrink-0 rounded-full px-4 py-3 text-sm font-bold transition lg:rounded-md lg:text-left ${
              activeCategory === categoria.id
                ? 'bg-lamona-orange text-white'
                : 'bg-white/5 text-lamona-bone/78 hover:bg-white/10'
            }`}
            onClick={() => onCategoryChange(categoria.id)}
          >
            {categoria.nombre}
          </button>
        ))}
      </div>
    </aside>
  );
}
