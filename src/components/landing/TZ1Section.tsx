import React from 'react';

const TZ1Section = () => (
  <section className="py-24 bg-background-dark overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-20">
        <div className="lg:w-1/2">
          <h2 className="text-5xl font-black mb-8 leading-tight">Experience <span className="text-primary">TZ1</span></h2>
          <p className="text-slate-400 text-lg mb-12">The platform built for performance. TZ1 is our flagship trading software designed for professionals who demand speed, reliability, and precision.</p>
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary text-3xl">bolt</span>
              <div>
                <h4 className="font-bold text-xl mb-1">Real-Time Tick Scanner</h4>
                <p className="text-slate-500">Sub-second data feeds for lightning fast decision making.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary text-3xl">show_chart</span>
              <div>
                <h4 className="font-bold text-xl mb-1">TradingView Chart Integration</h4>
                <p className="text-slate-500">World-class technical analysis tools built right into your dashboard.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary text-3xl">swap_calls</span>
              <div>
                <h4 className="font-bold text-xl mb-1">Bi-Directional Trading</h4>
                <p className="text-slate-500">Seamlessly switch between long and short positions with hotkeys.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="rounded-3xl border-8 border-slate-800 shadow-[0_0_100px_rgba(0,189,85,0.2)] overflow-hidden">
            <div className="bg-background-dark/50">
              <img alt="TZ1 Interface" className="w-full h-auto opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKx5J127Ytzrjt92BU95cc1bNkYJWkqnKAxhH-pLhpmQTSoDy_4YpAS0LrX6_Sjei9UkwKX6E55JciSjybSepRmwECgR0zIi-mhVdd7cPT39dJLO-BtgIdP3FVDLBcLjOmKkL9VxiRhmbe60GWSh9-aliUxAX6TJHae91yqskS4sWbJM43PUQU2cADbj3jG5ICScaa7IpE95C8n8_-DwOKfmZ6M-dSomGEheiXYpLY6kd_LBQATE92ol522nzdmGorZO_KCV7zjwM" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export { TZ1Section };
