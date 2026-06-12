"use client";

import { FEATURED_CATALOGS } from "@/data/catalogs";
import { Award, BookOpen, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { asset } from "@/lib/utils";

export function CertificatesSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-8 h-8 text-secondary" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Грамоты и сертификаты
            </h2>
          </div>
          <p className="text-muted-foreground text-lg mb-10">
            В магазине можно увидеть реальные грамоты, благодарности и документы партнёров
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 items-stretch">
            <div className="rounded-3xl overflow-hidden border border-border bg-background min-h-[320px]">
              <img
                src={asset("/showroom/certificates-wall-real.jpg")}
                alt="Грамоты и сертификаты магазина МЕБЕЛЬ в Камышине"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Более 10 лет работы в Камышине",
                "Каталоги российских фабрик",
                "Образцы тканей и материалов в магазине",
                "Консультация по размерам, цветам и доставке",
              ].map((text, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="bg-background rounded-2xl border border-border p-5 flex items-start gap-3"
                >
                  <Award className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                  <p className="text-sm font-medium text-foreground leading-relaxed">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Catalogs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Каталоги фабрик
            </h2>
          </div>
          <p className="text-muted-foreground text-lg mb-8">
            На сайте собраны реальные PDF-каталоги поставщиков и архивы по отдельным моделям
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {FEATURED_CATALOGS.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-2xl border p-5 hover:border-primary/30 hover:shadow-md transition-all ${
                  i === 0 ? "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 sm:col-span-2 md:col-span-2" : "bg-background border-border"
                }`}
              >
                {cat.cover ? (
                  <div className="mb-4 h-44 rounded-xl border border-border bg-white overflow-hidden">
                    <img
                      src={asset(cat.cover)}
                      alt={`Обложка: ${cat.title}`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                ) : null}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      i === 0 ? "bg-primary text-primary-foreground" : "bg-primary/10"
                    }`}>
                      <BookOpen className={`w-5 h-5 ${i === 0 ? "text-primary-foreground" : "text-primary"}`} />
                    </div>
                    <div>
                      <span className="font-medium text-foreground text-sm block">{cat.title}</span>
                      <span className="text-xs text-muted-foreground mt-1 block">
                        {cat.maker} · {cat.pages} стр. · {cat.size}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant={i === 0 ? "default" : "ghost"}
                    size="sm"
                    className="rounded-xl gap-1 shrink-0"
                    render={<a href={asset(`/catalog-viewer/${cat.slug}`)} />}
                    nativeButton={false}
                  >
                    <Eye className="w-4 h-4" /> Открыть
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6">
            <Button
              variant="outline"
              className="rounded-2xl"
              nativeButton={false}
              render={<a href={asset("/catalog#catalogs-heading")} />}
            >
              Смотреть все каталоги
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
