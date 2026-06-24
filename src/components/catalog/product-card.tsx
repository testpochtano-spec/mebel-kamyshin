"use client";

import Link from "next/link";
import { IProduct } from "@/types/product";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { asset } from "@/lib/utils";

function imageSrc(src: string) {
  return src.startsWith("/") ? asset(src) : src;
}

export function ProductCard({ product }: { product: IProduct }) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
      <Link href={`/product/${product.slug}`} className="block relative overflow-hidden aspect-[4/3] no-underline bg-background">
        <img
          src={imageSrc(product.images[0])}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 bg-white/90 text-foreground text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
          Подбор и расчёт
        </span>
      </Link>

      <div className="p-5">
        <Link href={`/product/${product.slug}`} className="no-underline">
          <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground mb-4">{product.manufacturer}</p>

        <div className="flex items-end justify-between gap-3">
          <div>
            <span className="text-sm font-semibold text-primary">Подберём похожее</span>
            <p className="text-xs text-muted-foreground mt-1">Ткань, размер и сроки уточняются</p>
          </div>
          <Button
            size="sm"
            variant="secondary"
            nativeButton={false}
            className="rounded-xl gap-1.5 shrink-0"
            render={<Link href={`/product/${product.slug}`} />}
          >
            <MessageCircle className="w-4 h-4" />
            Уточнить
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </article>
  );
}
