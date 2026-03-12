import React from 'react';
import { useNavigate } from 'react-router-dom'

const BuildExperienceSection = () => {
  const navigate = useNavigate()
  
  return (
  <section className="py-24 bg-background-light dark:bg-background-dark">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
      <h2 className="text-4xl font-black mb-4">Build Your Trading Experience</h2>
      <p className="text-slate-400 max-w-2xl mx-auto">Choose the modules and tools that fit your unique trading style.</p>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
      <div className="group relative p-1 rounded-xl bg-gradient-to-br from-primary/30 to-background-dark">
        <div className="bg-background-dark p-10 rounded-lg h-full transition-transform group-hover:-translate-y-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/40 to-primary/10 flex items-center justify-center text-primary mb-8">
            <span className="material-symbols-outlined text-4xl">trending_down</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Professional Short Selling Tools</h3>
          <p className="text-slate-400 mb-8 leading-relaxed">Access hard-to-borrow stocks with our unique locate system. Advanced routing options for professional short sellers.</p>
          <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all" onClick={() => navigate("/login")}>
            EXPLORE TOOLS <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
      <div className="group relative p-1 rounded-xl bg-gradient-to-br from-primary/30 to-background-dark">
        <div className="bg-background-dark p-10 rounded-lg h-full transition-transform group-hover:-translate-y-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/40 to-primary/10 flex items-center justify-center text-primary mb-8">
            <span className="material-symbols-outlined text-4xl">public</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Expanded Market Access</h3>
          <p className="text-slate-400 mb-8 leading-relaxed">Trade pre-market from 4am ET and after-hours until 8pm ET. Global connectivity with institutional liquidity providers.</p>
          <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all" onClick={() => navigate("/login")}>
            LEARN ABOUT ACCESS <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  </section>
)};

export { BuildExperienceSection };
