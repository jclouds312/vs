'use server';
/**
 * @fileOverview Summarizes the key differences between two phones using AI.
 *
 * - generateComparisonSummary - A function that takes two phone specifications and returns a summary of their key differences.
 * - ComparisonSummaryInput - The input type for the generateComparisonsummary function.
 * - ComparisonSummaryOutput - The return type for the generateComparisonSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ComparisonSummaryInputSchema = z.object({
  phone1Specs: z.string().describe('Especificaciones del primer teléfono.'),
  phone2Specs: z.string().describe('Especificaciones del segundo teléfono.'),
  userPreferences: z.string().optional().describe('Preferencias u necesidades opcionales del usuario.'),
});
export type ComparisonSummaryInput = z.infer<typeof ComparisonSummaryInputSchema>;

const ComparisonSummaryOutputSchema = z.object({
  summary: z.string().describe('Un resumen conciso de las diferencias clave entre los dos teléfonos, destacando qué teléfono podría ser mejor para necesidades específicas.'),
});
export type ComparisonSummaryOutput = z.infer<typeof ComparisonSummaryOutputSchema>;

export async function generateComparisonSummary(input: ComparisonSummaryInput): Promise<ComparisonSummaryOutput> {
  return comparisonSummaryFlow(input);
}

const comparisonSummaryPrompt = ai.definePrompt({
  name: 'comparisonSummaryPrompt',
  input: {schema: ComparisonSummaryInputSchema},
  output: {schema: ComparisonSummaryOutputSchema},
  prompt: `Eres un asistente de IA que ayuda a los usuarios a comparar dos smartphones y determinar cuál es el más adecuado para sus necesidades.

  Se te proporcionan las especificaciones de dos teléfonos y las preferencias opcionales del usuario.
  Basándote en esta información, proporciona un resumen conciso de sus diferencias clave, destacando qué teléfono podría ser mejor para necesidades específicas.

  Especificaciones del Teléfono 1: {{{phone1Specs}}}
  Especificaciones del Teléfono 2: {{{phone2Specs}}}

  Preferencias del Usuario: {{#if userPreferences}}{{{userPreferences}}}{{else}}No se proporcionaron preferencias específicas.{{/if}}

  Resumen:`, 
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
