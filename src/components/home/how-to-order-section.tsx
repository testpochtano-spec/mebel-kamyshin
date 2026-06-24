"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, MessageCircle, Phone, Ruler } from "lucide-react";
import { BUSINESS } from "@/data/business";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: BookOpen,
    title: "Выберите вариант",
    text: "Откройте каталог или покажите фото мебели, которая понравилась.",
  },
  {
    icon: Ruler,
    title: "Напишите нам",
    text: "Пришлите размеры, цвет и пожелания в мессенджер или позвоните.",
  },
  {
    icon: MessageCircle,
    title: "Согласуем заказ",
    text: "Подскажем варианты, материалы, сроки и доставку.",
  },
];

export function HowToOrderSection() {
  return (
    <section className="bg-background py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Как это работает
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-foreground md:text-4xl">
              Выберите мебель, а мы поможем с заказом
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Откройте каталог, покажите фото или расскажите, что нужно для дома.
              Мы подскажем подходящие варианты и объясним, как оформить заказ.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" nativeButton={false} className="h-12 rounded-2xl px-7 gap-2" render={<Link href="/catalog" />}>
                Открыть каталог
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                className="h-12 rounded-2xl px-7 gap-2"
                render={<a href={`tel:${BUSINESS.phone.replace(/\D/g, "")}`} />}
              >
                <Phone className="h-4 w-4" />
                {BUSINESS.phone}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: index * 0.06 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-border bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-heading text-2xl font-bold text-primary">0{index + 1}</span>
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
