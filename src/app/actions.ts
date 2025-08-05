"use server";

import { generateComparisonSummary } from '@/ai/flows/comparison-summary';
import type { Phone } from '@/lib/types';

// Helper function to stringify phone specs
const formatSpecs = (phone: Phone): string => {
  return Object.entries(phone.specs)
    .map(([key, value]) => {
      const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
      return `${formattedKey}: ${value}`;
    })
    .join('; ');
};

export async function getAiSummary(
  phone1: Phone,
  phone2: Phone,
  userPreferences: string
) {
  try {
    const input = {
      phone1Specs: formatSpecs(phone1),
      phone2Specs: formatSpecs(phone2),
      userPreferences: userPreferences || 'Sin preferencias específicas.',
    };
    const result = await generateComparisonSummary(input);
    return { summary: result.summary, error: null };
  } catch (error) {
    console.error('Error generating AI summary:', error);
    return { summary: null, error: 'No se pudo generar el resumen. El servicio de IA puede no estar disponible temporalmente. Por favor, inténtalo de nuevo más tarde.' };
  }
}
