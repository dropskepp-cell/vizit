"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Product } from "../data/products";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "./icons";

export default function ProductRail({
  title,
  href,
  products,
}: {
  title: string;
  href: string;
  products: Product[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-[1440px] py-12">
      <div className="mb-6 flex items-end justify-between px-6 lg:px-12">
        <h2 className="text-2xl font-medium">{title}</h2>
        <div className="flex items-center gap-3">
          <Link href={href} className="mr-2 text-sm font-medium underline underline-offset-4">
            Смотреть всё
          </Link>
          <button
            onClick={() => scroll(-1)}
            aria-label="Назад"
            className="hidden h-11 w-11 place-items-center rounded-full bg-neutral-100 transition hover:bg-neutral-200 sm:grid"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Вперёд"
            className="hidden h-11 w-11 place-items-center rounded-full bg-neutral-100 transition hover:bg-neutral-200 sm:grid"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div
        ref={ref}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-6 px-6 lg:scroll-px-12 lg:px-12"
      >
        {products.map((p) => (
          <div key={p.id} className="w-[70%] shrink-0 snap-start sm:w-[42%] md:w-[31%] xl:w-[23.5%]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
