"use client";

import { motion } from "framer-motion";
import { Droplets, Layers3, Palette, ShieldCheck, Sofa, Table2 } from "lucide-react";
import { asset } from "@/lib/utils";

const media = [
  {
    title: "Образцы тканей",
    subtitle: "Коллекции обивок можно выбрать в магазине",
    src: "/videos/materials-fabrics.mp4",
    poster: "/videos/materials-fabrics-poster.jpg",
    icon: Palette,
  },
  {
    title: "Мойки и декоры",
    subtitle: "Камень, столешницы и смесители под кухню",
    src: "/videos/materials-sinks.mp4",
    poster: "/videos/materials-sinks-poster.jpg",
    icon: Droplets,
  },
];

const details = [
  {
    icon: Sofa,
    title: "Ткани под интерьер",
    text: "Стандартные и премиальные коллекции обивок подбираются по живым образцам.",
  },
  {
    icon: Table2,
    title: "Столы и стулья",
    text: "Фабричные модели, раздвижные столы, влагостойкие поверхности и надежная фурнитура.",
  },
  {
    icon: ShieldCheck,
    title: "Официальные фабрики",
    text: "Работаем с российскими производителями и документами, без кустарных поставок.",
  },
];

export function MaterialsSection() {
  return (
    <section className="relative overflow-hidden bg-[#F5F0E8] py-14 md:py-20">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-medium mb-5">
              <Layers3 className="w-4 h-4" />
              Материалы в магазине
            </span>

            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Материалы можно выбрать вживую
            </h2>
            <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
              В салоне есть образцы тканей, фасадов, столешниц, моек и цветовых решений.
              Если модель понравилась в каталоге, ее можно адаптировать под интерьер,
              размер, ткань и комплектацию.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3">
              {details.map(({ icon: Icon, title, text }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="flex gap-3 rounded-2xl border border-[#DED4C5] bg-white/75 p-4 shadow-sm"
                >
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-foreground">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {media.map(({ title, subtitle, src, poster, icon: Icon }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 22, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -4 }}
                animate={{ y: [0, index === 0 ? -6 : 6, 0] }}
                transition={{
                  opacity: { duration: 0.55, delay: index * 0.1 },
                  y: {
                    duration: 14 + index * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  scale: { duration: 0.55 },
                }}
                viewport={{ once: true, margin: "-80px" }}
                className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white shadow-lg shadow-black/10 will-change-transform"
              >
                <div className="relative aspect-[4/5] min-h-[300px] overflow-hidden bg-[#dfd7ca]">
                  <video
                    className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.025]"
                    src={asset(src)}
                    poster={asset(poster)}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-white/10" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <div className="mb-3 h-9 w-9 rounded-xl bg-white/16 border border-white/20 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold">{title}</h3>
                    <p className="mt-1 text-sm text-white/78 leading-relaxed">{subtitle}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
