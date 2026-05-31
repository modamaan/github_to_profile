"use client";

import { ProductCard } from "./product-card";
import { FaStore } from "react-icons/fa";

interface Product {
    id: string;
    name: string;
    description: string | null;
    price: number | null;
    currency: string | null;
    shortUrl: string;
    thumbnailUrl: string | null;
    salesCount: number | null;
    isVisible: boolean;
}

interface ProductsSectionProps {
    products: Product[];
    showSalesCount?: boolean;
}

export function ProductsSection({ products, showSalesCount = false }: ProductsSectionProps) {
    // Filter visible products
    const visibleProducts = products.filter((p) => p.isVisible);

    if (visibleProducts.length === 0) {
        return null;
    }

    return (
        <section className="w-full py-12 md:py-16">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                        <FaStore className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                            Products & Templates
                        </h2>
                        <p className="text-sm text-zinc-400 mt-1">
                            Premium tools and resources I&apos;ve created
                        </p>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibleProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            showSalesCount={showSalesCount}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
