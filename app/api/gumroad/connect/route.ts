import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/utils/db';
import { userSettings, gumroadProduct } from '@/lib/db/schema';
import { createGumroadClient } from '@/lib/gumroad/client';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

/**
 * POST /api/gumroad/connect
 * Connect Gumroad account and sync products
 */
export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const session = await auth.api.getSession({
            headers: request.headers,
        });

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { username } = body;

        if (!username) {
            return NextResponse.json(
                { error: 'Gumroad username is required' },
                { status: 400 }
            );
        }

        // Validate username format (alphanumeric, hyphens, underscores)
        const usernameRegex = /^[a-zA-Z0-9_-]+$/;
        if (!usernameRegex.test(username)) {
            return NextResponse.json(
                { error: 'Invalid username format. Use only letters, numbers, hyphens, and underscores.' },
                { status: 400 }
            );
        }

        // Verify username with Gumroad
        const gumroadClient = createGumroadClient(username);
        const isValid = await gumroadClient.verifyUsername();

        if (!isValid) {
            return NextResponse.json(
                { error: 'Gumroad username not found or has no public products' },
                { status: 400 }
            );
        }

        // Fetch products from Gumroad
        const products = await gumroadClient.getProducts();

        // Save username to user settings
        const existingSettings = await db.query.userSettings.findFirst({
            where: eq(userSettings.userId, session.user.id),
        });

        if (existingSettings) {
            await db
                .update(userSettings)
                .set({
                    gumroadUsername: username,
                    gumroadApiKey: null, // Clear API key if it exists
                    updatedAt: new Date(),
                })
                .where(eq(userSettings.userId, session.user.id));
        } else {
            await db.insert(userSettings).values({
                id: nanoid(),
                userId: session.user.id,
                gumroadUsername: username,
            });
        }

        // Save products to database
        for (const product of products) {
            const existingProduct = await db.query.gumroadProduct.findFirst({
                where: eq(gumroadProduct.gumroadProductId, product.id),
            });

            if (existingProduct) {
                // Update existing product
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
            } else {
                // Insert new product
                await db.insert(gumroadProduct).values({
                    id: nanoid(),
                    userId: session.user.id,
                    gumroadProductId: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    currency: product.currency,
                    shortUrl: product.short_url,
                    thumbnailUrl: product.thumbnail_url,
                    salesCount: product.sales_count,
                    totalRevenue: product.sales_usd_cents,
                    lastSyncedAt: new Date(),
                });
            }
        }

        return NextResponse.json({
            success: true,
            productsCount: products.length,
        });
    } catch (error) {
        console.error('Error connecting Gumroad:', error);
        return NextResponse.json(
            { error: 'Failed to connect Gumroad account' },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/gumroad/connect
 * Disconnect Gumroad account
 */
export async function DELETE(request: NextRequest) {
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

        // Remove username from settings
        await db
            .update(userSettings)
            .set({
                gumroadApiKey: null,
                gumroadUsername: null,
                updatedAt: new Date(),
            })
            .where(eq(userSettings.userId, session.user.id));

        // Optionally delete products (or just hide them)
        await db
            .delete(gumroadProduct)
            .where(eq(gumroadProduct.userId, session.user.id));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error disconnecting Gumroad:', error);
        return NextResponse.json(
            { error: 'Failed to disconnect Gumroad account' },
            { status: 500 }
        );
    }
}
