
'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { PhoneSelector } from '@/components/phone-selector';
import { ComparisonView } from '@/components/comparison-view';
import { phones } from '@/lib/phones';
import type { Phone } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function Home() {
  const [phone1, setPhone1] = useState<Phone | null>(null);
  const [phone2, setPhone2] = useState<Phone | null>(null);

  const handleReset = () => {
    setPhone1(null);
    setPhone2(null);
  };

  const showComparison = phone1 && phone2;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="space-y-8">
          {!showComparison ? (
             <>
              <div className="text-center space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                  Compara Smartphones
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Selecciona dos teléfonos para ver una comparación detallada lado a lado y obtener un resumen con IA para tomar la decisión correcta.
                </p>
              </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <PhoneSelector
                    phones={phones}
                    selectedPhone={phone1}
                    onSelectPhone={setPhone1}
                    onClear={() => setPhone1(null)}
                    title="Teléfono 1"
                    disabledIds={phone2 ? [phone2.id] : []}
                  />
                  <PhoneSelector
                    phones={phones}
                    selectedPhone={phone2}
                    onSelectPhone={setPhone2}
                    onClear={() => setPhone2(null)}
                    title="Teléfono 2"
                    disabledIds={phone1 ? [phone1.id] : []}
                  />
                </div>
            </>
          ) : (
            <>
              <div className="mb-6">
                 <Button onClick={handleReset} variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver a la lista de teléfonos
                </Button>
              </div>
              <ComparisonView phone1={phone1} phone2={phone2} />
            </>
          )}
        </div>
      </main>
      <footer className="py-4 text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} SmartCompare. Todos los derechos reservados.
      </footer>
    </div>
  );
}
