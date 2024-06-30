import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (supabaseUrl === undefined || supabaseKey === undefined) {
  throw new Error("Missing env variables for Supabase");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
