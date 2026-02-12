import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  prompt_template: string;
  tags: string[];
  is_premium: boolean;
  popularity_score: number;
  created_at: string;
}
