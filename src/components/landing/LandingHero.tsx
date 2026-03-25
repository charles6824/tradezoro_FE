
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Hls from 'hls.js';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const LandingHero = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const src = "https://stream.mux.com/tvb6t201Rx68A6Htk7wpdJZfVRaiylYfPEYZB00u02pRBg.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls({
        autoStartLoad: true,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play().catch((e) => console.log("HLS auto-play prevented:", e));
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // For Safari and native HLS support
      video.src = src;
      video.addEventListener('loadedmetadata', function () {
        video.play().catch((e) => console.log("Native auto-play prevented:", e));
      });
    }
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0A0A0A] pt-20">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-black/60 z-10 w-full h-full"></div>
        <video
          ref={videoRef}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <div className="relative z-10 max-w-[1000px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl md:text-[64px] font-bold leading-[1.1] mb-6 tracking-tight text-white px-2">
          {t("TradeZero ProScanner.")}<br />
          {t("Fast Market Clarity.")}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-slate-200 mb-10 max-w-[800px] leading-relaxed font-medium px-4">
          {t("ProScanner – a real-time stock scanner, included for free.")}<br />
          {t("Build custom scans, filter symbols faster, and focus on the opportunities that match your criteria.")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full px-4">
          <button
            className="flex items-center justify-center gap-2 px-8 py-4 sm:py-3.5 rounded-lg bg-[#FF4D00] text-white font-bold text-base sm:text-lg hover:bg-[#e64500] transition-colors w-full sm:w-auto"
            onClick={() => navigate("/register")}
          >
            {t("Open An Account")} <ArrowUpRight className="w-5 h-5" />
          </button>
          <button
            className="px-8 py-4 sm:py-3.5 rounded-lg bg-[#00E676] text-[#0A120D] font-bold text-base sm:text-lg hover:bg-[#00c968] transition-colors w-full sm:w-auto"
            onClick={() => window.open("https://t.me/tradezero_group", "_blank")}
          >
            {t("Live Chat")}
          </button>
        </div>
      </div>
    </section>
  );
};
