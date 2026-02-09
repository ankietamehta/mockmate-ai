import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { role, jobDescription, experience } = await req.json();

    if (!role || !jobDescription || !experience) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
Generate exactly 5 interview questions.
Return ONLY a JSON array.

Role: ${role}
Experience: ${experience}
Job Description: ${jobDescription}

Format:
["Q1","Q2","Q3","Q4","Q5"]
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const start = text.indexOf("[");
    const end = text.lastIndexOf("]");

    const questions = JSON.parse(text.slice(start, end + 1));

    return NextResponse.json({ questions });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}
