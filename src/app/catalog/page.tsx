import type { Metadata } from "next";
import { CatalogPageClient } from "./client";

export const metadata: Metadata = {
  title: "Каталог мебели",
  description:
    "Каталог фабричной мебели в Камышине. Диваны, угловые диваны, кровати, матрасы — по наличию и на заказ. Доставка и сборка.",
};

export default function CatalogPage() {
  return <CatalogPageClient />;
}
