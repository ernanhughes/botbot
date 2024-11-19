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
