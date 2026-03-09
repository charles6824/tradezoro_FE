import { useEffect } from 'react';

const TopLanguageBar = () => {
  useEffect(() => {
    const initTranslate = () => {
      if (window.google && window.google.translate && document.getElementById('google_translate_element_top')) {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,de,fr,es,pt,ar,fa,zh,ko',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element_top');
      }
    };

    const retryInit = () => {
      initTranslate();
      setTimeout(initTranslate, 1000);
      setTimeout(initTranslate, 3000);
    };

    if (document.readyState === 'complete') {
      retryInit();
    } else {
      window.addEventListener('load', retryInit);
    }

    return () => window.removeEventListener('load', retryInit);
  }, []);

  return (
    <div className="bg-gray-100 border-b border-gray-200 py-2">
      <div className="container mx-auto px-4 flex justify-end">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 hidden sm:inline">Language:</span>
          <div id="google_translate_element_top" className="translate-top"></div>
        </div>
      </div>
    </div>
  );
};

export default TopLanguageBar;