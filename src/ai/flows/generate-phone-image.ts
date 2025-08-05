'use server';
/**
 * @fileOverview Generates an artistic image of a phone using AI.
 *
 * - generatePhoneImage - A function that takes a phone name and brand and returns a generated image.
 * - GeneratePhoneImageInput - The input type for the generatePhoneImage function.
 * - GeneratePhoneImageOutput - The return type for the generatePhoneImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GeneratePhoneImageInputSchema = z.object({
  phoneName: z.string().describe('El nombre del teléfono.'),
  phoneBrand: z.string().describe('La marca del teléfono.'),
});
export type GeneratePhoneImageInput = z.infer<typeof GeneratePhoneImageInputSchema>;

export const GeneratePhoneImageOutputSchema = z.object({
  imageUrl: z.string().describe("La URL de la imagen generada como un data URI. Formato esperado: 'data:image/png;base64,<encoded_data>'."),
});
export type GeneratePhoneImageOutput = z.infer<typeof GeneratePhoneImageOutputSchema>;

export async function generatePhoneImage(input: GeneratePhoneImageInput): Promise<GeneratePhoneImageOutput> {
  return generatePhoneImageFlow(input);
}

const generatePhoneImageFlow = ai.defineFlow(
  {
    name: 'generatePhoneImageFlow',
    inputSchema: GeneratePhoneImageInputSchema,
    outputSchema: GeneratePhoneImageOutputSchema,
  },
  async ({ phoneName, phoneBrand }) => {
    const prompt = `Una foto de producto cinematográfica y de alta calidad de un smartphone ${phoneName} de ${phoneBrand}. El teléfono debe estar sobre un fondo minimalista y elegante.`;
    
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media || !media.url) {
      throw new Error('No se pudo generar la imagen.');
    }

    return { imageUrl: media.url };
  }
);
