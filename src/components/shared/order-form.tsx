"use client";

import { useState, useRef, useEffect, useMemo, type KeyboardEvent } from "react";
import { BUSINESS } from "@/data/business";
import { Button } from "@/components/ui/button";
import { Phone, Send, CheckCircle, MapPin, Hash } from "lucide-react";
import { motion } from "framer-motion";

interface OrderFormProps {
  title?: string;
  subtitle?: string;
  onSuccess?: () => void;
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  let out = "+7";
  if (digits.length > 1) { out += "-" + digits.slice(1, 4); }
  if (digits.length >= 5) { out += "-" + digits.slice(4, 7); }
  if (digits.length >= 8) { out += "-" + digits.slice(7, 9); }
  if (digits.length >= 10) { out += "-" + digits.slice(9, 11); }
  return out;
}

function generateOrderNumber(): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `ЗАКАЗ-${day}${month}-${rand}`;
}

interface Suggestion {
  value: string;
  data: {
    postal_code?: string;
    city?: string;
    street?: string;
    house?: string;
    region?: string;
    geo_lat?: string;
    geo_lon?: string;
  };
}

const DADATA_TOKEN = process.env.NEXT_PUBLIC_DADATA_TOKEN || "";

export function OrderForm({ title = "Оформление заказа", subtitle, onSuccess }: OrderFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", description: "" });
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const addrRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const orderNumber = useMemo(() => generateOrderNumber(), []);

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, "");
    if (digits.length > 11) return;
    setForm({ ...form, phone: formatPhone(raw) });
  }

  useEffect(() => {
    if (!DADATA_TOKEN) return;
    if (form.address.length < 3) { setSuggestions([]); return; }

    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetch("https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Token " + DADATA_TOKEN,
        },
        body: JSON.stringify({ query: form.address, count: 5 }),
        signal: controller.signal,
      })
        .then((r) => r.json())
        .then((data) => {
          setSuggestions(data.suggestions || []);
          setActiveIdx(-1);
        })
        .catch(() => {});
    }, 300);

    return () => { clearTimeout(timer); controller.abort(); };
  }, [form.address]);

  function pickSuggestion(s: Suggestion) {
    setForm({ ...form, address: s.value });
    setSuggestions([]);
    addrRef.current?.blur();
  }

  function handleAddrKeyDown(e: KeyboardEvent) {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIdx >= 0) pickSuggestion(suggestions[activeIdx]);
    } else if (e.key === "Escape") {
      setSuggestions([]);
    }
  }

  function handleAddrBlur() {
    blurTimeout.current = setTimeout(() => setSuggestions([]), 200);
  }

  function handleAddrFocus() {
    if (blurTimeout.current) clearTimeout(blurTimeout.current);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    onSuccess?.();
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl border border-border p-8 text-center"
      >
        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="font-heading text-xl font-bold text-foreground mb-2">Заявка отправлена!</h3>

        <div className="inline-flex items-center gap-2 bg-background rounded-xl px-4 py-2 mb-4">
          <Hash className="w-4 h-4 text-muted-foreground" />
          <span className="font-mono text-sm font-medium text-foreground">{orderNumber}</span>
        </div>

        {form.email ? (
          <p className="text-muted-foreground text-sm mb-6">
            Мы свяжемся с вами в ближайшее время. Копия заявки отправлена на{" "}
            <span className="font-medium text-foreground">{form.email}</span>.
          </p>
        ) : (
          <p className="text-muted-foreground text-sm mb-6">
            Мы свяжемся с вами в ближайшее время. Если вопрос срочный — позвоните нам:
          </p>
        )}

        {!form.email && (
          <a
            href={`tel:${BUSINESS.phone.replace(/-/g, "")}`}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-semibold text-lg no-underline hover:bg-primary/90 transition-colors"
          >
            <Phone className="w-5 h-5" /> {BUSINESS.phone}
          </a>
        )}
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
          <label className="block text-sm font-medium text-foreground mb-1.5">ФИО</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Иванов Иван Иванович"
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
            Электронная почта <span className="text-muted-foreground font-normal">(необязательно)</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="ivanov@mail.ru"
            className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
          <p className="text-xs text-muted-foreground mt-1">Укажите email — отправим копию заявки с номером</p>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-foreground mb-1.5">Адрес доставки</label>
          <input
            ref={addrRef}
            type="text"
            required
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            onKeyDown={handleAddrKeyDown}
            onFocus={handleAddrFocus}
            onBlur={handleAddrBlur}
            placeholder="Начните вводить адрес..."
            autoComplete="off"
            className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
          {suggestions.length > 0 && (
            <ul
              ref={listRef}
              className="absolute top-full left-0 right-0 z-10 mt-1 bg-white border border-border rounded-xl shadow-lg overflow-hidden"
            >
              {suggestions.map((s, i) => (
                <li
                  key={s.value}
                  onMouseDown={() => pickSuggestion(s)}
                  className={`flex items-start gap-2 px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                    i === activeIdx ? "bg-primary/10 text-primary" : "hover:bg-background"
                  }`}
                >
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
                  <span>{s.value}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Описание заказа</label>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Опишите, какая мебель вас интересует: размеры, цвет, пожелания по материалам..."
            className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
          />
        </div>

        <Button type="submit" size="lg" className="w-full rounded-2xl h-12 text-base gap-2">
          <Send className="w-5 h-5" /> Отправить заявку
        </Button>

        <p className="text-xs text-muted-foreground text-center">{BUSINESS.deliveryNote}</p>
      </form>
    </motion.div>
  );
}
