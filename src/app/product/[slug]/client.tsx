"use client";

import { useState } from "react";
import Link from "next/link";
import { IProduct } from "@/types/product";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { OrderForm } from "@/components/shared/order-form";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/catalog/product-card";
import { BUSINESS } from "@/data/business";
import { ShoppingCart, Phone, ChevronLeft, Check, Truck, Shield, Clock, Ruler, ArrowRight, Star, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

function formatPrice(n: number) {
  return n ? `${n.toLocaleString("ru-RU")} ₽` : "Цена по запросу";
}

export function ProductPageClient({ product }: { product: IProduct }) {
  const [activeImg, setActiveImg] = useState(0);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Breadcrumb */}
      <Link
        href="/catalog"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors no-underline mb-8"
      >
        <ChevronLeft className="w-4 h-4" /> Назад в каталог
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div>
          <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-background border border-border mb-4">
            <img
              src={product.images[activeImg] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    "w-20 h-16 rounded-xl overflow-hidden border-2 transition-colors cursor-pointer",
                    i === activeImg ? "border-primary" : "border-border hover:border-primary/40"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">{product.manufacturer}</span>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-1">{product.name}</h1>

          <div className="mt-6 flex items-baseline gap-3">
            {product.price > 0 ? (
              <>
                <span className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
                {product.oldPrice && (
                  <span className="text-lg text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>
                )}
              </>
            ) : (
              <span className="text-2xl font-semibold text-primary">{formatPrice(0)}</span>
            )}
          </div>

          {/* Status */}
          <div className="mt-4 flex gap-3">
            {product.inStock ? (
              <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-sm px-3 py-1.5 rounded-full font-medium">
                <Check className="w-3.5 h-3.5" /> В наличии
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-sm px-3 py-1.5 rounded-full font-medium">
                <Clock className="w-3.5 h-3.5" /> Под заказ, от 14 дней
              </span>
            )}
          </div>

          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            {product.inStock ? (
              <Button size="lg" onClick={handleAdd} className="rounded-2xl text-base px-8 h-12 gap-2" variant={added ? "secondary" : "default"}>
                {added ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                {added ? "Добавлено" : "В корзину"}
              </Button>
            ) : (
              <Button size="lg" onClick={() => setShowForm(true)} className="rounded-2xl text-base px-8 h-12 gap-2">
                <Ruler className="w-5 h-5" /> Оформить заказ
              </Button>
            )}
            <Button size="lg" variant="outline" nativeButton={false} className="rounded-2xl text-base px-8 h-12 gap-2" render={<a href={`tel:${BUSINESS.phone.replace(/-/g, "")}`} />}>
                <Phone className="w-5 h-5" /> {BUSINESS.phone}
              </Button>
          </div>

          {/* Trust signals */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            {[
              { icon: Truck, text: "Доставка по Камышину, Волгоградской и Саратовской обл." },
              { icon: Shield, text: "Срок службы 15 лет" },
              { icon: Ruler, text: "Индивидуальные размеры" },
              { icon: Star, text: "Гарантия качества" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="w-4 h-4 text-primary shrink-0" /> {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Specs table */}
      <div className="mt-16">
        <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Характеристики</h2>
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

      {/* Order form modal */}
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
                  <p className="text-sm text-muted-foreground">Заказ товара под заказ</p>
                  <p className="font-heading text-lg font-bold text-foreground">{product.name}</p>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="w-10 h-10 rounded-xl bg-background flex items-center justify-center hover:bg-border transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <OrderForm
                  title=""
                  subtitle="Заполните форму — мы свяжемся для уточнения размеров, цвета и сроков"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl font-bold text-foreground">Похожие товары</h2>
            <Button variant="ghost" nativeButton={false} className="gap-1 text-primary" render={<Link href="/catalog" />}>
              Все товары <ArrowRight className="w-4 h-4" />
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
