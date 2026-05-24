import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { PopularProductsSection } from "@/components/home/popular-products-section";
import { AdvantagesSection } from "@/components/home/advantages-section";
import { ManufacturersSection } from "@/components/home/manufacturers-section";
import { CertificatesSection } from "@/components/home/certificates-section";
import { AboutContactSection } from "@/components/home/about-contact-section";

export const metadata: Metadata = {
  title: "МЕБЕЛЬ — Камышин | Фабричная мягкая и корпусная мебель",
  description:
    "Добротная фабричная мебель от лучших российских производителей. Диваны, кровати, матрасы — по наличию и на заказ. Доставка по Камышину и Волгоградской области.",
  openGraph: {
    title: "МЕБЕЛЬ — Камышин | Фабричная мягкая и корпусная мебель",
    description:
      "Добротная фабричная мебель от российских производителей. Диваны, кровати, матрасы.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <PopularProductsSection />
      <AdvantagesSection />
      <ManufacturersSection />
      <CertificatesSection />
      <AboutContactSection />
    </>
  );
}
