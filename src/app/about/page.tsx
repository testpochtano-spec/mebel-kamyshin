import type { Metadata } from "next";
import { AboutPageClient } from "./client";

export const metadata: Metadata = {
  title: "О магазине",
  description:
    "Мебельный магазин в Камышине. 26 лет продаём фабричную мебель от российских производителей. Индивидуальный подход, доставка, сборка.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
