import { CartaClient } from './CartaClient';

interface CartaPageProps {
  searchParams: {
    categoria?: string;
  };
}

export default function CartaPage({ searchParams }: CartaPageProps) {
  return <CartaClient initialCategory={searchParams.categoria || 'todos'} />;
}
