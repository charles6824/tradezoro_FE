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
          
        </div>
        
      </div>
    </div>
  </section>
);

export { MobileSection };
