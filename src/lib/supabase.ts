import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  (typeof import.meta !== 'undefined' && (import.meta.env?.VITE_SUPABASE_URL || import.meta.env?.NEXT_PUBLIC_SUPABASE_URL)) ||
  process.env.VITE_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://fflqsgztcbklxjxafgii.supabase.co';

const supabaseAnonKey =
  (typeof import.meta !== 'undefined' && (import.meta.env?.VITE_SUPABASE_ANON_KEY || import.meta.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY)) ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'sb_publishable_iHAmh_29GrAQ25TY5gAG3Q_h_GwDqO-';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export { supabaseUrl, supabaseAnonKey };
