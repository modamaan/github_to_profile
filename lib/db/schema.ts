import { pgTable, text, timestamp, boolean, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Cache table
export const cache = pgTable(
    'cache',
    {
        id: text('id').primaryKey(),
        key: text('key').notNull().unique(),
        value: text('value').notNull(),
        tags: text('tags').array().notNull().default([]),
        expiresAt: timestamp('expiresAt', { mode: 'date' }).notNull(),
        createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
        updatedAt: timestamp('updatedAt', { mode: 'date' }).notNull().defaultNow(),
    },
    (table) => ({
        keyIdx: index('cache_key_idx').on(table.key),
        expiresAtIdx: index('cache_expiresAt_idx').on(table.expiresAt),
        tagsIdx: index('cache_tags_idx').on(table.tags),
    })
);

// Custom URL table
export const customUrl = pgTable(
    'custom_urls',
    {
        id: text('id').primaryKey(),
        customSlug: text('customSlug').notNull().unique(),
        githubUsername: text('githubUsername').notNull(),
        createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
        updatedAt: timestamp('updatedAt', { mode: 'date' }).notNull().defaultNow(),
    },
    (table) => ({
        customSlugIdx: index('custom_urls_customSlug_idx').on(table.customSlug),
        githubUsernameIdx: index('custom_urls_githubUsername_idx').on(table.githubUsername),
    })
);

// User table
export const user = pgTable('user', {
    id: text('id').primaryKey(),
    name: text('name'),
    email: text('email').unique(),
    emailVerified: boolean('emailVerified').notNull().default(false),
    image: text('image'),
    createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { mode: 'date' }).notNull().defaultNow(),
});

// Session table
export const session = pgTable(
    'session',
    {
        id: text('id').primaryKey(),
        expiresAt: timestamp('expiresAt', { mode: 'date' }).notNull(),
        token: text('token').notNull().unique(),
        createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
        updatedAt: timestamp('updatedAt', { mode: 'date' }).notNull().defaultNow(),
        ipAddress: text('ipAddress'),
        userAgent: text('userAgent'),
        userId: text('userId')
            .notNull()
            .references(() => user.id, { onDelete: 'cascade' }),
    },
    (table) => ({
        userIdIdx: index('session_userId_idx').on(table.userId),
    })
);

// Account table
export const account = pgTable(
    'account',
    {
        id: text('id').primaryKey(),
        accountId: text('accountId').notNull(),
        providerId: text('providerId').notNull(),
        userId: text('userId')
            .notNull()
            .references(() => user.id, { onDelete: 'cascade' }),
        accessToken: text('accessToken'),
        refreshToken: text('refreshToken'),
        idToken: text('idToken'),
        accessTokenExpiresAt: timestamp('accessTokenExpiresAt', { mode: 'date' }),
        refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt', { mode: 'date' }),
        scope: text('scope'),
        password: text('password'),
        createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
        updatedAt: timestamp('updatedAt', { mode: 'date' }).notNull().defaultNow(),
    },
    (table) => ({
        userIdIdx: index('account_userId_idx').on(table.userId),
    })
);

// Verification table
export const verification = pgTable(
    'verification',
    {
        id: text('id').primaryKey(),
        identifier: text('identifier').notNull(),
        value: text('value').notNull(),
        expiresAt: timestamp('expiresAt', { mode: 'date' }).notNull(),
        createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
        updatedAt: timestamp('updatedAt', { mode: 'date' }).notNull().defaultNow(),
    },
    (table) => ({
        identifierIdx: index('verification_identifier_idx').on(table.identifier),
    })
);

// Relations
export const userRelations = relations(user, ({ many }) => ({
    sessions: many(session),
    accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
    user: one(user, {
        fields: [session.userId],
        references: [user.id],
    }),
}));

export const accountRelations = relations(account, ({ one }) => ({
    user: one(user, {
        fields: [account.userId],
        references: [user.id],
    }),
}));

// Export types
export type Cache = typeof cache.$inferSelect;
export type NewCache = typeof cache.$inferInsert;

export type CustomUrl = typeof customUrl.$inferSelect;
export type NewCustomUrl = typeof customUrl.$inferInsert;

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

export type Session = typeof session.$inferSelect;
export type NewSession = typeof session.$inferInsert;

export type Account = typeof account.$inferSelect;
export type NewAccount = typeof account.$inferInsert;

export type Verification = typeof verification.$inferSelect;
export type NewVerification = typeof verification.$inferInsert;
