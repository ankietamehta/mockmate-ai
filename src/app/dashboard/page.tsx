"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "HR",
  "Teacher",
  "Product Manager",
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const [role, setRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * ✅ Sync Clerk user → Neon DB
   * This only runs once after login/signup
   */
  useEffect(() => {
    if (!isLoaded || !user) return;

    fetch("/api/auth/sync", {
      method: "POST",
    });
  }, [isLoaded, user]);

  /**
   * ✅ Start Interview
   * Redirects directly with params
   */
  const handleStartInterview = () => {
    if (!role || !jobDescription || !experience) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const params = new URLSearchParams({
      role,
      jobDescription,
      experience,
    });

    router.push(`/interview?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex bg-[#020617] text-white">

      {/* LEFT SIDEBAR */}
      <aside className="w-64 border-r border-white/10 p-6">
        <button
          onClick={() => router.push("/")}
          className="text-lg font-semibold text-white"
        >
          MockMate<span className="text-indigo-400">AI</span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex justify-center items-start py-20 px-6">
        <div className="w-full max-w-2xl space-y-10">

          {/* HEADING */}
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Setup Your Mock Interview
            </h1>
            <p className="text-gray-400">
              Tell us about the role you’re preparing for
            </p>
          </div>

          {/* ROLE INPUT */}
          <div className="space-y-3">
            <label className="text-sm text-gray-400">Job Role</label>

            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Type your role..."
              className="w-full p-3 rounded bg-white/5 border border-white/10 focus:outline-none focus:border-indigo-500"
            />

            <div className="flex flex-wrap gap-2 pt-2">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition
                    ${
                      role === r
                        ? "bg-indigo-600 border-indigo-600"
                        : "bg-white/5 border-white/10 hover:bg-indigo-600"
                    }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* JOB DESCRIPTION */}
          <div className="space-y-3">
            <label className="text-sm text-gray-400">
              Job Description
            </label>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={5}
              placeholder="Paste job description here..."
              className="w-full p-4 rounded bg-white/5 border border-white/10 focus:outline-none focus:border-pink-500"
            />
          </div>

          {/* EXPERIENCE */}
          <div className="space-y-3">
            <label className="text-sm text-gray-400">
              Years of Experience
            </label>

            <input
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              type="number"
              placeholder="e.g. 2"
              className="w-full p-3 rounded bg-white/5 border border-white/10 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* CTA */}
          <button
            onClick={handleStartInterview}
            disabled={loading}
            className="w-full py-4 rounded-lg font-semibold text-black
                       bg-gradient-to-r from-indigo-400 to-pink-400
                       hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Starting..." : "Start Interview"}
          </button>

        </div>
      </main>
    </div>
  );
}
