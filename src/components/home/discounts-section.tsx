"use client";

import { BUSINESS } from "@/data/business";
import { Heart, Shield, Medal } from "lucide-react";
import { motion } from "framer-motion";

const icons = [Heart, Shield, Medal];

export function DiscountsSection() {
  return (
    <section className="py-16 md:py-24 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold">Специальные условия</h2>
          <p className="mt-3 text-primary-foreground/80 text-lg">Мы ценим каждого покупателя</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {BUSINESS.discounts.map((d, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={d.group}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center border border-white/20"
              >
                <div className="w-12 h-12 mx-auto bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-1">{d.group}</h3>
                <p className="text-sm text-white/80">{d.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
