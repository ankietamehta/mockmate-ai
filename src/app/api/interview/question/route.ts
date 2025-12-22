import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/db";
import { interviewSetups } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { interviewId } = await req.json();

    if (!interviewId) {
      return NextResponse.json({ error: "interviewId missing" }, { status: 400 });
    }

    // ✅ FIXED DRIZZLE QUERY
    const result = await db
      .select()
      .from(interviewSetups)
      .where(eq(interviewSetups.id, interviewId))
      .limit(1);

    const setup = result[0];

    if (!setup) {
      return NextResponse.json({ error: "Setup not found" }, { status: 404 });
    }

    // ✅ Gemini (adapted correctly)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
You are a professional interviewer.

Generate exactly 7 interview questions.

Role: ${setup.role}
Experience: ${setup.experience} years
Job Description: ${setup.jobDescription}

Rules:
- Return ONLY valid JSON
- Format:
[
  { "question": "...", "context": "..." }
]
`;

    const response = await model.generateContent(prompt);
    const text = response.response.text();

    const questions = JSON.parse(text);

    return NextResponse.json({ questions });
  } catch (err) {
    console.error("QUESTION API ERROR:", err);
    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}
