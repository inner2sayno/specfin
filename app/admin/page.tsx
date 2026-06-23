'use client';
import { useState, useEffect, useCallback } from 'react';

const ADMIN_KEY = 'specfin-admin-2025';

interface Product {
  id: string; slug: string; title: string; company: string;
  category: string; stage: string; status: string;
  targetRaise: number; raisedAmount: number; minInvestment: number;
  currency: string; acceptedPayments: string[];
  description: string; longDescription: string; highlights: string[];
  riskLevel: string; expectedReturn: string; investorCount: number;
  deadline: string; logoUrl: string; bannerUrl: string; featured: boolean;
  createdAt: string; updatedAt: string;
}
interface Investment {
  id: string; productId: string; userEmail: string; userName: string;
  amount: number; currency: string; paymentMethod: string;
  paymentStatus: string; txHash?: string; walletAddress?: string;
  createdAt: string;
}
interface SiteConfig {
  heroTitle: string; heroSubtitle: string; heroCta: string;
  announcementBanner: string; announcementEnabled: boolean;
  maintenanceMode: boolean; updatedAt: string;
  [key: string]: string | boolean;
}

type Tab = 'overview' | 'products' | 'investments' | 'site-config';

const EMPTY_PRODUCT: Partial<Product> = {
  title: '', company: 'Specfin Technologies', category: 'hedge-fund',
  stage: 'PHASE 1', status: 'open', targetRaise: 1000000, raisedAmount: 0,
  minInvestment: 5000, currency: 'USD', acceptedPayments: ['stripe', 'usdt'],
  description: '', longDescription: '', highlights: [],
  riskLevel: 'medium', expectedReturn: '', investorCount: 0,
  deadline: '', logoUrl: '/logos/specfin.png', bannerUrl: '/home/invest/banner.png',
  featured: false, slug: '',
};

