import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SectionWrapper({ children, className, id }: Props) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div className="max-w-7xl mx-auto px-4">{children}</div>
    </section>
  );
}

export function SectionTitle({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("text-center mb-12", className)}>
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}
