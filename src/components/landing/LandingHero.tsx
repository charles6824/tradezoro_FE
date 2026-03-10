


import React from 'react';
import { useNavigate } from 'react-router-dom'

const LandingHero = () => {
  const navigate = useNavigate()
  return (
  <section className="relative min-h-[85vh] flex items-center overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,189,85,0.15),transparent)] z-0"></div>
    <div className="absolute right-0 top-0 w-1/2 h-full opacity-40 pointer-events-none bg-center bg-no-repeat bg-cover" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDuelPzDoZahm9D2OrwdRwP3ASJfMr0ppuTotOmadH9D_vTszKFQtvnaa0EtX5UWQpLH_XFgEJNczziW8235CAh5qojyqZ2yIOZ7eozRrFMKjIwGOLoHDdDwAnJvAw8rIW1y2UZcaw-orApwfFnKh1ZF6cKvDkO6lUH7-KucNuSpQS3Deu4WKq_ptHqsQMSzI2wzrCIyAhdKs8mIKcJMlpZY3kl0eVUIWjuNaR65U3OJQSPl1SZ4i1KTusvnuw9uoGA0G6SC3vZulc')"}}></div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          NEW USER SPECIAL
        </div>
        <h1 className="text-6xl font-black leading-[1.1] mb-6 tracking-tight">
          TradeZero ProScanner. <br />
          <span className="text-primary">Fast Market Clarity.</span>
        </h1>
        <p className="text-xl text-slate-400 mb-10 max-w-lg leading-relaxed">
          ProScanner – a real-time stock scanner, included for free. Build custom scans, filter symbols faster, and focus on the opportunities that match your criteria.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-10 py-5 rounded-full bg-primary text-background-dark font-black text-lg hover:scale-105 transition-transform cursor-pointer" onClick={() => navigate("/register")}>
            Open an Account
          </button>
          <button className="px-10 py-5 rounded-full border border-primary/30 font-bold text-lg hover:bg-primary/5 transition-colors cursor-pointer" onClick={() => navigate("/register")}>
            Learn More
          </button>
        </div>
      </div>
    </div>
  </section>
)};

export { LandingHero };
