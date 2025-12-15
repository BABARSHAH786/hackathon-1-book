import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://dqsgypdzwogixwthszvb.supabase.co"; // apna project URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxc2d5cGR6d29naXh3dGhzenZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NDgwNDQsImV4cCI6MjA3ODAyNDA0NH0.N74gPsJGxHPAUbqfJmOl9YPYh2npRezFwLrgmf6K9iE";               // apni anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
