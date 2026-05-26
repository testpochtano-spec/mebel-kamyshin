"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Ruler, Truck, Star, ChevronRight, Percent } from "lucide-react";
import { BUSINESS } from "@/data/business";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const features = [
  { icon: Shield, text: "Срок службы 15 лет" },
  { icon: Star, text: "Более 100 клиентов" },
  { icon: Truck, text: "Доставка и сборка" },
  { icon: Ruler, text: "Индивидуальные размеры" },
];

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section ref={heroRef} className="relative min-h-[90vh] lg:min-h-[85vh] overflow-hidden bg-gradient-to-br from-[#F7F7F5] via-[#F0EFE9] to-[#E8E4D9]">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-xl"
            style={{
              width: 100 + i * 80,
              height: 100 + i * 80,
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Warm gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#F7F7F5] via-transparent to-transparent opacity-60" />

      <div className="relative max-w-[1600px] mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh]">
          {/* Left content */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary/5 text-primary text-sm font-medium px-5 py-2 rounded-full mb-6 border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Мебельный магазин в Камышине
              </span>
            </motion.div>

            <motion.h1
              className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#1a1a1a] leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Добротная мебель
              <span className="block bg-gradient-to-r from-[#0F8B6D] via-[#14997a] to-[#0F8B6D] bg-clip-text text-transparent mt-3">
                для вашего дома
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 text-lg lg:text-xl text-[#555555] leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Фабричная мягкая и корпусная мебель от лучших российских производителей.
              Диваны, кровати, матрасы — в наличии и на заказ.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <Button
                size="lg"
                nativeButton={false}
                className="group rounded-2xl text-base px-8 h-14 bg-gradient-to-r from-[#0F8B6D] to-[#14997a] hover:from-[#0d7a5f] hover:to-[#12886d] shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5"
                render={<Link href="/catalog" />}
              >
                Смотреть каталог
                <ChevronRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                nativeButton={false}
                className="rounded-2xl text-base px-8 h-14 border-2 hover:bg-primary/5 transition-all duration-300 hover:-translate-y-0.5"
                render={<Link href="/about" />}
              >
                О магазине
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>

            {/* Features */}
            <motion.div
              className="mt-10 flex flex-wrap gap-x-8 gap-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {features.map(({ icon: Icon, text }) => (
                <motion.span
                  key={text}
                  className="flex items-center gap-2.5 text-sm lg:text-base text-[#555555]"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border border-primary/20">
                    <Icon className="w-5 h-5 text-primary" />
                  </span>
                  {text}
                </motion.span>
              ))}
            </motion.div>

            {/* Discount badge */}
            <motion.div
              className="mt-6 flex items-start gap-3 bg-gradient-to-r from-secondary/15 to-secondary/5 text-secondary-foreground text-sm font-medium px-5 py-3 rounded-2xl border border-secondary/30 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#F4C542] to-[#e0b030] flex items-center justify-center shrink-0">
                <Percent className="w-4 h-4 text-[#1a1a1a]" />
              </div>
              <span className="leading-snug">Скидки пенсионерам, инвалидам и участникам СВО</span>
            </motion.div>
          </motion.div>

          {/* Right - Hero Image */}
          <motion.div
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="relative"
              style={{ y: y2 }}
            >
              {/* Main image container with layered depth */}
              <div className="relative aspect-[4/5] lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/20">
                {/* Background blur layer for depth */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Main store image with slow zoom */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 20,
                    ease: "easeOut",
                  }}
                >
                  <Image
                    src="/images/store.jpg"
                    alt="Магазин МЕБЕЛЬ в Камышине"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>

                {/* Warm overlay for premium feel */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/20" />

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.3)_100%)]" />

                {/* Floating light effect */}
                <motion.div
                  className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl"
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Hours card */}
                <motion.div
                  className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-white/30"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F4C542] to-[#e0b030] flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#1a1a1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-[#888888] uppercase tracking-wider font-medium">Режим работы</p>
                      <p className="text-lg font-bold text-[#1a1a1a]">{BUSINESS.hours}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Location badge */}
                <motion.div
                  className="absolute top-6 right-6 bg-white/95 backdrop-blur-xl rounded-xl px-4 py-2.5 shadow-xl border border-white/30"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium text-[#1a1a1a]">г. Камышин</span>
                  </div>
                </motion.div>
              </div>

              {/* Decorative elements behind image */}
              <motion.div
                className="absolute -top-8 -right-8 w-40 h-40 bg-gradient-to-br from-secondary/30 to-transparent rounded-full blur-2xl"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-2xl"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F7F7F5] to-transparent pointer-events-none"
        style={{ opacity }}
      />
    </section>
  );
}
