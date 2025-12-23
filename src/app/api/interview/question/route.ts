import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/db";
import { interviewSetups } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const interviewId = body?.interviewId;

    if (!interviewId) {
      return NextResponse.json(
        { error: "interviewId missing" },
        { status: 400 }
      );
    }

    // ✅ FIXED: NO db.query
    const setupResult = await db
      .select()
      .from(interviewSetups)
      .where(eq(interviewSetups.id, interviewId))
      .limit(1);

    const setup = setupResult[0];

    if (!setup) {
      return NextResponse.json(
        { error: "Interview setup not found" },
        { status: 404 }
      );
    }

    // Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
You are a professional interviewer.

Generate exactly 7 interview questions.

Role: ${setup.role}
Experience: ${setup.experience} years
Job Description: ${setup.jobDescription}

Rules:
- Mix theory and practical
- Match difficulty to experience
- Return ONLY a JSON array of strings
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let questions: string[];
    try {
      questions = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: "Invalid Gemini response", raw: text },
        { status: 500 }
      );
    }

    return NextResponse.json({ questions });
  } catch (err) {
    console.error("QUESTION GENERATION ERROR:", err);
    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}
