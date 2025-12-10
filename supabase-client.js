/* supabase-client.js */
const SUPABASE_URL = 'https://fanenkifbftqonyviqjo.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhbmVua2lmYmZ0cW9ueXZpcWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMjY4ODMsImV4cCI6MjA4MDgwMjg4M30.MQ-jk_kcvLBL8tQLI_7AMFynskAYpYmmrMM4e2TduS4';

// 1. Initialize the client using a different name first to avoid the conflict
const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. Overwrite the global 'supabase' variable so other files can use it easily
window.supabase = client;
