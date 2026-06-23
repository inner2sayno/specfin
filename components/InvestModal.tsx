'use client';
import { useState } from 'react';

interface Product {
  id: string;
  title: string;
  minInvestment: number;
  currency: string;
  acceptedPayments: string[];
}

interface InvestModalProps {
  product: Product;
  onClose: () => void;
}

const COMPANY_WALLET = '0x742d35Cc6634C0532925a3b8D4C9C3A10F5f3a1a';

export function InvestModal({ product, onClose }: InvestModalProps) {
  const [step, setStep] = useState<'form' | 'payment' | 'done'>('form');
  const [payMethod, setPayMethod] = useState<string>(product.acceptedPayments[0] || 'stripe');
  const [amount, setAmount] = useState<string>(String(product.minInvestment));
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [investmentId, setInvestmentId] = useState('');
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const numAmount = parseFloat(amount) || 0;
  const isCrypto = ['usdt','eth','bnb'].includes(payMethod);

  const submitForm = async () => {
    setError('');
    if (!email || !name) { setError('Please fill in all fields'); return; }
    if (numAmount < product.minInvestment) {
      setError('Minimum investment is $' + product.minInvestment.toLocaleString());
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/investments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          userEmail: email,
          userName: name,
          amount: numAmount,
          currency: payMethod === 'stripe' ? 'USD' : payMethod.toUpperCase(),
          paymentMethod: payMethod,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Error submitting'); setLoading(false); return; }
      setInvestmentId(data.investment.id);
      setStep('payment');
    } catch { setError('Network error. Please try again.'); }
    setLoading(false);
  };

  const confirmPayment = async () => {
    if (isCrypto && !txHash) { setError('Please enter your transaction hash'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/investments/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ investmentId, txHash: txHash || undefined }),
      });
      if (res.ok) setStep('done');
      else setError('Confirmation failed. Contact support@specfin.io');
    } catch { setError('Network error'); }
    setLoading(false);
  };

  const copyWallet = () => {
    navigator.clipboard.writeText(COMPANY_WALLET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const progressPct = step === 'form' ? 33 : step === 'payment' ? 66 : 100;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 16 }}>
      <div style={{ background: '#1e293b', borderRadius: 16, padding: 36, maxWidth: 500, width: '100%', maxHeight: '92vh', overflowY: 'auto', position: 'relative', boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, background: '#334155', border: 'none', color: '#94a3b8', cursor: 'pointer', width: 28, height: 28, borderRadius: 6, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>

        <div style={{ marginBottom: 24 }}>
          <div style={{ height: 3, background: '#334155', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'linear-gradient(90deg,#0D3880,#00A896)', width: progressPct + '%', borderRadius: 99, transition: 'width 0.4s' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            {['Details','Payment','Done'].map((s,i) => (
              <span key={s} style={{ fontSize: 11, color: progressPct >= (i+1)*33 ? '#00A896' : '#64748b', fontWeight: progressPct >= (i+1)*33 ? 700 : 400 }}>{s}</span>
            ))}
          </div>
        </div>

        {step === 'form' && (
          <>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: '#f1f5f9' }}>Invest in {product.title}</h2>
            <p style={{ color: '#64748b', fontSize: 13, marginBottom: 22 }}>Minimum: ${product.minInvestment.toLocaleString()} · Accredited investors only</p>
            <div style={{ display: 'grid', gap: 14 }}>
              {[{v:name,fn:setName,ph:'Full Name',t:'text'},{v:email,fn:setEmail,ph:'Email Address',t:'email'}].map((f,i) => (
                <div key={i}>
                  <input value={f.v} onChange={e => f.fn(e.target.value)} type={f.t} placeholder={f.ph}
                    style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '11px 14px', color: '#f1f5f9', fontSize: 14, boxSizing: 'border-box' }} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 6 }}>Investment Amount (USD)</label>
                <input value={amount} onChange={e => setAmount(e.target.value)} type="number" min={product.minInvestment}
                  style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '11px 14px', color: '#f1f5f9', fontSize: 16, fontWeight: 700, boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 8 }}>Payment Method</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {product.acceptedPayments.map(m => (
                    <button key={m} onClick={() => setPayMethod(m)}
                      style={{ padding: '10px', borderRadius: 8, border: '2px solid ' + (payMethod===m ? '#00A896' : '#334155'), background: payMethod===m ? '#00A89615' : 'transparent', color: '#f1f5f9', cursor: 'pointer', fontSize: 13, fontWeight: 600, transition: 'all 0.15s' }}>
                      {m==='stripe'?'💳 Credit Card':m==='usdt'?'🟢 USDT':m==='eth'?'⬡ ETH':'🟡 BNB'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {error && <p style={{ color: '#ef4444', fontSize: 13, marginTop: 10 }}>{error}</p>}
            <button onClick={submitForm} disabled={loading}
              style={{ width: '100%', background: 'linear-gradient(135deg,#0D3880,#1a56c4)', color: '#fff', border: 'none', borderRadius: 10, padding: '13px', cursor: 'pointer', fontWeight: 700, fontSize: 15, marginTop: 20, opacity: loading?0.7:1 }}>
              {loading ? 'Processing...' : 'Continue to Payment →'}
            </button>
          </>
        )}

        {step === 'payment' && (
          <>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: '#f1f5f9' }}>Complete Your Payment</h2>
            <p style={{ color: '#64748b', fontSize: 13, marginBottom: 20 }}>Ref: <code style={{ color: '#00A896', fontSize: 12 }}>{investmentId}</code></p>
            {payMethod === 'stripe' ? (
              <div style={{ background: '#0f172a', borderRadius: 10, padding: 20, marginBottom: 16 }}>
                <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
                  Please send <strong style={{ color: '#f1f5f9' }}>${numAmount.toLocaleString()} USD</strong> via bank wire to:<br />
                  <strong style={{ color: '#00A896' }}>invest@specfin.io</strong>
                </p>
                <p style={{ color: '#f59e0b', fontSize: 13, marginTop: 10 }}>Include reference: <strong>{investmentId}</strong></p>
              </div>
            ) : (
              <div>
                <div style={{ background: '#0f172a', borderRadius: 10, padding: 20, marginBottom: 14 }}>
                  <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 10 }}>Send exactly <strong style={{ color: '#10b981', fontSize: 15 }}>${numAmount.toLocaleString()} {payMethod.toUpperCase()}</strong> to:</p>
                  <div style={{ background: '#1e293b', borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <code style={{ fontSize: 11, color: '#00A896', flex: 1, wordBreak: 'break-all' }}>{COMPANY_WALLET}</code>
                    <button onClick={copyWallet} style={{ background: copied?'#10b981':'#334155', color: '#fff', border: 'none', borderRadius: 6, padding: '5px 10px', cursor: 'pointer', fontSize: 11, whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
                      {copied?'✓ Copied':'Copy'}
                    </button>
                  </div>
                  <p style={{ color: '#64748b', fontSize: 11 }}>Memo/Note (if supported): {investmentId}</p>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 6 }}>Transaction Hash (after sending)</label>
                  <input value={txHash} onChange={e => setTxHash(e.target.value)} placeholder="0x..."
                    style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '11px 14px', color: '#f1f5f9', fontSize: 13, boxSizing: 'border-box' }} />
                </div>
              </div>
            )}
            {error && <p style={{ color: '#ef4444', fontSize: 13, marginTop: 10 }}>{error}</p>}
            <button onClick={confirmPayment} disabled={loading}
              style={{ width: '100%', background: '#10b981', color: '#fff', border: 'none', borderRadius: 10, padding: '13px', cursor: 'pointer', fontWeight: 700, fontSize: 15, marginTop: 18, opacity: loading?0.7:1 }}>
              {loading ? 'Confirming...' : (payMethod === 'stripe' ? 'I have completed the wire transfer' : 'Confirm Payment')}
            </button>
          </>
        )}

        {step === 'done' && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: 64, height: 64, background: '#10b98120', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 30 }}>✅</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10, color: '#f1f5f9' }}>Investment Submitted!</h2>
            <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Your investment in <strong style={{ color: '#f1f5f9' }}>{product.title}</strong> has been recorded. Our team verifies payments within 24 hours.
            </p>
            <div style={{ background: '#0f172a', borderRadius: 10, padding: 14, marginBottom: 20 }}>
              <p style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>Reference Number</p>
              <code style={{ color: '#00A896', fontSize: 13 }}>{investmentId}</code>
            </div>
            <button onClick={onClose} style={{ background: '#0D3880', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 32px', cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
