import { useTranslation } from "react-i18next";

export const InvestSection = () => {
  const { t } = useTranslation();
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Dynamic Trading Background */}
      <div className="absolute inset-0 z-0">
        <video autoPlay className="absolute inset-0 w-full h-full object-cover opacity-30" loop muted playsInline>
          <source src="https://assets.mixkit.co/videos/preview/mixkit-financial-data-scrolling-on-a-digital-screen-34538-large.mp4" type="video/mp4" />
        </video>
        {/* Dark Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-background-dark/90 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-background-dark"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            {t("Global Market Access")}
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
            {t("INVEST ON OVER")} <span className="text-primary">{t("500+ STOCKS")}</span> {t("WORLDWIDE")}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            {t("Access institutional-grade liquidity and real-time execution across global exchanges.")}
          </p>
        </div>
        {/* <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="rounded-3xl overflow-hidden glass-card p-4 hover:border-primary/40 transition-all group relative">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <img alt="Easy Access to 500+ Global Assets" className="w-full h-auto rounded-2xl group-hover:scale-[1.02] transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9FfHEo7_CFaxN0XD-SREWXAR6In7g4MHNwCSaSbLPBdoNRQKDN0pLWW_M286fh0lBY_SQYacK7AK9HsOfhcVAyJbdB_lSwgQucYirjbu4YZXaNBCMMKKlLDJsaebMAxrHDjh3Zn4kYJD1WmHfCXp4khZ_xsshn_DcQRY0SsXLf0gehPz6Cm2q4sbHhOxebFW5Z_1FN8DL2lMWhdJ9uOGDXm72TO8zb8PaGR4CFMeTisyRBJxpDjmrGT4_NR7GQH9EgIX7zsqKu7E" />
          </div>
          <div className="rounded-3xl overflow-hidden glass-card p-4 hover:border-primary/40 transition-all group relative">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <img alt="Take Your Trading to the Next Level" className="w-full h-auto rounded-2xl group-hover:scale-[1.02] transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD7kh8y-Hfrxx-lEf-I-AVPlEAtkYG1YVyP-rMzxdD4_VEfyD2b0zVe4LuzRIRkMQvczbCBt5AmA2xE1f-lR9TQVvVC899evKF5MR6mwsbWXcrkmHSOTjalGpj4-z_muTV5VcEt8PLg4FvwUcuddI4ZFIAI3uOMWGpKkWpJaV_SRvjVtrq-OjMTUrXGa80CDuLY4GQ45vW-lsW3osdu9mQGe6oSxPZ4W3Qp6Q1YX4hv-onCtjd6Hiobr6pjOfMn5V38lAqqtsowBI" />
          </div>
        </div> */}
      </div>
    </section>
  );
};