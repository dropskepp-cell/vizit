"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("men");

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-wider text-teal-500"
        >
          VIZIT
        </Link>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="font-semibold hover:text-teal-500"
          >
            Каталог
          </button>

          {open && (
            <div className="absolute right-0 mt-4 w-[650px] rounded-2xl border bg-white p-6 shadow-xl">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="mb-4 text-xl font-bold">
                    Для кого
                  </h3>

                  <button
                    onClick={() => setSection("men")}
                    className="mb-2 block w-full rounded-lg px-3 py-2 text-left hover:bg-gray-100"
                  >
                    👨 Мужское
                  </button>

                  <button
                    onClick={() => setSection("women")}
                    className="mb-2 block w-full rounded-lg px-3 py-2 text-left hover:bg-gray-100"
                  >
                    👩 Женское
                  </button>

                  <button
                    onClick={() => setSection("kids")}
                    className="block w-full rounded-lg px-3 py-2 text-left hover:bg-gray-100"
                  >
                    🧒 Детское
                  </button>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-bold">
                    Категории
                  </h3>

                  {section === "men" && (
                    <div className="space-y-2">
                      <p>👕 Футболки</p>
                      <p>👖 Джинсы</p>
                      <p>👖 Брюки</p>
                      <p>🩳 Шорты</p>
                      <p>👕 Худи</p>
                      <p>🦺 Жилетки</p>
                      <p>🧥 Флиски</p>
                      <p>🌬️ Ветровки</p>
                      <p>🧥 Куртки</p>
                      <p>👖 Спецодежда</p>
                      <p>🧢 Головные уборы</p>
                      <p>🎒 Аксессуары</p>
                    </div>
                  )}

                  {section === "women" && (
                    <div className="space-y-2">
                      <p>👕 Футболки</p>
                      <p>👖 Джинсы</p>
                      <p>👖 Брюки</p>
                      <p>🩳 Шорты</p>
                      <p>👕 Худи</p>
                      <p>🦺 Жилетки</p>
                      <p>🧥 Флиски</p>
                      <p>🌬️ Ветровки</p>
                      <p>🧥 Куртки</p>
                      <p>👘 Халаты</p>
                      <p>🧢 Головные уборы</p>
                      <p>🎒 Аксессуары</p>
                    </div>
                  )}

                  {section === "kids" && (
                    <div className="space-y-2">
                      <p>👕 Футболки</p>
                      <p>👖 Джинсы</p>
                      <p>👕 Худи</p>
                      <p>🧥 Куртки</p>
                      <p>🎒 Аксессуары</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}