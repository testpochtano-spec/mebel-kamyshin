"use client";

import { BUSINESS } from "@/data/business";
import { Truck, MapPin, Calculator, Wrench, Clock, Phone, Shield, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const blocks = [
  {
    icon: MapPin,
    title: "География доставки",
    desc: "Мы доставляем мебель по Камышину, а также по всей Волгоградской и Саратовской области. Работаем с проверенными транспортными компаниями, обеспечивая сохранность каждого заказа.",
  },
  {
    icon: Calculator,
    title: "Индивидуальный расчёт",
    desc: "Стоимость доставки рассчитывается индивидуально для каждого заказа. Цена зависит от габаритов мебели, расстояния и способа транспортировки. Мы всегда находим оптимальный вариант по цене и срокам.",
  },
  {
    icon: Wrench,
    title: "Профессиональная сборка",
    desc: "Наши специалисты бережно соберут мебель у вас дома. Работаем аккуратно, быстро и чисто — после сборки не остаётся мусора и упаковки.",
  },
  {
    icon: Clock,
    title: "Сроки доставки",
    desc: "Товары в наличии доставляем в течение 1–5 дней. Мебель на заказ изготавливается от 14 дней — точные сроки зависят от сложности и загрузки производства. Мы всегда держим вас в курсе.",
  },
  {
    icon: Truck,
    title: "Как мы доставляем",
    desc: "Каждое изделие тщательно упаковывается перед отправкой. Крупногабаритная мебель перевозится в собранном виде или в заводской упаковке — в зависимости от конструкции. При получении вы проверяете целостность и комплектацию.",
  },
  {
    icon: Shield,
    title: "Гарантия сохранности",
    desc: "Мы несём полную ответственность за сохранность мебели при транспортировке. В случае повреждения — вернём деньги или изготовим новое изделие за наш счёт.",
  },
];

export function DeliveryPageClient() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground">Доставка и сборка</h1>
        <p className="mt-4 text-muted-foreground text-lg max-w-2xl">
          Доставляем мебель по Камышину, Волгоградской и Саратовской области.
          Логистика и стоимость рассчитываются индивидуально под ваш заказ.
        </p>
      </motion.div>

      {/* Info blocks */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blocks.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="bg-white rounded-2xl border border-border p-6"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-16 bg-primary text-white rounded-3xl p-8 md:p-12 text-center"
      >
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
          Как узнать стоимость доставки для вашего заказа?
        </h2>
        <p className="text-white/80 max-w-xl mx-auto mb-8">
          Выберите мебель в каталоге, заполните форму — и мы рассчитаем точную стоимость доставки
          с учётом вашего адреса и выбранных товаров.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            nativeButton={false}
            className="rounded-2xl text-base px-8 h-14 gap-2 bg-white text-primary hover:bg-white/90 w-full sm:w-auto"
            render={<Link href="/catalog" />}
          >
            <ShoppingCart className="w-5 h-5" /> Выбрать мебель
          </Button>
          <Button
            size="lg"
            nativeButton={false}
            className="rounded-2xl text-base px-8 h-14 gap-2 bg-white/15 text-white hover:bg-white/25 border border-white/20 w-full sm:w-auto"
            render={<a href={`tel:${BUSINESS.phone.replace(/-/g, "")}`} />}
          >
            <Phone className="w-5 h-5" /> {BUSINESS.phone}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
