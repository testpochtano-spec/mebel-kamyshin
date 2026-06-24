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
    slug: "mebel-katalog",
    title: "Актуальный каталог подбора мебели",
    maker: "МЕБЕЛЬ - Камышин",
    href: "/catalogs/mebel-katalog.pdf",
    desc: "Общий каталог направлений: матрасы, мягкая мебель, кухни, корпусная мебель, столешницы, столы и мойки. Без цен - для расчёта по заявке.",
    format: "PDF",
    size: "1.3 МБ",
    pages: 8,
    badge: "актуально",
  },
  {
    slug: "myagkaya-mebel",
    title: "Мягкая мебель: диваны и кресла",
    maker: "Комфорт мебель, Регина, Стиль и Комфорт",
    href: "/catalogs/divany.pdf",
    desc: "Направления по диванам, креслам, механизмам и обивкам. Цифровые фото фабрик ожидаются к августу.",
    format: "PDF",
    size: "445 КБ",
    pages: 3,
    badge: "фото к августу",
  },
  {
    slug: "matrasy-i-krovati",
    title: "Матрасы, кровати и товары для сна",
    maker: "Wellson, Doctor Sleep, DREAMSON, Меридиан",
    href: "/catalogs/krovati.pdf",
    desc: "Подбор матрасов по жесткости, размеру, наполнению и нагрузке. Кровати и основания подбираются комплектом.",
    format: "PDF",
    size: "575 КБ",
    pages: 4,
    badge: "сон",
  },
  {
    slug: "kuhni-korpus-stoleshnitsy",
    title: "Кухни, корпусная мебель и столешницы",
    maker: "ДСВ, BTS, STEND, СКИФ, Кедр и другие",
    href: "/catalogs/korpus.pdf",
    desc: "Кухни, шкафы, гостиные, прихожие, столешницы, столы, стулья, мойки и камень под заказ.",
    format: "PDF",
    size: "623 КБ",
    pages: 5,
    badge: "под заказ",
  },
];

export const MODEL_ARCHIVES: CatalogResource[] = [];

export const EXTERNAL_CATALOGS: CatalogResource[] = [
  {
    title: "Doctor Sleep: каталог продукции 2026",
    maker: "Doctor Sleep",
    href: "https://doctor-sleep.ru/upload/iblock/275/mx4zn6n1mo1kfjc5fsv1pcwf0vkqomef.pdf",
    desc: "Официальный PDF-каталог матрасов, топперов и подушек производителя.",
    format: "PDF",
    pages: 39,
    external: true,
    badge: "официальный PDF",
  },
  {
    title: "ДСВ: каталог кухонь 2025",
    maker: "ДСВ",
    href: "https://dsv-mebel.ru/wp-content/uploads/2025/09/dsv_0925_3.pdf",
    desc: "Официальный PDF по кухонным гарнитурам и модулям ДСВ.",
    format: "PDF",
    external: true,
    badge: "официальный PDF",
  },
  {
    title: "ДСВ: каталог Gola 2026",
    maker: "ДСВ",
    href: "https://dsv-mebel.ru/wp-content/uploads/2026/03/gola-sajt.pdf",
    desc: "Официальный PDF по кухням с интегрированным профилем Gola.",
    format: "PDF",
    pages: 13,
    external: true,
    badge: "официальный PDF",
  },
  {
    title: "ДСВ: корпусная мебель 2024",
    maker: "ДСВ",
    href: "https://dsv-mebel.ru/wp-content/uploads/2025/01/katalog-korpus_2024-final2_compressed.pdf",
    desc: "Официальный PDF-каталог корпусной мебели ДСВ.",
    format: "PDF",
    external: true,
    badge: "официальный PDF",
  },
  {
    title: "ДСВ: кровати и диваны 2025",
    maker: "ДСВ",
    href: "https://dsv-mebel.ru/wp-content/uploads/2025/09/krovati-i-divany-listovka.pdf",
    desc: "Официальная PDF-листовка по кроватям и диванам.",
    format: "PDF",
    pages: 8,
    external: true,
  },
  {
    title: "ДСВ: столы и стулья 2025",
    maker: "ДСВ",
    href: "https://dsv-mebel.ru/wp-content/uploads/2025/09/stoly-i-stulya-ispravlennyj3.pdf",
    desc: "Официальная PDF-листовка по столам и стульям.",
    format: "PDF",
    pages: 8,
    external: true,
  },
  {
    title: "Кедр: страница скачивания каталогов",
    maker: "Кедр",
    href: "https://kedrcompany.ru/stoleshnitsy/download-catalog/",
    desc: "Официальная страница с PDF-каталогами декоров, столешниц, стеновых панелей и компакт-плиты.",
    format: "Онлайн",
    external: true,
    badge: "PDF на сайте",
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
    title: "GranFest: каталог моек и смесителей",
    maker: "GranFest",
    href: "https://granfest.ru/catalog/moyki_kukhonnye/",
    desc: "Официальный онлайн-каталог кухонных моек, смесителей и аксессуаров.",
    format: "Онлайн",
    external: true,
  },
  {
    title: "BTS: каталог продукции",
    maker: "BTS",
    href: "https://btsmebel.ru/catalog/",
    desc: "Официальный онлайн-каталог корпусной мебели, кухонь, гостиных, спален, прихожих и столов.",
    format: "Онлайн",
    external: true,
  },
];

export const FEATURED_CATALOGS = FACTORY_CATALOGS.slice(0, 4);

export const VIEWABLE_CATALOGS = FACTORY_CATALOGS.filter((item) => item.slug);
