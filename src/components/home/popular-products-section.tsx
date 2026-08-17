"use client";

import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/catalog/product-card";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PopularProductsSection() {
  const popular = PRODUCTS.slice(0, 8);

  return (
    <section id="catalog-preview" className="border-b border-border bg-white py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-3 inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Каталог и карточки
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Каталог мебели</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground text-lg leading-relaxed">
              Выберите пример, который понравился, и напишите в магазин. Подберём похожую модель, ткань, размер и сроки заказа.
            </p>
          </div>
          <Button variant="outline" nativeButton={false} className="hidden md:flex rounded-2xl gap-1.5" render={<Link href="/catalog" />}>
            Открыть весь каталог <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popular.map((p, i) => (
            <ProductCard key={p.id} product={p} eager={i < 4} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" size="lg" nativeButton={false} className="rounded-2xl" render={<Link href="/catalog" />}>
            Открыть весь каталог
          </Button>
        </div>
      </div>
    </section>
  );
}
