import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/hooks/use-cart";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: {
    default: "МЕБЕЛЬ — Камышин | Фабричная мягкая и корпусная мебель",
    template: "%s | МЕБЕЛЬ — Камышин",
  },
  description:
    "Добротная фабричная мягкая и корпусная мебель от лучших российских производителей. Диваны, кровати, матрасы — по наличию и на заказ в Камышине.",
  keywords: [
    "мебель Камышин",
    "купить диван Камышин",
    "матрасы Камышин",
    "мягкая мебель",
    "корпусная мебель",
    "мебель от производителя",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "МЕБЕЛЬ — Камышин",
    title: "МЕБЕЛЬ — Камышин | Фабричная мягкая и корпусная мебель",
    description:
      "Диваны, кровати, матрасы от лучших российских производителей. Доставка по Камышину и области.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
