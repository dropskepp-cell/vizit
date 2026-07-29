import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VIZIT",
  description: "Каждая вещь — в единственном экземпляре.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className="h-full antialiased"
    >
      <body className="min-h-full bg-white text-gray-900">
        <header className="sticky top-0 z-50 border-b bg-white">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
            
            <Link
              href="/"
              className="text-3xl font-extrabold tracking-wider text-teal-500"
            >
              VIZIT
            </Link>

            <nav className="flex items-center gap-6">
              <Link
                href="/#catalog"
                className="hover:text-teal-500"
              >
                Каталог
              </Link>
            </nav>

          </div>
        </header>

        {children}
      </body>
    </html>
  );
}