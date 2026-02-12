"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-red-600" />
          <span className="text-xl font-bold text-gray-900">
            Prompt Bank Pro
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <button className="px-4 py-2 text-gray-900 font-semibold hover:bg-gray-100 rounded-full">
              Create prompt
            </button>
          </Link>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 bg-red-600 text-white rounded-full">
                Sign up
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
