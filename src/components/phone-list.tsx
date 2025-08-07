"use client";

import { useState } from 'react';
import { PhoneSelector } from './phone-selector';
import { Button } from './ui/button';
import { ArrowRight, Smartphone, X } from 'lucide-react';
import Link from 'next/link';
import type { Phone } from '@/lib/types';

export function PhoneList({ phones }: { phones: Phone[] }) {
  const [phone1Id, setPhone1Id] = useState<string | null>(null);
  const [phone2Id, setPhone2Id] = useState<string | null>(null);

  const phone1 = phones.find(p => p.id === phone1Id);
  const phone2 = phones.find(p => p.id === phone2Id);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <PhoneSelector
          phones={phones}
          selectedPhone={phone1}
          onSelectPhone={(phone) => setPhone1Id(phone.id)}
          onClear={() => setPhone1Id(null)}
          title="Teléfono 1"
          disabledIds={phone2Id ? [phone2Id] : []}
        />
        <PhoneSelector
          phones={phones}
          selectedPhone={phone2}
          onSelectPhone={(phone) => setPhone2Id(phone.id)}
          onClear={() => setPhone2Id(null)}
          title="Teléfono 2"
          disabledIds={phone1Id ? [phone1Id] : []}
        />
      </div>

      {phone1 && phone2 && (
        <div className="flex justify-center">
            <Link href={`/compare?phone1=${phone1Id}&phone2=${phone2Id}`} passHref>
              <Button size="lg">
                Comparar Teléfonos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
        </div>
      )}
    </div>
  );
}
