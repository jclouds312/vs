
"use client";

import { useState } from 'react';
import Image from 'next/image';
import type { Phone } from '@/lib/types';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Check, ChevronsUpDown, X, Smartphone, Camera, Battery } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

interface PhoneSelectorProps {
  phones: Phone[];
  selectedPhone: Phone | null | undefined;
  onSelectPhone: (phone: Phone) => void;
  onClear: () => void;
  title: string;
  disabledIds: string[];
}

export function PhoneSelector({ phones, selectedPhone, onSelectPhone, onClear, title, disabledIds }: PhoneSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="w-full max-w-xs mx-auto">
      <CardHeader>
        <CardTitle className="text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedPhone ? (
          <div className="space-y-4">
            <Card className="overflow-hidden">
                <div className="relative aspect-[4/3] w-full">
                    <Image
                    src={selectedPhone.image}
                    alt={selectedPhone.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                    data-ai-hint={`${selectedPhone.brand} ${selectedPhone.name}`}
                    />
                </div>
                <div className='p-4'>
                    <CardHeader className="p-0 mb-2">
                        <CardTitle className="text-xl">{selectedPhone.name}</CardTitle>
                        <CardDescription>{selectedPhone.brand}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 space-y-2">
                        <Badge variant="secondary" className="text-base">${selectedPhone.price}</Badge>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div className="flex items-center gap-2">
                            <Smartphone className="w-4 h-4"/>
                            <span>{selectedPhone.specs.display}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Camera className="w-4 h-4"/>
                            <span>{selectedPhone.specs.camera}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Battery className="w-4 h-4"/>
                            <span>{selectedPhone.specs.battery}</span>
                          </div>
                        </div>
                    </CardContent>
                </div>
            </Card>
            <Button variant="outline" onClick={onClear} className="w-full">
              <X className="mr-2 h-4 w-4" />
              Cambiar selección
            </Button>
          </div>
        ) : (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between h-12 text-base"
              >
                {selectedPhone ? selectedPhone.name : "Seleccionar un teléfono..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
              <Command>
                <CommandInput placeholder="Buscar teléfono..." />
                <CommandList>
                  <CommandEmpty>No se encontró ningún teléfono.</CommandEmpty>
                  <CommandGroup>
                    {phones.map((phone) => (
                      <CommandItem
                        key={phone.id}
                        value={`${phone.name} ${phone.brand}`}
                        onSelect={() => {
                          onSelectPhone(phone);
                          setOpen(false);
                        }}
                        disabled={disabledIds.includes(phone.id)}
                        className="flex items-center justify-between"
                      >
                         <div className="flex items-center gap-2 overflow-hidden">
                            <Image src={phone.image} alt={phone.name} width={25} height={40} className="rounded-sm object-contain" data-ai-hint={`${phone.brand} ${phone.name}`}/>
                            <span className="truncate">{phone.name}</span>
                        </div>
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedPhone?.id === phone.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      </CardContent>
    </Card>
  );
}
