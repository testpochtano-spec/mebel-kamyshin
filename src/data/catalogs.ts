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
    size: "444 КБ",
    pages: 4,
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
    size: "622 КБ",
    pages: 5,
    badge: "под заказ",
  },
];

export const MODEL_ARCHIVES: CatalogResource[] = [];

export const EXTERNAL_CATALOGS: CatalogResource[] = [
  {
    title: "СКИФ: каталог декоров",
    maker: "Фабрика СКИФ",
    href: "https://skifltd.com/katalog-dekorov/",
    desc: "Онлайн-каталог декоров для столешниц, мебельных щитов, ПЛП, HPL и кромки.",
    format: "Онлайн",
    external: true,
  },
];

export const FEATURED_CATALOGS = FACTORY_CATALOGS.slice(0, 4);

export const VIEWABLE_CATALOGS = FACTORY_CATALOGS.filter((item) => item.slug);
