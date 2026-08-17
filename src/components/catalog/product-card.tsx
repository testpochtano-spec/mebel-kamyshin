"use client";

import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/types/product";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { asset, cn } from "@/lib/utils";

function imageSrc(src: string) {
  return src.startsWith("/") ? asset(src) : src;
}

export function ProductCard({ product }: { product: IProduct }) {
  const imageFit = product.cardImageFit ?? "cover";

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
      <Link href={`/product/${product.slug}`} className="block relative overflow-hidden aspect-[4/3] no-underline bg-background">
        <Image
          src={imageSrc(product.images[0])}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          className={cn(
            "transition-transform duration-500",
            imageFit === "contain"
              ? "object-contain p-2 sm:p-3 group-hover:scale-[1.025]"
              : "object-cover group-hover:scale-105",
          )}
        />
      </Link>

      <div className="p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Подбор и расчёт
          </span>
          {product.customOrder ? (
            <span className="rounded-full bg-secondary/20 px-3 py-1 text-xs font-medium text-secondary-foreground">
              Под заказ
            </span>
          ) : null}
        </div>
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
