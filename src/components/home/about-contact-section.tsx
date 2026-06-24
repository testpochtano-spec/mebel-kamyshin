"use client";

import { BUSINESS } from "@/data/business";
import { Mail, MessageCircle, Phone, MapPin, Clock, CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export function AboutContactSection() {
  const trust = [
    "26 лет работы в Камышине",
    "официальные фабрики и документы",
    "подбор по образцам, размерам и каталогам",
  ];

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              Приезжайте в магазин или напишите
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{BUSINESS.about}</p>
            <div className="space-y-3">
              {trust.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" nativeButton={false} className="mt-6 rounded-2xl" size="lg" render={<Link href="/about" />}>
              Подробнее о магазине <ExternalLink className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>

          {/* Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-background rounded-3xl p-5 sm:p-8 border border-border"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">Контакты</h2>
            <div className="space-y-5">
              <a
                href={`tel:${BUSINESS.phone.replace(/-/g, "")}`}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-border hover:border-primary/30 transition-colors no-underline group"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Телефон</p>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{BUSINESS.phone}</p>
                </div>
              </a>

              <a
                href={`mailto:${BUSINESS.email}`}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-border hover:border-primary/30 transition-colors no-underline group"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Почта для заявок</p>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{BUSINESS.email}</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Мессенджеры</p>
                  <p className="font-semibold text-foreground">Telegram, MAX, WhatsApp</p>
                  <p className="text-xs text-muted-foreground mt-1">Можно написать по номеру {BUSINESS.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Адрес</p>
                  <p className="font-semibold text-foreground">{BUSINESS.shortAddress}</p>
                  <p className="text-xs text-muted-foreground mt-1">{BUSINESS.region}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Режим работы</p>
                  <p className="font-semibold text-foreground">{BUSINESS.hours}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
