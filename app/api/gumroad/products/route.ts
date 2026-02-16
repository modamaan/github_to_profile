import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/utils/db';
import { gumroadProduct } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

/**
 * GET /api/gumroad/products
 * Get user's Gumroad products
 */
export async function GET(request: NextRequest) {
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

        const products = await db.query.gumroadProduct.findMany({
            where: eq(gumroadProduct.userId, session.user.id),
            orderBy: (products, { asc }) => [asc(products.displayOrder)],
        });

        return NextResponse.json({ products });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/gumroad/products
 * Update product settings (visibility, order)
 */
export async function PATCH(request: NextRequest) {
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

        const body = await request.json();
        const { productId, isVisible, displayOrder } = body;

        if (!productId) {
            return NextResponse.json(
                { error: 'Product ID is required' },
                { status: 400 }
            );
        }

        // Verify product belongs to user
        const product = await db.query.gumroadProduct.findFirst({
            where: and(
                eq(gumroadProduct.id, productId),
                eq(gumroadProduct.userId, session.user.id)
            ),
        });

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        // Update product
        const updateData: any = {
            updatedAt: new Date(),
        };

        if (typeof isVisible === 'boolean') {
            updateData.isVisible = isVisible;
        }

        if (typeof displayOrder === 'number') {
            updateData.displayOrder = displayOrder;
        }

        await db
            .update(gumroadProduct)
            .set(updateData)
            .where(eq(gumroadProduct.id, productId));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json(
            { error: 'Failed to update product' },
            { status: 500 }
        );
    }
}
