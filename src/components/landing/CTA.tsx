"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function CTA() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleStart = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/auth/sign-in");
    }
  };

  return (
    <section className="relative py-32">
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div
          className="
            relative overflow-hidden
            rounded-3xl
            bg-white/5 backdrop-blur-2xl
            border border-white/10
            px-8 py-16 sm:px-16
            text-center
            shadow-[0_0_60px_rgba(99,102,241,0.25)]
          "
        >
          {/* subtle glow line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />

      
        <h2 className="text-4xl font-bold mb-4">
          Ready to Crack Your Interview?
        </h2>

        <p className="text-gray-400 mb-8">
          Start your AI-powered mock interview now and get instant feedback.
        </p>

        <button
          onClick={handleStart}
          className="px-8 py-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition text-white font-semibold"
        >
          Start AI Mock
        </button>
      </div>
      </div>
    </section>
  );
}
