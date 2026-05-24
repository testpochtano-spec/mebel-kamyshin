"use client";

import { motion } from "framer-motion";
import { asset } from "@/lib/utils";

const brands = [
  { name: "Березка", subtitle: "Матрасы премиум-класса", logo: asset("/brands/berezka.svg") },
  { name: "Vega", subtitle: "Ортопедические матрасы", logo: asset("/brands/vega.png") },
  { name: "Ascona", subtitle: "Мировой лидер сна", logo: asset("/brands/askona.svg") },
  { name: "ФММ", subtitle: "Фабрика мягкой мебели", logo: asset("/brands/fmm.png") },
];

export function ManufacturersSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Производители</h2>
          <p className="mt-3 text-muted-foreground text-lg">Работаем напрямую с лучшими фабриками России</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {brands.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-border text-center hover:shadow-md hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-24 h-16 mx-auto flex items-center justify-center mb-4">
                <img
                  src={b.logo}
                  alt={b.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">{b.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{b.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
