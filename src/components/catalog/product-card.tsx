"use client";

import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/types/product";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { asset } from "@/lib/utils";

function imageSrc(src: string) {
  return src.startsWith("/") ? asset(src) : src;
}

export function ProductCard({ product, eager = false }: { product: IProduct; eager?: boolean }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5">
      <Link href={`/product/${product.slug}`} className="relative block aspect-[16/11] overflow-hidden bg-background no-underline">
        <Image
          src={imageSrc(product.images[0])}
          alt={product.name}
          fill
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
            Подбор и расчёт
          </span>
          {product.customOrder ? (
            <span className="rounded-full bg-secondary/20 px-2.5 py-1 text-[11px] font-medium text-secondary-foreground">
              Под заказ
            </span>
          ) : null}
        </div>
        <Link href={`/product/${product.slug}`} className="no-underline">
          <h3 className="font-heading text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1.5 text-sm leading-snug text-muted-foreground">{product.manufacturer}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Подберём похожую модель, ткань, размер и сроки заказа.
        </p>

        <div className="mt-auto pt-4">
          <Button
            size="sm"
            variant="secondary"
            nativeButton={false}
            className="h-9 w-full rounded-xl gap-1.5 text-sm"
            render={<Link href={`/product/${product.slug}`} />}
          >
            <MessageCircle className="w-4 h-4" />
            Уточнить по модели
            <ArrowRight className="w-3.5 h-3.5 ml-auto" />
          </Button>
        </div>
      </div>
    </article>
  );
}
