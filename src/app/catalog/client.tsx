"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { BUSINESS } from "@/data/business";
import {
  EXTERNAL_CATALOGS,
  FACTORY_CATALOGS,
  MODEL_ARCHIVES,
  type CatalogResource,
} from "@/data/catalogs";
import { ProductCard } from "@/components/catalog/product-card";
import { Button } from "@/components/ui/button";
import { OrderForm } from "@/components/shared/order-form";
import { asset } from "@/lib/utils";
import {
  Archive,
  BookOpen,
  Download,
  Eye,
  ExternalLink,
  FileText,
  FolderOpen,
  MessageCircle,
  Phone,
} from "lucide-react";

function updateCategory(category: string) {
  const path = category === "all" ? "/catalog" : `/catalog?category=${category}`;
  window.history.pushState(null, "", asset(path));
}

function catalogHref(item: CatalogResource) {
  if (item.format === "PDF" && item.slug && !item.external) {
    return asset(`/catalog-viewer/${item.slug}`);
  }
  return item.external ? item.href : asset(item.href);
}

function CatalogCard({ item, compact = false }: { item: CatalogResource; compact?: boolean }) {
  const Icon = item.format === "ZIP" ? Archive : item.external ? ExternalLink : FileText;
  const meta = [item.pages ? `${item.pages} стр.` : null, item.size].filter(Boolean).join(" • ");
  const actionLabel = item.format === "PDF" && !item.external ? "Открыть" : item.format;

  return (
    <a
      href={catalogHref(item)}
      target={item.external || item.format === "ZIP" ? "_blank" : undefined}
      rel={item.external || item.format === "ZIP" ? "noopener noreferrer" : undefined}
      download={!item.external && item.format === "ZIP" ? true : undefined}
      className={`group overflow-hidden rounded-2xl border border-border bg-white no-underline transition-all hover:border-primary/35 hover:shadow-md ${
        compact ? "p-4" : "p-5"
      }`}
    >
      {item.cover ? (
        <div className={`mb-4 rounded-xl border border-border bg-background overflow-hidden ${compact ? "h-40" : "h-64"}`}>
          <img
            src={asset(item.cover)}
            alt={`Обложка: ${item.title}`}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      ) : null}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-primary">{item.maker}</span>
              {item.badge ? (
                <span className="rounded-full bg-secondary/15 text-secondary-foreground px-2 py-0.5 text-[11px] font-medium">
                  {item.badge}
                </span>
              ) : null}
            </div>
            <span className="mt-1 block text-sm font-semibold text-foreground leading-snug">{item.title}</span>
            <span className="mt-1 block text-xs text-muted-foreground leading-relaxed">{item.desc}</span>
            {meta ? <span className="mt-2 block text-xs text-muted-foreground">{meta}</span> : null}
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs font-medium text-foreground shrink-0 group-hover:border-primary/30 group-hover:text-primary">
          {actionLabel}
          {item.external ? (
            <ExternalLink className="w-3.5 h-3.5" />
          ) : item.format === "PDF" ? (
            <Eye className="w-3.5 h-3.5" />
          ) : (
            <Download className="w-3.5 h-3.5" />
          )}
        </div>
      </div>
    </a>
  );
}

export function CatalogPageClient() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "all";

  const filtered = useMemo(() => {
    if (category === "all") return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === category);
  }, [category]);

  const activeCategoryName = CATEGORIES.find((c) => c.id === category)?.name || "Все примеры";

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start mb-14">
        <div>
          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-medium mb-5">
            Витрина и каталоги фабрик
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
            Подберём мебель под ваш дом
          </h1>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed max-w-2xl">
            На сайте собраны примеры мебели из магазина и электронные каталоги. Выберите направление,
            отправьте заявку — мы уточним наличие, цену, доставку и сроки изготовления.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              nativeButton={false}
              className="rounded-2xl text-base px-7 h-12 gap-2"
              render={<a href="#request" />}
            >
              <MessageCircle className="w-5 h-5" />
              Получить расчёт
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              className="rounded-2xl text-base px-7 h-12 gap-2"
              render={<a href={`tel:${BUSINESS.phone.replace(/\D/g, "")}`} />}
            >
              <Phone className="w-5 h-5" />
              Позвонить
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-border p-5 md:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground">Реальные каталоги</h2>
              <p className="text-sm text-muted-foreground">PDF, архивы моделей и внешние ссылки</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              ["6", "PDF-каталогов"],
              ["352", "страницы"],
              ["6", "ZIP-архивов"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl bg-background border border-border p-3">
                <span className="block font-heading text-2xl font-bold text-foreground">{value}</span>
                <span className="block text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Вместо выдуманного общего файла на сайте теперь лежат материалы поставщиков: ВВ-Мебель, Zaron,
            Памир, Стендмебель и внешние каталоги декоров.
          </p>
        </div>
      </div>

      <section aria-labelledby="catalogs-heading" className="mb-16">
        <div className="flex items-end justify-between gap-5 mb-6">
          <div>
            <h2 id="catalogs-heading" className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Каталоги фабрик
            </h2>
            <p className="mt-2 text-muted-foreground">
              Откройте PDF, выберите модель или пришлите название в заявку на расчёт.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {FACTORY_CATALOGS.map((item) => (
            <CatalogCard key={item.href} item={item} />
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FolderOpen className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">Архивы моделей</h3>
                <p className="text-sm text-muted-foreground">ZIP-файлы Zaron по отдельным позициям</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MODEL_ARCHIVES.map((item) => (
                <CatalogCard key={item.href} item={item} compact />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <ExternalLink className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">Внешние материалы</h3>
                <p className="text-sm text-muted-foreground">Онлайн-каталоги и публичные папки поставщиков</p>
              </div>
            </div>
            <div className="space-y-3">
              {EXTERNAL_CATALOGS.map((item) => (
                <CatalogCard key={item.href} item={item} compact />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="examples-heading">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
          <div>
            <h2 id="examples-heading" className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Примеры мебели
            </h2>
            <p className="mt-2 text-muted-foreground">
              Сейчас выбрано: {activeCategoryName}. Цены и наличие уточняются перед заказом.
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat.id}
                variant={category === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => updateCategory(cat.id)}
                className="rounded-full text-sm"
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-border">
            <p className="text-muted-foreground text-lg">По этой категории пока нет примеров на сайте.</p>
            <Button className="mt-5 rounded-2xl" onClick={() => updateCategory("all")}>
              Смотреть все примеры
            </Button>
          </div>
        )}
      </section>

      <section id="request" className="mt-16 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start scroll-mt-24">
        <div className="rounded-3xl bg-primary text-white p-8 md:p-10">
          <h2 className="font-heading text-2xl md:text-3xl font-bold">Не нашли точную модель?</h2>
          <p className="mt-4 text-white/80 leading-relaxed">
            Отправьте, что хотите подобрать: диван, матрас, кровать, шкаф или мебель по каталогу.
            Можно указать название модели из PDF в заявке.
          </p>
          <div className="mt-6 space-y-3 text-sm text-white/85">
            <p>• уточним наличие в магазине и на фабрике</p>
            <p>• рассчитаем цену, доставку и сроки</p>
            <p>• подберём ткань, цвет и размер под интерьер</p>
          </div>
        </div>

        <OrderForm
          title="Заявка на подбор мебели"
          subtitle="Заполните короткую форму — она откроется готовым письмом на почту магазина."
          defaultMessage="Хочу подобрать мебель. Интересует:"
        />
      </section>
    </div>
  );
}
