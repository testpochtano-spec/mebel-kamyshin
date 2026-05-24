"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { OrderForm } from "@/components/shared/order-form";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function formatPrice(n: number) {
  return `${n.toLocaleString("ru-RU")} ₽`;
}

export function CartPageClient() {
  const { items, removeItem, updateQty, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingCart className="w-20 h-20 text-muted-foreground/30 mx-auto mb-6" />
        <h1 className="font-heading text-3xl font-bold text-foreground mb-3">Корзина пуста</h1>
        <p className="text-muted-foreground mb-8">Добавьте товары из каталога</p>
        <Button size="lg" nativeButton={false} className="rounded-2xl px-8 h-12" render={<Link href="/catalog" />}>
          Перейти в каталог <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Корзина</h1>
        <Button variant="ghost" size="sm" onClick={clearCart} className="text-muted-foreground gap-1">
          <Trash2 className="w-4 h-4" /> Очистить
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-2xl border border-border p-3 sm:p-4 flex gap-3 sm:gap-4"
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${item.slug}`}
                    className="font-semibold text-foreground hover:text-primary transition-colors no-underline text-xs sm:text-sm leading-snug"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.manufacturer}</p>
                  <div className="flex items-center justify-between mt-2 sm:mt-3 flex-wrap gap-2">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg"
                        onClick={() => updateQty(item.id, item.qty - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-6 sm:w-8 text-center text-sm font-medium">{item.qty}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg"
                        onClick={() => updateQty(item.id, item.qty + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                      <span className="font-bold text-foreground text-sm sm:text-base">{formatPrice((item.price || 0) * item.qty)}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-7 h-7 sm:w-8 sm:h-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-border p-6 sticky top-20 mb-6">
            <h3 className="font-heading text-xl font-bold text-foreground mb-4">Ваш заказ</h3>
            <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
              <span className="text-muted-foreground">Товаров</span>
              <span className="font-medium">{items.reduce((s, i) => s + i.qty, 0)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Итого</span>
              <span className="text-2xl font-bold text-foreground">{formatPrice(total)}</span>
            </div>
          </div>

          <OrderForm
            title="Оформить заказ"
            subtitle="Заполните форму и мы свяжемся с вами для уточнения деталей"
            onSuccess={clearCart}
          />
        </div>
      </div>
    </div>
  );
}
