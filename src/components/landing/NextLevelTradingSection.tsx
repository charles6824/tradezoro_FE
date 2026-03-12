import { Link } from 'react-router-dom';

export const NextLevelTradingSection = () => {
  return (
    <section className="relative py-24 bg-background-dark overflow-hidden min-h-[600px] flex items-center">
      <div className="absolute inset-0 z-0">
        <img alt="Trading background" className="w-full h-full object-cover opacity-20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUm0t1vTKCQl9gGfXKXBAnQkgX5MBrTMUbuD7iDY6bHQLmuEOMD7c2uT4VB-8UoanZcFJOKGt6A66bNP6MF9sfbU-3tKBWQ9MOHcw3fKYR8G_QX8Wmbpdhc5Fj-3nTJWrIp4Bb6xb5EF8jG2KuKVxeuMhRXvK7MdkQ-4_vt9jkpa4bM8sFSmoOYMNq56DU6wFnJJ01XNDI-Ca-YyQgO8JSH9ZbqRWHgeOvc9hqvTPioryk9CcjyG1B2jArzPCvyVmphjq0GL5fv0Y" />
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/90 to-background-dark/20"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight text-white">
            Take Your Trading <br />to the Next Level
          </h2>
          <p className="text-xl text-slate-300 mb-12 leading-relaxed">
            Trusted by Over 100,000 Clients: Lightning-Fast Trades, Low Fees and an Exceptional Trading Experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <Link to="/login" className="px-8 py-4 bg-primary text-background-dark rounded-xl font-bold text-lg hover:brightness-110 transition-all flex items-center justify-center gap-2">
              Start Trading <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <button onClick={() => window.open('https://t.me/tradezero_community', '_blank')} className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
              Join Live Chat <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};