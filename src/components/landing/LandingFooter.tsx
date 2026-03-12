import { Link } from 'react-router-dom';
export const LandingFooter = () => {
  return (
    <footer className="bg-[#08150d] pt-20 pb-10 border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 text-primary mb-8">
              
              <span className="text-xl font-black tracking-tight text-slate-100 uppercase">TradeZero</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              TradeZero America is a brokerage firm providing software and services for retail and professional traders. We offer commission-free trading and advanced shorting tools.
            </p>
            {/* <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-background-dark transition-all" href="#">
                <span className="material-symbols-outlined text-xl">share</span>
              </a>
              <a className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-background-dark transition-all" href="#">
                <span className="material-symbols-outlined text-xl">groups</span>
              </a>
              <a className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-background-dark transition-all" href="#">
                <span className="material-symbols-outlined text-xl">rss_feed</span>
              </a>
            </div> */}
          </div>
          
          
          <div>
            <h5 className="font-bold text-slate-100 mb-6 uppercase text-xs tracking-widest">Support</h5>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link className="hover:text-primary transition-colors" to="/login">FAQ</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/login">Contact Us</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/login">Training</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/login">Status</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-slate-100 mb-6 uppercase text-xs tracking-widest">Company</h5>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link className="hover:text-primary transition-colors" to="/login">About Us</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/login">News</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/login">Careers</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/login">Compliance</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-10 border-t border-white/5 text-center">
          <p className="text-xs text-slate-600 mb-4 leading-loose max-w-4xl mx-auto">
            Securities trading involves high risk and may not be suitable for all investors. TradeZero America, Inc. is a registered broker-dealer and member of FINRA and SIPC.
          </p>
          <p className="text-[10px] text-slate-700 uppercase tracking-tighter">
            © 2024 TradeZero America. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
