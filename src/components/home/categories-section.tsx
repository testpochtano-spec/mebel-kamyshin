"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const cats = [
  { name: "Прямые диваны", href: "/catalog?category=divan", gradient: "from-amber-700 via-amber-600 to-amber-800", count: "12 моделей" },
  { name: "Угловые диваны", href: "/catalog?category=uglovoy-divan", gradient: "from-emerald-700 via-emerald-600 to-emerald-800", count: "8 моделей" },
  { name: "Матрасы", href: "/catalog?category=matras", gradient: "from-blue-700 via-blue-600 to-blue-800", count: "15 моделей" },
  { name: "Кровати", href: "/catalog?category=krovat", gradient: "from-slate-700 via-slate-600 to-slate-800", count: "6 моделей" },
  { name: "На заказ", href: "/catalog?custom=true", gradient: "from-rose-700 via-rose-600 to-rose-800", count: "Индивидуально" },
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
                <div className={`aspect-square overflow-hidden bg-gradient-to-br ${cat.gradient}`}>
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white/90 text-5xl font-heading font-bold opacity-20 group-hover:opacity-30 transition-opacity">
                      {cat.name.charAt(0)}
                    </span>
                  </div>
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
