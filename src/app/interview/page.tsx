"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function InterviewPage() {
  const searchParams = useSearchParams();
  const interviewId = searchParams.get("interviewId");

  const [questions, setQuestions] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!interviewId) return;

    async function loadQuestions() {
      try {
        const res = await fetch("/api/interview/question", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ interviewId }),
        });

        if (!res.ok) throw new Error("Bad response");

        const data = await res.json();

        if (!data.questions || !Array.isArray(data.questions)) {
          throw new Error("Invalid question format");
        }

        setQuestions(data.questions);
      } catch (err) {
        console.error(err);
        setError("Failed to load questions");
      }
    }

    loadQuestions();
  }, [interviewId]);

  if (error) {
    return <div className="text-red-500 text-center mt-20">{error}</div>;
  }

  if (questions.length === 0) {
    return <div className="text-white text-center mt-20">Loading questions...</div>;
  }

  return (
    <div className="text-white p-10">
      <h1 className="text-3xl mb-6">Interview Started</h1>

      <p className="text-xl">
        {questions[0].question}
      </p>
    </div>
  );
}
