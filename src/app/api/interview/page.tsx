"use client";

import { useEffect, useRef, useState } from "react";

export default function InterviewPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [questions, setQuestions] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);

  /**
   * LOAD QUESTIONS
   */
  useEffect(() => {
  const interviewId = localStorage.getItem("interviewId");
  if (!interviewId) return;

  fetch("/api/interview/questions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ interviewId }),
  })
    .then(res => res.json())
    .then(data => setQuestions(data.questions));
}, []);


  /**
   * START CAMERA + MIC
   */
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      if (videoRef.current) videoRef.current.srcObject = stream;
    });
  }, []);

  /**
   * RECORD ANSWER
   */
  const startRecording = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    const recorder = new MediaRecorder(stream);
    chunksRef.current = [];

    recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
    recorder.start();

    mediaRecorderRef.current = recorder;
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };

  /**
   * GET FEEDBACK
   */
  const submitAnswer = async () => {
    const res = await fetch("/api/interview/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode: "feedback",
        question: questions[current],
        answer,
      }),
    });

    const data = await res.json();
    setFeedback(data.feedback);
  };

  if (loading) {
    return <p className="text-white text-center mt-20">Loading questions…</p>;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8 space-y-6">
      <h2 className="text-xl">
        Question {current + 1} / {questions.length}
      </h2>

      <p className="text-2xl font-semibold">{questions[current]}</p>

      <video ref={videoRef} autoPlay muted className="w-96 rounded bg-black" />

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows={4}
        className="w-full p-4 rounded bg-white/10"
        placeholder="Type your answer…"
      />

      <div className="flex gap-3">
        <button onClick={startRecording} className="px-4 py-2 bg-indigo-500 rounded">
          Record
        </button>
        <button onClick={stopRecording} className="px-4 py-2 bg-gray-600 rounded">
          Stop
        </button>
        <button onClick={submitAnswer} className="px-4 py-2 bg-pink-500 rounded">
          Get Feedback
        </button>
      </div>

      {feedback && (
        <div className="p-4 bg-white/10 rounded">
          <strong>AI Feedback:</strong>
          <p className="mt-2">{feedback}</p>
        </div>
      )}

      <div className="flex justify-between pt-6">
        <button
          disabled={current === 0}
          onClick={() => setCurrent((c) => c - 1)}
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-40"
        >
          Previous
        </button>

        <button
          disabled={current === questions.length - 1}
          onClick={() => {
            setAnswer("");
            setFeedback("");
            setCurrent((c) => c + 1);
          }}
          className="px-4 py-2 bg-indigo-600 rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
