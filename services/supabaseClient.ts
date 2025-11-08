import { createClient } from '@supabase/supabase-js';

// Use environment variables if available, otherwise fall back to placeholders
// to prevent the app from crashing if they are not set.
const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'placeholderkey';

if (supabaseUrl === 'https://placeholder.supabase.co') {
  console.warn(
    "Supabase credentials are not configured. The application will not function correctly without them. " +
    "Please set SUPABASE_URL and SUPABASE_ANON_KEY in your environment variables."
  );
}


export const supabase = createClient(supabaseUrl, supabaseAnonKey);