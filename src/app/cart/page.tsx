import type { Metadata } from "next";
import { CartPageClient } from "./client";

export const metadata: Metadata = {
  title: "Заявка на подбор мебели",
  description: "Оставьте заявку на подбор и расчёт мебели в магазине МЕБЕЛЬ — Камышин.",
};

export default function CartPage() {
  return <CartPageClient />;
}
