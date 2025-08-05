"use client";

import { useState } from 'react';
import { login, handleGenerateImage } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { KeyRound, LogIn, Sparkles, Image as ImageIcon } from 'lucide-react';
import { phones } from '@/lib/phones';
import type { Phone } from '@/lib/types';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from './ui/skeleton';

function AdminDashboard() {
  const { toast } = useToast();
  const [generatingImageId, setGeneratingImageId] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const onGenerateImage = async (phone: Phone) => {
    setGeneratingImageId(phone.id);
    setGeneratedImageUrl(null);

    const result = await handleGenerateImage(phone.name, phone.brand);

    if (result.success && result.imageUrl) {
      setGeneratedImageUrl(result.imageUrl);
      toast({
        title: 'Imagen Generada',
        description: `Se ha creado una nueva imagen para ${phone.name}.`,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error de Generación',
        description: result.error || 'No se pudo generar la imagen.',
      });
    }
    setGeneratingImageId(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestionar Teléfonos</CardTitle>
        <CardDescription>
          Aquí puedes editar la información y generar imágenes con IA.
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
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Editar
              </Button>
               <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onGenerateImage(phone)}
                    disabled={generatingImageId === phone.id}
                  >
                    {generatingImageId === phone.id ? (
                      'Generando...'
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generar Imagen
                      </>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Imagen generada por IA para {phone.name}</DialogTitle>
                  </DialogHeader>
                  <div className="flex items-center justify-center p-4">
                  {generatingImageId === phone.id && !generatedImageUrl && (
                      <div className="space-y-3">
                        <Skeleton className="h-[250px] w-[250px] rounded-xl" />
                        <Skeleton className="h-4 w-[250px]" />
                        <p className='text-center text-sm text-muted-foreground'>La generación de imágenes puede tardar unos segundos...</p>
                      </div>
                  )}
                  {generatedImageUrl && (
                    <Image src={generatedImageUrl} alt={`AI generated image of ${phone.name}`} width={400} height={400} className="rounded-md" />
                  )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
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
