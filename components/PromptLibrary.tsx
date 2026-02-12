import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { supabase, PromptTemplate } from '../lib/supabase';

interface PromptLibraryProps {
  onSelectPrompt: (idea: string) => void;
}

export default function PromptLibrary({ onSelectPrompt }: PromptLibraryProps) {
  const [prompts, setPrompts] = useState<PromptTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    loadPrompts();
  }, []);

  const loadPrompts = async () => {
    try {
      const { data, error } = await supabase
        .from('prompt_templates')
        .select('*')
        .order('popularity_score', { ascending: false })
        .limit(6);

      if (error) throw error;
      setPrompts(data || []);
    } catch (error) {
      console.error('Error loading prompts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryGradient = (category: string) => {
    const gradients: Record<string, string> = {
      'Money / Side Hustle': 'from-emerald-400 to-green-500',
      'Career / Job': 'from-blue-400 to-indigo-500',
      'Fitness / Health': 'from-rose-400 to-red-500',
      'Learning / Skill': 'from-amber-400 to-orange-500',
      'Content Creation': 'from-pink-400 to-rose-500',
      'Business / Startup': 'from-orange-400 to-red-500',
      'Personal Finance': 'from-teal-400 to-cyan-500',
      'Productivity': 'from-sky-400 to-blue-500'
    };
    return gradients[category] || 'from-gray-400 to-gray-500';
  };

  if (loading) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 pb-8">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {prompts.map((prompt) => (
          <div
            key={prompt.id}
            className="break-inside-avoid mb-6"
            onMouseEnter={() => setHoveredId(prompt.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <button
              onClick={() => onSelectPrompt(prompt.title)}
              className="w-full bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group relative"
            >
              <div className={`h-48 bg-gradient-to-br ${getCategoryGradient(prompt.category)} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
                {hoveredId === prompt.id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-red-600 text-white px-5 py-3 rounded-full font-semibold flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Create prompt
                    </div>
                  </div>
                )}
              </div>
              <div className="p-5 text-left">
                <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2">
                  {prompt.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {prompt.description}
                </p>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
