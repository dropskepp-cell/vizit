"use client";

import Link from "next/link";
import { useStore } from "../lib/store";
import { HeartIcon } from "./icons";

export default function ProductActions({ id }: { id: number }) {
  const { inCart, addToCart, isFavorite, toggleFavorite } = useStore();
  const added = inCart(id);
  const favorite = isFavorite(id);

  return (
    <div className="mt-8 space-y-3">
      {added ? (
        <Link
          href="/cart"
          className="flex w-full items-center justify-center rounded-full bg-neutral-900 py-5 font-medium text-white transition hover:bg-neutral-700"
        >
          В корзине — оформить
        </Link>
      ) : (
        <button
          onClick={() => addToCart(id)}
          className="w-full rounded-full bg-neutral-900 py-5 font-medium text-white transition hover:bg-neutral-700 active:scale-[0.99]"
        >
          Добавить в корзину
        </button>
      )}
      <button
        onClick={() => toggleFavorite(id)}
        aria-pressed={favorite}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-neutral-300 py-5 font-medium transition hover:border-neutral-900"
      >
        {favorite ? "В избранном" : "В избранное"}
        <HeartIcon className={`h-5 w-5 ${favorite ? "text-red-500" : ""}`} filled={favorite} />
      </button>
    </div>
  );
}
