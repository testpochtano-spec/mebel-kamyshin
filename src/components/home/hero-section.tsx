"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Ruler, Truck, Star, ChevronRight, Percent } from "lucide-react";
import { BUSINESS } from "@/data/business";
import { motion } from "framer-motion";
import { asset } from "@/lib/utils";

const features = [
  { icon: Shield, text: "Официальные фабрики" },
  { icon: Star, text: "Каталоги и образцы" },
  { icon: Truck, text: "Доставка и сборка" },
  { icon: Ruler, text: "Подбор под размеры" },
];

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-background via-background to-secondary/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <motion.div
            className="flex-1 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              Мебельный магазин в Камышине
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Добротная мебель
              <span className="block text-primary mt-2">для вашего дома</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
              26 лет подбираем фабричную мягкую и корпусную мебель от российских производителей.
              Выберите модель из каталогов или приезжайте в магазин — поможем рассчитать цену, сроки и доставку.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" nativeButton={false} className="rounded-2xl text-base px-8 h-12" render={<Link href="/catalog#request" />}>
                Получить подбор <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
              <Button variant="outline" size="lg" nativeButton={false} className="rounded-2xl text-base px-8 h-12" render={<Link href="/about" />}>
                О магазине <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {features.map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="w-5 h-5 text-primary" /> {text}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-start gap-2 bg-secondary/10 text-secondary-foreground text-sm font-medium px-4 py-2 rounded-xl border border-secondary/20">
              <Percent className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="leading-snug">Скидки пенсионерам, инвалидам и участникам СВО</span>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={asset("/showroom/sofa-modular-showroom.jpg")}
                  alt="Мебельный зал магазина МЕБЕЛЬ в Камышине"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-2 sm:-bottom-5 sm:-left-5 bg-white rounded-2xl shadow-xl px-4 py-3 sm:px-6 sm:py-4 max-w-[calc(100vw-2rem)]">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Режим работы</p>
                <p className="text-sm sm:text-lg font-bold text-foreground">{BUSINESS.hours}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
