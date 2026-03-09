import React from 'react';

const MobileSection = () => (
  <section className="py-24 bg-background-dark overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/2">
          <div className="inline-flex items-center gap-4 p-4 rounded-xl glass-card mb-8">
            <div className="w-12 h-12 text-primary">
              <span className="material-symbols-outlined text-4xl">emoji_events</span>
            </div>
            <div>
              <p className="font-bold text-slate-100">Global Fintech Awards</p>
              <p className="text-xs text-primary font-bold">BEST PENNY STOCK BROKER 2023</p>
            </div>
          </div>
          <h2 className="text-4xl font-black mb-6">Take A Deeper Look</h2>
          <p className="text-slate-400 text-lg mb-10">Our award-winning mobile app brings the full power of TradeZero to your pocket. Trade on the go with full charting and real-time execution.</p>
          <div className="flex gap-4">
            <button className="bg-slate-900 border border-white/10 rounded-xl px-6 py-3 flex items-center gap-3 hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined">phone_iphone</span>
              <div className="text-left">
                <p className="text-[10px] text-slate-500 uppercase">Download on the</p>
                <p className="text-sm font-bold">App Store</p>
              </div>
            </button>
            <button className="bg-slate-900 border border-white/10 rounded-xl px-6 py-3 flex items-center gap-3 hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined">shop</span>
              <div className="text-left">
                <p className="text-[10px] text-slate-500 uppercase">Get it on</p>
                <p className="text-sm font-bold">Google Play</p>
              </div>
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
          <div className="relative pt-12">
            <img className="rounded-3xl border-4 border-slate-800 shadow-2xl" alt="Mobile app preview showing trading execution screens" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoHRnQ01CC15MEq_NKVxOHVcHUUThAGgsOlLAPX-e2NFxVM0Aa4z51aYry0u5K4e7i4hyqxPDcS7q7cxwlOiMjIpyO389W59GZJkFWbTXWvrA-FBPPpOwuWb5KgqeoQ_dHJLTqAiNu4Teaw2zvVj9GkVqJlFjbH82F9Gzn_Uy5TEa2-DFFROzuXOIqZyLWoq7qy0gmwfnUNgI7FXsKiJM5GpYTi8HOvFy5PUNPPAsHug4WzNqYH31XZA4p2qS-6uEAZKVIHvd1nJg" />
          </div>
          <div className="relative -mt-12">
            <img className="rounded-3xl border-4 border-slate-800 shadow-2xl" alt="Mobile app preview showing real-time stock charts" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8HVtqMTB6IxsLzRh5QSBcccDshmzoGnL2_loDLycuUtOpxoEWeiatt9CwyFHjWP2X4OLOCbEmj1ulbMcpOzsPvslRBkbzg7WejEls-RY3COQF0DBvEeqoMNuWJtoUy_4hp-JRHVDLsM1Gx95u_W6XmIaVG89BaiWH1ALs8P3Bj6tjR9881hAS6nBNzOx6VMaPLdJABDFnI-yXm9BBKicaFcod5Bi56nkdTyK9yU5cd1CQBtGGpx5NjhT2tP9SUberr9yHMs_xbUU" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export { MobileSection };
