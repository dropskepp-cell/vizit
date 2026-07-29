export default function Cart() {
  return (
    <main className="min-h-screen bg-white px-6 py-20 text-gray-900">
      <h1 className="text-4xl font-bold">
        🛒 Корзина VIZIT
      </h1>

      <p className="mt-6 text-lg text-gray-600">
        Здесь будут твои товары.
      </p>

      <div className="mt-10 rounded-2xl border p-6">
        <p className="text-xl font-semibold">
          Корзина пока пустая
        </p>
      </div>
    </main>
  );
}