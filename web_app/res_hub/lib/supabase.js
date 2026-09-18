import { createClient } from '@supabase/supabase-js';

// Vite only exposes env vars prefixed with VITE_ to client code, and it
// reads them from import.meta.env — process.env is not available in the
// browser bundle. Rename the keys in your .env file to match.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        'Missing Supabase environment variables'
    );
}

export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
        },
    }
);