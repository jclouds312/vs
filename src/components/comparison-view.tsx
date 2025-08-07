"use client";

import { useState } from 'react';
import Image from 'next/image';
import type { Phone } from '@/lib/types';
import { getAiSummary } from '@/app/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableRow, TableHead, TableHeader as ComparisonTableHeader } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb, AlertTriangle, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function ComparisonView({ phone1, phone2 }: { phone1: Phone; phone2: Phone }) {
  const [preferences, setPreferences] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setError(null);
    setSummary('');

    const result = await getAiSummary(phone1, phone2, preferences);

    if (result.error) {
      setError(result.error);
      toast({
        variant: 'destructive',
        title: 'Error en el resumen de IA',
        description: result.error,
      });
    } else if (result.summary) {
      setSummary(result.summary);
    }
    setIsLoading(false);
  };
  
  const specKeys = Object.keys(phone1.specs) as (keyof Phone['specs'])[];

  const renderSpecRow = (key: keyof Phone['specs']) => {
    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
    const value1 = typeof phone1.specs[key] === 'boolean' ? (phone1.specs[key] ? 'Sí' : 'No') : phone1.specs[key];
    const value2 = typeof phone2.specs[key] === 'boolean' ? (phone2.specs[key] ? 'Sí' : 'No') : phone2.specs[key];
    const isDifferent = value1 !== value2;

    return (
        <TableRow key={key} className={cn(isDifferent && 'bg-primary/5')}>
            <TableCell className="font-medium text-muted-foreground capitalize">{label}</TableCell>
            <TableCell className={cn(isDifferent && 'font-semibold text-primary')}>{value1}</TableCell>
            <TableCell className={cn(isDifferent && 'font-semibold text-primary')}>{value2}</TableCell>
        </TableRow>
    );
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-bold font-headline">
            Comparación de Especificaciones
          </CardTitle>
          <CardDescription>Una comparación detallada lado a lado.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-8">
             <PhoneColumn phone={phone1} />
             <PhoneColumn phone={phone2} />
          </div>
          <Table>
            <ComparisonTableHeader>
                <TableRow>
                    <TableHead className="w-[200px]">Característica</TableHead>
                    <TableHead>{phone1.name}</TableHead>
                    <TableHead>{phone2.name}</TableHead>
                </TableRow>
            </ComparisonTableHeader>
            <TableBody>
                {specKeys.map(key => renderSpecRow(key))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-headline">
            <Sparkles className="w-6 h-6 text-primary" />
            Comparación con IA
          </CardTitle>
          <CardDescription>
            Dinos qué es lo que más te importa (ej. "batería de larga duración", "excelente para juegos", "la mejor cámara para retratos") para obtener un resumen personalizado.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Opcional: Ingresa tus preferencias aquí..."
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            className="bg-card"
          />
          <Button onClick={handleGenerateSummary} disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? 'Generando...' : 'Generar resumen con IA'}
          </Button>

          {isLoading && (
            <div className="space-y-3 pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {summary && (
            <Alert className="border-accent">
              <Lightbulb className="h-4 w-4" />
              <AlertTitle className="font-headline text-accent">Resumen de la Comparación</AlertTitle>
              <AlertDescription className="prose prose-sm max-w-none text-foreground">
                <p>{summary}</p>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function PhoneColumn({ phone }: { phone: Phone }) {
  return (
    <Card className="flex flex-col items-center text-center gap-4 p-4">
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={phone.image}
          alt={phone.name}
          fill
          sizes="(max-width: 768px) 40vw, 25vw"
          className="object-contain rounded-md"
          data-ai-hint={`${phone.brand} ${phone.name}`}
        />
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-bold font-headline">{phone.name}</h3>
        <p className="text-lg text-muted-foreground">{phone.brand}</p>
      </div>
      <Badge variant="secondary" className="text-xl font-semibold">${phone.price}</Badge>
    </Card>
  );
}
