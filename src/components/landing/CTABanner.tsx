import React from 'react';
import { useNavigate } from 'react-router-dom';

const CTABanner = () => {
  const navigate = useNavigate()
  return (
    <div className="max-w-7xl mx-auto px-4 mb-24">
      <div className="bg-primary rounded-xl p-12 text-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-background-dark/10 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110"></div>
        <h2 className="text-background-dark text-4xl md:text-5xl font-black mb-8 relative z-10">Start Trading Today</h2>
        <p className="text-background-dark/80 text-xl mb-10 max-w-xl mx-auto relative z-10 font-medium">Join thousands of professional traders who rely on TradeZero for their market access.</p>
        <button className="px-12 py-5 bg-background-dark text-primary rounded-full font-black text-xl hover:scale-105 transition-transform relative z-10" onClick={() => navigate("/login")}>
          Open Your Account
        </button>
      </div>
    </div>
  )
};

export { CTABanner };
