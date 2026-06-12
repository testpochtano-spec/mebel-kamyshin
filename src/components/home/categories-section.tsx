"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SHOWROOM_PHOTOS } from "@/data/showroom";
import { asset } from "@/lib/utils";

export function CategoriesSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Что можно подобрать</h2>
          <p className="mt-3 text-muted-foreground text-lg">
            Живые примеры из магазина и подбор по каталогам фабрик
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {SHOWROOM_PHOTOS.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <Link
                href={cat.href}
                className="group block bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 no-underline h-full"
              >
                <div
                  className="aspect-[4/3] bg-cover bg-center"
                  style={{ backgroundImage: `url(${asset(cat.image)})` }}
                  aria-hidden="true"
                />
                <div className="p-5">
                  <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{cat.text}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
