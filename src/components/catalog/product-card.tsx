"use client";

import Link from "next/link";
import { IProduct } from "@/types/product";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";

export function ProductCard({ product }: { product: IProduct }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const fmt = (n: number) =>
    n ? `${n.toLocaleString("ru-RU")} ₽` : "Цена по запросу";

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
      <Link href={`/product/${product.slug}`} className="block relative overflow-hidden aspect-[4/3] no-underline">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {!product.inStock && (
          <span className="absolute top-3 left-3 bg-foreground/80 text-white text-xs px-3 py-1.5 rounded-full font-medium">
            Под заказ
          </span>
        )}
        {product.oldPrice && product.inStock && (
          <span className="absolute top-3 left-3 bg-secondary text-foreground text-xs px-3 py-1.5 rounded-full font-semibold">
            Скидка
          </span>
        )}
      </Link>

      <div className="p-5">
        <Link href={`/product/${product.slug}`} className="no-underline">
          <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground mb-4">{product.manufacturer}</p>

        <div className="flex items-end justify-between">
          <div>
            {product.price > 0 ? (
              <>
                <span className="text-xl font-bold text-foreground">{fmt(product.price)}</span>
                {product.oldPrice && (
                  <span className="ml-2 text-sm text-muted-foreground line-through">{fmt(product.oldPrice)}</span>
                )}
              </>
            ) : (
              <span className="text-sm font-medium text-primary">{fmt(0)}</span>
            )}
          </div>
          {product.inStock && (
            <Button
              size="sm"
              onClick={handleAdd}
              variant={added ? "default" : "secondary"}
              className="rounded-xl gap-1.5"
            >
              {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
              {added ? "В корзине" : "В корзину"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
