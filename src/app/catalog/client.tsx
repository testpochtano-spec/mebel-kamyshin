"use client";

import { useState, useMemo } from "react";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { ProductCard } from "@/components/catalog/product-card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";

export function CatalogPageClient() {
  const [category, setCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    if (category === "all") return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === category);
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">
      <div className="mb-10">
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground">Каталог мебели</h1>
        <p className="mt-3 text-muted-foreground text-lg">Диваны, кровати, матрасы от российских производителей</p>
      </div>

      {/* Desktop filters */}
      <div className="hidden md:flex gap-2 mb-8 flex-wrap">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat.id}
            variant={category === cat.id ? "default" : "outline"}
            size="sm"
            onClick={() => setCategory(cat.id)}
            className="rounded-full text-sm"
          >
            {cat.name}
          </Button>
        ))}
      </div>

      {/* Mobile filter button */}
      <div className="md:hidden mb-6">
        <Button
          variant="outline"
          className="rounded-2xl w-full justify-between"
          onClick={() => setShowFilters(true)}
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            {CATEGORIES.find((c) => c.id === category)?.name || "Все товары"}
          </span>
          <span className="text-muted-foreground text-sm">{filtered.length} товаров</span>
        </Button>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 flex items-end"
              onClick={() => setShowFilters(false)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-white rounded-t-3xl p-6 w-full max-h-[60dvh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-xl font-bold">Категории</h3>
                  <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <div className="flex flex-col gap-1">
                  {CATEGORIES.map((cat) => (
                    <Button
                      key={cat.id}
                      variant={category === cat.id ? "default" : "ghost"}
                      className="justify-start text-base h-12 rounded-xl"
                      onClick={() => {
                        setCategory(cat.id);
                        setShowFilters(false);
                      }}
                    >
                      {cat.name}
                    </Button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">Товары не найдены</p>
        </div>
      )}
    </div>
  );
}
