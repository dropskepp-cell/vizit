"use client";

import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState<number[]>([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const removeFromCart = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <main className="min-h-screen bg-white px-6 py-20 text-gray-900">
      <h1 className="text-4xl font-bold">
        🛒 Корзина VIZIT
      </h1>

      {cart.length === 0 ? (
        <p className="mt-6 text-lg text-gray-600">
          Корзина пока пустая
        </p>
      ) : (
        <div className="mt-8 grid gap-6">
          {cart.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border p-6"
            >
              <h2 className="text-xl font-bold">
                Товар {item}
              </h2>

              <p className="text-gray-500">
                Размер: M
              </p>

              <p className="text-gray-500">
                Бренд: Nike
              </p>

              <p className="mt-2 text-xl font-bold">
                900 ₴
              </p>

              <button
                onClick={() => removeFromCart(index)}
                className="mt-4 rounded-xl bg-red-500 px-5 py-2 text-white"
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}