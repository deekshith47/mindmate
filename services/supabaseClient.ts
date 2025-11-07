import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Replace with your actual Supabase URL and Anon Key for production.
// You can find these in your Supabase project settings.
const supabaseUrl = 'https://app-id.supabase.co'.replace('app-id', '925728af-0358-42ae-8596-776676330d3b');
// Using a public demo key.
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

if (!supabaseUrl || supabaseUrl.includes('app-id')) {
    console.warn("Supabase URL is not configured. Data persistence will not work. Please add your credentials to services/supabaseClient.ts");
}


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        // Automatically refresh the session token
        autoRefreshToken: true,
        // Persist the session in local storage
        persistSession: true,
        // Detect when the session is restored from local storage
        detectSessionInUrl: false,
    },
});
