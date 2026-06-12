export type Manufacturer = {
  name: string;
  subtitle: string;
  categories: string[];
  logo?: string;
  catalogSlug?: string;
  website?: string;
  note?: string;
};

export const MANUFACTURERS: Manufacturer[] = [
  {
    name: "ВВ-Мебель",
    subtitle: "Стулья, столы и мебельные позиции по каталогу",
    categories: ["Каталог PDF", "Мебель для дома"],
    logo: "/brands/vv-mebel.png",
    catalogSlug: "vv-mebel-2025-2026",
    note: "Каталог 2025-2026 загружен на сайт",
  },
  {
    name: "Zaron",
    subtitle: "Корпусная мебель и отдельные модельные архивы",
    categories: ["Каталог PDF", "ZIP-архивы"],
    logo: "/brands/zaron.png",
    catalogSlug: "zaron-2025-2026",
    note: "Есть каталог и архивы по моделям",
  },
  {
    name: "Памир",
    subtitle: "Модульная корпусная мебель, гостиные, прихожие, спальни",
    categories: ["Каталог PDF", "Модульные системы"],
    logo: "/brands/pamir.png",
    catalogSlug: "pamir-2025-2026",
    website: "https://pamirmebel.ru/",
    note: "Официальный сайт содержит каталог и раздел скачивания",
  },
  {
    name: "Стендмебель",
    subtitle: "Корпусная мебель, кухни и коллекции для дома",
    categories: ["Каталог PDF", "Корпусная мебель"],
    logo: "/brands/stendmebel.png",
    catalogSlug: "stendmebel-korpus-2026",
    website: "https://stendmebel.ru/",
    note: "На официальном сайте есть каталог мебели 2026",
  },
  {
    name: "СКИФ",
    subtitle: "Декоры для столешниц, мебельных щитов, ПЛП, HPL и кромки",
    categories: ["Декоры", "Онлайн-каталог"],
    logo: "/brands/skif.png",
    website: "https://skifltd.com/katalog-dekorov/",
    note: "Открытый онлайн-каталог декоров",
  },
  {
    name: "MC Style",
    subtitle: "Публичные материалы поставщика",
    categories: ["Онлайн-документ"],
    logo: "/brands/mc-style.png",
    website: "https://bitrix24public.com/mcstyle.bitrix24.ru/docs/pub/085d783322c638b62b5eebb75b4a7afa/default/?&",
    note: "Внешний публичный документ",
  },
  {
    name: "Askona",
    subtitle: "Матрасы, кровати, диваны и товары для сна",
    categories: ["Матрасы", "Кровати", "Диваны"],
    logo: "/brands/askona.svg",
    website: "https://www.askona.ru/",
    note: "Официальный каталог на сайте бренда",
  },
  {
    name: "Vega",
    subtitle: "Ортопедические матрасы и товары для сна",
    categories: ["Матрасы"],
    logo: "/brands/vega.png",
    note: "Бренд указан в материалах магазина",
  },
  {
    name: "Березка",
    subtitle: "Матрасы и решения для сна",
    categories: ["Матрасы"],
    logo: "/brands/berezka.svg",
    note: "Бренд указан в материалах магазина",
  },
  {
    name: "ФММ",
    subtitle: "Фабрика мягкой мебели",
    categories: ["Диваны", "Мягкая мебель"],
    logo: "/brands/fmm.png",
    note: "Бренд указан в материалах магазина",
  },
];