function slugify(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('overview');
  const [products, setProducts] = useState<Product[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState<Partial<Product> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [hlInput, setHlInput] = useState('');

  const H = { 'Content-Type': 'application/json', 'x-admin-key': ADMIN_KEY };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [pR, iR, cR] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/investments', { headers: H }),
        fetch('/api/admin/config', { headers: H }),
      ]);
      const p = await pR.json();
      const i = iR.ok ? await iR.json() : { investments: [] };
      const c = cR.ok ? await cR.json() : { config: null };
      setProducts(p.products || []);
      setInvestments(i.investments || []);
      setConfig(c.config || null);
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const saveProduct = async () => {
    if (!editProduct) return;
    const slug = editProduct.slug || slugify(editProduct.title || '');
    const res = await fetch(isNew ? '/api/products' : '/api/products/' + editProduct.id, {
      method: isNew ? 'POST' : 'PUT', headers: H, body: JSON.stringify({ ...editProduct, slug }),
    });
    if (res.ok) { setSaveMsg('Saved!'); setEditProduct(null); load(); setTimeout(() => setSaveMsg(''), 2000); }
    else { setSaveMsg('Error saving'); }
  };

  const delProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await fetch('/api/products/' + id, { method: 'DELETE', headers: H });
    load();
  };

  const saveConfig = async () => {
    if (!config) return;
    const res = await fetch('/api/admin/config', { method: 'PUT', headers: H, body: JSON.stringify(config) });
    if (res.ok) { setSaveMsg('Config saved!'); setTimeout(() => setSaveMsg(''), 2000); }
  };

  const totalRaised = products.reduce((s, p) => s + p.raisedAmount, 0);
  const confirmed = investments.filter(i => i.paymentStatus === 'confirmed');
  const totalInvested = confirmed.reduce((s, i) => s + i.amount, 0);
  const fmt = (n: number) => '$' + n.toLocaleString();
  const sc = (s: string) => s === 'open' ? '#10b981' : s === 'closed' ? '#ef4444' : '#f59e0b';
  const pc = (s: string) => s === 'confirmed' ? '#10b981' : s === 'pending' ? '#f59e0b' : '#ef4444';

  const inp = (extra?: React.CSSProperties): React.CSSProperties => ({
    width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: 8,
    padding: '10px 14px', color: '#f1f5f9', fontSize: 14, boxSizing: 'border-box', ...extra,
  });

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f1f5f9', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#1e293b', borderBottom: '1px solid #334155', padding: '0 32px', display: 'flex', alignItems: 'center', gap: 24, height: 60 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 8 }}>
          <div style={{ width: 30, height: 30, background: '#0D3880', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14 }}>S</div>
          <span style={{ fontWeight: 700, fontSize: 16 }}>Specfin Admin</span>
          <span style={{ background: '#dc2626', color: '#fff', fontSize: 10, padding: '2px 7px', borderRadius: 4, fontWeight: 700 }}>ADMIN</span>
        </div>
        {(['overview','products','investments','site-config'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '0 16px', height: 60, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13, background: 'transparent', color: tab === t ? '#fff' : '#64748b', borderBottom: tab === t ? '2px solid #00A896' : '2px solid transparent', transition: 'all 0.15s' }}>
            {t === 'overview' ? 'Overview' : t === 'products' ? 'Products' : t === 'investments' ? 'Investments' : 'Site Config'}
          </button>
        ))}
        <div style={{ marginLeft: 'auto' }}>
          <a href="/" target="_blank" style={{ color: '#00A896', fontSize: 13, textDecoration: 'none' }}>View site</a>
        </div>
      </div>

      {saveMsg && <div style={{ background: saveMsg.includes('Error') ? '#dc2626' : '#10b981', color: '#fff', textAlign: 'center', padding: '8px', fontSize: 13, fontWeight: 600 }}>{saveMsg}</div>}

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '32px 24px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 80, color: '#64748b' }}>Loading...</div>
        ) : (
          <>
            {tab === 'overview' && (
              <div>
                <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Dashboard</h1>
                <p style={{ color: '#64748b', marginBottom: 28, fontSize: 14 }}>Platform overview</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
                  {[
                    { l: 'Active Products', v: products.filter(p => p.status === 'open').length + ' / ' + products.length, c: '#0D3880' },
                    { l: 'Total Target', v: fmt(products.reduce((s,p)=>s+p.targetRaise,0)), c: '#8b5cf6' },
                    { l: 'Total Raised', v: fmt(totalRaised), c: '#10b981' },
                    { l: 'Investments', v: investments.length + ' (' + confirmed.length + ' confirmed)', c: '#f59e0b' },
                  ].map(card => (
                    <div key={card.l} style={{ background: '#1e293b', borderRadius: 10, padding: 20, borderLeft: '4px solid ' + card.c }}>
                      <div style={{ color: '#64748b', fontSize: 12, marginBottom: 6 }}>{card.l}</div>
                      <div style={{ fontSize: 22, fontWeight: 700 }}>{card.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div style={{ background: '#1e293b', borderRadius: 10, padding: 20 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: '#94a3b8' }}>RAISE PROGRESS</h3>
                    {products.map(p => {
                      const pct = Math.min(100, Math.round((p.raisedAmount / p.targetRaise) * 100));
                      return (
                        <div key={p.id} style={{ marginBottom: 14 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 13 }}>
                            <span style={{ fontWeight: 600 }}>{p.title}</span>
                            <span style={{ color: '#94a3b8' }}>{pct}%</span>
                          </div>
                          <div style={{ background: '#334155', borderRadius: 99, height: 6 }}>
                            <div style={{ background: '#00A896', width: pct + '%', height: 6, borderRadius: 99 }} />
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3, fontSize: 11, color: '#64748b' }}>
                            <span>{fmt(p.raisedAmount)} raised</span><span>target {fmt(p.targetRaise)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ background: '#1e293b', borderRadius: 10, padding: 20 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: '#94a3b8' }}>RECENT INVESTMENTS</h3>
                    {investments.length === 0 ? (
                      <p style={{ color: '#64748b', fontSize: 13 }}>No investments yet.</p>
                    ) : investments.slice(0, 6).map(inv => (
                      <div key={inv.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid #334155' }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600 }}>{inv.userName}</div>
                          <div style={{ fontSize: 11, color: '#64748b' }}>{inv.paymentMethod.toUpperCase()}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 13, fontWeight: 700 }}>{fmt(inv.amount)}</div>
                          <div style={{ fontSize: 11, color: pc(inv.paymentStatus) }}>{inv.paymentStatus}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === 'products' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div>
                    <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Investment Products</h1>
                    <p style={{ color: '#64748b', fontSize: 14 }}>Create and manage investment opportunities</p>
                  </div>
                  <button onClick={() => { setEditProduct({ ...EMPTY_PRODUCT }); setIsNew(true); setHlInput(''); }}
                    style={{ background: '#0D3880', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>
                    + New Product
                  </button>
                </div>

                {editProduct && (
                  <div style={{ background: '#1e293b', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #334155' }}>
                    <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>{isNew ? '+ Create Product' : 'Edit: ' + editProduct.title}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                      {[
                        { k: 'title', l: 'Title' }, { k: 'company', l: 'Company' },
                        { k: 'stage', l: 'Stage' }, { k: 'deadline', l: 'Deadline (YYYY-MM-DD)' },
                        { k: 'expectedReturn', l: 'Expected Return' }, { k: 'logoUrl', l: 'Logo URL' },
                        { k: 'bannerUrl', l: 'Banner URL' },
                      ].map(f => (
                        <div key={f.k}>
                          <label style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 5 }}>{f.l}</label>
                          <input value={String((editProduct as Record<string,unknown>)[f.k] || '')}
                            onChange={e => setEditProduct(p => ({ ...p, [f.k]: e.target.value }))}
                            style={inp()} />
                        </div>
                      ))}
                      {[
                        { k: 'targetRaise', l: 'Target Raise (USD)' }, { k: 'minInvestment', l: 'Min Investment' }, { k: 'investorCount', l: 'Investor Count' },
                      ].map(f => (
                        <div key={f.k}>
                          <label style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 5 }}>{f.l}</label>
                          <input type="number" value={Number((editProduct as Record<string,unknown>)[f.k] || 0)}
                            onChange={e => setEditProduct(p => ({ ...p, [f.k]: Number(e.target.value) }))}
                            style={inp()} />
                        </div>
                      ))}
                      {[
                        { k: 'category', l: 'Category', o: ['hedge-fund','rwa','token-sale','private-equity'] },
                        { k: 'status', l: 'Status', o: ['open','closed','coming-soon'] },
                        { k: 'currency', l: 'Currency', o: ['USD','USDT','ETH'] },
                        { k: 'riskLevel', l: 'Risk Level', o: ['low','medium','high'] },
                      ].map(f => (
                        <div key={f.k}>
                          <label style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 5 }}>{f.l}</label>
                          <select value={String((editProduct as Record<string,unknown>)[f.k] || '')}
                            onChange={e => setEditProduct(p => ({ ...p, [f.k]: e.target.value }))}
                            style={inp()}>
                            {f.o.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginBottom: 14 }}>
                      <label style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 5 }}>Description</label>
                      <textarea value={editProduct.description || ''} onChange={e => setEditProduct(p => ({ ...p, description: e.target.value }))} style={inp({ minHeight: 70 })} />
                    </div>
                    <div style={{ marginBottom: 14 }}>
                      <label style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 5 }}>Long Description</label>
                      <textarea value={editProduct.longDescription || ''} onChange={e => setEditProduct(p => ({ ...p, longDescription: e.target.value }))} style={inp({ minHeight: 100 })} />
                    </div>
                    <div style={{ marginBottom: 14 }}>
                      <label style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 8 }}>Highlights</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                        {(editProduct.highlights || []).map((h, i) => (
                          <span key={i} style={{ background: '#334155', borderRadius: 6, padding: '4px 10px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                            {h}
                            <button onClick={() => setEditProduct(p => ({ ...p, highlights: (p!.highlights||[]).filter((_,j)=>j!==i) }))} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 14, padding: 0 }}>x</button>
                          </span>
                        ))}
                      </div>
                      <input value={hlInput} onChange={e => setHlInput(e.target.value)}
                        onKeyDown={e => { if(e.key==='Enter'&&hlInput.trim()){ setEditProduct(p=>({...p,highlights:[...(p!.highlights||[]),hlInput.trim()]})); setHlInput(''); e.preventDefault(); }}}
                        placeholder="Type and press Enter" style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '8px 12px', color: '#f1f5f9', fontSize: 13, width: 280 }} />
                    </div>
                    <div style={{ marginBottom: 14 }}>
                      <label style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 8 }}>Accepted Payments</label>
                      <div style={{ display: 'flex', gap: 16 }}>
                        {['stripe','usdt','eth','bnb'].map(m => (
                          <label key={m} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14 }}>
                            <input type="checkbox" checked={(editProduct.acceptedPayments||[]).includes(m)}
                              onChange={e => setEditProduct(p => ({ ...p, acceptedPayments: e.target.checked ? [...(p!.acceptedPayments||[]),m] : (p!.acceptedPayments||[]).filter(x=>x!==m) }))} />
                            {m === 'stripe' ? 'Card' : m.toUpperCase()}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" id="feat" checked={!!editProduct.featured} onChange={e => setEditProduct(p=>({...p,featured:e.target.checked}))} />
                      <label htmlFor="feat" style={{ fontSize: 14, cursor: 'pointer' }}>Featured on homepage</label>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button onClick={saveProduct} style={{ background: '#0D3880', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 28px', cursor: 'pointer', fontWeight: 700 }}>
                        {isNew ? 'Create Product' : 'Save Changes'}
                      </button>
                      <button onClick={() => setEditProduct(null)} style={{ background: '#334155', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 20px', cursor: 'pointer' }}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div style={{ display: 'grid', gap: 12 }}>
                  {products.map(p => (
                    <div key={p.id} style={{ background: '#1e293b', borderRadius: 10, padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #334155' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                          <span style={{ fontWeight: 700, fontSize: 15 }}>{p.title}</span>
                          <span style={{ background: sc(p.status)+'25', color: sc(p.status), fontSize: 11, padding: '2px 9px', borderRadius: 99, fontWeight: 700 }}>{p.status.toUpperCase()}</span>
                          {p.featured && <span style={{ background: '#f59e0b25', color: '#f59e0b', fontSize: 11, padding: '2px 9px', borderRadius: 99, fontWeight: 700 }}>FEATURED</span>}
                        </div>
                        <div style={{ display: 'flex', gap: 20, color: '#94a3b8', fontSize: 12 }}>
                          <span>{p.category}</span>
                          <span>Raised: <strong style={{ color: '#10b981' }}>{fmt(p.raisedAmount)}</strong> / {fmt(p.targetRaise)}</span>
                          <span>Min: {fmt(p.minInvestment)}</span>
                          <span>{p.investorCount} investors</span>
                        </div>
                        <div style={{ marginTop: 8, background: '#334155', borderRadius: 99, height: 4, width: 280 }}>
                          <div style={{ background: '#00A896', width: Math.min(100,(p.raisedAmount/p.targetRaise)*100)+'%', height: 4, borderRadius: 99 }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 8, marginLeft: 16 }}>
                        <button onClick={() => { setEditProduct(p); setIsNew(false); setHlInput(''); }} style={{ background: '#334155', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 14px', cursor: 'pointer', fontSize: 13 }}>Edit</button>
                        <button onClick={() => delProduct(p.id)} style={{ background: '#dc262615', color: '#ef4444', border: '1px solid #ef444440', borderRadius: 6, padding: '7px 14px', cursor: 'pointer', fontSize: 13 }}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'investments' && (
              <div>
                <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Investments</h1>
                <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>{investments.length} total · {fmt(totalInvested)} confirmed</p>
                {investments.length === 0 ? (
                  <div style={{ background: '#1e293b', borderRadius: 12, padding: 60, textAlign: 'center', color: '#64748b' }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>No investments yet</div>
                  </div>
                ) : (
                  <div style={{ background: '#1e293b', borderRadius: 12, overflow: 'hidden', border: '1px solid #334155' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: '#0f172a' }}>
                          {['Investor','Product','Amount','Method','Status','TX / Wallet','Date'].map(h => (
                            <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: 11, color: '#64748b', fontWeight: 700 }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {investments.map((inv, idx) => (
                          <tr key={inv.id} style={{ borderTop: '1px solid #334155', background: idx % 2 === 0 ? '#1e293b' : '#1a2537' }}>
                            <td style={{ padding: '12px 14px' }}>
                              <div style={{ fontSize: 13, fontWeight: 600 }}>{inv.userName}</div>
                              <div style={{ fontSize: 11, color: '#64748b' }}>{inv.userEmail}</div>
                            </td>
                            <td style={{ padding: '12px 14px', fontSize: 12, color: '#94a3b8' }}>{products.find(p=>p.id===inv.productId)?.title || inv.productId}</td>
                            <td style={{ padding: '12px 14px', fontWeight: 700, color: '#10b981' }}>{fmt(inv.amount)}</td>
                            <td style={{ padding: '12px 14px' }}>
                              <span style={{ background: '#334155', borderRadius: 6, padding: '2px 8px', fontSize: 12 }}>{inv.paymentMethod.toUpperCase()}</span>
                            </td>
                            <td style={{ padding: '12px 14px' }}>
                              <span style={{ background: pc(inv.paymentStatus)+'25', color: pc(inv.paymentStatus), borderRadius: 6, padding: '3px 10px', fontSize: 12, fontWeight: 700 }}>{inv.paymentStatus}</span>
                            </td>
                            <td style={{ padding: '12px 14px', fontSize: 11, color: '#64748b', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inv.txHash || inv.walletAddress || '-'}</td>
                            <td style={{ padding: '12px 14px', fontSize: 12, color: '#94a3b8' }}>{new Date(inv.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {tab === 'site-config' && config && (
              <div>
                <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Site Configuration</h1>
                <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>Control public-facing content</p>
                <div style={{ display: 'grid', gap: 20, maxWidth: 700 }}>
                  <div style={{ background: '#1e293b', borderRadius: 12, padding: 24 }}>
                    <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: '#00A896' }}>Homepage Hero</h2>
                    <div style={{ display: 'grid', gap: 14 }}>
                      <div>
                        <label style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 5 }}>Hero Title</label>
                        <input value={config.heroTitle} onChange={e => setConfig(c => c ? {...c, heroTitle: e.target.value} : c)} style={inp()} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 5 }}>Hero Subtitle</label>
                        <textarea value={config.heroSubtitle} onChange={e => setConfig(c => c ? {...c, heroSubtitle: e.target.value} : c)} style={inp({ minHeight: 80 })} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 5 }}>CTA Button Text</label>
                        <input value={config.heroCta} onChange={e => setConfig(c => c ? {...c, heroCta: e.target.value} : c)} style={inp()} />
                      </div>
                    </div>
                  </div>
                  <div style={{ background: '#1e293b', borderRadius: 12, padding: 24 }}>
                    <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: '#00A896' }}>Announcement Banner</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <input type="checkbox" id="ann" checked={config.announcementEnabled as boolean} onChange={e => setConfig(c => c ? {...c, announcementEnabled: e.target.checked} : c)} />
                      <label htmlFor="ann" style={{ fontSize: 14, cursor: 'pointer' }}>Enable announcement banner</label>
                    </div>
                    <input value={config.announcementBanner as string} onChange={e => setConfig(c => c ? {...c, announcementBanner: e.target.value} : c)} style={inp()} />
                  </div>
                  <div style={{ background: '#1e293b', borderRadius: 12, padding: 24 }}>
                    <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: '#f59e0b' }}>Maintenance Mode</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <input type="checkbox" id="maint" checked={config.maintenanceMode as boolean} onChange={e => setConfig(c => c ? {...c, maintenanceMode: e.target.checked} : c)} />
                      <label htmlFor="maint" style={{ fontSize: 14, cursor: 'pointer', color: '#ef4444' }}>Enable maintenance mode</label>
                    </div>
                  </div>
                  <button onClick={saveConfig} style={{ background: '#0D3880', color: '#fff', border: 'none', borderRadius: 8, padding: '13px 36px', cursor: 'pointer', fontWeight: 700, fontSize: 15, width: 'fit-content' }}>
                    Save All Changes
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
