import type { Metadata } from "next";
import { ContactsPageClient } from "./client";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Адрес, телефон и режим работы мебельного магазина в Камышине на улице Пушкина, 103. Звоните: 8-960-877-83-44.",
};

export default function ContactsPage() {
  return <ContactsPageClient />;
}
