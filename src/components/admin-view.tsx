"use client";

import { useState } from 'react';
import { login } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { KeyRound, LogIn } from 'lucide-react';
import { phones } from '@/lib/phones';
import type { Phone } from '@/lib/types';
import Image from 'next/image';

function AdminDashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestionar Teléfonos</CardTitle>
        <CardDescription>
          Aquí puedes editar la información y las imágenes de los teléfonos.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {phones.map((phone: Phone) => (
          <div key={phone.id} className="flex items-center justify-between p-2 border rounded-md">
            <div className="flex items-center gap-4">
              <Image
                src={phone.image}
                alt={phone.name}
                width={50}
                height={75}
                className="object-cover rounded-md"
              />
              <div>
                <p className="font-semibold">{phone.name}</p>
                <p className="text-sm text-muted-foreground">{phone.brand}</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Editar
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function AdminView() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const result = await login(formData);

    if (result.success) {
      toast({
        title: '¡Bienvenido!',
        description: result.message,
      });
      setIsAuthenticated(true);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error de inicio de sesión',
        description: result.message,
      });
    }
    setIsLoading(false);
  };

  if (isAuthenticated) {
    return <AdminDashboard />;
  }

  return (
    <div className="flex justify-center items-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <KeyRound className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="text-2xl font-bold font-headline">
            Acceso de Administrador
          </CardTitle>
          <CardDescription>
            Por favor, introduce tus credenciales para acceder al panel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@ejemplo.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              <LogIn className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
