"use client";

import { BUSINESS } from "@/data/business";
import { Award, BookOpen, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { asset } from "@/lib/utils";

export function CertificatesSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Certificates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-8 h-8 text-secondary" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Грамоты и сертификаты
            </h2>
          </div>
          <p className="text-muted-foreground text-lg mb-10">
            За многолетний стаж работы мы накопили благодарности и награды от партнёров и администрации города
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {BUSINESS.certificates.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] bg-background rounded-2xl border border-border flex flex-col items-center justify-center p-4 hover:border-primary/30 hover:shadow-lg transition-all">
                  <Award className="w-10 h-10 text-secondary/60 mb-3 group-hover:text-secondary transition-colors" />
                  <p className="text-xs text-center text-muted-foreground font-medium leading-tight">
                    {cert.title}
                  </p>
                  <span className="text-xs text-muted-foreground/60 mt-1">{cert.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Catalogs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Каталоги мебели
            </h2>
          </div>
          <p className="text-muted-foreground text-lg mb-10">
            Ознакомьтесь с полным ассортиментом в наших каталогах
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {BUSINESS.catalogs.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-background rounded-2xl border border-border p-5 flex items-center justify-between hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground text-sm">{cat.title}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-xl gap-1 text-muted-foreground"
                  render={<a href={asset(cat.file)} target="_blank" rel="noopener noreferrer" />}
                  nativeButton={false}
                >
                  <Download className="w-4 h-4" /> PDF
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
