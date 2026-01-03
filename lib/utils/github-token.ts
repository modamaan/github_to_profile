import { auth } from "@/lib/auth";
import { db } from "@/lib/utils/db";
import { account } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";

export async function getUserGitHubToken(userId?: string): Promise<string | null> {
  if (!userId) {
    return null;
  }

  try {
    const result = await db
      .select({ accessToken: account.accessToken })
      .from(account)
      .where(
        and(
          eq(account.userId, userId),
          eq(account.providerId, "github")
        )
      )
      .limit(1);

    return result[0]?.accessToken || null;
  } catch {
    return null;
  }
}

export async function getSessionUserToken(request?: Request): Promise<string | null> {
  try {
    const headers = request ? new Headers(request.headers) : new Headers();
    const session = await auth.api.getSession({
      headers,
    });

    if (!session?.user?.id) {
      return null;
    }

    return getUserGitHubToken(session.user.id);
  } catch {
    return null;
  }
}

