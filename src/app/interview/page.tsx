"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { GoogleGenerativeAI } from "@google/generative-ai";

/* ⚠️ TEMP FRONTEND KEY (later move to backend) */

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;


declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export default function InterviewPage() {
  const params = useSearchParams();
  const router = useRouter();

  const role = params.get("role");
  const jobDescription = params.get("jobDescription");
  const experience = params.get("experience");

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);

  const [questions, setQuestions] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [recording, setRecording] = useState(false);
  const [answersText, setAnswersText] = useState<string[]>([]);
  const [feedbackList, setFeedbackList] = useState<any[]>([]);
  const [feedbackIndex, setFeedbackIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [error, setError] = useState("");

  /* ---------------- QUESTIONS ---------------- */
  useEffect(() => {
    if (!role || !jobDescription || !experience) {
      setError("Missing interview details");
      setLoading(false);
      return;
    }

    const generateQuestions = async () => {
      try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
          model: "gemini-2.5-flash",
        });

        const prompt = `
Return ONLY a JSON array.
Generate exactly 7 HR, technical and behavioral interview questions.

Role: ${role}
Experience: ${experience}
Job Description: ${jobDescription}
`;

        const res = await model.generateContent(prompt);
        const text = res.response.text();

        const parsed = JSON.parse(
          text.slice(text.indexOf("["), text.lastIndexOf("]") + 1)
        );

        setQuestions(parsed);
        setAnswersText(new Array(parsed.length).fill(""));
        setLoading(false);
      } catch (e) {
        console.error(e);
        setError("Failed to generate questions");
        setLoading(false);
      }
    };

    generateQuestions();
  }, []);

  /* ---------------- RECORDING + SPEECH ---------------- */
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    streamRef.current = stream;

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.muted = true;
      await videoRef.current.play();
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.lang = "en-US";

      let transcript = "";

      recognition.onresult = (event: any) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript + " ";
        }
      };

      recognition.onend = () => {
        setAnswersText((prev) => {
          const copy = [...prev];
          copy[current] = transcript.trim();
          return copy;
        });
      };

      recognition.start();
      recognitionRef.current = recognition;
    }

    setRecording(true);
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setRecording(false);
  };

  /* ---------------- GEMINI FEEDBACK ---------------- */
  const generateGeminiFeedback = async (
    question: string,
    answer: string
  ) => {
    if (!answer || answer.trim().length < 5) {
      return {
        confidence: 1,
        accuracy: 1,
        clarity: 1,
        positives: [],
        improvements: [
          "You did not attempt this question.",
          "Try explaining your thoughts verbally next time.",
        ],
        summary: "No valid answer was detected for this question.",
      };
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a senior interviewer.

Evaluate the candidate honestly.

QUESTION:
${question}

ANSWER:
${answer}

Return ONLY valid JSON:

{
  "confidence": number (0-5),
  "accuracy": number (0-5),
  "clarity": number (0-5),
  "positives": string[],
  "improvements": string[],
  "summary": string
}
`;

    const res = await model.generateContent(prompt);
    const text = res.response.text();

    return JSON.parse(
      text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1)
    );
  };

  /* ---------------- SUBMIT ---------------- */
  const submitInterview = async () => {
    setFeedbackLoading(true);

    const allFeedback = [];
    for (let i = 0; i < questions.length; i++) {
      const fb = await generateGeminiFeedback(
        questions[i],
        answersText[i]
      );
      allFeedback.push(fb);
    }

    setFeedbackList(allFeedback);
    setShowFeedback(true);
    setFeedbackLoading(false);
  };

  /* ---------------- UI ---------------- */
  if (loading)
    return (
      <div className="h-screen text-white flex items-center justify-center">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="h-screen text-red-500 flex items-center justify-center">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      <aside className="w-64 border-r border-white/10 p-6">
        <h1 className="text-2xl font-bold">
          MockMate<span className="text-indigo-400">AI</span>
        </h1>
      </aside>

      <main className="flex-1 p-10 flex justify-center">
        <div className="w-full max-w-4xl space-y-8">

          {!showFeedback ? (
            <>
              <div className="p-6 bg-white/5 rounded text-lg">
                <span className="text-indigo-400 font-semibold">
                  Q{current + 1}.
                </span>{" "}
                {questions[current]}
              </div>

              <div className="w-full h-[380px] bg-white rounded-xl overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex justify-center">
                {!recording ? (
                  <button
                    onClick={startRecording}
                    className="px-8 py-4 bg-green-600 rounded-lg"
                  >
                    Record Answer
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="px-8 py-4 bg-red-600 rounded-lg"
                  >
                    Stop Recording
                  </button>
                )}
              </div>

              <div className="flex justify-between pt-6">
                <button
                  disabled={current === 0}
                  onClick={() => setCurrent((p) => p - 1)}
                  className="px-6 py-3 bg-gray-600 rounded disabled:opacity-40"
                >
                  Previous
                </button>

                {current < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrent((p) => p + 1)}
                    className="px-6 py-3 bg-indigo-600 rounded"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={submitInterview}
                    className="px-6 py-3 bg-indigo-800 rounded"
                  >
                    Submit Interview
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-center">
                Interview Feedback
              </h2>

              {feedbackLoading ? (
                <div className="text-center text-gray-300">
                  Generating feedback...
                </div>
              ) : (
                <>
                  {(() => {
                    const f = feedbackList[feedbackIndex];
                    return (
                      <div className="p-8 bg-white/5 rounded-xl space-y-6">
                        <div className="text-indigo-400 font-semibold">
                          Question {feedbackIndex + 1}
                        </div>

                        <div>{questions[feedbackIndex]}</div>

                        <div className="grid grid-cols-3 gap-4">
                          <Score label="Confidence" score={f.confidence} />
                          <Score label="Accuracy" score={f.accuracy} />
                          <Score label="Clarity" score={f.clarity} />
                        </div>

                        <div>
                          <h4 className="text-green-400 font-semibold mb-2">
                            What went well
                          </h4>
                          <ul className="list-disc list-inside text-gray-300">
                            {f.positives.map((p: string, i: number) => (
                              <li key={i}>{p}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-yellow-400 font-semibold mb-2">
                            Needs improvement
                          </h4>
                          <ul className="list-disc list-inside text-gray-300">
                            {f.improvements.map((p: string, i: number) => (
                              <li key={i}>{p}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="text-gray-400 text-sm">
                          {f.summary}
                        </div>
                      </div>
                    );
                  })()}

                  <div className="flex justify-between items-center">
                    {feedbackIndex > 0 ? (
                      <button
                        onClick={() =>
                          setFeedbackIndex((p) => p - 1)
                        }
                        className="px-6 py-3 bg-gray-700 rounded"
                      >
                        &lt; Previous
                      </button>
                    ) : <div />}

                    {feedbackIndex < questions.length - 1 ? (
                      <button
                        onClick={() =>
                          setFeedbackIndex((p) => p + 1)
                        }
                        className="px-6 py-3 bg-indigo-600 rounded"
                      >
                        Next &gt;
                      </button>
                    ) : (
                      <div className="flex gap-4">
                        <button
                          onClick={() => router.push("/")}
                          className="px-6 py-3 bg-gray-700 rounded"
                        >
                          Home
                        </button>
                        <button
                          onClick={() => window.location.reload()}
                          className="px-6 py-3 bg-indigo-600 rounded"
                        >
                          Try Again
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

/* ---------- SCORE ---------- */
function Score({ label, score }: { label: string; score: number }) {
  return (
    <div className="p-4 bg-white/10 rounded text-center">
      <div className="text-gray-300">{label}</div>
      <div className="text-2xl font-bold text-indigo-400">
        {score}/5
      </div>
    </div>
  );
}
