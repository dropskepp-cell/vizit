import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center px-6 py-32 text-center">
      <p className="display text-8xl font-bold">404</p>
      <p className="mt-4 text-neutral-500">
        Такой страницы нет — возможно, вещь уже купили.
      </p>
      <Link href="/catalog" className="mt-8 rounded-full bg-neutral-900 px-8 py-4 font-medium text-white">
        В каталог
      </Link>
    </div>
  );
}
