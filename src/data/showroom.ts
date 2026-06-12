export const SHOWROOM_PHOTOS = [
  {
    id: "sofas",
    title: "Диваны в зале",
    text: "Прямые, угловые и раскладные модели. Наличие и комплектацию уточняем перед заказом.",
    image: "/showroom/sofa-modular-showroom.jpg",
    href: "/catalog?category=divan",
  },
  {
    id: "mattresses",
    title: "Матрасы и кровати",
    text: "Подбор по размеру, жёсткости, основанию и бюджету.",
    image: "/showroom/mattress-showroom.jpg",
    href: "/catalog?category=matras",
  },
  {
    id: "cabinet",
    title: "Корпусная мебель",
    text: "Шкафы, комоды, стенки, кухни и решения для хранения.",
    image: "/showroom/wardrobe-set.jpg",
    href: "/catalog?category=korpusnaya",
  },
  {
    id: "materials",
    title: "Обивки и материалы",
    text: "Образцы тканей, фасадов и цветов можно посмотреть в магазине.",
    image: "/showroom/fabric-racks.jpg",
    href: "/catalog#request",
  },
] as const;

export const SHOWROOM_GALLERY = [
  { src: "/showroom/sofa-light-chaise.jpg", alt: "Светлый диван с оттоманкой в магазине" },
  { src: "/showroom/sofa-gray-corner.jpg", alt: "Серый угловой диван в магазине" },
  { src: "/showroom/sofa-orange.jpg", alt: "Яркий прямой диван в магазине" },
  { src: "/showroom/bed-mattress.jpg", alt: "Кровать с матрасом в магазине" },
  { src: "/showroom/wardrobe-set.jpg", alt: "Корпусная мебель в магазине" },
  { src: "/showroom/kitchen-white.jpg", alt: "Белая кухонная мебель в магазине" },
] as const;
