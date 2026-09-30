"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "../data/products";
import { useStore } from "../lib/store";
import { HeartIcon } from "./icons";

export default function ProductCard({
  product,
  priority,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { isFavorite, toggleFavorite, inCart } = useStore();
  const favorite = isFavorite(product.id);
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <div className="group relative">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
            {product.isNew && (
              <span className="bg-white px-2 py-1 text-[11px] font-semibold tracking-wide uppercase">
                Новинка
              </span>
            )}
            {discount > 0 && (
              <span className="bg-red-600 px-2 py-1 text-[11px] font-semibold text-white">
                −{discount}%
              </span>
            )}
          </div>
          {inCart(product.id) && (
            <span className="absolute inset-x-3 bottom-3 bg-neutral-900/85 py-2 text-center text-xs font-medium text-white backdrop-blur">
              Уже в корзине
            </span>
          )}
        </div>

        <div className="pt-3 pb-2">
          <p className="text-sm font-medium text-accent-dark">{product.condition}</p>
          <h3 className="mt-0.5 line-clamp-1 font-medium">{product.name}</h3>
          <p className="text-sm text-neutral-500">
            {product.brand} · Размер {product.size}
          </p>
          <p className="mt-2 flex items-baseline gap-2">
            <span className="font-semibold">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-sm text-neutral-400 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </p>
        </div>
      </Link>

      <button
        onClick={() => toggleFavorite(product.id)}
        aria-label={favorite ? "Убрать из избранного" : "В избранное"}
        aria-pressed={favorite}
        className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-sm transition hover:scale-110"
      >
        <HeartIcon className={`h-5 w-5 ${favorite ? "text-red-500" : ""}`} filled={favorite} />
      </button>
    </div>
  );
}
