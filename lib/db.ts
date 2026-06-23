import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { randomBytes } from 'crypto';

export function generateId() { return randomBytes(8).toString('hex'); }

// ── Types ──────────────────────────────────────────────────────────
export interface Product {
  id: string; slug: string; title: string; company: string;
  category: 'hedge-fund' | 'rwa' | 'token-sale' | 'private-equity';
  stage: string; status: 'open' | 'closed' | 'coming-soon';
  targetRaise: number; raisedAmount: number; minInvestment: number;
  currency: 'USD' | 'USDT' | 'ETH';
  acceptedPayments: ('stripe' | 'usdt' | 'eth' | 'bnb')[];
  description: string; longDescription: string; highlights: string[];
  riskLevel: 'low' | 'medium' | 'high'; expectedReturn: string;
  investorCount: number; deadline: string; logoUrl: string;
  bannerUrl: string; featured: boolean; createdAt: string; updatedAt: string;
}
export interface Investment {
  id: string; productId: string; userId: string; userEmail: string;
  userName: string; amount: number; currency: 'USD' | 'USDT' | 'ETH' | 'BNB';
  paymentMethod: 'stripe' | 'usdt' | 'eth' | 'bnb';
  paymentStatus: 'pending' | 'confirmed' | 'failed' | 'refunded';
  txHash?: string; stripePaymentId?: string; walletAddress?: string;
  createdAt: string; updatedAt: string;
}
export interface SiteConfig {
  heroTitle: string; heroSubtitle: string; heroCta: string;
  announcementBanner: string; announcementEnabled: boolean;
  featuredProductIds: string[]; maintenanceMode: boolean; updatedAt: string;
}

// ── Supabase helpers ───────────────────────────────────────────────
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  try {
    const { createClient } = require('@supabase/supabase-js');
    return createClient(url, key);
  } catch { return null; }
}

function toProduct(r: Record<string, unknown>): Product {
  return {
    id: String(r.id), slug: String(r.slug), title: String(r.title),
    company: String(r.company || ''), category: (r.category as Product['category']) || 'hedge-fund',
    stage: String(r.stage || ''), status: (r.status as Product['status']) || 'open',
    targetRaise: Number(r.target_raise || 0), raisedAmount: Number(r.raised_amount || 0),
    minInvestment: Number(r.min_investment || 5000), currency: (r.currency as Product['currency']) || 'USD',
    acceptedPayments: (r.accepted_payments as string[] || ['stripe']),
    description: String(r.description || ''), longDescription: String(r.long_description || ''),
    highlights: (r.highlights as string[] || []), riskLevel: (r.risk_level as Product['riskLevel']) || 'medium',
    expectedReturn: String(r.expected_return || ''), investorCount: Number(r.investor_count || 0),
    deadline: String(r.deadline || ''), logoUrl: String(r.logo_url || ''),
    bannerUrl: String(r.banner_url || ''), featured: Boolean(r.featured),
    createdAt: String(r.created_at || new Date().toISOString()),
    updatedAt: String(r.updated_at || new Date().toISOString()),
  };
}

function toInvestment(r: Record<string, unknown>): Investment {
  return {
    id: String(r.id), productId: String(r.product_id || ''),
    userId: String(r.user_id || ''), userEmail: String(r.user_email || ''),
    userName: String(r.user_name || ''), amount: Number(r.amount || 0),
    currency: (r.currency as Investment['currency']) || 'USD',
    paymentMethod: (r.payment_method as Investment['paymentMethod']) || 'stripe',
    paymentStatus: (r.payment_status as Investment['paymentStatus']) || 'pending',
    txHash: r.tx_hash ? String(r.tx_hash) : undefined,
    stripePaymentId: r.stripe_payment_id ? String(r.stripe_payment_id) : undefined,
    walletAddress: r.wallet_address ? String(r.wallet_address) : undefined,
    createdAt: String(r.created_at || new Date().toISOString()),
    updatedAt: String(r.updated_at || new Date().toISOString()),
  };
}

// ── File-based fallback ────────────────────────────────────────────
const DB_PATH = join(process.cwd(), 'data', 'db.json');

interface FileDB { products: Product[]; investments: Investment[]; siteConfig: SiteConfig; }

