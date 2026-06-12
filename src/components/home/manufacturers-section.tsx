"use client";

import { motion } from "framer-motion";
import { ExternalLink, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MANUFACTURERS } from "@/data/manufacturers";
import { asset } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ManufacturersSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10">
          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-medium mb-4">
            Производители и поставщики
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">С кем работаем</h2>
              <p className="mt-3 text-muted-foreground text-lg max-w-2xl">
                Витрина собрана вокруг реальных каталогов, материалов фабрик и брендов, которые есть в магазине.
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-2xl w-fit"
              nativeButton={false}
              render={<a href={asset("/catalog#catalogs-heading")} />}
            >
              Все каталоги
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {MANUFACTURERS.map((maker, i) => (
            <motion.article
              key={maker.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: i * 0.04 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-5 border border-border hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col min-h-[260px]"
            >
              <div className="w-full h-16 flex items-center justify-start mb-4">
                {maker.logo ? (
                  <img
                    src={asset(maker.logo)}
                    alt={maker.name}
                    className="max-w-[150px] max-h-16 object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-heading text-xl font-bold">
                    {initials(maker.name)}
                  </div>
                )}
              </div>

              <h3 className="font-heading text-lg font-semibold text-foreground">{maker.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{maker.subtitle}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {maker.categories.map((category) => (
                  <span key={category} className="rounded-full bg-background border border-border px-2 py-1 text-[11px] text-muted-foreground">
                    {category}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-xs text-muted-foreground leading-relaxed">{maker.note}</p>

              <div className="mt-auto pt-4 flex flex-wrap gap-2">
                {maker.catalogSlug ? (
                  <Button
                    size="sm"
                    className="rounded-xl gap-1.5"
                    nativeButton={false}
                    render={<a href={asset(`/catalog-viewer/${maker.catalogSlug}`)} />}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Каталог
                  </Button>
                ) : null}
                {maker.website ? (
                  <Button
                    size="sm"
                    variant={maker.catalogSlug ? "outline" : "default"}
                    className="rounded-xl gap-1.5"
                    nativeButton={false}
                    render={<a href={maker.website} target="_blank" rel="noopener noreferrer" />}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Сайт
                  </Button>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
