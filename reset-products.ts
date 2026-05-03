import { createClient } from '@supabase/supabase-js';
import { PRODUCTS } from './src/data/products';
import crypto from 'crypto';

const supabaseUrl = 'https://xwfxpjwcqddavwzsfoct.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3ZnhwandjcWRkYXZ3enNmb2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MTcyODAsImV4cCI6MjA5MzI5MzI4MH0.YoUeWmP6BFjyi5mSj2zmIUZ3foqnqmJ1BXBonMVWEac';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  const mapped = PRODUCTS.map((p) => ({
    id: crypto.randomUUID(),
    name: p.name,
    price: Number(p.price) || 0,
    description: p.description || "",
    image: p.images && p.images.length > 0 ? p.images[0] : "",
    created_at: new Date().toISOString()
  }));

  const { data, error } = await supabase.from('products').insert(mapped).select();
  console.log("Insert response:", data);
  console.log("Error:", error);
}

main();