function readFile(): FileDB {
  try {
    if (existsSync(DB_PATH)) return JSON.parse(readFileSync(DB_PATH, 'utf-8')) as FileDB;
  } catch {}
  return { products: [], investments: [], siteConfig: { heroTitle: 'The bridge between institutional capital and digital assets', heroSubtitle: '', heroCta: 'Apply for early access', announcementBanner: '', announcementEnabled: true, featuredProductIds: [], maintenanceMode: false, updatedAt: new Date().toISOString() } };
}

function writeFile(data: FileDB) {
  try {
    const dir = join(process.cwd(), 'data');
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (e) { console.error('DB write error:', e); }
}

// ── Main db object ─────────────────────────────────────────────────
export const db = {
  getProducts: async (): Promise<Product[]> => {
    const sb = getSupabase();
    if (sb) {
      const { data, error } = await sb.from('products').select('*').order('created_at', { ascending: false });
      if (!error && data) return data.map(toProduct);
    }
    return readFile().products;
  },

  getProduct: async (id: string): Promise<Product | null> => {
    const sb = getSupabase();
    if (sb) {
      const { data } = await sb.from('products').select('*').or('id.eq.' + id + ',slug.eq.' + id).single();
      if (data) return toProduct(data as Record<string, unknown>);
      return null;
    }
    return readFile().products.find(p => p.id === id || p.slug === id) || null;
  },

  createProduct: async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    const now = new Date().toISOString();
    const newId = 'prod_' + generateId();
    const sb = getSupabase();
    if (sb) {
      const row = { id: newId, slug: product.slug, title: product.title, company: product.company, category: product.category, stage: product.stage, status: product.status, target_raise: product.targetRaise, raised_amount: product.raisedAmount, min_investment: product.minInvestment, currency: product.currency, accepted_payments: product.acceptedPayments, description: product.description, long_description: product.longDescription, highlights: product.highlights, risk_level: product.riskLevel, expected_return: product.expectedReturn, investor_count: product.investorCount, deadline: product.deadline, logo_url: product.logoUrl, banner_url: product.bannerUrl, featured: product.featured, created_at: now, updated_at: now };
      const { data, error } = await sb.from('products').insert(row).select().single();
      if (!error && data) return toProduct(data as Record<string, unknown>);
    }
    const file = readFile();
    const p: Product = { ...product, id: newId, createdAt: now, updatedAt: now };
    file.products.push(p);
    writeFile(file);
    return p;
  },

  updateProduct: async (id: string, updates: Partial<Product>): Promise<Product | null> => {
    const now = new Date().toISOString();
    const sb = getSupabase();
    if (sb) {
      const row: Record<string, unknown> = { updated_at: now };
      if (updates.title !== undefined) row.title = updates.title;
      if (updates.slug !== undefined) row.slug = updates.slug;
      if (updates.company !== undefined) row.company = updates.company;
      if (updates.category !== undefined) row.category = updates.category;
      if (updates.stage !== undefined) row.stage = updates.stage;
      if (updates.status !== undefined) row.status = updates.status;
      if (updates.targetRaise !== undefined) row.target_raise = updates.targetRaise;
      if (updates.raisedAmount !== undefined) row.raised_amount = updates.raisedAmount;
      if (updates.minInvestment !== undefined) row.min_investment = updates.minInvestment;
      if (updates.currency !== undefined) row.currency = updates.currency;
      if (updates.acceptedPayments !== undefined) row.accepted_payments = updates.acceptedPayments;
      if (updates.description !== undefined) row.description = updates.description;
      if (updates.longDescription !== undefined) row.long_description = updates.longDescription;
      if (updates.highlights !== undefined) row.highlights = updates.highlights;
      if (updates.riskLevel !== undefined) row.risk_level = updates.riskLevel;
      if (updates.expectedReturn !== undefined) row.expected_return = updates.expectedReturn;
      if (updates.investorCount !== undefined) row.investor_count = updates.investorCount;
      if (updates.deadline !== undefined) row.deadline = updates.deadline;
      if (updates.logoUrl !== undefined) row.logo_url = updates.logoUrl;
      if (updates.bannerUrl !== undefined) row.banner_url = updates.bannerUrl;
      if (updates.featured !== undefined) row.featured = updates.featured;
      const { data, error } = await sb.from('products').update(row).eq('id', id).select().single();
      if (!error && data) return toProduct(data as Record<string, unknown>);
      return null;
    }
    const file = readFile();
    const idx = file.products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    file.products[idx] = { ...file.products[idx], ...updates, updatedAt: now };
    writeFile(file);
    return file.products[idx];
  },

  deleteProduct: async (id: string): Promise<boolean> => {
    const sb = getSupabase();
    if (sb) {
      const { error } = await sb.from('products').delete().eq('id', id);
      return !error;
    }
    const file = readFile();
    const before = file.products.length;
    file.products = file.products.filter(p => p.id !== id);
    if (file.products.length < before) { writeFile(file); return true; }
    return false;
  },

  getInvestments: async (): Promise<Investment[]> => {
    const sb = getSupabase();
    if (sb) {
      const { data, error } = await sb.from('investments').select('*').order('created_at', { ascending: false });
      if (!error && data) return data.map(r => toInvestment(r as Record<string, unknown>));
    }
    return readFile().investments;
  },

  createInvestment: async (inv: Omit<Investment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Investment> => {
    const now = new Date().toISOString();
    const newId = 'inv_' + generateId();
    const sb = getSupabase();
    if (sb) {
      const row = { id: newId, product_id: inv.productId, user_id: inv.userId, user_email: inv.userEmail, user_name: inv.userName, amount: inv.amount, currency: inv.currency, payment_method: inv.paymentMethod, payment_status: inv.paymentStatus, tx_hash: inv.txHash, wallet_address: inv.walletAddress, created_at: now, updated_at: now };
      const { data, error } = await sb.from('investments').insert(row).select().single();
      if (!error && data) return toInvestment(data as Record<string, unknown>);
    }
    const file = readFile();
    const newInv: Investment = { ...inv, id: newId, createdAt: now, updatedAt: now };
    file.investments.push(newInv);
    writeFile(file);
    return newInv;
  },

  updateInvestment: async (id: string, updates: Partial<Investment>): Promise<Investment | null> => {
    const now = new Date().toISOString();
    const sb = getSupabase();
    if (sb) {
      const row: Record<string, unknown> = { updated_at: now };
      if (updates.paymentStatus !== undefined) row.payment_status = updates.paymentStatus;
      if (updates.txHash !== undefined) row.tx_hash = updates.txHash;
      if (updates.stripePaymentId !== undefined) row.stripe_payment_id = updates.stripePaymentId;
      const { data, error } = await sb.from('investments').update(row).eq('id', id).select().single();
      if (!error && data) return toInvestment(data as Record<string, unknown>);
      return null;
    }
    const file = readFile();
    const idx = file.investments.findIndex(i => i.id === id);
    if (idx === -1) return null;
    file.investments[idx] = { ...file.investments[idx], ...updates, updatedAt: now };
    writeFile(file);
    return file.investments[idx];
  },

  getSiteConfig: async (): Promise<SiteConfig> => {
    const sb = getSupabase();
    if (sb) {
      const { data } = await sb.from('site_config').select('*').eq('id', 1).single();
      if (data) {
        const r = data as Record<string, unknown>;
        return { heroTitle: String(r.hero_title || ''), heroSubtitle: String(r.hero_subtitle || ''), heroCta: String(r.hero_cta || 'Apply for early access'), announcementBanner: String(r.announcement_banner || ''), announcementEnabled: Boolean(r.announcement_enabled), featuredProductIds: (r.featured_product_ids as string[] || []), maintenanceMode: Boolean(r.maintenance_mode), updatedAt: String(r.updated_at || now) };
      }
    }
    return readFile().siteConfig;
  },

  updateSiteConfig: async (updates: Partial<SiteConfig>): Promise<SiteConfig> => {
    const now = new Date().toISOString();
    const sb = getSupabase();
    if (sb) {
      const row: Record<string, unknown> = { updated_at: now };
      if (updates.heroTitle !== undefined) row.hero_title = updates.heroTitle;
      if (updates.heroSubtitle !== undefined) row.hero_subtitle = updates.heroSubtitle;
      if (updates.heroCta !== undefined) row.hero_cta = updates.heroCta;
      if (updates.announcementBanner !== undefined) row.announcement_banner = updates.announcementBanner;
      if (updates.announcementEnabled !== undefined) row.announcement_enabled = updates.announcementEnabled;
      if (updates.maintenanceMode !== undefined) row.maintenance_mode = updates.maintenanceMode;
      await sb.from('site_config').update(row).eq('id', 1);
    }
    const file = readFile();
    file.siteConfig = { ...file.siteConfig, ...updates, updatedAt: now };
    writeFile(file);
    return file.siteConfig;
  },
};
