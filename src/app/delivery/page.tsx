import type { Metadata } from "next";
import { DeliveryPageClient } from "./client";

export const metadata: Metadata = {
  title: "Доставка и сборка | МЕБЕЛЬ — Камышин",
  description:
    "Доставка мебели по Камышину, Волгоградской и Саратовской области. Профессиональная сборка. Индивидуальный расчёт логистики.",
};

export default function DeliveryPage() {
  return <DeliveryPageClient />;
}
