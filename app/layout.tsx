import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { StoreProvider } from "../lib/store";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "VIZIT — каждая вещь в единственном экземпляре",
    template: "%s · VIZIT",
  },
  description: "Каждая вещь — в единственном экземпляре.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${oswald.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-neutral-900">
        <StoreProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
