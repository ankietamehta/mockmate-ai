"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function InterviewPage() {
  const searchParams = useSearchParams();
  const interviewId = searchParams.get("interviewId");

  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!interviewId) return;

    fetch("/api/interview/question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ interviewId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions || []);
        setLoading(false);
      })
      .catch(() => {
        setQuestions([]);
        setLoading(false);
      });
  }, [interviewId]);

  if (!interviewId) {
    return <p className="text-white">Invalid interview link</p>;
  }

  if (loading) {
    return <p className="text-white">Loading questions...</p>;
  }

  if (questions.length === 0) {
    return <p className="text-white">No questions generated</p>;
  }

  return (
    <div className="text-white p-10">
      <h1 className="text-2xl mb-4">Interview Started</h1>

      <ul className="space-y-4">
        {questions.map((q, i) => (
          <li key={i}>{q}</li>
        ))}
      </ul>
    </div>
  );
}
