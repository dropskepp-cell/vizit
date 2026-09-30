import Link from "next/link";
import { categories, genders } from "../data/products";

const columns = [
  {
    title: "Покупателям",
    links: ["Как оформить заказ", "Доставка и оплата", "Возврат", "Проверка подлинности"],
  },
  {
    title: "Продавцам",
    links: ["Продать вещь", "Комиссия", "Правила площадки"],
  },
  {
    title: "О VIZIT",
    links: ["О нас", "Контакты", "Вакансии"],
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-neutral-950 text-neutral-400">
      <div className="mx-auto max-w-[1440px] px-6 py-14 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="display text-4xl font-bold text-white">
              VIZIT<span className="text-accent">.</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Маркетплейс брендовой одежды. Каждая вещь — в единственном экземпляре, каждая
              проверена вручную.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Каталог</h4>
            <ul className="space-y-2.5 text-sm">
              {genders.map((g) => (
                <li key={g.id}>
                  <Link href={`/catalog?gender=${g.id}`} className="hover:text-white">
                    {g.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/catalog?category=jackets" className="hover:text-white">
                  {categories.jackets}
                </Link>
              </li>
            </ul>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-semibold text-white">{col.title}</h4>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l}>
                    <span className="cursor-default hover:text-white">{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-neutral-800 pt-6 text-xs sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} VIZIT. Все права защищены.</span>
          <span>Украина · UAH</span>
        </div>
      </div>
    </footer>
  );
}
