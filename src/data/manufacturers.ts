export type ManufacturerGroup = {
  id: string;
  title: string;
  subtitle: string;
  categories: string[];
  suppliers: string[];
  note: string;
  accent: "primary" | "gold" | "warm" | "stone" | "soft";
  website?: string;
};

export type PartnerBrand = {
  name: string;
  category: string;
  image?: string;
  tone: "primary" | "gold" | "warm" | "stone" | "soft";
};

export const PARTNER_BRANDS: PartnerBrand[] = [
  { name: "Doctor Sleep", category: "матрасы", tone: "soft" },
  { name: "Wellson", category: "матрасы", tone: "soft" },
  { name: "DREAMSON", category: "матрасы", tone: "soft" },
  { name: "Меридиан", category: "матрасы", tone: "soft" },
  { name: "Комфорт мебель", category: "мягкая мебель", tone: "warm" },
  { name: "Регина", category: "мягкая мебель", tone: "warm" },
  { name: "ДСВ", category: "кухни и корпусная мебель", tone: "primary" },
  { name: "BTS", category: "корпусная мебель", tone: "primary" },
  { name: "STEND", category: "кухни и корпусная мебель", image: "/brands/stendmebel.png", tone: "primary" },
  { name: "Micon", category: "кухни и корпусная мебель", tone: "primary" },
  { name: "DOMANI", category: "корпусная мебель", tone: "gold" },
  { name: "Текс", category: "кухни и корпусная мебель", tone: "gold" },
  { name: "СКИФ", category: "столешницы", image: "/brands/skif.png", tone: "stone" },
  { name: "Кедр", category: "столешницы", tone: "stone" },
  { name: "GranFest", category: "мойки и смесители", tone: "stone" },
  { name: "MARRBAXX", category: "мойки и камень", tone: "stone" },
  { name: "MAXSTONE", category: "камень", tone: "stone" },
  { name: "KLADOV", category: "столы и стулья", tone: "warm" },
];

export const MANUFACTURER_GROUPS: ManufacturerGroup[] = [
  {
    id: "mattresses",
    title: "Матрасы и товары для сна",
    subtitle: "Подбор по размеру, жесткости, наполнению и бюджету",
    categories: ["Матрасы", "Кровати", "Сон"],
    suppliers: ["Wellson", "Doctor Sleep", "DREAMSON", "Меридиан"],
    note: "Работаем с новыми предложениями по матрасам вместо прежних брендов.",
    accent: "soft",
  },
  {
    id: "soft-furniture",
    title: "Мягкая мебель",
    subtitle: "Диваны, кресла, модульные решения и обивки под интерьер",
    categories: ["Диваны", "Кресла", "Обивки"],
    suppliers: ["Волгоград Комфорт мебель", "Регина", "Стиль и Комфорт"],
    note: "Цифровые фото от фабрик ожидаются к августу. До этого подбираем по образцам, каталогам и консультации.",
    accent: "warm",
  },
  {
    id: "countertops",
    title: "Столешницы и декоры",
    subtitle: "Декоры для кухонь, рабочих поверхностей и мебельных щитов",
    categories: ["Столешницы", "Декоры", "HPL"],
    suppliers: ["СКИФ", "Кедр"],
    note: "СКИФ - Санкт-Петербург, Кедр - Воронежская область. Декоры подбираем под фасады и интерьер.",
    accent: "stone",
    website: "https://skifltd.com/katalog-dekorov/",
  },
  {
    id: "kitchens",
    title: "Кухни",
    subtitle: "Модульные кухни и комплекты под размеры помещения",
    categories: ["Кухни", "Фасады", "Модули"],
    suppliers: ["ДСВ", "COLA ДСВ", "Форес", "DARS", "Альбина", "Стиль", "Текс", "Диал", "STEND", "Micon", "BTS"],
    note: "Подбор начинается с размеров кухни, желаемого цвета фасадов и нужной комплектации.",
    accent: "primary",
  },
  {
    id: "cabinet",
    title: "Корпусная мебель",
    subtitle: "Шкафы, стенки, прихожие, комоды, спальни и системы хранения",
    categories: ["Шкафы", "Гостиные", "Прихожие"],
    suppliers: [
      "BTS",
      "Харон",
      "Мебелони МБ",
      "СТ Стенд мебель",
      "Вся мебель",
      "STEND",
      "Стиль",
      "Micon",
      "Текс",
      "DOMANI",
      "Диал",
      "Альбина",
      "Росток мебель",
    ],
    note: "Подбираем готовые решения и модульные системы под комнату, цвет и бюджет.",
    accent: "gold",
  },
  {
    id: "tables",
    title: "Столы, стулья и кухонные марки",
    subtitle: "Обеденные группы, мойки, камень и комплектующие",
    categories: ["Столы", "Стулья", "Мойки", "Камень"],
    suppliers: ["KLADOV", "GranFest", "PREMIAL", "MARRBAXX", "MAXSTONE"],
    note: "Фабричные столы, стулья, мойки и материалы можно подобрать вместе с кухней.",
    accent: "stone",
  },
];

export const MANUFACTURERS = MANUFACTURER_GROUPS.flatMap((group) =>
  group.suppliers.map((name) => ({
    name,
    subtitle: group.title,
    categories: group.categories,
    note: group.note,
  })),
);
