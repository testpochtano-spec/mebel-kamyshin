"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { OrderForm } from "@/components/shared/order-form";
import { ArrowRight, BookOpen, MessageCircle } from "lucide-react";

export function CartPageClient() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
        <div>
          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-medium mb-5">
            Заявка вместо корзины
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
            Подберём мебель и рассчитаем заказ
          </h1>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Сейчас сайт работает как витрина и каталог для подбора. Напишите, какая мебель нужна,
            а магазин уточнит цену, наличие, сроки изготовления и доставку.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              nativeButton={false}
              className="rounded-2xl text-base h-12 gap-2"
              render={<Link href="/catalog" />}
            >
              <BookOpen className="w-5 h-5" />
              Смотреть витрину
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              className="rounded-2xl text-base h-12 gap-2"
              render={<Link href="/catalog#request" />}
            >
              <MessageCircle className="w-5 h-5" />
              Быстрая заявка
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <OrderForm
          title="Заявка на подбор"
          subtitle="Опишите мебель, размер, цвет и бюджет — текст откроется готовым письмом."
          defaultMessage="Хочу подобрать мебель. Интересует:"
        />
      </div>
    </div>
  );
}
