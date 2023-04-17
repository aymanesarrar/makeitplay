import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "./config";

export const SUPABSE_URL = supabaseConfig.supabase_url;
export const SUPABASE_ANON_KEY = supabaseConfig.supabase_anon_key;

export const supabase = createClient(SUPABSE_URL, SUPABASE_ANON_KEY);
