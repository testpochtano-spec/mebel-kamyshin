export const SHOWROOM_PHOTOS = [
  {
    id: "sofas",
    title: "Диваны и кресла",
    text: "Прямые, угловые и раскладные модели с подбором ткани и размера.",
    image: "/showroom/sofa-modular-showroom.jpg",
    href: "/catalog?category=divan",
  },
  {
    id: "mattresses",
    title: "Матрасы и кровати",
    text: "Подбор по размеру, жёсткости, основанию и привычкам сна.",
    image: "/showroom/mattress-showroom.jpg",
    href: "/catalog?category=matras",
  },
  {
    id: "kitchens",
    title: "Кухни и столешницы",
    text: "Модули, фасады, столешницы, мойки и смесители под один комплект.",
    image: "/showroom/kitchen-white.jpg",
    href: "/catalog?category=korpusnaya",
  },
  {
    id: "cabinet",
    title: "Корпусная мебель",
    text: "Шкафы, комоды, стенки, прихожие и решения для хранения.",
    image: "/showroom/wardrobe-set.jpg",
    href: "/catalog?category=korpusnaya",
  },
  {
    id: "tables",
    title: "Столы и стулья",
    text: "Обеденные группы, раздвижные столы и фабричные стулья.",
    image: "/showroom/table-set.jpg",
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
