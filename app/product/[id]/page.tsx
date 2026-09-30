import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductActions from "../../../components/ProductActions";
import ProductRail from "../../../components/ProductRail";
import {
  categories,
  formatPrice,
  genders,
  getProduct,
  products,
} from "../../../data/products";

export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata(props: PageProps<"/product/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const product = getProduct(Number(id));
  return { title: product?.name ?? "Товар не найден" };
}

export default async function ProductPage(props: PageProps<"/product/[id]">) {
  const { id } = await props.params;
  const product = getProduct(Number(id));
  if (!product) notFound();

  const gender = genders.find((g) => g.id === product.gender)!;
  const related = products
    .filter((p) => p.id !== product.id && p.gender === product.gender)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, 8);

  const details = [
    ["Бренд", product.brand],
    ["Размер", product.size],
    ["Цвет", product.color],
    ["Состояние", product.condition],
    ["Категория", categories[product.category]],
    ["Артикул", `VZ-${String(product.id).padStart(5, "0")}`],
  ];

  return (
    <>
      <div className="mx-auto max-w-[1440px] px-6 pt-6 lg:px-12">
        <nav className="mb-6 flex flex-wrap gap-2 text-sm text-neutral-500">
          <Link href="/" className="hover:text-neutral-900">Главная</Link>
          <span>/</span>
          <Link href={`/catalog?gender=${gender.id}`} className="hover:text-neutral-900">
            {gender.label}
          </Link>
          <span>/</span>
          <Link
            href={`/catalog?gender=${gender.id}&category=${product.category}`}
            className="hover:text-neutral-900"
          >
            {categories[product.category]}
          </Link>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 lg:sticky lg:top-[120px] lg:self-start">
            <Image
              src={product.image.replace("w=1200", "w=1600")}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
            <span className="absolute top-4 left-4 bg-white px-3 py-1.5 text-xs font-semibold tracking-wide uppercase">
              1 из 1
            </span>
          </div>

          <div className="lg:py-4">
            <p className="font-medium text-accent-dark">{product.condition}</p>
            <h1 className="mt-1 text-3xl font-medium sm:text-4xl">{product.name}</h1>
            <p className="mt-1 text-neutral-500">
              {product.brand} · {gender.label}
            </p>

            <p className="mt-6 flex items-baseline gap-3">
              <span className="text-2xl font-semibold">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <>
                  <span className="text-lg text-neutral-400 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                  <span className="font-medium text-red-600">
                    −{Math.round((1 - product.price / product.oldPrice) * 100)}%
                  </span>
                </>
              )}
            </p>

            <div className="mt-8">
              <div className="mb-3 flex justify-between">
                <span className="font-medium">Размер</span>
                <span className="text-sm text-neutral-500">Единственный экземпляр</span>
              </div>
              <div className="inline-flex min-w-24 justify-center rounded-md border-2 border-neutral-900 px-5 py-3 font-medium">
                {product.size}
              </div>
            </div>

            <ProductActions id={product.id} />

            <p className="mt-10 leading-relaxed text-neutral-700">{product.description}</p>

            <dl className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
              {details.map(([k, v]) => (
                <div key={k} className="flex justify-between py-3 text-[15px]">
                  <dt className="text-neutral-500">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>

            <details className="group border-b border-neutral-200 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-medium">
                Доставка и возврат
                <span className="text-2xl leading-none transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-neutral-600">
                Отправляем Новой Почтой в течение 24 часов после оплаты. Бесплатная доставка от
                1 500 ₴. Если вещь не подошла — вернём деньги в течение 14 дней.
              </p>
            </details>
            <details className="group border-b border-neutral-200 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-medium">
                Проверка подлинности
                <span className="text-2xl leading-none transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-neutral-600">
                Каждую вещь осматриваем вручную: бирки, швы, фурнитуру. Если окажется, что вещь не
                оригинальная, вернём полную стоимость.
              </p>
            </details>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <ProductRail
            title="Может понравиться"
            href={`/catalog?gender=${product.gender}`}
            products={related}
          />
        </div>
      )}
    </>
  );
}
