'use server';
/**
 * @fileOverview Summarizes the key differences between two phones using AI.
 *
 * - generateComparisonSummary - A function that takes two phone specifications and returns a summary of their key differences.
 * - ComparisonSummaryInput - The input type for the generateComparisonSummary function.
 * - ComparisonSummaryOutput - The return type for the generateComparisonSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ComparisonSummaryInputSchema = z.object({
  phone1Specs: z.string().describe('Specifications of the first phone.'),
  phone2Specs: z.string().describe('Specifications of the second phone.'),
  userPreferences: z.string().optional().describe('Optional user preferences or needs.'),
});
export type ComparisonSummaryInput = z.infer<typeof ComparisonSummaryInputSchema>;

const ComparisonSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the key differences between the two phones, highlighting which phone might be better for specific needs.'),
});
export type ComparisonSummaryOutput = z.infer<typeof ComparisonSummaryOutputSchema>;

export async function generateComparisonSummary(input: ComparisonSummaryInput): Promise<ComparisonSummaryOutput> {
  return comparisonSummaryFlow(input);
}

const comparisonSummaryPrompt = ai.definePrompt({
  name: 'comparisonSummaryPrompt',
  input: {schema: ComparisonSummaryInputSchema},
  output: {schema: ComparisonSummaryOutputSchema},
  prompt: `You are an AI assistant that helps users compare two smartphones and determine which one is better suited for their needs.

  You are given the specifications of two phones and optional user preferences.
  Based on this information, provide a concise summary of their key differences, highlighting which phone might be better for specific needs.

  Phone 1 Specifications: {{{phone1Specs}}}
  Phone 2 Specifications: {{{phone2Specs}}}

  User Preferences: {{#if userPreferences}}{{{userPreferences}}}{{else}}No specific preferences provided.{{/if}}

  Summary:`, 
});

const comparisonSummaryFlow = ai.defineFlow(
  {
    name: 'comparisonSummaryFlow',
    inputSchema: ComparisonSummaryInputSchema,
    outputSchema: ComparisonSummaryOutputSchema,
  },
  async input => {
    const {output} = await comparisonSummaryPrompt(input);
    return output!;
  }
);
