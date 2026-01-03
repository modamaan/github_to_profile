import { Settings } from '@/lib/config/settings';
import { db } from './db';
import { cache } from '@/lib/db/schema';
import { eq, lt, sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export interface CacheOptions {
  ttl?: number;
  tags?: string[];
}

export function getCacheKey(prefix: string, ...parts: string[]): string {
  return `${prefix}:${parts.join(':')}`;
}

async function cleanupExpiredCache() {
  try {
    await db.delete(cache).where(lt(cache.expiresAt, new Date()));
  } catch (error) {
    console.error('Failed to cleanup expired cache:', error);
  }
}

export async function getCache<T>(key: string): Promise<T | null> {
  if (!Settings.CACHE_ENABLED) {
    return null;
  }

  try {
    const result = await db
      .select()
      .from(cache)
      .where(eq(cache.key, key))
      .limit(1);

    const cacheEntry = result[0];

    if (!cacheEntry) {
      return null;
    }

    if (cacheEntry.expiresAt < new Date()) {
      await db.delete(cache).where(eq(cache.key, key));
      return null;
    }

    return JSON.parse(cacheEntry.value) as T;
  } catch (error) {
    console.error(`Failed to get cache for key ${key}:`, error);
    return null;
  }
}

export async function setCache<T>(
  key: string,
  value: T,
  options: CacheOptions = {}
): Promise<boolean> {
  if (!Settings.CACHE_ENABLED) {
    return false;
  }

  try {
    const ttl = options.ttl || Settings.DEFAULT_CACHE_TTL;
    const expiresAt = new Date(Date.now() + ttl * 1000);
    const tags = options.tags || [];

    await db
      .insert(cache)
      .values({
        id: nanoid(),
        key,
        value: JSON.stringify(value),
        tags,
        expiresAt,
      })
      .onConflictDoUpdate({
        target: cache.key,
        set: {
          value: JSON.stringify(value),
          tags,
          expiresAt,
          updatedAt: new Date(),
        },
      });

    if (Math.random() < 0.01) {
      cleanupExpiredCache();
    }

    return true;
  } catch (error) {
    console.error(`Failed to set cache for key ${key}:`, error);
    return false;
  }
}

export async function deleteCache(key: string): Promise<boolean> {
  try {
    await db.delete(cache).where(eq(cache.key, key));
    return true;
  } catch (error) {
    console.error(`Failed to delete cache for key ${key}:`, error);
    return false;
  }
}

export async function deleteCacheByTag(tag: string): Promise<boolean> {
  try {
    await db.delete(cache).where(sql`${tag} = ANY(${cache.tags})`);
    return true;
  } catch (error) {
    console.error(`Failed to delete cache by tag ${tag}:`, error);
    return false;
  }
}

export function createCachedFunction<T>(
  fn: () => Promise<T>,
  keyParts: string[],
  options: CacheOptions = {}
) {
  if (keyParts.length === 0) {
    throw new Error('keyParts must contain at least one element');
  }
  const [prefix, ...parts] = keyParts;
  const cacheKey = getCacheKey(prefix, ...parts);

  return async (): Promise<T> => {
    if (!Settings.CACHE_ENABLED) {
      return fn();
    }

    const cached = await getCache<T>(cacheKey);
    if (cached !== null) {
      return cached;
    }

    const result = await fn();
    await setCache(cacheKey, result, options);
    return result;
  };
}

