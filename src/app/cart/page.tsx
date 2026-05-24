import type { Metadata } from "next";
import { CartPageClient } from "./client";

export const metadata: Metadata = {
  title: "Корзина",
  description: "Ваша корзина покупок в мебельном магазине МЕБЕЛЬ — Камышин.",
};

export default function CartPage() {
  return <CartPageClient />;
}
