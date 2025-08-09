
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
    <div className="flex flex-col min-h-screen bg-background">
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
                 <div className="text-center pt-8">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">Búsquedas sugeridas (Modelos 2025)</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                        <Button variant="outline" size="sm" onClick={() => handleSampleSearch('Galaxy S24 Ultra', 'iPhone 15 Pro')}>
                            Galaxy S24 Ultra vs iPhone 15 Pro
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleSampleSearch('Pixel 8 Pro', 'Xiaomi 14 Ultra')}>
                            Pixel 8 Pro vs Xiaomi 14 Ultra
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleSampleSearch('Realme GT 6', 'Motorola Edge 50 Ultra')}>
                            Realme GT 6 vs Motorola Edge 50 Ultra
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleSampleSearch('Oppo Find X7 Ultra', 'Vivo X100 Pro')}>
                            Oppo Find X7 Ultra vs Vivo X100 Pro
                        </Button>
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
