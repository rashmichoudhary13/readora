// src/context/SupabaseProvider.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lmwevgyaaxhfoahsgmhi.supabase.co';  // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxtd2V2Z3lhYXhoZm9haHNnbWhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMTEzNzQsImV4cCI6MjA1OTg4NzM3NH0.EcrMAiAnfw-Ks7BQPP7t1b3ZclvWaEUitc6eLGHU6r8'; // Replace with your anon key
export const supabase = createClient(supabaseUrl, supabaseKey);
