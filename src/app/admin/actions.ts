"use server";

import { z } from 'zod';

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
