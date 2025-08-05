"use server";

import { z } from 'zod';
import { generatePhoneImage, GeneratePhoneImageInputSchema } from '@/ai/flows/generate-phone-image';

const loginSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  password: z.string().min(1, { message: "La contraseña es obligatoria." }),
});

export async function login(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    return { success: false, message: parsed.error.errors.map(e => e.message).join(', ') };
  }

  const { email, password } = parsed.data;

  if (email === 'john474nvallejo@gmail.com' && password === '123456') {
    return { success: true, message: 'Inicio de sesión exitoso.' };
  }

  return { success: false, message: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.' };
}

export async function handleGenerateImage(phoneName: string, phoneBrand: string) {
  try {
    const result = await generatePhoneImage({ phoneName, phoneBrand });
    return { success: true, imageUrl: result.imageUrl };
  } catch (error) {
    console.error('Error generating AI image:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return { success: false, error: `No se pudo generar la imagen: ${errorMessage}` };
  }
}
