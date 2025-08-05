"use client";

import { useState, useMemo, useEffect } from 'react';
import type { Phone } from '@/lib/types';
import { brands, maxPrice } from '@/lib/phones';
import { PhoneCard } from './phone-card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import { X, SlidersHorizontal, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from './ui/card';

export function PhoneList({ phones }: { phones: Phone[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState([maxPrice]);
  const [selectedPhones, setSelectedPhones] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredPhones = useMemo(() => {
    return phones.filter((phone) => {
      const matchesSearch = phone.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = selectedBrand === 'all' || phone.brand === selectedBrand;
      const matchesPrice = phone.price <= priceRange[0];
      return matchesSearch && matchesBrand && matchesPrice;
    });
  }, [phones, searchTerm, selectedBrand, priceRange]);

  const handleSelectPhone = (phoneId: string) => {
    setSelectedPhones((prev) => {
      if (prev.includes(phoneId)) {
        return prev.filter((id) => id !== phoneId);
      }
      if (prev.length < 2) {
        return [...prev, phoneId];
      }
      return prev;
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBrand('all');
    setPriceRange([maxPrice]);
  };

  if (!isMounted) {
     return (
      <div className="space-y-6">
        <Card className="p-4 md:p-6">
          <div className="h-10 bg-muted rounded-md w-full animate-pulse"></div>
        </Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
             <Card key={i} className="h-[420px] bg-muted animate-pulse"></Card>
          ))}
        </div>
      </div>
     )
  }

  return (
    <div className="space-y-6">
      <Card className="p-4 md:p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="md:col-span-2">
            <Input
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-card"
            />
          </div>
          <div>
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-full bg-card">
                <SelectValue placeholder="Seleccionar marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las marcas</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Precio máximo</span>
              <span className="font-medium text-primary">${priceRange[0]}</span>
            </div>
            <Slider
              min={0}
              max={maxPrice}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
            />
          </div>
        </div>
        <div className="flex justify-start items-center mt-4">
            <Button variant="ghost" onClick={clearFilters} className="text-sm text-muted-foreground">
              <X className="w-4 h-4 mr-1" />
              Limpiar filtros
            </Button>
        </div>
      </Card>

      {selectedPhones.length > 0 && (
        <Card className="p-4 sticky top-20 z-40 bg-card/80 backdrop-blur-sm shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className='text-center sm:text-left'>
              <h3 className="font-semibold font-headline">
                {selectedPhones.length} / 2 Teléfonos seleccionados para comparar
              </h3>
              <p className="text-sm text-muted-foreground">
                {selectedPhones.length < 2 ? "Selecciona un teléfono más para comparar." : "¡Listo para comparar!"}
              </p>
            </div>
            <Link href={`/compare?phone1=${selectedPhones[0]}&phone2=${selectedPhones[1]}`} passHref>
              <Button disabled={selectedPhones.length !== 2} size="lg">
                Comparar ahora
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {filteredPhones.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhones.map((phone) => (
            <PhoneCard
              key={phone.id}
              phone={phone}
              isSelected={selectedPhones.includes(phone.id)}
              onSelect={() => handleSelectPhone(phone.id)}
              selectionDisabled={selectedPhones.length >= 2 && !selectedPhones.includes(phone.id)}
            />
          ))}
        </div>
      ) : (
        <Card className="text-center py-20 px-6">
          <SlidersHorizontal className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-semibold font-headline">No se encontraron teléfonos</h3>
          <p className="mt-2 text-muted-foreground">
            Intenta ajustar tus filtros para encontrar lo que buscas.
          </p>
          <Button variant="outline" onClick={clearFilters} className="mt-6">
            Limpiar todos los filtros
          </Button>
        </Card>
      )}
    </div>
  );
}
