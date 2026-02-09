"use client";

import Image from "next/image";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT SIDE – CLERK SIGNUP */}
      <div className="flex items-center justify-center bg-black">
        <div className="w-full max-w-md min-h-[520px] p-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center">
          
          <SignUp
            routing="hash"   // ✅ YAHI FIX HAI (IMPORTANT)
            appearance={{
              elements: {
                card: "bg-transparent shadow-none",
                headerTitle: "text-white text-3xl font-extrabold",
                headerSubtitle: "text-gray-400",
                socialButtonsBlockButton:
                  "bg-white text-black hover:bg-gray-200",
                formButtonPrimary:
                  "bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90",
                footerActionText: "text-gray-400",
                footerActionLink: "text-indigo-400 hover:underline",
                formFieldInput:
                  "bg-white text-black placeholder-gray-500",
              },
            }}
            redirectUrl="/dashboard/page"
            signInUrl="/auth/sign-in"
          />

        </div>
      </div>

      {/* RIGHT SIDE – IMAGE */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
        <Image
          src="/images/signup.png"
          alt="Signup Illustration"
          width={560}
          height={560}
          className="object-contain animate-[float_6s_ease-in-out_infinite]"
          priority
        />
      </div>

    </div>
  );
}
