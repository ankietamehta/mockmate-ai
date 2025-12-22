"use client";

import Image from "next/image";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT SIDE – IMAGE */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
        <Image
          src="/images/login.png"
          alt="Login Illustration"
          width={560}
          height={560}
          className="object-contain animate-[float_6s_ease-in-out_infinite]"
          priority
        />
      </div>

      {/* RIGHT SIDE – CLERK SIGN IN */}
      <div className="flex items-center justify-center bg-black">
        <div className="w-full max-w-md min-h-[520px] p-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center">

          <SignIn
            appearance={{
              elements: {
                card: "bg-transparent shadow-none",
                headerTitle:
                  "text-3xl font-extrabold bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent",
                headerSubtitle: "text-gray-400",
                formFieldInput:
                  "bg-white text-black placeholder-gray-500",
                formButtonPrimary:
                  "bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90",
                footerActionText: "text-gray-400",
                footerActionLink: "text-indigo-400 hover:underline",
              },
            }}
            redirectUrl="/dashboard"
            signUpUrl="/auth/sign-up"
          />

        </div>
      </div>
    </div>
  );
}
