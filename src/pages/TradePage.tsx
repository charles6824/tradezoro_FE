import React from "react";

const TradePage = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-6 lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
              <span className="size-2 rounded-full bg-primary"></span>
              <span className="text-primary text-xs font-bold uppercase tracking-wider">Trading Ecosystem</span>
            </div>
            <h1 className="text-slate-900 dark:text-slate-100 text-5xl font-black leading-[1.1] tracking-tight lg:text-7xl">
              Precision Tools for <span className="text-primary">Active Traders</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-[500px]">
              From high-performance desktop software to on-the-go mobile access, our platforms are designed to give you a competitive edge in every market condition.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="flex min-w-[160px] items-center justify-center rounded-full h-14 px-8 bg-primary text-background-dark text-base font-bold shadow-lg shadow-primary/20">
                Start Trading Now
              </button>
              <button className="flex min-w-[160px] items-center justify-center rounded-full h-14 px-8 bg-white/5 border border-white/10 text-slate-100 text-base font-bold">
                Compare Features
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-30"></div>
            <div className="relative bg-slate-800 rounded-2xl border border-white/10 shadow-2xl overflow-hidden aspect-video group">
              <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuBGhX2jpeuBrnhTJbWh-yADvosvH9SqnVKVaZ5GXfWC8mlc_D0AiV1uGJUuraMmDHo1FiaZSPR_MSbpN_XbFMomiC8RdUOzVBkPAYpR7-K4H6MszDGtoS6DAGXv7-PXI9dB3xZ1Ocamq_-OztWHxtmRARfMojaaN_G13oraGXLBTgUDDBRLz0aAn29HK7GebeWIM1wD9t5_Uh_Tos2yl18qx6xtyVPlqUUSxzvnQIR2T6J3G3U_AnPCR2Uxibmk_EWFIa4Lu9Qz2a8)'}}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary/90 flex items-center justify-center text-background-dark">
                  <span className="material-symbols-outlined font-bold">play_arrow</span>
                </div>
                <span className="text-sm font-bold text-white uppercase tracking-widest">Platform Demo</span>
              </div>
            </div>
          </div>
        </div>
        {/* Platform Selector Tabs (static for now) */}
        <div className="mt-24">
          <div className="flex flex-wrap border-b border-white/5 gap-2 lg:gap-8 mb-12 overflow-x-auto pb-px">
            <button className="flex flex-col items-center justify-center border-b-2 border-primary text-primary pb-4 px-4 transition-all whitespace-nowrap">
              <p className="text-sm font-bold leading-normal uppercase tracking-[0.05em]">ZeroPro</p>
            </button>
            <button className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 hover:text-slate-300 pb-4 px-4 transition-all whitespace-nowrap">
              <p className="text-sm font-bold leading-normal uppercase tracking-[0.05em]">ZeroWeb</p>
            </button>
            <button className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 hover:text-slate-300 pb-4 px-4 transition-all whitespace-nowrap">
              <p className="text-sm font-bold leading-normal uppercase tracking-[0.05em]">ZeroMobile</p>
            </button>
            <button className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 hover:text-slate-300 pb-4 px-4 transition-all whitespace-nowrap">
              <p className="text-sm font-bold leading-normal uppercase tracking-[0.05em]">ZeroFree</p>
            </button>
          </div>
          {/* Platform Content: ZeroPro (static for now) */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div>
                <h2 className="text-slate-100 text-3xl font-bold mb-4">ZeroPro: Our Flagship Platform</h2>
                <p className="text-slate-400 text-lg">The ultimate solution for professional active traders. Engineered for speed, stability, and total control.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="glass-panel p-6 rounded-xl space-y-3 bg-white/5 border border-white/10">
                  <span className="material-symbols-outlined text-primary text-3xl">query_stats</span>
                  <h3 className="font-bold text-slate-100">Advanced Charting</h3>
                  <p className="text-sm text-slate-400">100+ indicators, custom studies, and multi-timeframe analysis tools.</p>
                </div>
                <div className="glass-panel p-6 rounded-xl space-y-3 bg-white/5 border border-white/10">
                  <span className="material-symbols-outlined text-primary text-3xl">bolt</span>
                  <h3 className="font-bold text-slate-100">Direct Market Access</h3>
                  <p className="text-sm text-slate-400">Lightning-fast order execution with customizable hotkeys.</p>
                </div>
                <div className="glass-panel p-6 rounded-xl space-y-3 bg-white/5 border border-white/10">
                  <span className="material-symbols-outlined text-primary text-3xl">view_quilt</span>
                  <h3 className="font-bold text-slate-100">Custom Layouts</h3>
                  <p className="text-sm text-slate-400">Fully modular workspace with unlimited window docking and linking.</p>
                </div>
                <div className="glass-panel p-6 rounded-xl space-y-3 bg-white/5 border border-white/10">
                  <span className="material-symbols-outlined text-primary text-3xl">analytics</span>
                  <h3 className="font-bold text-slate-100">Level 2 Data</h3>
                  <p className="text-sm text-slate-400">Real-time depth of market to see institutional order flow.</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="flex items-center justify-center gap-2 rounded-xl h-14 px-8 bg-white text-background-dark font-bold">
                  <span className="material-symbols-outlined">download</span>
                  Download for Windows
                </button>
                <button className="flex items-center justify-center gap-2 rounded-xl h-14 px-8 border border-white/10 text-slate-100 font-bold hover:bg-white/5 transition-colors">
                  <span className="material-symbols-outlined">description</span>
                  User Guide
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-slate-900">
                <div className="h-8 bg-slate-800 border-b border-white/5 flex items-center px-4 gap-1.5">
                  <div className="size-2.5 rounded-full bg-red-500/50"></div>
                  <div className="size-2.5 rounded-full bg-yellow-500/50"></div>
                  <div className="size-2.5 rounded-full bg-green-500/50"></div>
                </div>
                <div className="aspect-square bg-cover bg-center p-4" style={{backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuCNrw8h-GMgU21R2IeJ2tIU5mrJluRVYVi6wMuuSPRozAl7b00-RrVPPzJtcdBJykr2gbx-u7oGV-1ie_tIxTMVEJlpKdW6T88Krx2Vxu93bxkM0qe1Q-KN9SWNkT3DvA-RJguWMCiJs6I4Mu91D-GeG1yP8FzT2Kns1D7dqoBVKibu_ZY2wle148w6eVnqny8voyPofTzswGa9Z17VFcO6hFGnKDfCMhV1HJBG7IhAzTKfo2CEkL4VH1fGXrUdk9uhTQlqkOIrgPQ)'}}>
                  <div className="w-full h-full bg-background-dark/20 backdrop-blur-[2px] rounded-lg border border-white/5 p-4">
                    <div className="grid grid-cols-2 gap-4 h-full">
                      <div className="bg-black/40 rounded border border-white/10"></div>
                      <div className="grid grid-rows-2 gap-4">
                        <div className="bg-black/40 rounded border border-white/10"></div>
                        <div className="bg-black/40 rounded border border-white/10"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Badge Floating */}
              <div className="absolute -bottom-6 -right-6 glass-panel p-6 rounded-2xl shadow-2xl border-primary/20 bg-white/5 border border-white/10">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Pricing</p>
                <p className="text-2xl font-black text-primary">$59/mo*</p>
                <p className="text-[10px] text-slate-500 mt-1">*Waived with minimum volume</p>
              </div>
            </div>
          </div>
        </div>
        {/* Platform Comparison Grid */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Choose Your Edge</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Compare our platforms to find the right fit for your trading style and frequency.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all flex flex-col h-full">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">ZeroPro</h3>
                <p className="text-sm text-slate-400 leading-relaxed">The flagship professional-grade desktop terminal.</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                  Advanced Charting
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                  Level 2 Quotes
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                  Hotkeys & Execution
                </li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-primary hover:text-background-dark transition-all">Get Pro</button>
            </div>
            {/* Card 2 */}
            <div className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all flex flex-col h-full">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">ZeroWeb</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Trade from any browser with full feature sets.</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                  No Download Req.
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                  Real-time Streaming
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                  Basic Indicators
                </li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-primary hover:text-background-dark transition-all">Launch Web</button>
            </div>
            {/* Card 3 */}
            <div className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all flex flex-col h-full">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">ZeroMobile</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Stay connected with our powerful iOS/Android app.</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                  Portfolio Tracking
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                  Instant Alerts
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                  Fast Order Entry
                </li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-primary hover:text-background-dark transition-all">Download App</button>
            </div>
            {/* Card 4 */}
            <div className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all flex flex-col h-full">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2 text-primary">ZeroFree</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Our basic platform for occasional traders.</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                  $0 Monthly Fee
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                  Standard Execution
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                  Watchlist Access
                </li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-primary hover:text-background-dark transition-all">Start Free</button>
            </div>
          </div>
        </div>
        {/* App Store Links Section */}
        <div className="mt-32 rounded-[3rem] bg-gradient-to-br from-primary to-[#008a3e] p-12 text-background-dark overflow-hidden relative">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-4xl lg:text-5xl font-black leading-tight">Trade anywhere, <br/>at any time.</h2>
              <p className="text-background-dark/80 text-lg font-medium">Download ZeroMobile to monitor your positions and execute trades from the palm of your hand.</p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-background-dark text-white flex items-center gap-3 px-6 py-3 rounded-xl cursor-pointer hover:bg-slate-900 transition-colors">
                  <span className="material-symbols-outlined text-3xl">ios</span>
                  <div className="text-left">
                    <p className="text-[10px] uppercase opacity-70">Download on the</p>
                    <p className="text-lg font-bold leading-none">App Store</p>
                  </div>
                </div>
                <div className="bg-background-dark text-white flex items-center gap-3 px-6 py-3 rounded-xl cursor-pointer hover:bg-slate-900 transition-colors">
                  <span className="material-symbols-outlined text-3xl">play_store_installed</span>
                  <div className="text-left">
                    <p className="text-[10px] uppercase opacity-70">Get it on</p>
                    <p className="text-lg font-bold leading-none">Google Play</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 flex justify-center">
              <div className="relative w-64 h-[500px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl"></div>
                <div className="p-4 pt-10 h-full">
                  <div className="w-full h-full rounded-2xl bg-cover bg-center" style={{backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuA7YaRhM27YHWSA0XeVrmQBMm0q6OgHjHAU-XtDTMj-ClSivpT2AqpAkhja1D4uyIJ7v94Dhp_ys_PyCZjMgjX8alEKP3H3AlxIuzci7q-9RPLu2h3JwwEMu1qzV6glTb4OlM2vEkSrveIxjm3kFd9DN7vxMK1wkvfzwY7LSdSNB7_lRIYy5NyfPGn4_Yn0oCDDSyUsgGD0WWdHlzoQvdX73Qw-4Ma3Vcrv3xrj-tSPQQQqLmIHLfDYHQJwXuyI5G_mj1yxyBAyw5k)'}}></div>
                </div>
              </div>
            </div>
          </div>
          {/* Abstract decorative shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-background-dark/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default TradePage;
