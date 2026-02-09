"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold text-white">
          Mockmate<span className="text-indigo-400">AI</span>
        </Link>

        {/* Center links */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <a href="#features" className="hover:text-white transition">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-white transition">
            How It Works
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4 text-sm">
          
          {/* WHEN USER IS LOGGED OUT */}
          <SignedOut>
            <Link
              href="/auth/sign-in"
              className="text-gray-300 hover:text-white transition"
            >
              Log In
            </Link>

            <Link
              href="/auth/sign-up"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold hover:opacity-90 transition"
            >
              Get Started
            </Link>
          </SignedOut>

          {/* WHEN USER IS LOGGED IN */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

        </div>
      </div>
    </header>
  );
}
