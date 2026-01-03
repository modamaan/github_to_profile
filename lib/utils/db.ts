import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { Settings } from '@/lib/config/settings';
import * as schema from '@/lib/db/schema';

const globalForDb = globalThis as unknown as {
  db: ReturnType<typeof drizzle> | undefined;
};

// Create postgres connection
const client = postgres(Settings.DATABASE_URL);

// Create drizzle instance
export const db = globalForDb.db ?? drizzle(client, { schema });

if (process.env.NODE_ENV !== 'production') globalForDb.db = db;

// Export for backward compatibility (some code might still use 'prisma')
export const prisma = db;
