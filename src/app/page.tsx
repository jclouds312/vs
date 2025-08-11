
'use client';

import { useState, Suspense } from 'react';
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

  const handleSelectPhone1 = (phone: Phone) => {
    if (phone2 && phone.id === phone2.id) {
      setPhone2(phone1);
    }
    setPhone1(phone);
  };
  
  const handleSelectPhone2 = (phone: Phone) => {
    if (phone1 && phone.id === phone1.id) {
      setPhone1(phone2);
    }
    setPhone2(phone);
  };

  const showComparison = phone1 && phone2;

  return (
    <div className="bg-background">
      {!isEmbedded && <Header />}
      <main className="flex-1 container mx-auto px-4 pb-8">
        <div className="space-y-4 pt-1">
          {!showComparison ? (
             <>
               <div className="flex gap-0.5 items-start justify-center">
                  <PhoneSelector
                    phones={phones}
                    selectedPhone={phone1}
                    onSelectPhone={handleSelectPhone1}
                    onClear={() => setPhone1(null)}
                    title="Smartphone 1"
                    disabledIds={phone2 ? [phone2.id] : []}
                  />
                  <div className="flex items-center justify-center h-full pt-12 px-1">
                    <p className="text-xs font-bold text-muted-foreground self-center">vs</p>
                  </div>
                  <PhoneSelector
                    phones={phones}
                    selectedPhone={phone2}
                    onSelectPhone={handleSelectPhone2}
                    onClear={() => setPhone2(null)}
                    title="Smartphone 2"
                    disabledIds={phone1 ? [phone1.id] : []}
                  />
                </div>
                 <div className="text-center pt-8 space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2">Duelos de Gama Alta</h3>
                      <div className="flex flex-wrap gap-2 justify-center">
                          <Button variant="outline" size="sm" onClick={() => handleSampleSearch('Galaxy S24 Ultra', 'iPhone 15 Pro')}>
                              Samsung vs Apple
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleSampleSearch('Pixel 8 Pro', 'Xiaomi 14 Ultra')}>
                              Google vs Xiaomi
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleSampleSearch('Oppo Find X7 Ultra', 'Vivo X100 Pro')}>
                              Fotografía China
                          </Button>
                      </div>
                    </div>
                     <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2">Mejor Calidad-Precio</h3>
                      <div className="flex flex-wrap gap-2 justify-center">
                           <Button variant="outline" size="sm" onClick={() => handleSampleSearch('Realme GT 6', 'Motorola Edge 50 Ultra')}>
                              Realme vs Motorola
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleSampleSearch('Pixel 7a', 'Nothing Phone (2)')}>
                              Pixel vs Nothing
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleSampleSearch('Xiaomi 13T Pro', 'OnePlus 12')}>
                              Xiaomi vs OnePlus
                          </Button>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2">Comparativas Populares</h3>
                       <div className="flex flex-wrap gap-2 justify-center">
                          <Button variant="outline" size="sm" onClick={() => handleSampleSearch('Galaxy S24', 'Pixel 8')}>
                              Gama Alta Compacto
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleSampleSearch('iPhone 15', 'Galaxy S24')}>
                              Apple vs Samsung Base
                          </Button>
                           <Button variant="outline" size="sm" onClick={() => handleSampleSearch('Galaxy A55', 'Pixel 7a')}>
                              Gama Media Premium
                          </Button>
                      </div>
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
