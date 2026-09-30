"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  categories,
  categoriesByGender,
  genders,
  unsplash,
  type Gender,
} from "../data/products";
import { useStore } from "../lib/store";
import {
  BagIcon,
  ChevronDown,
  CloseIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
} from "./icons";

const menuImages: Record<Gender, string> = {
  men: unsplash("1520975954732-35dd22299614", 600),
  women: unsplash("1483985988355-763728e1935b", 600),
  kids: unsplash("1503944583220-79d8926ad5e2", 600),
};

function Badge({ count }: { count: number }) {
  if (!count) return null;
  return (
    <span className="absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-neutral-900 px-1 text-[10px] font-semibold text-white">
      {count}
    </span>
  );
}

export default function Header() {
  const router = useRouter();
  const { cart, favorites } = useStore();
  const [active, setActive] = useState<Gender | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [drawerSection, setDrawerSection] = useState<Gender | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
  }, [drawer]);

  const close = () => {
    setActive(null);
    setDrawer(false);
  };

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    close();
    router.push(q ? `/catalog?q=${encodeURIComponent(q)}` : "/catalog");
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="hidden bg-neutral-100 text-xs sm:block">
        <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-between px-6 lg:px-12">
          <span className="text-neutral-600">
            Бесплатная доставка Новой Почтой от 1 500 ₴
          </span>
          <nav className="flex gap-4 font-medium">
            <Link href="/catalog" className="hover:text-neutral-500">
              Помощь
            </Link>
            <span className="text-neutral-300">|</span>
            <Link href="/catalog" className="hover:text-neutral-500">
              Продать вещь
            </Link>
          </nav>
        </div>
      </div>

      <div className="relative border-b border-neutral-200" onMouseLeave={() => setActive(null)}>
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] gap-4 px-4 sm:px-6 lg:px-12">
          <Link
            href="/"
            onClick={close}
            className="display justify-self-start text-3xl font-bold tracking-tight"
          >
            VIZIT<span className="text-accent">.</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            <Link
              href="/catalog?sort=new"
              onMouseEnter={() => setActive(null)}
              onClick={close}
              className="rounded-full px-4 py-2 text-[15px] font-medium hover:bg-neutral-100"
            >
              Новинки
            </Link>
            {genders.map((g) => (
              <Link
                key={g.id}
                href={`/catalog?gender=${g.id}`}
                onMouseEnter={() => setActive(g.id)}
                onClick={close}
                className={`rounded-full px-4 py-2 text-[15px] font-medium transition hover:bg-neutral-100 ${
                  active === g.id ? "bg-neutral-100" : ""
                }`}
              >
                {g.label}
              </Link>
            ))}
            <Link
              href="/catalog?sale=1"
              onMouseEnter={() => setActive(null)}
              onClick={close}
              className="rounded-full px-4 py-2 text-[15px] font-medium text-red-600 hover:bg-neutral-100"
            >
              Скидки
            </Link>
          </nav>

          <div className="flex items-center justify-self-end gap-1 sm:gap-2">
            <form
              onSubmit={search}
              className="hidden items-center rounded-full bg-neutral-100 transition focus-within:bg-neutral-200 md:flex"
            >
              <button type="submit" aria-label="Искать" className="grid h-10 w-10 place-items-center">
                <SearchIcon className="h-5 w-5" />
              </button>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск"
                className="w-32 bg-transparent pr-4 text-sm outline-none placeholder:text-neutral-500 xl:w-44"
              />
            </form>

            <Link
              href="/favorites"
              aria-label="Избранное"
              className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-neutral-100"
            >
              <HeartIcon className="h-6 w-6" />
              <Badge count={favorites.length} />
            </Link>
            <Link
              href="/cart"
              aria-label="Корзина"
              className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-neutral-100"
            >
              <BagIcon className="h-6 w-6" />
              <Badge count={cart.length} />
            </Link>
            <button
              onClick={() => setDrawer(true)}
              aria-label="Меню"
              className="grid h-10 w-10 place-items-center rounded-full hover:bg-neutral-100 lg:hidden"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Мега-меню */}
        <div
          className={`absolute inset-x-0 top-full hidden border-b border-neutral-200 bg-white shadow-[0_24px_40px_-24px_rgba(0,0,0,0.25)] transition-all duration-200 lg:block ${
            active ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
          }`}
        >
          {active && (
            <div className="mx-auto grid max-w-[1440px] grid-cols-[1fr_1fr_1.1fr] gap-12 px-12 py-10">
              <div>
                <h3 className="mb-4 text-sm font-semibold">Категории</h3>
                <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5">
                  {categoriesByGender[active].map((c) => (
                    <li key={c}>
                      <Link
                        href={`/catalog?gender=${active}&category=${c}`}
                        onClick={close}
                        className="text-sm text-neutral-500 transition hover:text-neutral-900"
                      >
                        {categories[c]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-sm font-semibold">Подборки</h3>
                <ul className="space-y-2.5 text-sm text-neutral-500">
                  <li>
                    <Link href={`/catalog?gender=${active}&sort=new`} onClick={close} className="hover:text-neutral-900">
                      Новые поступления
                    </Link>
                  </li>
                  <li>
                    <Link href={`/catalog?gender=${active}&condition=new`} onClick={close} className="hover:text-neutral-900">
                      Новое с биркой
                    </Link>
                  </li>
                  <li>
                    <Link href={`/catalog?gender=${active}&sale=1`} onClick={close} className="hover:text-neutral-900">
                      Со скидкой
                    </Link>
                  </li>
                  <li>
                    <Link href={`/catalog?gender=${active}`} onClick={close} className="font-medium text-neutral-900 underline underline-offset-4">
                      Смотреть всё
                    </Link>
                  </li>
                </ul>
              </div>
              <Link
                href={`/catalog?gender=${active}`}
                onClick={close}
                className="group relative block aspect-[16/10] overflow-hidden rounded-lg bg-neutral-100"
              >
                <Image
                  src={menuImages[active]}
                  alt=""
                  fill
                  sizes="420px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="display absolute bottom-5 left-5 text-3xl font-semibold text-white">
                  {genders.find((g) => g.id === active)?.label}
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Мобильное меню */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity lg:hidden ${
          drawer ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setDrawer(false)}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col bg-white transition-transform duration-300 lg:hidden ${
          drawer ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-end px-4">
          <button
            onClick={() => setDrawer(false)}
            aria-label="Закрыть меню"
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-neutral-100"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 pb-10">
          <form onSubmit={search} className="mb-6 flex items-center rounded-full bg-neutral-100">
            <SearchIcon className="ml-4 h-5 w-5" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск"
              className="h-11 flex-1 bg-transparent px-3 outline-none"
            />
          </form>
          <Link href="/catalog?sort=new" onClick={close} className="block py-3 text-2xl font-medium">
            Новинки
          </Link>
          {genders.map((g) => (
            <div key={g.id}>
              <button
                onClick={() => setDrawerSection(drawerSection === g.id ? null : g.id)}
                className="flex w-full items-center justify-between py-3 text-2xl font-medium"
              >
                {g.label}
                <ChevronDown
                  className={`h-5 w-5 transition ${drawerSection === g.id ? "rotate-180" : ""}`}
                />
              </button>
              {drawerSection === g.id && (
                <ul className="mb-3 space-y-2 border-l border-neutral-200 pl-4">
                  <li>
                    <Link href={`/catalog?gender=${g.id}`} onClick={close} className="font-medium">
                      Смотреть всё
                    </Link>
                  </li>
                  {categoriesByGender[g.id].map((c) => (
                    <li key={c}>
                      <Link
                        href={`/catalog?gender=${g.id}&category=${c}`}
                        onClick={close}
                        className="text-neutral-500"
                      >
                        {categories[c]}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <Link href="/catalog?sale=1" onClick={close} className="block py-3 text-2xl font-medium text-red-600">
            Скидки
          </Link>

          <p className="mt-8 text-neutral-500">
            Каждая вещь на VIZIT — в единственном экземпляре. Понравилось — забирай, пока не
            забрали другие.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              href="/cart"
              onClick={close}
              className="rounded-full bg-neutral-900 px-6 py-3 font-medium text-white"
            >
              Корзина {cart.length > 0 && `(${cart.length})`}
            </Link>
            <Link
              href="/favorites"
              onClick={close}
              className="rounded-full border border-neutral-300 px-6 py-3 font-medium"
            >
              Избранное
            </Link>
          </div>
        </div>
      </aside>
    </header>
  );
}
