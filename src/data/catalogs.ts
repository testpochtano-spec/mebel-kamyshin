export type CatalogResource = {
  slug?: string;
  title: string;
  maker: string;
  href: string;
  desc: string;
  format: "PDF" | "ZIP" | "Онлайн" | "Диск";
  cover?: string;
  size?: string;
  pages?: number;
  external?: boolean;
  badge?: string;
};

export const FACTORY_CATALOGS: CatalogResource[] = [
  {
    slug: "vv-mebel-2025-2026",
    title: "Каталог ВВ-Мебель 2025-2026",
    maker: "ВВ-Мебель",
    href: "/catalogs/factory/vv-mebel-2025-2026.pdf",
    cover: "/catalogs/covers/vv-mebel-2025-2026.png",
    desc: "Актуальный PDF-каталог мебели от поставщика.",
    format: "PDF",
    size: "8.8 МБ",
    pages: 20,
    badge: "2025-2026",
  },
  {
    slug: "zaron-2025-2026",
    title: "Каталог мебели Zaron 2025-2026",
    maker: "Zaron",
    href: "/catalogs/factory/zaron-2025-2026.pdf",
    cover: "/catalogs/covers/zaron-2025-2026.png",
    desc: "Большой каталог коллекции 2025-2026 по корпусной мебели.",
    format: "PDF",
    size: "38 МБ",
    pages: 92,
    badge: "Корпусная мебель",
  },
  {
    slug: "pamir-2025-2026",
    title: "Памир Мебель: каталог 2025-2026",
    maker: "Памир",
    href: "/catalogs/factory/pamir-katalog-1-2025-2026.pdf",
    cover: "/catalogs/covers/pamir-katalog-1-2025-2026.png",
    desc: "Основной каталог фабрики с модульными системами и корпусной мебелью.",
    format: "PDF",
    size: "9.4 МБ",
    pages: 115,
    badge: "Основной",
  },
  {
    slug: "pamir-elton",
    title: "Памир Мебель: Эльтон",
    maker: "Памир",
    href: "/catalogs/factory/pamir-katalog-2-elton.pdf",
    cover: "/catalogs/covers/pamir-katalog-2-elton.png",
    desc: "Отдельный каталог модульной системы «Эльтон».",
    format: "PDF",
    size: "5.8 МБ",
    pages: 12,
    badge: "Модульная система",
  },
  {
    slug: "pamir-dopolnitelnyy",
    title: "Памир Мебель: дополнительный каталог",
    maker: "Памир",
    href: "/catalogs/factory/pamir-katalog-3.pdf",
    cover: "/catalogs/covers/pamir-katalog-3.png",
    desc: "Короткий PDF с дополнительными материалами фабрики.",
    format: "PDF",
    size: "9.1 МБ",
    pages: 4,
  },
  {
    slug: "stendmebel-korpus-2026",
    title: "Стендмебель: корпусная мебель 2026",
    maker: "Стендмебель",
    href: "/catalogs/factory/stendmebel-korpus-2026.pdf",
    cover: "/catalogs/covers/stendmebel-korpus-2026.png",
    desc: "Каталог корпусной мебели на 2026 год.",
    format: "PDF",
    size: "32 МБ",
    pages: 109,
    badge: "2026",
  },
];

export const MODEL_ARCHIVES: CatalogResource[] = [
  {
    title: "Гостиная «Женева»",
    maker: "Zaron",
    href: "/catalogs/model-archives/zaron-gost-zheneva.zip",
    desc: "Архив материалов по конкретной модели.",
    format: "ZIP",
    size: "7.7 МБ",
  },
  {
    title: "Кухня «Роса 2.0»",
    maker: "Zaron",
    href: "/catalogs/model-archives/zaron-kuhnya-rosa-2-0.zip",
    desc: "Архив материалов по кухонной модели.",
    format: "ZIP",
    size: "14 МБ",
  },
  {
    title: "Модульная система «Алисия»",
    maker: "Zaron",
    href: "/catalogs/model-archives/zaron-ms-alisiya-kraft-sery.zip",
    desc: "Материалы по системе в цвете крафт серый.",
    format: "ZIP",
    size: "32 МБ",
  },
  {
    title: "Прихожая «Алисия»",
    maker: "Zaron",
    href: "/catalogs/model-archives/zaron-prihozhaya-alisiya-kraft-sery.zip",
    desc: "Архив по прихожей в цвете крафт серый.",
    format: "ZIP",
    size: "2.1 МБ",
  },
  {
    title: "Прихожая «Весна-2»",
    maker: "Zaron",
    href: "/catalogs/model-archives/zaron-prihozhaya-vesna-2-kraft-sery-kashemir.zip",
    desc: "Архив по прихожей в цветах крафт серый и кашемир.",
    format: "ZIP",
    size: "3.3 МБ",
  },
  {
    title: "Шкаф «Норден 2000»",
    maker: "Zaron",
    href: "/catalogs/model-archives/zaron-shkaf-norden-2000-bely-shagren.zip",
    desc: "Архив по шкафу в цвете белый шагрень.",
    format: "ZIP",
    size: "1.6 МБ",
  },
];

export const EXTERNAL_CATALOGS: CatalogResource[] = [
  {
    title: "Общий архив каталогов",
    maker: "Яндекс Диск",
    href: "https://disk.360.yandex.ru/d/TXoGgxbXvvlBhw",
    desc: "Внешняя папка с материалами поставщиков, которые можно смотреть и скачивать отдельно.",
    format: "Диск",
    external: true,
  },
  {
    title: "СКИФ: каталог декоров",
    maker: "Фабрика СКИФ",
    href: "https://skifltd.com/katalog-dekorov/",
    desc: "Онлайн-каталог декоров для столешниц, мебельных щитов, ПЛП, HPL и кромки.",
    format: "Онлайн",
    external: true,
  },
  {
    title: "MC Style: публичный документ",
    maker: "MC Style",
    href: "https://bitrix24public.com/mcstyle.bitrix24.ru/docs/pub/085d783322c638b62b5eebb75b4a7afa/default/?&",
    desc: "Внешний публичный документ поставщика. Открывается в отдельной вкладке.",
    format: "Онлайн",
    external: true,
  },
];

export const FEATURED_CATALOGS = FACTORY_CATALOGS.slice(0, 4);

export const VIEWABLE_CATALOGS = FACTORY_CATALOGS.filter((item) => item.slug);
