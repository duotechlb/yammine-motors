// src/supabase.js
import { createClient } from '@supabase/supabase-js'

// Replace with your actual values from Supabase
const SUPABASE_URL = 'https://paxgetrvihjdrfhfwbyh.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBheGdldHJ2aWhqZHJmaGZ3YnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMjczOTAsImV4cCI6MjA4NzYwMzM5MH0.7vWEOA48Jf_Lx2tWlk3wXtxbIgq4mOKU4NHNqcqwe9s'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)