"use client";

import Image from "next/image";
import { FaShoppingCart, FaUsers } from "react-icons/fa";

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        description: string | null;
        price: number | null; // in cents
        currency: string | null;
        shortUrl: string;
        thumbnailUrl: string | null;
        salesCount: number | null;
    };
    showSalesCount?: boolean;
}

export function ProductCard({ product, showSalesCount = false }: ProductCardProps) {
    const formattedPrice = product.price
        ? `$${(product.price / 100).toFixed(2)}`
        : "Free";

    return (
        <div className="group relative rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-6 hover:border-zinc-700 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative">
                {/* Thumbnail */}
                {product.thumbnailUrl && (
                    <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-zinc-800">
                        <Image
                            src={product.thumbnailUrl}
                            alt={product.name}
                            width={400}
                            height={225}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                    {product.name}
                </h3>

                {product.description && (
                    <p className="text-sm text-zinc-400 mb-4 line-clamp-2 min-h-[40px]">
                        {product.description}
                    </p>
                )}

                {/* Price & CTA */}
                <div className="flex items-center justify-between gap-4">
                    <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        {formattedPrice}
                    </span>

                    <a
                        href={product.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all font-medium text-sm shadow-lg hover:shadow-xl"
                    >
                        <FaShoppingCart className="h-4 w-4" />
                        Buy Now
                    </a>
                </div>

                {/* Sales Count */}
                {showSalesCount && product.salesCount !== null && product.salesCount > 0 && (
                    <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center gap-2 text-xs text-zinc-500">
                        <FaUsers className="h-3 w-3" />
                        <span>{product.salesCount} sales</span>
                    </div>
                )}
            </div>
        </div>
    );
}
