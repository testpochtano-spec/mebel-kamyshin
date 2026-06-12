"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BUSINESS } from "@/data/business";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/delivery", label: "Доставка" },
  { href: "/about", label: "О магазине" },
  { href: "/contacts", label: "Контакты" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading text-xl font-bold text-foreground no-underline tracking-tight">
          МЕБЕЛЬ
          <span className="text-primary block text-xs font-sans font-medium -mt-0.5">Камышин</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors no-underline ${
                pathname === href ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${BUSINESS.phone.replace(/-/g, "")}`}
            className="hidden lg:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors no-underline"
          >
            <Phone className="w-4 h-4" />
            {BUSINESS.phone}
          </a>

          <Button
            size="sm"
            nativeButton={false}
            className="hidden sm:inline-flex rounded-xl gap-1.5"
            render={<Link href="/catalog#request" />}
          >
            <MessageCircle className="w-4 h-4" />
            Подбор
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Меню"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-white px-4 py-4 flex flex-col gap-3">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium no-underline ${
                pathname === href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {label}
            </Link>
          ))}
          <a href={`tel:${BUSINESS.phone.replace(/-/g, "")}`} className="text-sm text-primary font-medium no-underline flex items-center gap-1.5">
            <Phone className="w-4 h-4" /> {BUSINESS.phone}
          </a>
          <Link
            href="/catalog#request"
            onClick={() => setOpen(false)}
            className="text-sm font-medium text-primary no-underline flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4" /> Получить подбор
          </Link>
        </nav>
      )}
    </header>
  );
}
