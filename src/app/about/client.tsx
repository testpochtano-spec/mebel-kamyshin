"use client";

import { BUSINESS } from "@/data/business";
import { Shield, Ruler, Truck, Star, Heart, Medal, Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { asset } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: Shield, ruler: Ruler, truck: Truck, star: Star,
};

export function AboutPageClient() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground">О нашем магазине</h1>
        <p className="mt-4 text-muted-foreground text-lg max-w-2xl leading-relaxed">
          {BUSINESS.about}
        </p>
      </motion.div>

      {/* Store photo + stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-12 bg-white rounded-3xl border border-border overflow-hidden grid grid-cols-1 md:grid-cols-3"
      >
        <div className="md:col-span-1 aspect-[4/3] md:aspect-auto">
          <img
            src={asset("/images/store.jpg")}
            alt="Магазин МЕБЕЛЬ в Камышине"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:col-span-2 p-6 md:p-10 flex flex-col justify-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Магазин в Камышине</p>
          <p className="font-heading text-xl md:text-2xl font-bold text-foreground">
            {BUSINESS.shortAddress}
          </p>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-md">
            Приезжайте посмотреть мебель вживую, оценить материалы и ткани, получить консультацию по выбору.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            {[
              { value: "10+", label: "лет работы" },
              { value: "100+", label: "клиентов" },
              { value: "15", label: "лет службы" },
            ].map((stat) => (
              <span key={stat.label} className="bg-background rounded-xl px-4 py-2 text-center">
                <span className="block text-lg font-bold text-primary leading-tight">{stat.value}</span>
                <span className="block text-xs text-muted-foreground">{stat.label}</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Features */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {BUSINESS.features.map((f, i) => {
          const Icon = icons[f.icon] || Shield;
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="bg-white rounded-2xl p-6 border border-border flex gap-5"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Discounts */}
      <div className="mt-20">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
          Специальные условия
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {BUSINESS.discounts.map((d, i) => (
            <motion.div
              key={d.group}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * i }}
              className="bg-primary text-white rounded-2xl p-8 text-center"
            >
              <div className="w-12 h-12 mx-auto bg-white/20 rounded-xl flex items-center justify-center mb-4">
                {i === 0 ? <Heart className="w-6 h-6" /> : i === 1 ? <Shield className="w-6 h-6" /> : <Medal className="w-6 h-6" />}
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">{d.group}</h3>
              <p className="text-sm text-white/80">{d.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Extra services */}
      <div className="mt-20 bg-background rounded-3xl p-8 md:p-12 border border-border">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
          Дополнительные услуги
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BUSINESS.extraServices.map((s, i) => (
            <div key={s} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-border">
              <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span className="text-sm text-foreground">{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Order CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 bg-primary text-white rounded-3xl p-8 md:p-12 text-center"
      >
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">
          Готовы сделать заказ?
        </h2>
        <p className="text-white/80 max-w-xl mx-auto mb-6">
          Выберите мебель из каталога или опишите ваши пожелания. Мы изготовим мебель по индивидуальным размерам, в любой цветовой гамме и с доставкой по Волгоградской и Саратовской области.
        </p>
        <Button size="lg" nativeButton={false} className="rounded-2xl text-base px-8 h-12 gap-2 bg-white text-primary hover:bg-white/90" render={<Link href="/catalog" />}>
          <ShoppingCart className="w-5 h-5" /> Выбрать мебель
        </Button>
      </motion.div>
    </div>
  );
}
