/**
 * Gumroad API Client
 * Fetches products from public Gumroad profiles using username
 */

export interface GumroadProduct {
    id: string;
    name: string;
    description: string;
    price: number; // in cents
    currency: string;
    short_url: string;
    thumbnail_url: string | null;
    sales_count: number;
    sales_usd_cents: number;
    formatted_price: string;
    published: boolean;
    custom_permalink: string | null;
}

export interface GumroadApiResponse<T> {
    success: boolean;
    products?: T[];
    message?: string;
}

export class GumroadClient {
    private username: string;
    private baseUrl = 'https://api.gumroad.com/v2';

    constructor(username: string) {
        this.username = username;
    }

    /**
     * Fetch all public products for a Gumroad username
     */
    async getProducts(): Promise<GumroadProduct[]> {
        try {
            // Use Gumroad's public discover API
            const response = await fetch(`${this.baseUrl}/discover/products/${this.username}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Gumroad username not found');
                }
                const error = await response.json().catch(() => ({ message: 'Failed to fetch products' }));
                throw new Error(error.message || 'Failed to fetch products');
            }

            const data: GumroadApiResponse<GumroadProduct> = await response.json();

            if (!data.success || !data.products) {
                throw new Error('Invalid response from Gumroad API');
            }

            return data.products;
        } catch (error) {
            console.error('Error fetching Gumroad products:', error);
            throw error;
        }
    }

    /**
     * Verify username is valid by attempting to fetch products
     */
    async verifyUsername(): Promise<boolean> {
        try {
            await this.getProducts();
            return true;
        } catch {
            return false;
        }
    }
}

/**
 * Helper function to create a Gumroad client
 */
export function createGumroadClient(username: string): GumroadClient {
    return new GumroadClient(username);
}
