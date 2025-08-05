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
      userPreferences: userPreferences || 'No specific preferences provided.',
    };
    const result = await generateComparisonSummary(input);
    return { summary: result.summary, error: null };
  } catch (error) {
    console.error('Error generating AI summary:', error);
    return { summary: null, error: 'Failed to generate summary. The AI service may be temporarily unavailable. Please try again later.' };
  }
}
