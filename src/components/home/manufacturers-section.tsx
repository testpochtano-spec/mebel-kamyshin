"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Layers, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MANUFACTURER_GROUPS, type ManufacturerGroup } from "@/data/manufacturers";
import { asset } from "@/lib/utils";

const accentClass: Record<ManufacturerGroup["accent"], string> = {
  primary: "bg-primary/10 text-primary border-primary/20",
  gold: "bg-secondary/15 text-secondary-foreground border-secondary/25",
  warm: "bg-[#8B7355]/10 text-[#6F5840] border-[#8B7355]/20",
  stone: "bg-[#6B7A78]/10 text-[#4E615F] border-[#6B7A78]/20",
  soft: "bg-[#7D6A8C]/10 text-[#5F4B70] border-[#7D6A8C]/20",
};

function supplierPreview(suppliers: string[]) {
  const visible = suppliers.slice(0, 5);
  const rest = suppliers.length - visible.length;
  return { visible, rest };
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {MANUFACTURER_GROUPS.map((group, i) => {
            const { visible, rest } = supplierPreview(group.suppliers);

            return (
            <motion.article
              key={group.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: i * 0.04 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-5 border border-border hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col min-h-[310px]"
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${accentClass[group.accent]}`}>
                  <Layers className="w-5 h-5" />
                </div>
                {group.id === "soft-furniture" ? (
                  <span className="rounded-full bg-secondary/15 text-secondary-foreground px-3 py-1 text-[11px] font-medium">
                    фото к августу
                  </span>
                ) : null}
              </div>

              <h3 className="font-heading text-xl font-semibold text-foreground">{group.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{group.subtitle}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {group.categories.map((category) => (
                  <span key={category} className="rounded-full bg-background border border-border px-2 py-1 text-[11px] text-muted-foreground">
                    {category}
                  </span>
                ))}
              </div>

              <div className="mt-5 space-y-2">
                {visible.map((supplier) => (
                  <div key={supplier} className="flex items-center gap-2 text-sm text-foreground">
                    <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{supplier}</span>
                  </div>
                ))}
                {rest > 0 ? (
                  <div className="text-xs text-muted-foreground pl-5">и ещё {rest} фабр.</div>
                ) : null}
              </div>

              <p className="mt-5 text-xs text-muted-foreground leading-relaxed">{group.note}</p>

              <div className="mt-auto pt-4 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  className="rounded-xl gap-1.5"
                  nativeButton={false}
                  render={<a href={asset(`/catalog#${group.id}`)} />}
                >
                  Подобрать
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
                {group.website ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-xl gap-1.5"
                    nativeButton={false}
                    render={<a href={group.website} target="_blank" rel="noopener noreferrer" />}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Сайт
                  </Button>
                ) : null}
              </div>
            </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
