"use client";

import { useState } from "react";
import Link from "next/link";
import { IProduct } from "@/types/product";
import { Button } from "@/components/ui/button";
import { OrderForm } from "@/components/shared/order-form";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/catalog/product-card";
import { BUSINESS } from "@/data/business";
import { Phone, ChevronLeft, Check, Truck, Shield, Clock, Ruler, ArrowRight, Star, X, MessageCircle } from "lucide-react";
import { cn, asset } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

function formatPrice(n: number) {
  return n ? `от ${n.toLocaleString("ru-RU")} ₽` : "Цена по запросу";
}

function imageSrc(src: string) {
  return src.startsWith("/") ? asset(src) : src;
}

export function ProductPageClient({ product }: { product: IProduct }) {
  const [activeImg, setActiveImg] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <Link
        href="/catalog"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors no-underline mb-8"
      >
        <ChevronLeft className="w-4 h-4" /> Назад в витрину
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div>
          <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-background border border-border mb-4">
            <img
              src={imageSrc(product.images[activeImg] || product.images[0])}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 flex-wrap">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    "w-20 h-16 rounded-xl overflow-hidden border-2 transition-colors cursor-pointer bg-background",
                    i === activeImg ? "border-primary" : "border-border hover:border-primary/40"
                  )}
                  aria-label={`Показать фото ${i + 1}`}
                >
                  <img src={imageSrc(img)} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">{product.manufacturer}</span>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-1">{product.name}</h1>

          <div className="mt-6">
            <span className="text-2xl md:text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
            <p className="text-sm text-muted-foreground mt-2">
              Точная стоимость зависит от модели, ткани, размера, наличия на фабрике и доставки.
            </p>
          </div>

          <div className="mt-4 flex gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-sm px-3 py-1.5 rounded-full font-medium">
              <Clock className="w-3.5 h-3.5" /> Наличие уточняется
            </span>
            <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-sm px-3 py-1.5 rounded-full font-medium">
              <Check className="w-3.5 h-3.5" /> Возможен подбор по каталогам
            </span>
          </div>

          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => setShowForm(true)} className="rounded-2xl text-base px-8 h-12 gap-2">
              <MessageCircle className="w-5 h-5" /> Получить расчёт
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              className="rounded-2xl text-base px-8 h-12 gap-2"
              render={<a href={`tel:${BUSINESS.phone.replace(/\D/g, "")}`} />}
            >
              <Phone className="w-5 h-5" /> {BUSINESS.phone}
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {[
              { icon: Truck, text: "Доставка по Камышину и области" },
              { icon: Shield, text: "Работаем с российскими фабриками" },
              { icon: Ruler, text: "Подбор размеров и обивки" },
              { icon: Star, text: "Можно выбрать по каталогам" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="w-4 h-4 text-primary shrink-0" /> {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Что уточним при расчёте</h2>
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="divide-y divide-border">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="flex px-6 py-3.5 text-sm">
                <span className="text-muted-foreground w-1/2">{key}</span>
                <span className="text-foreground font-medium w-1/2">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-lg max-h-[95dvh] md:max-h-[90dvh] overflow-y-auto shadow-2xl mx-0 sm:mx-4"
            >
              <div className="flex items-center justify-between p-6 pb-0">
                <div>
                  <p className="text-sm text-muted-foreground">Расчёт по примеру</p>
                  <p className="font-heading text-lg font-bold text-foreground">{product.name}</p>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="w-10 h-10 rounded-xl bg-background flex items-center justify-center hover:bg-border transition-colors cursor-pointer shrink-0"
                  aria-label="Закрыть"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <OrderForm
                  title=""
                  context={product.name}
                  subtitle="Опишите размер, цвет или пожелания — текст откроется готовым письмом."
                  defaultMessage={`Хочу уточнить цену и наличие: ${product.name}.`}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {related.length > 0 && (
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl font-bold text-foreground">Похожие примеры</h2>
            <Button variant="ghost" nativeButton={false} className="gap-1 text-primary" render={<Link href="/catalog" />}>
              Вся витрина <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
