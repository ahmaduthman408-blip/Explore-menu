import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xwfxpjwcqddavwzsfoct.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3ZnhwandjcWRkYXZ3enNmb2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MTcyODAsImV4cCI6MjA5MzI5MzI4MH0.YoUeWmP6BFjyi5mSj2zmIUZ3foqnqmJ1BXBonMVWEac';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  const { data, error } = await supabase.from('products').select('*');
  console.log("DB Data:", JSON.stringify(data, null, 2));
  console.log("Error:", error);
}

main();
