import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/utils/db';
import { userSettings, gumroadProduct } from '@/lib/db/schema';
import { createGumroadClient } from '@/lib/gumroad/client';
import { eq } from 'drizzle-orm';

/**
 * POST /api/gumroad/sync
 * Sync products from Gumroad
 */
export async function POST(request: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: request.headers,
        });

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Get user's Gumroad username
        const settings = await db.query.userSettings.findFirst({
            where: eq(userSettings.userId, session.user.id),
        });

        if (!settings?.gumroadUsername) {
            return NextResponse.json(
                { error: 'Gumroad account not connected' },
                { status: 400 }
            );
        }

        // Fetch products from Gumroad
        const gumroadClient = createGumroadClient(settings.gumroadUsername);
        const products = await gumroadClient.getProducts();

        // Update products in database
        for (const product of products) {
            const existingProduct = await db.query.gumroadProduct.findFirst({
                where: eq(gumroadProduct.gumroadProductId, product.id),
            });

            if (existingProduct) {
                await db
                    .update(gumroadProduct)
                    .set({
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        currency: product.currency,
                        shortUrl: product.short_url,
                        thumbnailUrl: product.thumbnail_url,
                        salesCount: product.sales_count,
                        totalRevenue: product.sales_usd_cents,
                        lastSyncedAt: new Date(),
                        updatedAt: new Date(),
                    })
                    .where(eq(gumroadProduct.id, existingProduct.id));
            }
        }

        return NextResponse.json({
            success: true,
            productsCount: products.length,
            lastSyncedAt: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Error syncing Gumroad products:', error);
        return NextResponse.json(
            { error: 'Failed to sync products' },
            { status: 500 }
        );
    }
}
