import { Link } from 'react-router-dom';
export const LandingFooter = () => {
  return (
    <footer className="bg-[#08150d] pt-16 md:pt-20 pb-10 border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 mb-16 md:mb-20">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 text-primary mb-6 md:mb-8">
              <span className="text-xl font-black tracking-tight text-slate-100 uppercase">TradeZero</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-md">
              TradeZero America is a brokerage firm providing software and services for retail and professional traders. We offer commission-free trading and advanced shorting tools.
            </p>
          </div>
          
          <div>
            <h5 className="font-bold text-slate-100 mb-6 uppercase text-xs tracking-widest">Support</h5>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link className="hover:text-primary transition-colors flex items-center gap-2" to="/login">FAQ</Link></li>
              <li><Link className="hover:text-primary transition-colors flex items-center gap-2" to="/login">Contact Us</Link></li>
              <li><Link className="hover:text-primary transition-colors flex items-center gap-2" to="/login">Training</Link></li>
              <li><Link className="hover:text-primary transition-colors flex items-center gap-2" to="/login">Status</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-slate-100 mb-6 uppercase text-xs tracking-widest">Company</h5>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link className="hover:text-primary transition-colors flex items-center gap-2" to="/login">About Us</Link></li>
              <li><Link className="hover:text-primary transition-colors flex items-center gap-2" to="/login">News</Link></li>
              <li><Link className="hover:text-primary transition-colors flex items-center gap-2" to="/login">Careers</Link></li>
              <li><Link className="hover:text-primary transition-colors flex items-center gap-2" to="/login">Compliance</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-[11px] md:text-xs text-slate-500 mb-4 leading-relaxed max-w-5xl mx-auto px-4">
            Securities trading involves high risk and may not be suitable for all investors. TradeZero America, Inc. is a registered broker-dealer and member of FINRA and SIPC.
          </p>
          <p className="text-[10px] sm:text-[11px] text-slate-600 uppercase tracking-wider font-semibold">
            © 2024 TradeZero America. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
