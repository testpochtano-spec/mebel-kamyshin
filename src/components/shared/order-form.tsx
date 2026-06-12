"use client";

import { useMemo, useState } from "react";
import { BUSINESS } from "@/data/business";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Send, CheckCircle, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface OrderFormProps {
  title?: string;
  subtitle?: string;
  context?: string;
  defaultMessage?: string;
  onSuccess?: () => void;
}

function formatPhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("8")) digits = digits.slice(1);
  if (digits.startsWith("7")) digits = digits.slice(1);
  digits = digits.slice(0, 10);

  let out = "+7";
  if (digits.length > 0) out += "-" + digits.slice(0, 3);
  if (digits.length >= 4) out += "-" + digits.slice(3, 6);
  if (digits.length >= 7) out += "-" + digits.slice(6, 8);
  if (digits.length >= 9) out += "-" + digits.slice(8, 10);
  return out;
}

function buildMailtoUrl(subject: string, body: string) {
  return `mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function OrderForm({
  title = "Получить расчёт",
  subtitle,
  context,
  defaultMessage = "",
  onSuccess,
}: OrderFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [emailUrl, setEmailUrl] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    message: defaultMessage,
  });

  const phoneHref = useMemo(() => `tel:${BUSINESS.phone.replace(/\D/g, "")}`, []);

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, phone: formatPhone(e.target.value) });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const subject = context
      ? `Заявка на расчёт: ${context}`
      : "Заявка на подбор мебели";
    const lines = [
      "Здравствуйте! Хочу получить расчёт по мебели.",
      context ? `Интересует: ${context}` : "",
      form.name ? `Имя: ${form.name}` : "",
      form.phone ? `Телефон: ${form.phone}` : "",
      form.address ? `Город/адрес доставки: ${form.address}` : "",
      form.message ? `Пожелания: ${form.message}` : "",
    ].filter(Boolean);

    const url = buildMailtoUrl(subject, lines.join("\n"));
    setEmailUrl(url);
    setSubmitted(true);
    onSuccess?.();
    window.location.href = url;
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl border border-border p-8 text-center"
      >
        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="font-heading text-xl font-bold text-foreground mb-2">Письмо с заявкой подготовлено</h3>
        <p className="text-muted-foreground text-sm mb-6">
          Мы открыли почтовое приложение с готовым письмом на {BUSINESS.email}. Проверьте текст и отправьте заявку.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            nativeButton={false}
            className="rounded-2xl gap-2"
            render={<a href={emailUrl} />}
          >
            <Mail className="w-5 h-5" />
            Открыть письмо
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            className="rounded-2xl gap-2"
            render={<a href={phoneHref} />}
          >
            <Phone className="w-5 h-5" />
            Позвонить
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-4">{BUSINESS.deliveryNote}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-border p-6"
    >
      {title ? <h3 className="font-heading text-xl font-bold text-foreground mb-1">{title}</h3> : null}
      {subtitle && <p className="text-sm text-muted-foreground mb-6">{subtitle}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Ваше имя</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Например, Иван"
            className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Номер телефона</label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={handlePhoneChange}
            placeholder="+7-___-___-__-__"
            className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Город или адрес доставки <span className="text-muted-foreground font-normal">(если уже знаете)</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Камышин, район или адрес"
              className="w-full rounded-xl border border-border pl-9 pr-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Что хотите подобрать</label>
          <textarea
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Например: угловой диван, спальное место, серый цвет, ширина до 250 см..."
            className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
          />
        </div>

        <Button type="submit" size="lg" className="w-full rounded-2xl h-12 text-base gap-2">
          <Send className="w-5 h-5" />
          Подготовить письмо с заявкой
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Письмо откроется в вашем почтовом приложении. Перед отправкой можно проверить и изменить текст.
        </p>
      </form>
    </motion.div>
  );
}
