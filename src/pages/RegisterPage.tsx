
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden dark bg-background-dark font-display text-slate-900 dark:text-slate-100">
      <div className="layout-container flex h-full grow flex-col">
        {/* Navigation Header */}
        <header className="flex items-center justify-between border-b border-slate-200 dark:border-primary/20 px-6 py-4 md:px-20 lg:px-40">
          <div className="flex items-center gap-3">
            
            <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight" onClick={ () => navigate("/")}>TradeZero</h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-sm text-slate-500 dark:text-slate-400">Already have an account?</span>
            <Link to="/login" className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-full h-10 px-6 bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-bold">
              <span>Log In</span>
            </Link>
          </div>
        </header>
        {/* Main Content Section */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          <div className="w-full max-w-[520px] space-y-8">
            {/* Title Section */}
            <div className="text-center space-y-2">
              <h1 className="text-slate-900 dark:text-white text-4xl font-black tracking-tight lg:text-5xl">Start Trading Now</h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg">Join the world's most trusted trading platform.</p>
            </div>
            {/* Form Container */}
            <div className="bg-white dark:bg-primary/5 rounded-xl border border-slate-200 dark:border-primary/10 p-8 shadow-sm">
              <form action="#" className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">First Name</span>
                    <input className="w-full rounded-xl border-slate-200 dark:border-primary/20 bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-primary focus:border-primary h-14 px-4 transition-all" placeholder="John" type="text" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Last Name</span>
                    <input className="w-full rounded-xl border-slate-200 dark:border-primary/20 bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-primary focus:border-primary h-14 px-4 transition-all" placeholder="Doe" type="text" />
                  </label>
                </div>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email Address</span>
                  <input className="w-full rounded-xl border-slate-200 dark:border-primary/20 bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-primary focus:border-primary h-14 px-4 transition-all" placeholder="john.doe@example.com" type="email" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Password</span>
                  <div className="relative">
                    <input className="w-full rounded-xl border-slate-200 dark:border-primary/20 bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-primary focus:border-primary h-14 px-4 pr-12 transition-all" placeholder="Min. 8 characters" type={showPassword ? 'text' : 'password'} />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600" type="button" onClick={() => setShowPassword(v => !v)}>
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Confirm Password</span>
                  <div className="relative">
                    <input className="w-full rounded-xl border-slate-200 dark:border-primary/20 bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-primary focus:border-primary h-14 px-4 transition-all" placeholder="Repeat your password" type="password" />
                  </div>
                </label>
                <div className="flex items-start gap-3 py-2">
                  <input className="mt-1 rounded border-slate-300 text-primary focus:ring-primary bg-slate-50 dark:bg-background-dark" id="terms" type="checkbox" />
                  <label className="text-xs text-slate-500 dark:text-slate-400 leading-snug" htmlFor="terms">
                    By creating an account, I agree to TradeZero's <a className="text-primary hover:underline" href="#">Terms of Service</a> and <a className="text-primary hover:underline" href="#">Privacy Policy</a>.
                  </label>
                </div>
                <button className="w-full bg-primary hover:bg-primary/90 text-background-dark font-bold text-lg h-14 rounded-xl transition-all shadow-lg shadow-primary/20" type="submit">
                  Create Account
                </button>
              </form>
            </div>
            {/* Trust Indicators */}
            <div className="flex flex-col items-center gap-6 pt-4">
              <div className="flex items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">SEC Regulated</span>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">FINRA Member</span>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">SIPC Insured</span>
              </div>
              <p className="text-xs text-center text-slate-400 dark:text-slate-500 max-w-sm">
                Trading involves risk. Please ensure you understand all risks before opening an account. 
                TradeZero is a registered broker-dealer.
              </p>
            </div>
          </div>
        </main>
        {/* Footer Small */}
        <footer className="py-10 border-t border-slate-200 dark:border-primary/10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span>© 2024 TradeZero America, Inc.</span>
            <span className="hidden md:inline">•</span>
            <div className="flex gap-4">
              <a className="hover:text-primary transition-colors" href="#">Help Center</a>
              <a className="hover:text-primary transition-colors" href="#">Contact Support</a>
              <a className="hover:text-primary transition-colors" href="#">Security</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};