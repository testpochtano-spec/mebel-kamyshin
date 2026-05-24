"use client";

import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/catalog/product-card";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PopularProductsSection() {
  const popular = PRODUCTS.filter((p) => p.inStock).slice(0, 4);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Популярные товары</h2>
            <p className="mt-3 text-muted-foreground text-lg">То, что выбирают наши покупатели</p>
          </div>
          <Button variant="ghost" nativeButton={false} className="hidden md:flex gap-1 text-primary" render={<Link href="/catalog" />}>
            Весь каталог <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popular.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" size="lg" nativeButton={false} className="rounded-2xl" render={<Link href="/catalog" />}>
            Смотреть весь каталог
          </Button>
        </div>
      </div>
    </section>
  );
}
