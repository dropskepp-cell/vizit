"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HeartIcon, ShieldIcon } from "../../components/icons";
import { formatPrice, getProduct, type Product } from "../../data/products";
import { useStore } from "../../lib/store";

const FREE_SHIPPING = 1500;
const SHIPPING = 90;

export default function Cart() {
  const { cart, ready, removeFromCart, toggleFavorite, isFavorite, clearCart } = useStore();
  const [ordered, setOrdered] = useState(false);

  const items = cart.map(getProduct).filter((p): p is Product => !!p);
  const subtotal = items.reduce((s, p) => s + p.price, 0);
  const savings = items.reduce((s, p) => s + (p.oldPrice ? p.oldPrice - p.price : 0), 0);
  const shipping = subtotal >= FREE_SHIPPING || !items.length ? 0 : SHIPPING;
  const left = FREE_SHIPPING - subtotal;

  if (!ready) return <div className="min-h-[60vh]" />;

  if (ordered) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-28 text-center">
        <p className="display text-6xl font-bold">Спасибо!</p>
        <p className="mt-4 text-neutral-600">
          Заказ оформлен. Мы свяжемся с тобой для подтверждения в ближайшее время.
          <br />
          <span className="text-sm text-neutral-400">(демо — оплата пока не подключена)</span>
        </p>
        <Link
          href="/catalog"
          className="mt-8 rounded-full bg-neutral-900 px-8 py-4 font-medium text-white"
        >
          Продолжить покупки
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1100px] px-6 py-10">
      {items.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <h1 className="display text-5xl font-bold">Корзина пуста</h1>
          <p className="mt-4 text-neutral-500">
            Самые интересные вещи уходят быстро — загляни в новинки.
          </p>
          <Link
            href="/catalog?sort=new"
            className="mt-8 rounded-full bg-neutral-900 px-8 py-4 font-medium text-white"
          >
            Смотреть новинки
          </Link>
        </div>
      ) : (
        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
          <section>
            <h1 className="text-2xl font-medium">Корзина</h1>
            {left > 0 ? (
              <div className="mt-4 bg-neutral-100 p-4 text-sm">
                <p>
                  Добавь ещё на <b>{formatPrice(left)}</b> — и доставка будет бесплатной.
                </p>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-neutral-300">
                  <div
                    className="h-full bg-accent transition-all"
                    style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="mt-4 bg-neutral-100 p-4 text-sm">
                🎉 Доставка бесплатная.
              </p>
            )}

            <ul className="mt-2 divide-y divide-neutral-200">
              {items.map((p) => (
                <li key={p.id} className="flex gap-4 py-6 sm:gap-6">
                  <Link
                    href={`/product/${p.id}`}
                    className="relative aspect-square w-28 shrink-0 overflow-hidden bg-neutral-100 sm:w-40"
                  >
                    <Image src={p.image} alt={p.name} fill sizes="160px" className="object-cover" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex justify-between gap-4">
                      <div className="min-w-0">
                        <Link href={`/product/${p.id}`} className="font-medium hover:underline">
                          {p.name}
                        </Link>
                        <p className="text-neutral-500">{p.brand}</p>
                        <p className="text-neutral-500">
                          Размер {p.size} · {p.color}
                        </p>
                        <p className="mt-1 text-sm text-accent-dark">{p.condition}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium whitespace-nowrap">{formatPrice(p.price)}</p>
                        {p.oldPrice && (
                          <p className="text-sm whitespace-nowrap text-neutral-400 line-through">
                            {formatPrice(p.oldPrice)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-auto flex gap-5 pt-4 text-sm">
                      <button
                        onClick={() => toggleFavorite(p.id)}
                        className="flex items-center gap-1.5 hover:text-neutral-500"
                      >
                        <HeartIcon
                          className={`h-5 w-5 ${isFavorite(p.id) ? "text-red-500" : ""}`}
                          filled={isFavorite(p.id)}
                        />
                        <span className="hidden sm:inline">
                          {isFavorite(p.id) ? "В избранном" : "В избранное"}
                        </span>
                      </button>
                      <button
                        onClick={() => removeFromCart(p.id)}
                        className="underline underline-offset-4 hover:text-neutral-500"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <aside className="lg:sticky lg:top-[120px] lg:self-start">
            <h2 className="text-2xl font-medium">Итого</h2>
            <dl className="mt-6 space-y-3 text-[15px]">
              <div className="flex justify-between">
                <dt>Товары ({items.length})</dt>
                <dd>{formatPrice(subtotal + savings)}</dd>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-red-600">
                  <dt>Скидка</dt>
                  <dd>−{formatPrice(savings)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt>Доставка</dt>
                <dd>{shipping ? formatPrice(shipping) : "Бесплатно"}</dd>
              </div>
              <div className="flex justify-between border-y border-neutral-200 py-4 text-base font-medium">
                <dt>К оплате</dt>
                <dd>{formatPrice(subtotal + shipping)}</dd>
              </div>
            </dl>
            <button
              onClick={() => {
                clearCart();
                setOrdered(true);
              }}
              className="mt-6 w-full rounded-full bg-neutral-900 py-5 font-medium text-white transition hover:bg-neutral-700"
            >
              Оформить заказ
            </button>
            <p className="mt-4 flex items-start gap-2 text-sm text-neutral-500">
              <ShieldIcon className="h-5 w-5 shrink-0" />
              Вещи в корзине не бронируются — их может купить кто-то другой.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
