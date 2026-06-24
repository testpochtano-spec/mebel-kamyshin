import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { HowToOrderSection } from "@/components/home/how-to-order-section";
import { MaterialsSection } from "@/components/home/materials-section";
import { PopularProductsSection } from "@/components/home/popular-products-section";
import { AdvantagesSection } from "@/components/home/advantages-section";
import { PartnerStripSection } from "@/components/home/partner-strip-section";
import { AboutContactSection } from "@/components/home/about-contact-section";

export const metadata: Metadata = {
  title: "МЕБЕЛЬ — Камышин | Подбор фабричной мебели",
  description:
    "Каталоги фабрик, примеры мебели из магазина и заявка на подбор. Диваны, кровати, матрасы, корпусная мебель с доставкой по Камышину и области.",
  openGraph: {
    title: "МЕБЕЛЬ — Камышин | Подбор фабричной мебели",
    description:
      "Каталоги фабрик, примеры из магазина и расчёт мебели под заказ.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <HowToOrderSection />
      <MaterialsSection />
      <PopularProductsSection />
      <AdvantagesSection />
      <PartnerStripSection />
      <AboutContactSection />
    </>
  );
}
