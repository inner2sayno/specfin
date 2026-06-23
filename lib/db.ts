import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { randomBytes } from 'crypto';

export function generateId() {
  return randomBytes(8).toString('hex');
}

const DB_PATH = join(process.cwd(), 'data', 'db.json');

export interface Product {
  id: string;
  slug: string;
  title: string;
  company: string;
  category: 'hedge-fund' | 'rwa' | 'token-sale' | 'private-equity';
  stage: string;
  status: 'open' | 'closed' | 'coming-soon';
  targetRaise: number;
  raisedAmount: number;
  minInvestment: number;
  currency: 'USD' | 'USDT' | 'ETH';
  acceptedPayments: ('stripe' | 'usdt' | 'eth' | 'bnb')[];
  description: string;
  longDescription: string;
  highlights: string[];
  riskLevel: 'low' | 'medium' | 'high';
  expectedReturn: string;
  investorCount: number;
  deadline: string;
  logoUrl: string;
  bannerUrl: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Investment {
  id: string;
  productId: string;
  userId: string;
  userEmail: string;
  userName: string;
  amount: number;
  currency: 'USD' | 'USDT' | 'ETH' | 'BNB';
  paymentMethod: 'stripe' | 'usdt' | 'eth' | 'bnb';
  paymentStatus: 'pending' | 'confirmed' | 'failed' | 'refunded';
  txHash?: string;
  stripePaymentId?: string;
  walletAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteConfig {
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  announcementBanner: string;
  announcementEnabled: boolean;
  featuredProductIds: string[];
  maintenanceMode: boolean;
  updatedAt: string;
}

interface DB {
  products: Product[];
  investments: Investment[];
  siteConfig: SiteConfig;
}

function readDB(): DB {
  try {
    if (existsSync(DB_PATH)) {
      const raw = readFileSync(DB_PATH, 'utf-8');
      return JSON.parse(raw) as DB;
    }
  } catch (e) {
    console.error('DB read error:', e);
  }
  return {
    products: [],
    investments: [],
    siteConfig: {
      heroTitle: 'The bridge between institutional capital and digital assets',
      heroSubtitle: '',
      heroCta: 'Apply for early access',
      announcementBanner: '',
      announcementEnabled: false,
      featuredProductIds: [],
      maintenanceMode: false,
      updatedAt: new Date().toISOString(),
    },
  };
}

function writeDB(data: DB): void {
  try {
    const dir = join(process.cwd(), 'data');
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('DB write error:', e);
  }
}

export const db = {
  getProducts: (): Product[] => readDB().products,
  getProduct: (id: string): Product | null => {
    return readDB().products.find(p => p.id === id || p.slug === id) || null;
  },
  createProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product => {
    const data = readDB();
    const newProduct: Product = {
      ...product,
      id: 'prod_' + generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    data.products.push(newProduct);
    writeDB(data);
    return newProduct;
  },
  updateProduct: (id: string, updates: Partial<Product>): Product | null => {
    const data = readDB();
    const idx = data.products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    data.products[idx] = { ...data.products[idx], ...updates, updatedAt: new Date().toISOString() };
    writeDB(data);
    return data.products[idx];
  },
  deleteProduct: (id: string): boolean => {
    const data = readDB();
    const before = data.products.length;
    data.products = data.products.filter(p => p.id !== id);
    if (data.products.length < before) { writeDB(data); return true; }
    return false;
  },
  getInvestments: (): Investment[] => readDB().investments,
  getInvestmentsByProduct: (productId: string): Investment[] =>
    readDB().investments.filter(i => i.productId === productId),
  createInvestment: (inv: Omit<Investment, 'id' | 'createdAt' | 'updatedAt'>): Investment => {
    const data = readDB();
    const newInv: Investment = {
      ...inv,
      id: 'inv_' + generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    data.investments.push(newInv);
    if (inv.paymentStatus === 'confirmed') {
      const productIdx = data.products.findIndex(p => p.id === inv.productId);
      if (productIdx !== -1) {
        data.products[productIdx].raisedAmount += inv.amount;
        data.products[productIdx].investorCount += 1;
      }
    }
    writeDB(data);
    return newInv;
  },
  updateInvestment: (id: string, updates: Partial<Investment>): Investment | null => {
    const data = readDB();
    const idx = data.investments.findIndex(i => i.id === id);
    if (idx === -1) return null;
    const old = data.investments[idx];
    data.investments[idx] = { ...old, ...updates, updatedAt: new Date().toISOString() };
    if (old.paymentStatus !== 'confirmed' && updates.paymentStatus === 'confirmed') {
      const productIdx = data.products.findIndex(p => p.id === old.productId);
      if (productIdx !== -1) {
        data.products[productIdx].raisedAmount += old.amount;
        data.products[productIdx].investorCount += 1;
      }
    }
    writeDB(data);
    return data.investments[idx];
  },
  getSiteConfig: (): SiteConfig => readDB().siteConfig,
  updateSiteConfig: (updates: Partial<SiteConfig>): SiteConfig => {
    const data = readDB();
    data.siteConfig = { ...data.siteConfig, ...updates, updatedAt: new Date().toISOString() };
    writeDB(data);
    return data.siteConfig;
  },
};
