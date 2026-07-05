'use client';

import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
}

export function QuantitySelector({ value, onChange, min = 1 }: QuantitySelectorProps) {
  return (
    <div className="inline-flex h-10 items-center overflow-hidden rounded-full border border-white/10 bg-black/20">
      <button
        className="grid h-10 w-10 place-items-center text-lamona-bone/80 transition hover:bg-white/10"
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="Disminuir cantidad"
      >
        <Minus size={16} />
      </button>
      <span className="grid h-10 min-w-10 place-items-center text-sm font-bold">{value}</span>
      <button
        className="grid h-10 w-10 place-items-center text-lamona-bone/80 transition hover:bg-white/10"
        onClick={() => onChange(value + 1)}
        aria-label="Aumentar cantidad"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
