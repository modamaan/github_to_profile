import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { Settings } from '@/lib/config/settings';
import * as schema from '@/lib/db/schema';

const globalForDb = globalThis as unknown as {
  db: PostgresJsDatabase<typeof schema> | undefined;
};

// Create postgres connection
const client = postgres(Settings.DATABASE_URL);

// Create drizzle instance with proper typing
export const db: PostgresJsDatabase<typeof schema> = globalForDb.db ?? drizzle(client, { schema });

if (process.env.NODE_ENV !== 'production') globalForDb.db = db;
