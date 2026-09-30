import Image from "next/image";
import Link from "next/link";
import ProductRail from "../components/ProductRail";
import { RefreshIcon, ShieldIcon, SparkIcon, TruckIcon } from "../components/icons";
import { brands, products, unsplash } from "../data/products";

const tiles = [
  { id: "men", label: "Мужское", image: unsplash("1617137968427-85924c800a22", 900) },
  { id: "women", label: "Женское", image: unsplash("1509631179647-0177331693ae", 900) },
  { id: "kids", label: "Детское", image: unsplash("1503944583220-79d8926ad5e2", 900) },
];

const steps = [
  {
    title: "Находишь вещь",
    text: "Каждая позиция в каталоге — единственная. Нет размерной сетки, нет повторов.",
  },
  {
    title: "Мы проверяем",
    text: "Подлинность и состояние проверяем вручную перед отправкой.",
  },
  {
    title: "Получаешь за 1–3 дня",
    text: "Отправляем Новой Почтой по всей Украине. Не подошло — вернём деньги.",
  },
];

const perks = [
  { icon: ShieldIcon, title: "Проверка подлинности", text: "Только оригинальные бренды" },
  { icon: TruckIcon, title: "Доставка 1–3 дня", text: "Новой Почтой по Украине" },
  { icon: RefreshIcon, title: "Возврат 14 дней", text: "Если вещь не подошла" },
  { icon: SparkIcon, title: "Вещи в одном экземпляре", text: "Такой больше ни у кого" },
];

export default function Home() {
  const fresh = products.filter((p) => p.isNew);
  const sale = products.filter((p) => p.oldPrice);

  return (
    <>
      {/* Hero */}
      <section className="px-0 sm:px-6 sm:pt-4 lg:px-12">
        <div className="relative mx-auto h-[78vh] min-h-[520px] max-w-[1440px] overflow-hidden bg-neutral-900">
          <Image
            src={unsplash("1520975954732-35dd22299614", 2000)}
            alt="Новая коллекция VIZIT"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%] opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <div className="fade-up absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-16">
            <p className="mb-4 text-sm font-medium text-white/80">Осень 2026 · Новые поступления</p>
            <h1 className="display text-[clamp(2.75rem,9.5vw,9rem)] font-bold text-white">
              Одна вещь.
              <br />
              Один шанс.
            </h1>
            <p className="mt-5 max-w-md text-base text-white/85 sm:text-lg">
              Брендовая одежда в единственном экземпляре. Увидел — забирай, повторов не будет.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/catalog?sort=new"
                className="rounded-full bg-white px-7 py-3 font-medium text-neutral-900 transition hover:bg-neutral-200"
              >
                Смотреть новинки
              </Link>
              <Link
                href="/catalog"
                className="rounded-full border border-white/70 px-7 py-3 font-medium text-white transition hover:bg-white hover:text-neutral-900"
              >
                Весь каталог
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Бренды */}
      <section className="mt-6 overflow-hidden border-y border-neutral-200 py-5" aria-label="Бренды">
        <div className="marquee flex w-max gap-14 whitespace-nowrap">
          {[...brands, ...brands].map((b, i) => (
            <Link
              key={i}
              href={`/catalog?brand=${encodeURIComponent(b)}`}
              className="display text-2xl font-semibold text-neutral-300 transition hover:text-neutral-900"
            >
              {b}
            </Link>
          ))}
        </div>
      </section>

      <ProductRail title="Новые поступления" href="/catalog?sort=new" products={fresh} />

      {/* Для кого */}
      <section className="mx-auto max-w-[1440px] px-6 py-12 lg:px-12">
        <h2 className="mb-6 text-2xl font-medium">Выбери свой стиль</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {tiles.map((t) => (
            <Link
              key={t.id}
              href={`/catalog?gender=${t.id}`}
              className="group relative block aspect-[3/4] overflow-hidden bg-neutral-100"
            >
              <Image
                src={t.image}
                alt={t.label}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="display mb-4 text-4xl font-semibold text-white">{t.label}</h3>
                <span className="inline-block rounded-full bg-white px-5 py-2 text-sm font-medium text-neutral-900 transition group-hover:bg-neutral-200">
                  Смотреть
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Как это работает */}
      <section className="mx-auto max-w-[1440px] px-6 py-12 lg:px-12">
        <div className="grid overflow-hidden bg-neutral-100 lg:grid-cols-2">
          <div className="relative min-h-[360px]">
            <Image
              src={unsplash("1441984904996-e0b6ba687e04", 1400)}
              alt="Вещи VIZIT"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <p className="text-sm font-medium text-accent-dark">Как это работает</p>
            <h2 className="display mt-3 text-5xl font-bold sm:text-6xl">
              Секонд-хенд,
              <br />
              который выглядит как бутик
            </h2>
            <ol className="mt-10 space-y-7">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-5">
                  <span className="display text-3xl font-semibold text-neutral-300">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="mt-1 text-neutral-600">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <ProductRail title="Со скидкой" href="/catalog?sale=1" products={sale} />

      {/* Преимущества */}
      <section className="mx-auto max-w-[1440px] px-6 pt-8 lg:px-12">
        <div className="grid grid-cols-2 gap-8 border-t border-neutral-200 pt-12 lg:grid-cols-4">
          {perks.map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <Icon className="h-7 w-7" />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-neutral-500">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
