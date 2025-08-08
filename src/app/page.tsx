
'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/header';
import { PhoneSelector } from '@/components/phone-selector';
import { ComparisonView } from '@/components/comparison-view';
import { phones } from '@/lib/phones';
import type { Phone } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search } from 'lucide-react';

function SmartCompareContent() {
  const [phone1, setPhone1] = useState<Phone | null>(null);
  const [phone2, setPhone2] = useState<Phone | null>(null);
  const searchParams = useSearchParams();
  const isEmbedded = searchParams.get('embed') === 'true';

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
    { category: 'Gama Alta (2024)', searches: [
      { name: 'iPhone 15 Pro vs Galaxy S24 Ultra', p1: 'iPhone 15 Pro', p2: 'Galaxy S24 Ultra' },
      { name: 'Pixel 8 Pro vs OnePlus 12', p1: 'Pixel 8 Pro', p2: 'OnePlus 12' },
      { name: 'Galaxy S24 vs Pixel 8', p1: 'Galaxy S24', p2: 'Pixel 8' },
    ]},
    { category: 'Gama Media', searches: [
      { name: 'Galaxy A55 vs Pixel 7a', p1: 'Galaxy A55', p2: 'Pixel 7a' },
      { name: 'Realme 12 Pro+ vs Nothing Phone (2)', p1: 'Realme 12 Pro+', p2: 'Nothing Phone (2)' },
      { name: 'Xiaomi 13T Pro vs Galaxy A55', p1: 'Xiaomi 13T Pro', p2: 'Galaxy A55' },
    ]},
    { category: 'Por Marca', searches: [
      { name: 'Apple: iPhone 15 vs iPhone SE', p1: 'iPhone 15', p2: 'iPhone SE (2022)' },
      { name: 'Samsung: S24 Ultra vs A55', p1: 'Galaxy S24 Ultra', p2: 'Galaxy A55' },
      { name: 'Google: Pixel 8 Pro vs Pixel 7a', p1: 'Pixel 8 Pro', p2: 'Pixel 7a' },
      { name: 'Realme: GT 2 Pro vs C67', p1: 'Realme GT 2 Pro', p2: 'Realme C67' },
    ]},
    { category: 'Especializadas', searches: [
      { name: 'Juegos: ROG Phone 8 Pro vs OnePlus 12', p1: 'Asus ROG Phone 8 Pro', p2: 'OnePlus 12' },
      { name: 'Fotografía: Xperia 1 V vs Pixel 8 Pro', p1: 'Sony Xperia 1 V', p2: 'Pixel 8 Pro' },
    ]},
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {!isEmbedded && <Header />}
      <main className="flex-1 container mx-auto px-4 pt-2 md:pt-4 pb-8">
        <div className="space-y-4">
          {!showComparison ? (
             <>
               <div className="grid grid-cols-[1fr_auto_1fr] gap-2 md:gap-1 items-start justify-center">
                  <PhoneSelector
                    phones={phones}
                    selectedPhone={phone1}
                    onSelectPhone={setPhone1}
                    onClear={() => setPhone1(null)}
                    title="Smartphone 1 a elegir"
                    disabledIds={phone2 ? [phone2.id] : []}
                  />
                  <div className="flex items-center justify-center h-full pt-16">
                    <p className="text-sm font-bold text-muted-foreground self-center">a comparar versus</p>
                  </div>
                  <PhoneSelector
                    phones={phones}
                    selectedPhone={phone2}
                    onSelectPhone={setPhone2}
                    onClear={() => setPhone2(null)}
                    title="Smartphone 2 a elegir"
                    disabledIds={phone1 ? [phone1.id] : []}
                  />
                </div>
                <div className="text-center space-y-6 pt-8">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Search className="w-4 h-4" />
                    <h3 className="text-sm font-semibold uppercase tracking-wider">Búsquedas de ejemplo</h3>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-4">
                    {sampleSearches.map(group => (
                       <div key={group.category} className="flex flex-wrap items-center justify-center gap-2">
                          <p className="w-full text-center font-bold text-sm text-primary md:w-auto md:text-right">{group.category}:</p>
                          {group.searches.map(search => (
                            <Button 
                              key={search.name}
                              variant="outline"
                              size="sm"
                              onClick={() => handleSampleSearch(search.p1, search.p2)}
                              className="h-auto px-2.5 py-0.5 text-xs font-semibold rounded-full"
                            >
                              {search.name}
                           </Button>
                          ))}
                       </div>
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
      {!isEmbedded && (
        <footer className="py-4 text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} SmartCompare. Todos los derechos reservados.
        </footer>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SmartCompareContent />
    </Suspense>
  );
}
