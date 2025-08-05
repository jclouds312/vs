"use client";

import Image from 'next/image';
import type { Phone } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { Smartphone, Camera, BatteryCharging, Cpu, ScreenShare } from 'lucide-react';

interface PhoneCardProps {
  phone: Phone;
  isSelected: boolean;
  onSelect: () => void;
  selectionDisabled: boolean;
}

export function PhoneCard({ phone, isSelected, onSelect, selectionDisabled }: PhoneCardProps) {
  const specIcons = [
    { icon: <ScreenShare className="w-4 h-4" />, value: phone.specs.display },
    { icon: <Camera className="w-4 h-4" />, value: phone.specs.camera },
    { icon: <BatteryCharging className="w-4 h-4" />, value: phone.specs.battery },
    { icon: <Cpu className="w-4 h-4" />, value: phone.specs.processor },
  ];

  return (
    <Card
      onClick={selectionDisabled && !isSelected ? undefined : onSelect}
      className={cn(
        "flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        isSelected ? "ring-2 ring-primary" : "ring-0",
        selectionDisabled && !isSelected ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      )}
    >
      <CardHeader className="relative p-0">
        <div className="absolute top-3 right-3 z-10 bg-background/50 backdrop-blur-sm rounded-full p-1">
          <Checkbox
            checked={isSelected}
            aria-label={`Select ${phone.name}`}
            disabled={selectionDisabled && !isSelected}
            className="w-6 h-6"
          />
        </div>
        <div className="aspect-[3/4] w-full relative">
            <Image
                src={phone.image}
                alt={phone.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                data-ai-hint="smartphone"
            />
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4 space-y-3">
        <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold font-headline leading-tight">
                {phone.name}
            </CardTitle>
            <Badge variant="secondary" className="text-base">${phone.price}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{phone.brand}</p>
        <div className="space-y-2 pt-2">
            {specIcons.map((spec, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                    <div className="text-primary">{spec.icon}</div>
                    <span className="text-muted-foreground truncate">{spec.value}</span>
                </div>
            ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-secondary/50">
        <Badge variant={phone.specs.is5G ? "default" : "outline"} className={cn(phone.specs.is5G ? "bg-accent text-accent-foreground" : "")}>
          {phone.specs.is5G ? '5G Ready' : '4G LTE'}
        </Badge>
      </CardFooter>
    </Card>
  );
}
