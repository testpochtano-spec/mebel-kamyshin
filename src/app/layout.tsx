import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0F8B6D",
};

export const metadata: Metadata = {
  title: {
    default: "МЕБЕЛЬ — Камышин | Подбор фабричной мебели",
    template: "%s | МЕБЕЛЬ — Камышин",
  },
  description:
    "Подбор фабричной мягкой и корпусной мебели в Камышине. Каталоги производителей, примеры из магазина, расчёт заказа, доставки и сроков.",
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
    title: "МЕБЕЛЬ — Камышин | Подбор фабричной мебели",
    description:
      "Каталоги производителей, примеры мебели из магазина, расчёт заказа и доставки по Камышину и области.",
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
      className={`${inter.variable} ${playfair.variable} antialiased`}
    >
      <body className="min-h-dvh flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
