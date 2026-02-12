"use client";

import { useState, useEffect } from "react";
import { Sparkles, ChevronDown } from "lucide-react";
import PromptLibrary from "@/components/PromptLibrary";
import Link from "next/link";

export default function HomePage() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const rotatingTexts = [
    "YouTube video idea",
    "fitness transformation plan",
    "side hustle blueprint",
    "career advancement strategy",
    "content creation system",
    "learning roadmap"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
        setIsTransitioning(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-red-600" />
            <span className="text-xl font-bold text-gray-900">
              Prompt Bank Pro
            </span>
          </div>

          <div className="flex gap-4">
            <Link href="/dashboard">
              <button className="px-4 py-2 bg-red-600 text-white rounded-full">
                Create prompt
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="text-center pt-20">
        <h1 className="text-6xl font-bold mb-4">Get your next</h1>

        <div className="h-[100px] flex items-center justify-center mb-8">
          <h2
            className={`text-5xl font-bold text-amber-600 transition-opacity duration-300 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            {rotatingTexts[currentTextIndex]}
          </h2>
        </div>

        <PromptLibrary />
      </main>
    </div>
  );
}
