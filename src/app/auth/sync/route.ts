import { auth, currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/lib/auth";

export async function POST() {
  const user = await currentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  await syncUser({
    clerkUserId: user.id,
    email: user.emailAddresses[0].emailAddress,
    name: user.fullName,
  });

  return Response.json({ success: true });
}
