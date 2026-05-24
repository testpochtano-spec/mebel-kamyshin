"use client";

import { Shield, Ruler, Truck, Star } from "lucide-react";
import { BUSINESS } from "@/data/business";
import { motion } from "framer-motion";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: Shield,
  ruler: Ruler,
  truck: Truck,
  star: Star,
};

export function AdvantagesSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Почему выбирают нас</h2>
          <p className="mt-3 text-muted-foreground text-lg">Работаем для вас более 10 лет</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BUSINESS.features.map((f, i) => {
            const Icon = icons[f.icon] || Shield;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-background rounded-2xl p-6 border border-border hover:border-primary/20 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
