import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://tuexwtnajltdyxhewrys.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1ZXh3dG5hamx0ZHl4aGV3cnlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTExMTczMTMsImV4cCI6MjAyNjY5MzMxM30.fbWqf4JedxTYHAmtpne2XgjURrYwSkjJXV736aHAQ1s";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
