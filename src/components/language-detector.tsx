import React, { useEffect, useState } from "react";
import { LanguageDetectionService } from '../lib/languageDetectorService';

const LanguageDetectorComponent: React.FC = () => {
  const [detectedLanguage, setDetectedLanguage] = useState<
    { language: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let service: LanguageDetectionService;

    const detectLanguage = async () => {
      try {
        service = await LanguageDetectionService.create();
        const text = "This is a test text to detect the language.";
        const result = await service.detectLanguage(text);
        setDetectedLanguage(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while detecting the language.");
      } finally {
        service?.destroy();
      }
    };

    detectLanguage();

    return () => {
      service?.destroy();
    };
  }, []);

  return (
    <div>
      <h1>Language Detector</h1>
      {error && <p>Error: {error}</p>}
      {!error && detectedLanguage.length > 0 && (
        <h2>
          {detectedLanguage.map(lang => lang.language).join(', ')}
        </h2>
      )}
    </div>
  );
};

export default LanguageDetectorComponent;
