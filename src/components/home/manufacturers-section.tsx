"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Layers, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  MANUFACTURER_GROUPS,
  PARTNER_BRANDS,
  type ManufacturerGroup,
  type PartnerBrand,
} from "@/data/manufacturers";
import { asset } from "@/lib/utils";

const accentClass: Record<ManufacturerGroup["accent"], string> = {
  primary: "bg-primary/10 text-primary border-primary/20",
  gold: "bg-secondary/15 text-secondary-foreground border-secondary/25",
  warm: "bg-[#8B7355]/10 text-[#6F5840] border-[#8B7355]/20",
  stone: "bg-[#6B7A78]/10 text-[#4E615F] border-[#6B7A78]/20",
  soft: "bg-[#7D6A8C]/10 text-[#5F4B70] border-[#7D6A8C]/20",
};

const logoToneClass: Record<PartnerBrand["tone"], string> = {
  primary: "from-primary/14 to-primary/5 border-primary/18 text-primary",
  gold: "from-secondary/22 to-secondary/6 border-secondary/22 text-secondary-foreground",
  warm: "from-[#8B7355]/16 to-[#8B7355]/5 border-[#8B7355]/18 text-[#6F5840]",
  stone: "from-[#6B7A78]/16 to-[#6B7A78]/5 border-[#6B7A78]/18 text-[#4E615F]",
  soft: "from-[#7D6A8C]/16 to-[#7D6A8C]/5 border-[#7D6A8C]/18 text-[#5F4B70]",
};

function supplierPreview(suppliers: string[]) {
  const visible = suppliers.slice(0, 5);
  const rest = suppliers.length - visible.length;
  return { visible, rest };
}

function BrandLogo({ brand }: { brand: PartnerBrand }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24 }}
      viewport={{ once: true }}
      className={`group flex min-h-[86px] items-center justify-center rounded-2xl border bg-gradient-to-br px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${logoToneClass[brand.tone]}`}
      aria-label={brand.name}
    >
      <div className="flex min-w-0 flex-col items-center gap-2 text-center">
        {brand.image ? (
          <div className="flex h-11 w-full items-center justify-center">
            <img
              src={asset(brand.image)}
              alt={brand.name}
              className="max-h-11 max-w-[118px] object-contain transition-transform duration-300 group-hover:scale-[1.04]"
              loading="lazy"
            />
          </div>
        ) : (
          <span className="font-heading text-[1.05rem] font-bold leading-none tracking-normal text-current">
            {brand.name}
          </span>
        )}
        <span className="line-clamp-1 text-[11px] font-medium text-muted-foreground">{brand.category}</span>
      </div>
    </motion.div>
  );
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

        <div className="mb-10 rounded-3xl border border-border bg-white p-4 shadow-sm md:p-5">
          <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="font-heading text-xl font-bold text-foreground">Актуальные партнёры</h3>
              <p className="text-sm text-muted-foreground">
                Основные фабрики и бренды, по которым магазин принимает заявки и подбирает решения.
              </p>
            </div>
            <span className="text-xs font-medium text-primary">{PARTNER_BRANDS.length} брендов</span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {PARTNER_BRANDS.map((brand) => (
              <BrandLogo key={`${brand.name}-${brand.category}`} brand={brand} />
            ))}
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
