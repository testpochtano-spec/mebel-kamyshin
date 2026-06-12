import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, MessageCircle } from "lucide-react";
import { VIEWABLE_CATALOGS } from "@/data/catalogs";
import { Button } from "@/components/ui/button";
import { asset } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return VIEWABLE_CATALOGS.map((catalog) => ({ slug: catalog.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const catalog = VIEWABLE_CATALOGS.find((item) => item.slug === slug);

  if (!catalog) return { title: "Каталог не найден" };

  return {
    title: catalog.title,
    description: `${catalog.title}. ${catalog.desc}`,
    openGraph: {
      title: catalog.title,
      description: catalog.desc,
      images: catalog.cover ? [catalog.cover] : undefined,
    },
  };
}

export default async function CatalogViewerPage({ params }: Props) {
  const { slug } = await params;
  const catalog = VIEWABLE_CATALOGS.find((item) => item.slug === slug);

  if (!catalog) notFound();

  const pdfUrl = asset(catalog.href);
  const pdfViewerUrl = `${pdfUrl}#toolbar=1&navpanes=0`;
  const meta = [catalog.pages ? `${catalog.pages} стр.` : null, catalog.size].filter(Boolean).join(" • ");

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col">
      <header className="shrink-0 border-b border-border bg-white px-3 sm:px-4">
        <div className="min-h-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3 sm:py-0">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/catalog#catalogs-heading"
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary/30 no-underline"
              aria-label="Назад к каталогам"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{catalog.maker}</span>
                {meta ? <span className="hidden sm:inline">{meta}</span> : null}
              </div>
              <h1 className="truncate font-heading text-lg sm:text-xl font-bold text-foreground">{catalog.title}</h1>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            <Button
              variant="outline"
              nativeButton={false}
              className="rounded-xl gap-2 shrink-0"
              render={<a href={pdfUrl} target="_blank" rel="noopener noreferrer" />}
            >
              <Download className="w-4 h-4" />
              PDF
            </Button>
            <Button
              nativeButton={false}
              className="rounded-xl gap-2 shrink-0"
              render={<Link href="/catalog#request" />}
            >
              <MessageCircle className="w-4 h-4" />
              Заявка
            </Button>
          </div>
        </div>
      </header>

      <iframe
        src={pdfViewerUrl}
        title={catalog.title}
        className="block w-full flex-1 min-h-0 bg-white"
        allowFullScreen
      />
    </div>
  );
}
