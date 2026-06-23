// lib/supabase.ts - Supabase client wrapper
// Setup: add NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY to Vercel env vars
// Falls back to file-based db.ts when env vars are not set

export const isSupabaseConfigured = () =>
  !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

let _client: any = null;

export function getSupabaseClient() {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  try {
    const { createClient } = require('@supabase/supabase-js');
    _client = createClient(url, key);
    return _client;
  } catch {
    return null;
  }
}

// Supabase SQL schema - paste into Supabase SQL Editor to set up tables:
// https://supabase.com/dashboard > SQL Editor > New Query
//
// CREATE TABLE IF NOT EXISTS products (
//   id TEXT PRIMARY KEY,
//   slug TEXT UNIQUE NOT NULL,
//   title TEXT NOT NULL,
//   company TEXT,
//   category TEXT,
//   stage TEXT,
//   status TEXT DEFAULT 'open',
//   target_raise BIGINT DEFAULT 0,
//   raised_amount BIGINT DEFAULT 0,
//   min_investment BIGINT DEFAULT 5000,
//   currency TEXT DEFAULT 'USD',
//   accepted_payments TEXT[] DEFAULT '{stripe,usdt}',
//   description TEXT,
//   long_description TEXT,
//   highlights TEXT[] DEFAULT '{}',
//   risk_level TEXT DEFAULT 'medium',
//   expected_return TEXT,
//   investor_count INT DEFAULT 0,
//   deadline TEXT,
//   logo_url TEXT,
//   banner_url TEXT,
//   featured BOOLEAN DEFAULT false,
//   created_at TIMESTAMPTZ DEFAULT NOW(),
//   updated_at TIMESTAMPTZ DEFAULT NOW()
// );
//
// CREATE TABLE IF NOT EXISTS investments (
//   id TEXT PRIMARY KEY,
//   product_id TEXT,
//   user_id TEXT,
//   user_email TEXT NOT NULL,
//   user_name TEXT,
//   amount BIGINT NOT NULL,
//   currency TEXT DEFAULT 'USD',
//   payment_method TEXT NOT NULL,
//   payment_status TEXT DEFAULT 'pending',
//   tx_hash TEXT,
//   stripe_payment_id TEXT,
//   wallet_address TEXT,
//   created_at TIMESTAMPTZ DEFAULT NOW(),
//   updated_at TIMESTAMPTZ DEFAULT NOW()
// );
//
// CREATE TABLE IF NOT EXISTS site_config (
//   id INT PRIMARY KEY DEFAULT 1,
//   hero_title TEXT DEFAULT 'The bridge between institutional capital and digital assets',
//   hero_subtitle TEXT DEFAULT '',
//   hero_cta TEXT DEFAULT 'Apply for early access',
//   announcement_banner TEXT DEFAULT '',
//   announcement_enabled BOOLEAN DEFAULT true,
//   featured_product_ids TEXT[] DEFAULT '{}',
//   maintenance_mode BOOLEAN DEFAULT false,
//   updated_at TIMESTAMPTZ DEFAULT NOW()
// );
//
// INSERT INTO site_config (id) VALUES (1) ON CONFLICT DO NOTHING;
//
// ALTER TABLE products ENABLE ROW LEVEL SECURITY;
// ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
// ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
// CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
// CREATE POLICY "Public insert products" ON products FOR INSERT WITH CHECK (true);
// CREATE POLICY "Public update products" ON products FOR UPDATE USING (true);
// CREATE POLICY "Public delete products" ON products FOR DELETE USING (true);
// CREATE POLICY "Public read site_config" ON site_config FOR SELECT USING (true);
// CREATE POLICY "Public update site_config" ON site_config FOR UPDATE USING (true);
// CREATE POLICY "Public insert investments" ON investments FOR INSERT WITH CHECK (true);
// CREATE POLICY "Public read investments" ON investments FOR SELECT USING (true);
// CREATE POLICY "Public update investments" ON investments FOR UPDATE USING (true);
