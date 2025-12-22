"use client";

import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Hero() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  const handleStart = () => {
    // 🔒 wait until Clerk is ready
    if (!isLoaded) return;

    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/auth/sign-in");
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#050816] via-[#0b1026] to-[#1a0836]">
      
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.25),transparent_55%)]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* LEFT CONTENT */}
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-white/10 backdrop-blur text-indigo-300 mb-6">
              ✨ AI-Powered Interview Prep
            </span>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-tight text-white">
              Crack your Interview And Get a Job with{" "}
              <span className="block bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
                MockMate AI
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-300 leading-relaxed">
              Practice AI-powered mock interviews, get instant feedback,
              and prepare smarter — not harder.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={handleStart}
                disabled={!isLoaded}
                className="px-6 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition text-white font-medium disabled:opacity-60"
              >
                Start AI Mock
              </button>
            </div>

            {/* STATS */}
            <div className="mt-12 flex flex-wrap gap-10">
              <div>
                <p className="text-3xl font-bold text-indigo-400">100+</p>
                <p className="text-gray-400 text-sm">Mock Interviews</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-indigo-400">4.9/5</p>
                <p className="text-gray-400 text-sm">User Rating</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-indigo-400">95%</p>
                <p className="text-gray-400 text-sm">Success Rate</p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl animate-pulse" />

            <div className="relative rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-6 shadow-2xl w-full max-w-lg lg:max-w-xl animate-breathe">
              <Image
                src="/images/MockmateAI.png"
                alt="AI Mock Interview"
                width={600}
                height={600}
                priority
                className="rounded-2xl object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
