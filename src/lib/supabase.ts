/// <reference types="vite/client" />
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;
let currentUrl: string | null = null;
let currentKey: string | null = null;

export const getSupabase = (url?: string, key?: string): SupabaseClient | null => {
  const finalUrl = url || import.meta.env.VITE_SUPABASE_URL;
  const finalKey = key || import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!finalUrl || !finalKey) {
    return null;
  }

  // Trim any /rest/v1 or trailing slashes that users might paste by accident
  const cleanUrl = finalUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');

  if (supabaseInstance && currentUrl === cleanUrl && currentKey === finalKey) {
    return supabaseInstance;
  }

  currentUrl = cleanUrl;
  currentKey = finalKey;
  supabaseInstance = createClient(cleanUrl, finalKey);

  return supabaseInstance;
};

