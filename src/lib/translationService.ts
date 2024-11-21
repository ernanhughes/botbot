import { detectLanguage } from "./utils";

export async function translateText(textToTranslate: string, targetLanguage: string) {
    // @ts-expect-error ai is nto defined yet
    const languageDetectorCapabilities = await ai.languageDetector.capabilities();
    // @ts-expect-error ai is nto defined yet
    const translatorCapabilities = await ai.translator.capabilities();
  
    // If `languageDetectorCapabilities.available === "no"`, then assume the source language is the
    // same as the document language.
    let sourceLanguage = document.documentElement.lang;
  
    // Otherwise, let's detect the source language.
    if (languageDetectorCapabilities.available !== "no") {
      if (languageDetectorCapabilities.available === "after-download") {
        console.log("Language detection is available, but something will have to be downloaded. Hold tight!");
      }
  
      // Special-case check for Japanese since for our site it's particularly important.
      if (languageDetectorCapabilities.languageAvailable("ja") === "no") {
        console.warn("Japanese Language detection is not available. Falling back to cloud API.");
        sourceLanguage = await detectLanguage(textToTranslate);
      } else {
        // @ts-expect-error ai is nto defined yet
        const detector = await ai.languageDetector.create();
        const [bestResult] = await detector.detect(textToTranslate);
  
        if (bestResult.detectedLangauge === null || bestResult.confidence < 0.4) {
          // We'll just return the input text without translating. It's probably mostly punctuation
          // or something.
          return textToTranslate;
        }
        sourceLanguage = bestResult.detectedLanguage;
      }
    }
  
    // Now we've figured out the source language. Let's translate it!
    // Note how we can just check `translatorCapabilities.languagePairAvailable()` instead of also checking
    // `translatorCapabilities.available`.
    const availability = translatorCapabilities.languagePairAvailable(sourceLanguage, targetLanguage);
    if (availability === "no") {
      console.warn("Translation is not available. Falling back to cloud API.");
      return await translateTextUsingGoogle(textToTranslate, targetLanguage);
    }
  
    if (availability === "after-download") {
      console.log("Translation is available, but something will have to be downloaded. Hold tight!");
    }
  
    // @ts-expect-error ai is nto defined yet
    const translator = await ai.translator.create({ sourceLanguage, targetLanguage });
    return await translator.translate(textToTranslate);
  }

  async function translateTextUsingGoogle(text: string, targetLang: string) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your Google Cloud API key
    const url = `https://translation.googleapis.com/translate_text?key=${apiKey}&q=${encodeURIComponent(text)}&target=${targetLang}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.data[0][0][0];
    } catch (error) {
      console.error('Error translating text:', error);
      return null;
    }
  }