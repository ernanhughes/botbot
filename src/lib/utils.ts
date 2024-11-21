import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function checkAiAvailable(): Promise<boolean> {
  // @ts-expect-error ai not available yet
  if (window.ai === undefined) return false;
  // @ts-expect-error ai not available yet
  const canCreate = await window.ai.canCreateTextSession();
  return canCreate === "readily";
}

export async function detectLanguage(inputText: string): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.i18n.detectLanguage(inputText, function (result) {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }

      if (!result?.languages?.length) {
        reject(new Error("No language detected"));
        return;
      }

      // Find the most likely language
      let mostLikelyLanguage = result.languages[0].language;
      let highestPercentage = result.languages[0].percentage;

      for (let i = 1; i < result.languages.length; i++) {
        if (result.languages[i].percentage > highestPercentage) {
          mostLikelyLanguage = result.languages[i].language;
          highestPercentage = result.languages[i].percentage;
        }
      }

      resolve(mostLikelyLanguage);
    });
  });
}
