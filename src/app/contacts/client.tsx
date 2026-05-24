"use client";

import { BUSINESS } from "@/data/business";
import { Phone, MapPin, Clock, Navigation, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ContactsPageClient() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground">Контакты</h1>
        <p className="mt-4 text-muted-foreground text-lg">Ждём вас в нашем магазине в Камышине</p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contacts */}
        <div className="space-y-5">
          {[
            {
              icon: Phone,
              label: "Телефон",
              value: BUSINESS.phone,
              href: `tel:${BUSINESS.phone.replace(/-/g, "")}`,
            },
            {
              icon: Phone,
              label: "Дополнительный",
              value: BUSINESS.phone2,
              href: `tel:${BUSINESS.phone2.replace(/-/g, "")}`,
            },
            { icon: MapPin, label: "Адрес", value: BUSINESS.address },
            { icon: Clock, label: "Режим работы", value: BUSINESS.hours },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-border"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                {"href" in item && item.href ? (
                  <a
                    href={item.href}
                    className="font-semibold text-foreground hover:text-primary transition-colors no-underline"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="font-semibold text-foreground">{item.value}</p>
                )}
              </div>
            </motion.div>
          ))}

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" nativeButton={false} className="rounded-2xl text-base px-8 h-12 gap-2" render={<a href={`tel:${BUSINESS.phone.replace(/-/g, "")}`} />}>
                <Phone className="w-5 h-5" /> Позвонить
            </Button>
          </div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col"
        >
          <div className="rounded-3xl border border-border overflow-hidden bg-white">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(BUSINESS.address)}&z=15&output=embed`}
              width="100%"
              height="360"
              className="border-0 block"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Карта проезда — магазин МЕБЕЛЬ Камышин"
            />
          </div>
          <div className="mt-4 bg-white rounded-2xl border border-border p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground text-sm">{BUSINESS.shortAddress}</p>
              <p className="text-xs text-muted-foreground">{BUSINESS.region}</p>
            </div>
            <Button
              size="lg"
              nativeButton={false}
              className="rounded-2xl text-base px-6 h-12 gap-2 bg-[#FC3F1D] hover:bg-[#E5390F] text-white border-0"
              render={<a href={`https://yandex.ru/maps/?text=${encodeURIComponent(BUSINESS.address)}`} target="_blank" rel="noopener noreferrer" />}
            >
              <Navigation className="w-5 h-5" /> Открыть в Яндекс.Картах
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Store photo + info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 bg-white rounded-3xl border border-border overflow-hidden shadow-sm">
          <div className="md:col-span-3">
            <img
              src="/images/store.jpg"
              alt="Магазин МЕБЕЛЬ в Камышине"
              className="w-full h-full object-cover min-h-[280px] md:min-h-full"
            />
          </div>
          <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <Store className="w-6 h-6 text-primary" />
              <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">Наш магазин</h2>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">
              Ждём вас по адресу <span className="font-medium text-foreground">{BUSINESS.shortAddress}</span>.
              У нас вы можете посмотреть мебель вживую, оценить качество материалов и получить консультацию.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>{BUSINESS.hours}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href={`tel:${BUSINESS.phone.replace(/-/g, "")}`} className="font-medium text-foreground hover:text-primary transition-colors no-underline">
                  {BUSINESS.phone}
                </a>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                size="lg"
                nativeButton={false}
                className="rounded-2xl text-base px-6 h-12 gap-2 bg-[#FC3F1D] hover:bg-[#E5390F] text-white border-0"
                render={<a href={`https://yandex.ru/maps/?text=${encodeURIComponent(BUSINESS.address)}`} target="_blank" rel="noopener noreferrer" />}
              >
                <Navigation className="w-5 h-5" /> Построить маршрут
              </Button>
              <Button
                size="lg"
                nativeButton={false}
                className="rounded-2xl text-base px-6 h-12 gap-2"
                render={<a href={`tel:${BUSINESS.phone.replace(/-/g, "")}`} />}
              >
                <Phone className="w-5 h-5" /> Позвонить
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
