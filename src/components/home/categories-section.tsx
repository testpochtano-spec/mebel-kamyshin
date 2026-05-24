"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const cats = [
  { name: "Прямые диваны", href: "/catalog?category=divan", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop", count: "12 моделей" },
  { name: "Угловые диваны", href: "/catalog?category=uglovoy-divan", img: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=400&h=300&fit=crop", count: "8 моделей" },
  { name: "Матрасы", href: "/catalog?category=matras", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop", count: "15 моделей" },
  { name: "Кровати", href: "/catalog?category=krovat", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop", count: "6 моделей" },
  { name: "На заказ", href: "/catalog?custom=true", img: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=300&fit=crop", count: "Индивидуально" },
];

export function CategoriesSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Категории мебели</h2>
          <p className="mt-3 text-muted-foreground text-lg">Выберите то, что подходит именно вам</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {cats.map((cat) => (
            <motion.div
              key={cat.name}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={cat.href}
                className="group block bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 no-underline"
              >
                <div className="aspect-square overflow-hidden">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-heading text-base font-semibold text-foreground group-hover:text-primary transition-colors">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{cat.count}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
