"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PARTNER_BRANDS, type PartnerBrand } from "@/data/manufacturers";
import { Button } from "@/components/ui/button";
import { asset } from "@/lib/utils";

const featuredNames = ["Doctor Sleep", "ДСВ", "BTS", "STEND", "СКИФ", "Кедр", "GranFest", "KLADOV"];
const featuredBrands = featuredNames
  .map((name) => PARTNER_BRANDS.find((brand) => brand.name === name))
  .filter((brand): brand is PartnerBrand => Boolean(brand));

export function PartnerStripSection() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">Фабрики и бренды</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              На главной показываем только часть партнёров. Полный список и каталоги находятся в разделе каталога.
            </p>
          </div>
          <Button variant="outline" nativeButton={false} className="w-fit rounded-2xl gap-2" render={<Link href="/catalog#makers-heading" />}>
            Все фабрики
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {featuredBrands.map((brand) => (
            <div
              key={brand.name}
              className="flex h-20 items-center justify-center rounded-xl border border-border bg-background px-3 text-center"
            >
              {brand.image ? (
                <Image
                  src={asset(brand.image)}
                  alt={brand.name}
                  width={120}
                  height={48}
                  className="max-h-10 max-w-[96px] object-contain"
                  loading="lazy"
                />
              ) : (
                <span className="font-heading text-sm font-bold text-foreground">{brand.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
