import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { question, answer } = await req.json();

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(`
Question: ${question}
Answer: ${answer}
Give short interview feedback.
`);

  return NextResponse.json({
    feedback: result.response.text(),
  });
}
