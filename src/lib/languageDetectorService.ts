export class LanguageDetectionService {
    private detector: any;
  
    private constructor() {}
  
    public static async create(): Promise<LanguageDetectionService> {
        const service = new LanguageDetectionService();
        await service.initialize();
        return service;
    }
  
    private async initialize() {
      // @ts-expect-error ai not available yet
      this.detector = await window.ai.languageDetector.create();
    }
  
    public async detectLanguage(text: string): Promise<{ language: string; confidence: number }[]> {
      if (!this.detector) {
        throw new Error("Language detector is not initialized");
      }
  
      const results = await this.detector.detect(text);
      return results.map((result: { detectedLanguage: string; confidence: number }) => ({
        language: result.detectedLanguage,
        confidence: result.confidence,
      }));
    }
  
    public destroy() {
      if (this.detector) {
        this.detector.destroy();
      }
    }
  }
  