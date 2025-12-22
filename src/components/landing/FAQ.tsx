"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      question: "Is MockMate AI free to use?",
      answer:
        "Yes, MockMate AI is completely free to use with no hiddden charges . You can practice unlimited times , we won't charge for taking Mock AI or there will not be  any limit .",
    },
    {
      question: "Do I need prior interview experience?",
      answer:
        "No prior experience is required. MockMate AI is designed for freshers as well as experienced professionals. With zero experience , you can start practicing and building your confidence right away.",
    },
    {
      question: "Which roles are supported?",
      answer:
        "We support roles like Software Developer, Product Manager, HR, Analyst, and more — with role-specific interview questions.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. Your interview data and responses are encrypted and never shared with third parties. We prioritize your privacy and security.",
    },
    {
      question: "Can freshers use MockMate AI?",
      answer:
        "Yes, MockMate AI is perfect for freshers to build confidence, structure answers, and practice interviews safely.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-32">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),transparent_60%)]" />

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white">
            Common {" "}
            <span className="bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="mt-6 text-lg text-gray-300">
            Everything you need to know about MockMate AI
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden transition-all"
              >
                {/* Question */}
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-lg font-medium text-white">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 text-indigo-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 pb-5" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
