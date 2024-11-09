// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://zxyawcxvohlcwpffjxmn.supabase.co';
export const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4eWF3Y3h2b2hsY3dwZmZqeG1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwODYwMDksImV4cCI6MjA0NjY2MjAwOX0.-VhYMEohnw2PbGgIehHHsyOHuc0us0hKn8nWRFa8Os4";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

