"use client";

import { useState } from "react";

import { products } from "../data/products";
export default function Home() {
  const [cart, setCart] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    }
    return [];
  });

  const addToCart = (item: number) => {
    const newCart = [...cart, item];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="flex flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-6xl font-extrabold tracking-wide text-teal-500">
          VIZIT
        </h1>

        <p className="mt-4 text-xl text-gray-600">
          Каждая вещь — в единственном экземпляре.
        </p>

        <a
          href="#catalog"
          className="mt-8 rounded-xl bg-teal-500 px-8 py-4 text-lg font-semibold text-white transition hover:bg-teal-600"
        >
          Перейти в каталог
        </a>

        <a
          href="/cart"
          className="mt-6 rounded-xl bg-teal-500 px-8 py-4 text-lg font-semibold text-white transition hover:bg-teal-600"
        >
          🛒 Корзина ({cart.length})
        </a>
      </section>

      <section id="catalog" className="mx-auto max-w-7xl px-6 pb-20">
        <h2 className="mb-8 text-3xl font-bold">
          Новые поступления
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {products.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border shadow-sm"
            >
              <div className="flex h-64 items-center justify-center bg-gray-100">
                Фото товара
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold">
                  {item.name}
                </h3>

                <p className="text-gray-500">
                  Размер: {item.size}
                </p>

                <p className="text-gray-500">
                Бренд: {item.brand}
                </p>

                <p className="mt-2 text-xl font-bold">
                  {item.price} ₴
                </p>

                <button
                  onClick={() => addToCart(item.id)}
                  className="mt-4 w-full rounded-xl bg-teal-500 py-3 font-semibold text-white transition hover:bg-teal-600"
                >
                  В корзину
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}