import React from 'react';
import { useTranslation } from 'react-i18next';

const ProScannerSection = () => {
  const { t } = useTranslation();
  return (
  <section className="py-24 bg-background-dark relative border-y border-primary/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-black mb-4">{t("TradeZero ProScanner")}</h2>
          <h3 className="text-2xl text-primary font-bold mb-6">{t("Fast Market Clarity.")}</h3>
          <p className="text-slate-400 text-lg mb-10">
            {t("Get a professional-grade scanner tool to identify opportunities in real-time. Filter thousands of symbols in seconds based on your specific criteria.")}
          </p>
          <div className="space-y-6">
            <div className="flex gap-4 p-5 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-all">
                <span className="material-symbols-outlined">radar</span>
              </div>
              <div>
                <h4 className="font-bold text-lg">{t("Real-Time Scans")}</h4>
                <p className="text-slate-400">{t("Monitor global markets with zero lag and instant execution.")}</p>
              </div>
            </div>
            <div className="flex gap-4 p-5 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-all">
                <span className="material-symbols-outlined">filter_list</span>
              </div>
              <div>
                <h4 className="font-bold text-lg">{t("Customizable Filters")}</h4>
                <p className="text-slate-400">{t("Filter by volume, price, gap percentage, and indicator crossovers.")}</p>
              </div>
            </div>
            <div className="flex gap-4 p-5 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-all">
                <span className="material-symbols-outlined">notifications_active</span>
              </div>
              <div>
                <h4 className="font-bold text-lg">{t("Instant Alerts")}</h4>
                <p className="text-slate-400">{t("Never miss a breakout with push notifications and audible signals.")}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-video rounded-2xl bg-slate-800 overflow-hidden shadow-2xl border border-primary/20">
            <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">{t("Scanner View")}</span>
            </div>
            <div className="p-4 grid grid-cols-4 gap-2 opacity-80">
              <div className="h-4 bg-primary/20 rounded"></div>
              <div className="h-4 bg-primary/20 rounded"></div>
              <div className="h-4 bg-primary/20 rounded"></div>
              <div className="h-4 bg-primary/20 rounded"></div>
              <div className="h-64 col-span-4 bg-background-dark/50 rounded-lg flex flex-col justify-around px-4">
                <div className="h-2 w-full bg-primary/10 rounded"></div>
                <div className="h-2 w-full bg-primary/30 rounded"></div>
                <div className="h-2 w-full bg-primary/10 rounded"></div>
                <div className="h-2 w-full bg-primary/10 rounded"></div>
                <div className="h-2 w-full bg-primary/40 rounded"></div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        </div>
      </div>
    </div>
  </section>
  );
};

export { ProScannerSection };
