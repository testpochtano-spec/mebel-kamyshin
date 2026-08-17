"use client";

import Image from "next/image";
import { BUSINESS } from "@/data/business";
import { asset, cn } from "@/lib/utils";

const MESSAGE = "Здравствуйте! Хочу подобрать мебель.";

const MESSENGERS = [
  {
    label: "WhatsApp",
    href: `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(MESSAGE)}`,
    icon: "/messengers/whatsapp.svg",
    title: "Написать в WhatsApp",
  },
  {
    label: "Telegram",
    href: `https://t.me/+${BUSINESS.telegram}?text=${encodeURIComponent(MESSAGE)}`,
    icon: "/messengers/telegram.svg",
    title: "Написать в Telegram",
  },
  {
    label: "MAX",
    href: BUSINESS.maxLink,
    icon: "/messengers/max.svg",
    title: `MAX: напишите по номеру ${BUSINESS.phone}`,
  },
] as const;

type MessengerLinksProps = {
  className?: string;
  variant?: "icons" | "labels";
  onNavigate?: () => void;
};

export function MessengerLinks({ className, variant = "icons", onNavigate }: MessengerLinksProps) {
  const iconOnly = variant === "icons";

  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)} aria-label="Мессенджеры">
      {MESSENGERS.map((messenger) => (
        <a
          key={messenger.label}
          href={messenger.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onNavigate}
          title={messenger.title}
          aria-label={messenger.title}
          className={cn(
            "inline-flex items-center justify-center border border-border bg-white text-xs font-medium text-foreground no-underline shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md",
            iconOnly ? "size-7 rounded-full" : "h-8 gap-2 rounded-full px-3",
          )}
        >
          <Image src={asset(messenger.icon)} alt="" width={18} height={18} className="size-4" aria-hidden="true" />
          {iconOnly ? null : <span>{messenger.label}</span>}
        </a>
      ))}
    </div>
  );
}
