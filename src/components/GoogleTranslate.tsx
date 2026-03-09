import { useEffect, useRef, useState } from 'react';

interface GoogleTranslateProps {
  id?: string;
}

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export const GoogleTranslate = ({ id = 'google_translate_element' }: GoogleTranslateProps) => {
  const translateRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initializeTranslate = () => {
      if (
        window.google && 
        window.google.translate && 
        translateRef.current && 
        !initializedRef.current
      ) {
        try {
          new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,de,fr,es,it,ar,fa,zh,ko',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
          }, translateRef.current);
          initializedRef.current = true;
          setIsLoaded(true);
          console.log('Google Translate initialized for:', id);
        } catch (error) {
          console.error('Google Translate initialization error:', error);
        }
      }
    };

    // Try to initialize immediately
    initializeTranslate();

    // If Google Translate isn't loaded yet, wait for it
    let attempts = 0;
    const checkGoogleTranslate = setInterval(() => {
      attempts++;
      if (window.google && window.google.translate) {
        initializeTranslate();
        clearInterval(checkGoogleTranslate);
      } else if (attempts > 50) { // Stop after 5 seconds
        console.warn('Google Translate failed to load after 5 seconds');
        clearInterval(checkGoogleTranslate);
      }
    }, 100);

    // Cleanup
    return () => {
      clearInterval(checkGoogleTranslate);
      initializedRef.current = false;
    };
  }, [id]);

  return (
    <div className="google-translate-container">
      <div 
        ref={translateRef} 
        id={id} 
        className="google-translate-widget min-h-[30px] min-w-[100px]" 
        style={{ display: 'block', visibility: 'visible' }}
      />
      {!isLoaded && (
        <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
          Loading Google Translate...
        </div>
      )}
    </div>
  );
};