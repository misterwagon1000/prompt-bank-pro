"use client";

import { useState, useEffect } from "react";
import { Sparkles, Copy, Check } from "lucide-react";

interface ExpandedPrompt {
  role: string;
  objective: string;
  context: string;
  constraints: string;
  outputFormat: string;
  assumptions: string;
  followUpStrategy: string;
}

interface PromptExpanderProps {
  initialIdea?: string;
}

export default function PromptExpander({
  initialIdea = "",
}: PromptExpanderProps) {
  const [idea, setIdea] = useState(initialIdea);
  const [expandedPrompt, setExpandedPrompt] =
    useState<ExpandedPrompt | null>(null);
  const [isExpanding, setIsExpanding] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialIdea && initialIdea !== idea) {
      setIdea(initialIdea);
      expandPrompt(initialIdea);
    }
  }, [initialIdea]);

  const expandPrompt = (ideaOverride?: string) => {
    const currentIdea = ideaOverride ?? idea;

    if (!currentIdea.trim()) return;

    setIsExpanding(true);

    setTimeout(() => {
      const expanded: ExpandedPrompt = {
        role:
          "You are an expert advisor and strategist with years of practical experience helping people achieve tangible results.",
        objective: `Your task is to help me ${currentIdea.trim()}. Provide actionable, specific guidance that I can implement immediately.`,
        context:
          "I'm looking for practical advice that works in real-world scenarios. I want clear steps, not generic theory.",
        constraints: `- Work within realistic time and budget constraints
- Focus on proven methods and strategies
- Prioritize quick wins alongside long-term strategies
- Consider common obstacles and provide solutions`,
        outputFormat: `Provide your response in this format:
1. **Immediate Action Steps** (What I can do today)
2. **30-Day Plan** (Milestones and weekly goals)
3. **Key Resources** (Tools, platforms, or learning materials)
4. **Common Pitfalls** (What to avoid)
5. **Success Metrics** (How to measure progress)`,
        assumptions: `- Assume I'm a beginner unless I specify otherwise
- Assume I have access to basic tools and internet
- Assume I'm committed but need clear direction`,
        followUpStrategy:
          "After providing your initial response, ask me 3-5 clarifying questions to refine the strategy based on my specific situation, experience level, and constraints.",
      };

      setExpandedPrompt(expanded);
      setIsExpanding(false);
    }, 800);
  };

  const getFullPrompt = () => {
    if (!expandedPrompt) return "";

    return `**ROLE:** ${expandedPrompt.role}

**OBJECTIVE:** ${expandedPrompt.objective}

**CONTEXT:** ${expandedPrompt.context}

**CONSTRAINTS:**
${expandedPrompt.constraints}

**OUTPUT FORMAT:**
${expandedPrompt.outputFormat}

**ASSUMPTIONS:**
${expandedPrompt.assumptions}

**FOLLOW-UP STRATEGY:**
${expandedPrompt.followUpStrategy}`;
  };

  const copyToClipboard = async () => {
    if (typeof window === "undefined") return;

    try {
      await navigator.clipboard.writeText(getFullPrompt());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <div className="bg-white rounded-3xl shadow-md p-8 border border-gray-200">
        <div className="space-y-6">
          <div>
            <label className="block text-base font-semibold text-gray-900 mb-3">
              What do you want AI to help with?
            </label>

            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Example: Help me start a YouTube channel, Create a fitness plan, Build a side hustle..."
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-gray-400 focus:outline-none text-gray-900 placeholder-gray-400 min-h-[120px] resize-none text-lg"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  expandPrompt();
                }
              }}
            />
          </div>

          <button
            onClick={() => expandPrompt()}
            disabled={!idea.trim() || isExpanding}
            className="w-full bg-red-600 text-white font-bold py-4 px-6 rounded-full hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 text-lg shadow-md"
          >
            <Sparkles className="w-5 h-5" />
            {isExpanding ? "Creating..." : "Create Pro Prompt"}
          </button>
        </div>
      </div>

      {expandedPrompt && (
        <div className="bg-white rounded-3xl shadow-md p-8 border border-gray-200">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Your Pro Prompt
            </h3>

            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2.5 px-5 rounded-full transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-5 text-sm border border-gray-200">
            {Object.entries(expandedPrompt).map(([key, value]) => (
              <div key={key}>
                <p className="font-bold text-gray-900 mb-2 text-sm">
                  {key.toUpperCase()}:
                </p>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-amber-50 rounded-2xl p-5 border border-amber-200">
            <p className="text-sm text-gray-800">
              <span className="font-bold">Next Step:</span> Copy this prompt and
              paste it into ChatGPT, Claude, or your preferred AI tool for best
              results.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
