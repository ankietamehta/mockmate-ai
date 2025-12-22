import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function syncUser({
  clerkUserId,
  email,
  name,
}: {
  clerkUserId: string;
  email: string;
  name: string | null;
}) {
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.id, clerkUserId));

  if (existing.length === 0) {
    await db.insert(users).values({
      id: clerkUserId,
      email,
      name,
    });
  }
}
