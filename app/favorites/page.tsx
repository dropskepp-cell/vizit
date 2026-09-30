"use client";

import Link from "next/link";
import ProductCard from "../../components/ProductCard";
import { getProduct, type Product } from "../../data/products";
import { useStore } from "../../lib/store";

export default function Favorites() {
  const { favorites, ready } = useStore();
  const items = favorites.map(getProduct).filter((p): p is Product => !!p);

  if (!ready) return <div className="min-h-[60vh]" />;

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-12">
      <h1 className="text-2xl font-medium">
        Избранное <span className="text-neutral-400">({items.length})</span>
      </h1>
      {items.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <p className="display text-5xl font-bold">Пока пусто</p>
          <p className="mt-4 text-neutral-500">
            Нажимай на сердечко, чтобы не потерять понравившиеся вещи.
          </p>
          <Link
            href="/catalog"
            className="mt-8 rounded-full bg-neutral-900 px-8 py-4 font-medium text-white"
          >
            В каталог
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
