"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  brands,
  categories,
  categoriesByGender,
  genders,
  products,
  type Gender,
  type Product,
} from "../data/products";
import ProductCard from "./ProductCard";
import { ChevronDown, CloseIcon, FilterIcon } from "./icons";

type Params = Record<string, string>;

const sorts = [
  { id: "", label: "Рекомендуемые" },
  { id: "new", label: "Сначала новинки" },
  { id: "price-asc", label: "Цена: по возрастанию" },
  { id: "price-desc", label: "Цена: по убыванию" },
];

const prices = [
  { id: "0-500", label: "До 500 ₴" },
  { id: "500-1000", label: "500 – 1 000 ₴" },
  { id: "1000-2000", label: "1 000 – 2 000 ₴" },
  { id: "2000-", label: "От 2 000 ₴" },
];

const list = (v?: string) => (v ? v.split(",") : []);

function applyFilters(p: Params): Product[] {
  const brandList = list(p.brand);
  const sizeList = list(p.size);
  const q = p.q?.toLowerCase();
  const [min, max] = (p.price ?? "").split("-").map((n) => (n ? Number(n) : undefined));

  const result = products.filter(
    (x) =>
      (!p.gender || x.gender === p.gender) &&
      (!p.category || x.category === p.category) &&
      (!brandList.length || brandList.includes(x.brand)) &&
      (!sizeList.length || sizeList.includes(x.size)) &&
      (!p.sale || x.oldPrice) &&
      (!p.condition || x.condition === "Новое с биркой") &&
      (min === undefined || x.price >= min) &&
      (max === undefined || x.price < max) &&
      (!q ||
        `${x.name} ${x.brand} ${categories[x.category]}`.toLowerCase().includes(q)),
  );

  if (p.sort === "price-asc") result.sort((a, b) => a.price - b.price);
  if (p.sort === "price-desc") result.sort((a, b) => b.price - a.price);
  if (p.sort === "new") result.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew) || b.id - a.id);
  return result;
}

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-neutral-200 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left font-medium"
      >
        {title}
        <ChevronDown className={`h-5 w-5 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

function Check({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-[15px] text-neutral-700 hover:text-neutral-900">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 cursor-pointer rounded border-neutral-400 accent-neutral-900"
      />
      {label}
    </label>
  );
}

export default function CatalogView({ params }: { params: Params }) {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(true);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileFilters ? "hidden" : "";
  }, [mobileFilters]);

  const update = (patch: Params) => {
    const next = { ...params, ...patch };
    const qs = new URLSearchParams(
      Object.entries(next).filter(([, v]) => v !== ""),
    ).toString();
    router.replace(qs ? `/catalog?${qs}` : "/catalog", { scroll: false });
  };

  const toggleIn = (key: string, value: string) => {
    const current = list(params[key]);
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    update({ [key]: next.join(",") });
  };

  const items = applyFilters(params);
  const gender = params.gender as Gender | undefined;
  const availableCategories = gender
    ? categoriesByGender[gender]
    : Object.keys(categories);
  const sizes = Array.from(new Set(products.map((p) => p.size)));

  const title = params.q
    ? `Поиск: «${params.q}»`
    : params.category
      ? categories[params.category]
      : params.sale
        ? "Скидки"
        : gender
          ? genders.find((g) => g.id === gender)?.label
          : params.sort === "new"
            ? "Новинки"
            : "Весь каталог";

  const activeCount = ["gender", "category", "brand", "size", "price", "sale", "condition"].filter(
    (k) => params[k],
  ).length;

  const filters = (
    <>
      <Section title="Для кого">
        {genders.map((g) => (
          <Check
            key={g.id}
            label={g.label}
            checked={params.gender === g.id}
            onChange={() =>
              update({ gender: params.gender === g.id ? "" : g.id, category: "" })
            }
          />
        ))}
      </Section>
      <Section title="Категория">
        {availableCategories.map((c) => (
          <Check
            key={c}
            label={categories[c]}
            checked={params.category === c}
            onChange={() => update({ category: params.category === c ? "" : c })}
          />
        ))}
      </Section>
      <Section title="Размер">
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => {
            const on = list(params.size).includes(s);
            return (
              <button
                key={s}
                onClick={() => toggleIn("size", s)}
                className={`min-w-14 rounded-md border px-3 py-2 text-sm whitespace-nowrap transition ${
                  on
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-300 hover:border-neutral-900"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </Section>
      <Section title="Бренд">
        {brands.map((b) => (
          <Check
            key={b}
            label={b}
            checked={list(params.brand).includes(b)}
            onChange={() => toggleIn("brand", b)}
          />
        ))}
      </Section>
      <Section title="Цена">
        {prices.map((p) => (
          <Check
            key={p.id}
            label={p.label}
            checked={params.price === p.id}
            onChange={() => update({ price: params.price === p.id ? "" : p.id })}
          />
        ))}
      </Section>
      <Section title="Особое">
        <Check
          label="Со скидкой"
          checked={!!params.sale}
          onChange={() => update({ sale: params.sale ? "" : "1" })}
        />
        <Check
          label="Новое с биркой"
          checked={!!params.condition}
          onChange={() => update({ condition: params.condition ? "" : "new" })}
        />
      </Section>
    </>
  );

  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
      <div className="sticky top-16 z-30 -mx-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 bg-white px-6 py-4 sm:top-[100px] lg:-mx-12 lg:px-12">
        <h1 className="w-full text-xl font-medium sm:w-auto sm:text-2xl">
          {title} <span className="text-neutral-400">({items.length})</span>
        </h1>
        <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:gap-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="hidden items-center gap-2 font-medium lg:flex"
          >
            {showFilters ? "Скрыть фильтры" : "Показать фильтры"}
            <FilterIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => setMobileFilters(true)}
            className="flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium lg:hidden"
          >
            Фильтры {activeCount > 0 && `(${activeCount})`}
            <FilterIcon className="h-4 w-4" />
          </button>
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              onBlur={() => setTimeout(() => setSortOpen(false), 150)}
              className="flex items-center gap-1 text-sm font-medium sm:text-base"
            >
              <span className="hidden sm:inline">Сортировать:</span>{" "}
              <span className="text-neutral-500">
                {sorts.find((s) => s.id === (params.sort ?? ""))?.label}
              </span>
              <ChevronDown className={`h-4 w-4 transition ${sortOpen ? "rotate-180" : ""}`} />
            </button>
            {sortOpen && (
              <ul className="absolute right-0 z-10 mt-3 w-56 rounded-2xl bg-white py-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                {sorts.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => update({ sort: s.id })}
                      className="block w-full px-5 py-1.5 text-right text-sm hover:text-neutral-500"
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-10">
        <aside
          className={`hidden shrink-0 transition-all duration-300 lg:block ${
            showFilters ? "w-60 opacity-100" : "w-0 overflow-hidden opacity-0"
          }`}
        >
          <div className="no-scrollbar sticky top-[172px] max-h-[calc(100vh-190px)] w-60 overflow-y-auto pb-10">
            {filters}
            {activeCount > 0 && (
              <button
                onClick={() => router.replace("/catalog", { scroll: false })}
                className="mt-4 text-sm font-medium underline underline-offset-4"
              >
                Сбросить всё
              </button>
            )}
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {items.length ? (
            <div
              className={`grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 ${
                showFilters ? "" : "xl:grid-cols-4"
              }`}
            >
              {items.map((p, i) => (
                <ProductCard key={p.id} product={p} priority={i < 3} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center py-24 text-center">
              <p className="display text-4xl font-semibold">Ничего не нашлось</p>
              <p className="mt-3 max-w-sm text-neutral-500">
                Попробуй убрать часть фильтров — новые вещи появляются каждый день.
              </p>
              <button
                onClick={() => router.replace("/catalog")}
                className="mt-6 rounded-full bg-neutral-900 px-7 py-3 font-medium text-white"
              >
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Фильтры на мобильных */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity lg:hidden ${
          mobileFilters ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileFilters(false)}
      />
      <div
        className={`fixed inset-x-0 bottom-0 z-[60] flex max-h-[88vh] flex-col rounded-t-3xl bg-white transition-transform duration-300 lg:hidden ${
          mobileFilters ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-2">
          <h2 className="text-xl font-medium">Фильтры</h2>
          <button
            onClick={() => setMobileFilters(false)}
            aria-label="Закрыть"
            className="grid h-10 w-10 place-items-center rounded-full bg-neutral-100"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6">{filters}</div>
        <div className="flex gap-3 border-t border-neutral-200 p-4">
          <button
            onClick={() => router.replace("/catalog", { scroll: false })}
            className="flex-1 rounded-full border border-neutral-300 py-3 font-medium"
          >
            Сбросить
          </button>
          <button
            onClick={() => setMobileFilters(false)}
            className="flex-1 rounded-full bg-neutral-900 py-3 font-medium text-white"
          >
            Показать ({items.length})
          </button>
        </div>
      </div>
    </div>
  );
}
