import { NextResponse } from "next/server";
import { db } from "@/db";
import { interviewSetups } from "@/db/schema";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.role || !body.jobDescription || !body.experience) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const interviewId = randomUUID();

    await db.insert(interviewSetups).values({
      id: interviewId,
      role: body.role,
      jobDescription: body.jobDescription,
      experience: Number(body.experience),
    });

    return NextResponse.json({ interviewId });
  } catch (err) {
    console.error("SETUP ERROR:", err);
    return NextResponse.json(
      { error: "Failed to save setup" },
      { status: 500 }
    );
  }
}
