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
            <div className="flex gap-4">
              <a
                href="https://x.com/tradezero?s=09"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://t.me/tradezero_group"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#0088cc] transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 6.728-.896 6.728-.377 2.618-1.415 3.051-2.896 1.899l-2.837-2.135-1.415 1.36c-.896.896-1.415 1.415-2.896.896l.896-2.837L18.314 7.264c.377-.377-.377-.896-.896-.519L8.537 11.196l-2.618-.896c-.896-.377-.896-1.415.377-1.792L18.314 6.368c.896-.377 1.792.377 1.254 1.792z" />
                </svg>
              </a>
            </div>
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
