import React from "react";

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="mb-16 text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">Pricing Transparency</span>
          <h2 className="text-5xl md:text-6xl font-black leading-tight mb-6">Simple, Transparent <span className="text-primary italic">Trading.</span></h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            We believe in keeping things clear. Trade for free with our zero-commission equity trades or scale up to professional tools with flat-rate monthly subscriptions.
          </p>
        </section>
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {/* Free Plan */}
          <div className="flex flex-col p-8 rounded-xl border border-border-dark bg-surface-dark/40 hover:border-primary/40 transition-all group">
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">ZeroWeb</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-black">$0</span>
                <span className="text-slate-400 font-medium">/mo</span>
              </div>
              <p className="text-slate-400 text-sm">Perfect for active traders who prefer browser-based speed and accessibility.</p>
            </div>
            <button className="w-full py-3 rounded-full bg-border-dark text-white font-bold mb-8 hover:bg-slate-700 transition-all">Start Free</button>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                <span>Zero commission limit trades</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                <span>Browser-based platform</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                <span>Standard real-time data</span>
              </div>
            </div>
          </div>
          {/* Pro Plan */}
          <div className="flex flex-col p-8 rounded-xl border-2 border-primary bg-surface-dark relative shadow-2xl shadow-primary/10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-background-dark text-[10px] font-black uppercase tracking-tighter px-4 py-1 rounded-full">
              Most Popular
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">ZeroPro</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-black text-primary">$59</span>
                <span className="text-slate-400 font-medium">/mo</span>
              </div>
              <p className="text-slate-400 text-sm">Our flagship desktop platform designed for speed, customization, and precision.</p>
            </div>
            <button className="w-full py-3 rounded-full bg-primary text-background-dark font-bold mb-8 hover:brightness-110 transition-all shadow-lg shadow-primary/20">Try Pro Free</button>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                <span>Advanced Level 2 data</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                <span>Full Hotkey customization</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                <span>Multi-monitor desktop app</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                <span>Real-time news stream</span>
              </div>
            </div>
          </div>
          {/* Platinum Plan */}
          <div className="flex flex-col p-8 rounded-xl border border-border-dark bg-surface-dark/40 hover:border-primary/40 transition-all group">
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">ZeroFree</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-black">$0</span>
                <span className="text-slate-400 font-medium">/mo</span>
              </div>
              <p className="text-slate-400 text-sm">Standard desktop access for casual traders who need more than a browser.</p>
            </div>
            <button className="w-full py-3 rounded-full bg-border-dark text-white font-bold mb-8 hover:bg-slate-700 transition-all">Get Started</button>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                <span>Zero commission trades</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                <span>Desktop & Mobile access</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                <span>Standard charting tools</span>
              </div>
            </div>
          </div>
        </div>
        {/* Detailed Fee Table */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold mb-3">Commission & Fee Schedule</h2>
              <p className="text-slate-400">Detailed breakdown of trade executions and platform costs across all account tiers.</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-surface-dark border border-border-dark hover:text-primary transition-colors">
                <span className="material-symbols-outlined">download</span>
              </button>
              <button className="p-2 rounded-lg bg-surface-dark border border-border-dark hover:text-primary transition-colors">
                <span className="material-symbols-outlined">print</span>
              </button>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border-dark bg-surface-dark/20 backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-dark/80">
                    <th className="p-6 text-sm font-bold uppercase tracking-wider text-slate-400">Trading Service</th>
                    <th className="p-6 text-sm font-bold uppercase tracking-wider text-slate-400">ZeroFree / Web</th>
                    <th className="p-6 text-sm font-bold uppercase tracking-wider text-slate-400">ZeroPro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-dark">
                  <tr className="hover:bg-primary/5 transition-colors">
                    <td className="p-6">
                      <div className="font-bold">US Listed Stocks (Limit Orders)</div>
                      <div className="text-xs text-slate-500 mt-1">Orders ≥ 200 shares & price ≥ $1.00</div>
                    </td>
                    <td className="p-6 text-primary font-bold">$0.00</td>
                    <td className="p-6 text-primary font-bold">$0.00</td>
                  </tr>
                  <tr className="hover:bg-primary/5 transition-colors">
                    <td className="p-6">
                      <div className="font-bold">US Listed Stocks (Market Orders)</div>
                      <div className="text-xs text-slate-500 mt-1">Standard per share execution fee</div>
                    </td>
                    <td className="p-6">$0.005 / share</td>
                    <td className="p-6">$0.003 / share</td>
                  </tr>
                  <tr className="hover:bg-primary/5 transition-colors">
                    <td className="p-6">
                      <div className="font-bold">Options Trading</div>
                      <div className="text-xs text-slate-500 mt-1">Per contract executed</div>
                    </td>
                    <td className="p-6">$0.59 / contract</td>
                    <td className="p-6">$0.39 / contract</td>
                  </tr>
                  <tr className="hover:bg-primary/5 transition-colors">
                    <td className="p-6">
                      <div className="font-bold">Short Locate Fees</div>
                      <div className="text-xs text-slate-500 mt-1">Subject to inventory availability</div>
                    </td>
                    <td className="p-6 italic text-slate-400">Variable rate</td>
                    <td className="p-6 italic text-slate-400">Variable rate</td>
                  </tr>
                  <tr className="hover:bg-primary/5 transition-colors">
                    <td className="p-6">
                      <div className="font-bold">Pre & Post Market Trading</div>
                      <div className="text-xs text-slate-500 mt-1">4:00 AM - 8:00 PM EST</div>
                    </td>
                    <td className="p-6"><span className="material-symbols-outlined text-primary">check</span></td>
                    <td className="p-6"><span className="material-symbols-outlined text-primary">check</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        {/* Account Requirements */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Account Requirements</h2>
            <p className="text-slate-400 leading-relaxed">Opening an account with TradeZero is fast and straightforward. We support individual, joint, and corporate accounts with low minimum barriers to entry.</p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-surface-dark border border-border-dark flex items-center gap-4">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">account_balance_wallet</span>
                </div>
                <div>
                  <div className="font-bold">Minimum Initial Deposit</div>
                  <div className="text-sm text-slate-400">$2,500 for US Residents | $500 for International</div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-surface-dark border border-border-dark flex items-center gap-4">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">verified_user</span>
                </div>
                <div>
                  <div className="font-bold">ID Verification</div>
                  <div className="text-sm text-slate-400">Valid Passport or Government Issued ID required</div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-surface-dark border border-border-dark flex items-center gap-4">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">public</span>
                </div>
                <div>
                  <div className="font-bold">Global Accessibility</div>
                  <div className="text-sm text-slate-400">Available to residents in over 180 countries</div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-surface-dark flex items-center justify-center p-12 text-center">
              <div className="z-20">
                <div className="size-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                  <span className="material-symbols-outlined !text-4xl">rocket_launch</span>
                </div>
                <h4 className="text-2xl font-black mb-4">Ready to start trading?</h4>
                <p className="text-slate-400 mb-8">Join thousands of active traders worldwide who choose TradeZero for speed and reliability.</p>
                <button className="bg-primary text-background-dark font-black px-10 py-4 rounded-full hover:scale-105 transition-all">Create My Account</button>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mb-32 -mr-32"></div>
          </div>
        </section>
        {/* FAQ */}
        <section className="max-w-3xl mx-auto mb-24">
          <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group border border-border-dark rounded-xl bg-surface-dark/40 overflow-hidden" open>
              <summary className="p-6 cursor-pointer flex items-center justify-between font-bold text-lg select-none list-none">
                How does "Zero Commission" work?
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-border-dark pt-4">
                TradeZero offers commission-free trading for limit orders on US-listed stocks priced at $1.00 or higher, provided the order size is 200 shares or more. Market orders or orders on low-priced stocks may incur a small per-share fee.
              </div>
            </details>
            <details className="group border border-border-dark rounded-xl bg-surface-dark/40 overflow-hidden">
              <summary className="p-6 cursor-pointer flex items-center justify-between font-bold text-lg select-none list-none">
                Can I switch plans later?
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-border-dark pt-4">
                Absolutely. You can upgrade or downgrade your platform subscription at any time through your client portal. Changes to platform fees are typically applied on the next billing cycle.
              </div>
            </details>
            <details className="group border border-border-dark rounded-xl bg-surface-dark/40 overflow-hidden">
              <summary className="p-6 cursor-pointer flex items-center justify-between font-bold text-lg select-none list-none">
                Are there inactivity fees?
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-border-dark pt-4">
                TradeZero does not charge inactivity fees. We want our traders to trade because they see opportunity, not because they are trying to avoid a fee.
              </div>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PricingPage;
