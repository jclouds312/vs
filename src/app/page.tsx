
'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { PhoneSelector } from '@/components/phone-selector';
import { ComparisonView } from '@/components/comparison-view';
import { phones } from '@/lib/phones';
import type { Phone } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const [phone1, setPhone1] = useState<Phone | null>(null);
  const [phone2, setPhone2] = useState<Phone | null>(null);

  const handleReset = () => {
    setPhone1(null);
    setPhone2(null);
  };

  const handleSampleSearch = (phone1Name: string, phone2Name: string) => {
    const p1 = phones.find(p => p.name === phone1Name);
    const p2 = phones.find(p => p.name === phone2Name);
    if (p1) setPhone1(p1);
    if (p2) setPhone2(p2);
  };

  const showComparison = phone1 && phone2;

  const sampleSearches = [
    { name: 'iPhone 15 Pro vs Galaxy S24 Ultra', p1: 'iPhone 15 Pro', p2: 'Galaxy S24 Ultra' },
    { name: 'Pixel 8 Pro vs OnePlus 12', p1: 'Pixel 8 Pro', p2: 'OnePlus 12' },
    { name: 'Gama Media: Galaxy A55 vs Pixel 7a', p1: 'Galaxy A55', p2: 'Pixel 7a' },
  ];

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
                <div className="text-center space-y-3 pt-4">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Search className="w-4 h-4" />
                    <h3 className="text-sm font-semibold">Búsquedas de ejemplo</h3>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {sampleSearches.map(search => (
                       <Badge 
                          key={search.name}
                          variant="outline" 
                          onClick={() => handleSampleSearch(search.p1, search.p2)}
                          className="cursor-pointer hover:bg-accent"
                        >
                          {search.name}
                       </Badge>
                    ))}
                  </div>
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
