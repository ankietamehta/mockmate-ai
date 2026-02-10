import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { role, jobDescription, experience } = body;

    if (!role || !jobDescription || !experience) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY not set" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
Return ONLY a JSON array.
Generate exactly 5 interview questions.

Role: ${role}
Experience: ${experience}
Job Description: ${jobDescription}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const start = text.indexOf("[");
    const end = text.lastIndexOf("]");

    if (start === -1 || end === -1) {
      throw new Error("Invalid Gemini response");
    }

    const questions = JSON.parse(text.slice(start, end + 1));

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}
