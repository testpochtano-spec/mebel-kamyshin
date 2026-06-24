import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogPageClient } from "./client";

export const metadata: Metadata = {
  title: "Каталоги и подбор мебели",
  description:
    "Каталоги фабричной мебели и заявка на подбор в Камышине. Диваны, кровати, матрасы, корпусная мебель — расчёт заказа, доставки и сроков.",
};

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-muted-foreground">Загружаем каталог...</div>}>
      <CatalogPageClient />
    </Suspense>
  );
}
