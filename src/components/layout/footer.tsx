import Link from "next/link";
import { BUSINESS } from "@/data/business";
import { Phone, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-muted-foreground mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <Link href="/" className="font-heading text-xl font-bold text-white no-underline tracking-tight">
            МЕБЕЛЬ
            <span className="block text-xs font-sans font-medium text-muted-foreground">Камышин</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed max-w-xs">{BUSINESS.about}</p>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4">Разделы</h4>
          <nav className="flex flex-col gap-2.5 text-sm">
            <Link href="/catalog" className="hover:text-white transition-colors no-underline">Каталог мебели</Link>
            <Link href="/catalog?category=divan" className="hover:text-white transition-colors no-underline">Диваны</Link>
            <Link href="/catalog?category=matras" className="hover:text-white transition-colors no-underline">Матрасы</Link>
            <Link href="/catalog?category=krovat" className="hover:text-white transition-colors no-underline">Кровати</Link>
            <Link href="/delivery" className="hover:text-white transition-colors no-underline">Доставка и сборка</Link>
            <Link href="/about" className="hover:text-white transition-colors no-underline">О магазине</Link>
            <Link href="/contacts" className="hover:text-white transition-colors no-underline">Контакты</Link>
          </nav>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4">Контакты</h4>
          <div className="flex flex-col gap-3 text-sm">
            <a href={`tel:${BUSINESS.phone.replace(/-/g, "")}`} className="flex items-center gap-2 hover:text-white transition-colors no-underline">
              <Phone className="w-4 h-4" /> {BUSINESS.phone}
            </a>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{BUSINESS.address}</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{BUSINESS.hours}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-700 text-center py-6 text-xs text-muted-foreground">
        <p>ИП {BUSINESS.owner} &copy; {new Date().getFullYear()}</p>
        <p className="mt-1">Вся представленная на сайте информация носит ознакомительный характер и не является публичной офертой.</p>
      </div>
    </footer>
  );
}
